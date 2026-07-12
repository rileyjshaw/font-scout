import { createHash } from 'node:crypto';

import * as fontkit from 'fontkit';
import opentype from 'opentype.js';
import wawoff2 from 'wawoff2';

import { STANDARD_GLOBAL_FONT_WEIGHTS } from '../src/constants.js';

export const METRIC_CHARACTERS = [
	...Array.from({ length: 26 }, (_, index) => [
		String.fromCharCode(65 + index),
		String.fromCharCode(97 + index),
	]).flat(),
	...Array.from({ length: 10 }, (_, index) => String(index)),
];

export const METRIC_PROBE_TEXT =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ' +
	'The quick brown fox jumps over the lazy dog. AVATAR To Wa ffi office minimum 0123456789';

const METRIC_PRECISION = 6;
const MULTIPLEX_PRECISION = 6;

function round(value, precision = METRIC_PRECISION) {
	return Number(value.toFixed(precision));
}

function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}

function parseOpenTypeFont(decoded) {
	const arrayBuffer = decoded.buffer.slice(decoded.byteOffset, decoded.byteOffset + decoded.byteLength);
	return opentype.parse(arrayBuffer, { lowMemory: true });
}

async function decodeFont(source) {
	return source.subarray(0, 4).toString('ascii') === 'wOF2' ? Buffer.from(await wawoff2.decompress(source)) : source;
}

export function getOpenTypeLineHeight(font) {
	const unitsPerEm = font.unitsPerEm;
	const os2 = font.tables?.os2;
	const hhea = font.tables?.hhea;
	const candidates = [
		os2 && [os2.sTypoAscender, os2.sTypoDescender, os2.sTypoLineGap],
		hhea && [hhea.ascender, hhea.descender, hhea.lineGap],
	];
	for (const values of candidates) {
		if (!values?.every(Number.isFinite) || !Number.isFinite(unitsPerEm) || unitsPerEm <= 0) continue;
		const [ascender, descender, lineGap] = values;
		const lineHeight = (ascender - descender + lineGap) / unitsPerEm;
		if (lineHeight > 0 && lineHeight < 10) return round(lineHeight);
	}
	throw new Error('missing usable OS/2 typographic and hhea line metrics');
}

function getVariationCoordinates(font, weight) {
	const axes = font.tables?.fvar?.axes ?? [];
	return Object.fromEntries(
		axes.map(axis => {
			let value = axis.defaultValue;
			if (axis.tag === 'wght') value = weight;
			else if (axis.tag === 'wdth') value = 100;
			else if (axis.tag === 'ital' || axis.tag === 'slnt') value = 0;
			return [axis.tag, clamp(value, axis.minValue, axis.maxValue)];
		}),
	);
}

export function getMetricWeights(font, staticWeight = 400) {
	const weightAxis = font.tables?.fvar?.axes?.find(axis => axis.tag === 'wght');
	if (!weightAxis) return [Array.isArray(staticWeight) ? staticWeight[0] : staticWeight];
	return [
		...new Set(STANDARD_GLOBAL_FONT_WEIGHTS.map(weight => clamp(weight, weightAxis.minValue, weightAxis.maxValue))),
	].sort((a, b) => a - b);
}

function transformGlyph(font, glyphId, coordinates) {
	const glyph = font.glyphs.get(glyphId);
	if (font.tables?.hvar && font.variation && Object.keys(coordinates).length) {
		const adjustment = font.variation.process.getVariableAdjustment(glyph.index, 'hvar', 'advanceWidth', coordinates);
		return { ...glyph, advanceWidth: glyph.advanceWidth + adjustment };
	}
	return font.variation && Object.keys(coordinates).length ? font.variation.getTransform(glyph, coordinates) : glyph;
}

function advanceSignature(font, coordinates) {
	const advances = METRIC_CHARACTERS.map(character => {
		const glyph = transformGlyph(font, font.charToGlyph(character).index, coordinates);
		return round(glyph.advanceWidth / font.unitsPerEm, MULTIPLEX_PRECISION);
	});
	return createHash('sha256').update(advances.join(',')).digest('hex');
}

function createShapedRun(fontkitFont, openTypeFont, safeMode = false) {
	let run;
	try {
		if (safeMode) throw new Error('safe mode');
		run = fontkitFont.layout(METRIC_PROBE_TEXT);
	} catch {
		const glyphs = new Map();
		for (const character of METRIC_PROBE_TEXT) {
			const glyphId = openTypeFont.charToGlyph(character).index;
			glyphs.set(glyphId, (glyphs.get(glyphId) ?? 0) + 1);
		}
		return { glyphs, positioningAdjustment: 0 };
	}
	const glyphs = new Map();
	let positioningAdjustment = 0;
	for (const [index, glyph] of run.glyphs.entries()) {
		glyphs.set(glyph.id, (glyphs.get(glyph.id) ?? 0) + 1);
		positioningAdjustment += run.positions[index].xAdvance - glyph.advanceWidth;
	}
	return { glyphs, positioningAdjustment };
}

function shapedWidth(shapedRun, openTypeFont, coordinates) {
	let total = shapedRun.positioningAdjustment;
	for (const [glyphId, count] of shapedRun.glyphs) {
		total += transformGlyph(openTypeFont, glyphId, coordinates).advanceWidth * count;
	}
	const width = total / openTypeFont.unitsPerEm / METRIC_PROBE_TEXT.length;
	if (!Number.isFinite(width) || width <= 0) throw new Error('computed a non-positive shaped advance width');
	return round(width);
}

function analyzeWithFontkitOnly(fontkitFont, staticWeight) {
	const run = fontkitFont.layout(METRIC_PROBE_TEXT);
	const width = round(
		run.positions.reduce((total, position) => total + position.xAdvance, 0) /
			fontkitFont.unitsPerEm /
			METRIC_PROBE_TEXT.length,
	);
	const lineHeight = round((fontkitFont.ascent - fontkitFont.descent + fontkitFont.lineGap) / fontkitFont.unitsPerEm);
	const advances = METRIC_CHARACTERS.map(character =>
		round(fontkitFont.glyphForCodePoint(character.codePointAt(0)).advanceWidth / fontkitFont.unitsPerEm),
	);
	if (!Number.isFinite(width) || width <= 0 || !Number.isFinite(lineHeight) || lineHeight <= 0) {
		throw new Error('could not calculate fallback font metrics');
	}
	return {
		features: [...new Set(fontkitFont.availableFeatures ?? [])].sort(),
		samples: [
			{
				weight: staticWeight,
				width,
				lineHeight,
				advanceSignature: createHash('sha256').update(advances.join(',')).digest('hex'),
			},
		],
		fallback: true,
	};
}

export async function analyzeFontBuffer(
	source,
	{ staticWeight = 400, allowStaticFallback = false, safeMode = false } = {},
) {
	const fontkitFont = fontkit.create(source);
	let openTypeFont;
	try {
		const decoded = await decodeFont(source);
		openTypeFont = parseOpenTypeFont(decoded);
	} catch (error) {
		if (allowStaticFallback) return analyzeWithFontkitOnly(fontkitFont, staticWeight);
		throw error;
	}
	const shapedRun = createShapedRun(fontkitFont, openTypeFont, safeMode);
	const lineHeight = getOpenTypeLineHeight(openTypeFont);
	const samples = getMetricWeights(openTypeFont, staticWeight).map(weight => {
		const coordinates = getVariationCoordinates(openTypeFont, weight);
		return {
			weight,
			width: shapedWidth(shapedRun, openTypeFont, coordinates),
			lineHeight,
			advanceSignature: advanceSignature(openTypeFont, coordinates),
		};
	});
	return {
		features: [...new Set(fontkitFont.availableFeatures ?? [])].sort(),
		samples,
	};
}

function rangeDistance(value, range) {
	if (!Array.isArray(range)) return Math.abs(value - range);
	if (value < range[0]) return range[0] - value;
	if (value > range[1]) return value - range[1];
	return 0;
}

function isUpright(face) {
	const includesItalic = Array.isArray(face.italic) ? face.italic[0] <= 0 : !face.italic;
	return includesItalic && !face.oblique;
}

function nearestSample(samples, targetWeight) {
	return [...samples].sort(
		(sampleA, sampleB) =>
			Math.abs(sampleA.weight - targetWeight) - Math.abs(sampleB.weight - targetWeight) ||
			sampleA.weight - sampleB.weight,
	)[0];
}

export function aggregateFamilyMetrics(faces) {
	const measuredFaces = faces.filter(face => face.metricSamples?.length);
	if (!measuredFaces.length) return {};
	const hasUpright = measuredFaces.some(isUpright);
	const selectedSamples = new Map();

	for (const targetWeight of STANDARD_GLOBAL_FONT_WEIGHTS) {
		const candidates = measuredFaces
			.filter(face => !hasUpright || isUpright(face))
			.map(face => ({ face, sample: nearestSample(face.metricSamples, targetWeight) }))
			.sort(
				(a, b) =>
					rangeDistance(100, a.face.width) - rangeDistance(100, b.face.width) ||
					Math.abs(a.sample.weight - targetWeight) - Math.abs(b.sample.weight - targetWeight) ||
					(a.face.path ?? '').localeCompare(b.face.path ?? ''),
			);
		const selected = candidates[0]?.sample;
		if (selected && !selectedSamples.has(selected.weight)) selectedSamples.set(selected.weight, selected);
	}

	const samples = [...selectedSamples.values()].sort((a, b) => a.weight - b.weight);
	const metrics = samples.map(({ weight, width, lineHeight }) => [weight, width, lineHeight]);
	const signatures = samples.map(sample => sample.advanceSignature).filter(Boolean);
	const multiplexed = signatures.length > 1 && signatures.every(signature => signature === signatures[0]);
	return { metrics, ...(multiplexed ? { multiplexed: true } : {}) };
}

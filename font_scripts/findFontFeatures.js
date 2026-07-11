import { createRequire } from 'module';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import stableStringify from 'json-stable-stringify';
import opentype from 'opentype.js';
import wawoff2 from 'wawoff2';

import { applyFamilyAlias, FONT_FILE_OVERRIDES, getFontFileOverride } from './localFontOverrides.js';

const require = createRequire(import.meta.url);
const fontkit = require('fontkit');

export const SUPPORTED_FONT_EXTENSIONS = new Set(['.woff', '.woff2', '.ttf', '.otf']);
const UNSUPPORTED_COLLECTION_EXTENSIONS = new Set(['.ttc', '.otc']);
const WIDTH_CLASS_TO_PERCENT = [null, 50, 62.5, 75, 87.5, 100, 112.5, 125, 150, 200];
const REGISTERED_VARIANT_AXES = new Set(['wght', 'wdth', 'ital']);
const RUNTIME_VARIANT_DEFAULTS = { weight: 400, italic: 0, oblique: 0, width: 100 };
const DEFAULT_ROOTS = ['public/fonts', 'public/publicFonts'];
const DEFAULT_CATALOG_OUTPUT = 'src/localFontsGenerated.json.js';
const DEFAULT_CSS_OUTPUT = 'public/fonts.generated.css';

function normalizePath(filePath) {
	return filePath.split(path.sep).join('/');
}

function englishName(font, key) {
	if (!font) return undefined;
	for (const platform of ['windows', 'macintosh', 'unicode']) {
		const value = font.names?.[platform]?.[key]?.en ?? Object.values(font.names?.[platform]?.[key] ?? {})[0];
		if (value) return value.trim();
	}
	return undefined;
}

function isUsableFamilyName(name) {
	return Boolean(name && name.length > 1 && name !== '.' && name !== 'ø' && !/[\u0000-\u001f\u007f]/.test(name));
}

function bitIsSet(value, bit) {
	return Boolean((Number(value) || 0) & (1 << bit));
}

function formatForExtension(extension) {
	return {
		'.woff': 'woff',
		'.woff2': 'woff2',
		'.ttf': 'truetype',
		'.otf': 'opentype',
	}[extension];
}

async function discoverFontFiles(projectRoot, roots) {
	const discovered = [];

	async function visit(relativeDirectory) {
		let entries;
		try {
			entries = await fs.readdir(path.resolve(projectRoot, relativeDirectory), { withFileTypes: true });
		} catch (error) {
			if (error.code === 'ENOENT') return;
			throw error;
		}

		for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
			const relativePath = normalizePath(path.join(relativeDirectory, entry.name));
			if (entry.isDirectory()) await visit(relativePath);
			else if (entry.isFile()) {
				const extension = path.extname(entry.name).toLowerCase();
				if (SUPPORTED_FONT_EXTENSIONS.has(extension)) discovered.push(relativePath);
				else if (UNSUPPORTED_COLLECTION_EXTENSIONS.has(extension)) {
					throw new Error(`Unsupported font collection “${relativePath}”. Extract it to individual font files first.`);
				}
			}
		}
	}

	for (const root of [...roots].sort()) await visit(normalizePath(root));
	return discovered;
}

async function parseOpenTypeFont(absolutePath, extension) {
	const source = await fs.readFile(absolutePath);
	const decoded = extension === '.woff2' ? await wawoff2.decompress(source) : source;
	const arrayBuffer = decoded.buffer.slice(decoded.byteOffset, decoded.byteOffset + decoded.byteLength);
	return opentype.parse(arrayBuffer);
}

function readFeatures(absolutePath) {
	try {
		return [...new Set(fontkit.openSync(absolutePath).availableFeatures ?? [])].sort();
	} catch {
		return [];
	}
}

function normalizeAxis(axis, override) {
	const tag = axis.tag;
	const configured = override?.axes?.[tag];
	const label = configured?.[0] ?? axis.name?.en ?? tag;
	const min = configured?.[1] ?? axis.minValue;
	const max = configured?.[2] ?? axis.maxValue;
	const defaultValue = configured?.[3] ?? axis.defaultValue;
	const step = configured?.[4] ?? (tag === 'wght' ? 1 : tag === 'wdth' ? 0.1 : 0.01);
	return [label, min, max, defaultValue, step];
}

export async function parseFontFile(
	relativePath,
	{ projectRoot = process.cwd(), overrides = FONT_FILE_OVERRIDES } = {},
) {
	const normalizedPath = normalizePath(relativePath);
	const override =
		overrides === FONT_FILE_OVERRIDES ? getFontFileOverride(normalizedPath) : (overrides[normalizedPath] ?? {});
	if (override.exclude) return null;

	const absolutePath = path.resolve(projectRoot, normalizedPath);
	const extension = path.extname(normalizedPath).toLowerCase();
	let font;
	let parseError;
	try {
		font = await parseOpenTypeFont(absolutePath, extension);
	} catch (error) {
		parseError = error;
	}

	if (!font && !override.family) {
		throw new Error(
			`${normalizedPath}: could not parse font (${parseError?.message ?? 'unknown error'}); add a complete override`,
		);
	}
	if (!font) {
		const required = ['family', 'subfamily', 'weight', 'width', 'italic', 'oblique', 'axes'];
		const missing = required.filter(key => override[key] === undefined);
		if (missing.length) {
			throw new Error(
				`${normalizedPath}: parser failed (${parseError?.message ?? 'unknown error'}) and override is missing ${missing.join(', ')}`,
			);
		}
	}

	const embeddedFamily = englishName(font, 'preferredFamily') ?? englishName(font, 'fontFamily');
	const family = applyFamilyAlias(override.family ?? embeddedFamily);
	if (!isUsableFamilyName(family)) {
		throw new Error(`${normalizedPath}: missing or unusable family name “${family ?? ''}”; add a family override`);
	}

	const subfamily =
		override.subfamily ?? englishName(font, 'preferredSubfamily') ?? englishName(font, 'fontSubfamily') ?? 'Regular';
	const os2 = font?.tables?.os2 ?? {};
	const fvarAxes = font?.tables?.fvar?.axes ?? [];
	const axes = Object.fromEntries(
		fvarAxes.map(axis => [axis.tag, normalizeAxis(axis, override)]).sort(([tagA], [tagB]) => tagA.localeCompare(tagB)),
	);
	for (const [tag, definition] of Object.entries(override.axes ?? {})) axes[tag] = definition;

	const weightAxis = axes.wght;
	const widthAxis = axes.wdth;
	const italicAxis = axes.ital;
	const styleText = [subfamily, embeddedFamily, englishName(font, 'fullName')].filter(Boolean).join(' ').toLowerCase();
	const oblique = override.oblique ?? (bitIsSet(os2.fsSelection, 9) || /oblique/.test(styleText) ? 1 : 0);
	const detectedItalic = italicAxis
		? [italicAxis[1], italicAxis[2]]
		: bitIsSet(os2.fsSelection, 0) || /italic/.test(styleText)
			? 1
			: 0;
	// Some oblique faces set the legacy italic selection bit. They are separate
	// controls in the app, so an explicit oblique name takes precedence.
	const italic = override.italic ?? (oblique ? 0 : detectedItalic);
	const weight = override.weight ?? (weightAxis ? [weightAxis[1], weightAxis[2]] : os2.usWeightClass || 400);
	const width =
		override.width ?? (widthAxis ? [widthAxis[1], widthAxis[2]] : (WIDTH_CLASS_TO_PERCENT[os2.usWidthClass] ?? 100));
	const features = [...new Set(override.features ?? readFeatures(absolutePath))].sort();

	return {
		path: normalizedPath.replace(/^public\//, ''),
		format: formatForExtension(extension),
		family,
		subfamily,
		weight,
		width,
		italic,
		oblique,
		axes,
		features,
		isVariable: Object.keys(axes).length > 0 || Array.isArray(weight) || Array.isArray(width) || Array.isArray(italic),
	};
}

function comparableVariant(face) {
	return {
		weight: face.weight,
		italic: face.italic,
		oblique: face.oblique,
		width: face.width,
	};
}

function stableValue(value) {
	return stableStringify(value);
}

export function aggregateFonts(faces) {
	const groups = new Map();
	for (const face of faces.filter(Boolean)) {
		if (!groups.has(face.family)) groups.set(face.family, []);
		groups.get(face.family).push(face);
	}

	return [...groups.entries()]
		.sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
		.map(([name, familyFaces]) => {
			familyFaces.sort((a, b) => a.path.localeCompare(b.path));
			const customAxes = {};
			for (const face of familyFaces) {
				for (const [tag, definition] of Object.entries(face.axes).filter(
					([tag]) => !REGISTERED_VARIANT_AXES.has(tag),
				)) {
					if (customAxes[tag] && stableValue(customAxes[tag]) !== stableValue(definition)) {
						throw new Error(`${name}: incompatible “${tag}” axis definitions in one family; correct with an override`);
					}
					customAxes[tag] = definition;
				}
			}

			const variants = [];
			for (const face of familyFaces) {
				const variant = comparableVariant(face);
				if (!variants.some(existing => stableValue(existing) === stableValue(variant))) variants.push(variant);
			}

			const features = [...new Set(familyFaces.flatMap(face => face.features))].sort();
			return {
				name,
				isVariable: familyFaces.some(face => face.isVariable),
				variants,
				...(Object.keys(customAxes).length ? { axes: Object.fromEntries(Object.entries(customAxes).sort()) } : {}),
				features,
				faces: familyFaces.map(({ family: _family, ...face }) => face),
			};
		});
}

function cssString(value) {
	return value
		.replace(/\\/g, '\\\\')
		.replace(/'/g, "\\'")
		.replace(/[\n\r\f]/g, ' ');
}

function cssRange(value) {
	return Array.isArray(value) ? `${value[0]} ${value[1]}` : String(value);
}

function cssUrl(publicRelativePath) {
	return encodeURI(`/${publicRelativePath}`).replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29');
}

export function generateCss(families) {
	const rules = families.flatMap(family =>
		family.faces.flatMap(face => {
			const italicStyles = Array.isArray(face.italic)
				? [face.italic[0] <= 0 ? 'normal' : null, face.italic[1] > 0 ? 'italic' : null].filter(Boolean)
				: [face.italic ? 'italic' : 'normal'];
			const styles = face.oblique ? ['oblique'] : [...new Set(italicStyles)];
			return styles.map(style =>
				[
					'@font-face {',
					`\tfont-family: '${cssString(family.name)}';`,
					`\tsrc: url('${cssUrl(face.path)}') format('${face.format}');`,
					`\tfont-weight: ${cssRange(face.weight)};`,
					`\tfont-stretch: ${cssRange(face.width)}%;`,
					`\tfont-style: ${style};`,
					'\tfont-display: block;',
					'}',
				].join('\n'),
			);
		}),
	);
	return `/* This file is generated by yarn scan-fonts. Do not edit. */\n\n${rules.join('\n\n')}\n`;
}

function compactRuntimeVariant(variant) {
	return Object.fromEntries(
		Object.entries(variant).filter(
			([property, value]) => stableValue(value) !== stableValue(RUNTIME_VARIANT_DEFAULTS[property]),
		),
	);
}

function getRuntimeFeatureData(family) {
	const commonFeatures = family.faces.reduce(
		(common, face) => common.filter(feature => face.features.includes(feature)),
		family.features,
	);
	if (commonFeatures.length === family.features.length) return { features: family.features };

	const commonSet = new Set(commonFeatures);
	const groups = new Map();
	for (const face of family.faces) {
		const additionalFeatures = face.features.filter(feature => !commonSet.has(feature));
		const key = stableValue(additionalFeatures);
		if (!groups.has(key)) groups.set(key, { features: additionalFeatures, variants: [] });
		const variants = groups.get(key).variants;
		const variant = compactRuntimeVariant(comparableVariant(face));
		if (!variants.some(existing => stableValue(existing) === stableValue(variant))) variants.push(variant);
	}

	return { features: commonFeatures, featureGroups: [...groups.values()] };
}

export function generateCatalogModule(families) {
	const runtimeFamilies = Object.fromEntries(
		families.map(({ name, faces, isVariable, variants, features: _features, ...family }) => [
			name,
			{
				...family,
				...getRuntimeFeatureData({ faces, features: _features }),
				...(isVariable ? { isVariable: true } : {}),
				variants: variants.map(compactRuntimeVariant),
			},
		]),
	);
	return `// This file is generated by yarn scan-fonts. Do not edit.\nexport default ${stableStringify(runtimeFamilies, { space: '\t' })};\n`;
}

async function atomicWrite(filename, contents) {
	await fs.mkdir(path.dirname(filename), { recursive: true });
	const temporary = `${filename}.${process.pid}.tmp`;
	await fs.writeFile(temporary, contents);
	await fs.rename(temporary, filename);
}

export async function scanFonts({
	projectRoot = process.cwd(),
	roots = DEFAULT_ROOTS,
	overrides = FONT_FILE_OVERRIDES,
	catalogOutput = DEFAULT_CATALOG_OUTPUT,
	cssOutput = DEFAULT_CSS_OUTPUT,
	write = true,
} = {}) {
	const files = await discoverFontFiles(projectRoot, roots);
	const errors = [];
	const faces = [];
	for (const file of files) {
		try {
			const face = await parseFontFile(file, { projectRoot, overrides });
			if (face) faces.push(face);
		} catch (error) {
			errors.push(error.message);
		}
	}
	if (errors.length) throw new Error(`Font scan failed:\n- ${errors.join('\n- ')}`);

	const families = aggregateFonts(faces);
	const catalog = generateCatalogModule(families);
	const css = generateCss(families);
	if (write) {
		await atomicWrite(path.resolve(projectRoot, catalogOutput), catalog);
		await atomicWrite(path.resolve(projectRoot, cssOutput), css);
	}
	return { files, faces, families, catalog, css };
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
	try {
		const result = await scanFonts();
		console.log(`Scanned ${result.faces.length} font files into ${result.families.length} families.`);
	} catch (error) {
		console.error(error.message);
		process.exitCode = 1;
	}
}

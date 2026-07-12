import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

import { aggregateFamilyMetrics, analyzeFontBuffer, getMetricWeights, getOpenTypeLineHeight } from './fontMetrics.js';

const projectRoot = path.resolve(import.meta.dirname, '..');

test('prefers OS/2 typographic line metrics and falls back to hhea', () => {
	assert.equal(
		getOpenTypeLineHeight({
			unitsPerEm: 1000,
			tables: {
				os2: { sTypoAscender: 750, sTypoDescender: -250, sTypoLineGap: 200 },
				hhea: { ascender: 950, descender: -250, lineGap: 0 },
			},
		}),
		1.2,
	);
	assert.equal(
		getOpenTypeLineHeight({
			unitsPerEm: 1000,
			tables: { hhea: { ascender: 900, descender: -200, lineGap: 100 } },
		}),
		1.2,
	);
});

test('extracts deterministic shaped metrics from a static font', async () => {
	const source = await fs.readFile(path.join(projectRoot, 'public/publicFonts/Junction-Regular.woff2'));
	const first = await analyzeFontBuffer(source, { staticWeight: 400 });
	const second = await analyzeFontBuffer(source, { staticWeight: 400 });
	assert.deepEqual(first, second);
	assert.equal(first.samples[0].weight, 400);
	assert.ok(first.samples[0].width > 0.1 && first.samples[0].width < 2);
	assert.ok(first.samples[0].lineHeight > 0.5);
});

test('clamps variable metric weights to the supported range', () => {
	const weights = getMetricWeights({
		tables: { fvar: { axes: [{ tag: 'wght', minValue: 325, maxValue: 875, defaultValue: 400 }] } },
	});
	assert.equal(weights[0], 325);
	assert.equal(weights.at(-1), 875);
	assert.ok(weights.includes(400));
});

test('prefers upright normal-width samples and detects multiplexed families', () => {
	const signature = 'same';
	const data = aggregateFamilyMetrics([
		{
			path: 'wide.woff2',
			weight: [400, 700],
			width: 150,
			italic: 0,
			oblique: 0,
			metricSamples: [{ weight: 400, width: 999, lineHeight: 1, advanceSignature: 'wide' }],
		},
		{
			path: 'regular.woff2',
			weight: [400, 700],
			width: 100,
			italic: 0,
			oblique: 0,
			metricSamples: [
				{ weight: 400, width: 10, lineHeight: 1.2, advanceSignature: signature },
				{ weight: 700, width: 11, lineHeight: 1.2, advanceSignature: signature },
			],
		},
		{
			path: 'italic.woff2',
			weight: 400,
			width: 100,
			italic: 1,
			oblique: 0,
			metricSamples: [{ weight: 400, width: 888, lineHeight: 2, advanceSignature: 'italic' }],
		},
	]);
	assert.deepEqual(data.metrics, [
		[400, 10, 1.2],
		[700, 11, 1.2],
	]);
	assert.equal(data.multiplexed, true);
});

test('falls back to italic metrics when no upright face exists', () => {
	const data = aggregateFamilyMetrics([
		{
			path: 'italic.woff2',
			weight: 400,
			width: 100,
			italic: 1,
			oblique: 0,
			metricSamples: [{ weight: 400, width: 20, lineHeight: 1.1, advanceSignature: 'only' }],
		},
	]);
	assert.deepEqual(data.metrics, [[400, 20, 1.1]]);
});

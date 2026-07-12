import assert from 'node:assert/strict';
import test from 'node:test';

import processGoogleFonts, { compactFontFeatures, compactFontMetrics } from './processGoogleFonts.js';

test('compacts common and variant-specific Google font features', () => {
	const font = {
		family: 'Example',
		files: { regular: 'regular.woff2', italic: 'italic.woff2' },
		axes: [{ tag: 'wght', start: 100, end: 900 }],
	};
	assert.deepEqual(
		compactFontFeatures(font, {
			italic: ['liga', 'ss02', 'kern'],
			regular: ['ss01', 'kern', 'liga'],
		}),
		{
			features: ['kern', 'liga'],
			featureGroups: [
				{ features: ['ss02'], variants: [{ weight: [100, 900], italic: 1 }] },
				{ features: ['ss01'], variants: [{ weight: [100, 900], italic: 0 }] },
			],
		},
	);
});

test('adds compact feature metadata to processed Google families', () => {
	const raw = {
		items: [
			{
				family: 'Example',
				category: 'sans-serif',
				variants: ['regular', '700'],
				files: { regular: 'example.woff2', 700: 'example-bold.woff2' },
			},
		],
	};
	const { Example: font } = processGoogleFonts(raw, { Example: { regular: ['liga', 'ss01'] } });
	assert.deepEqual(font.features, ['liga', 'ss01']);
	assert.deepEqual(font.variants[0].weight, [400, 700]);
});

test('compacts Google metrics and multiplexed state', () => {
	const font = {
		family: 'Example',
		files: { regular: 'regular.woff2' },
		axes: [{ tag: 'wght', start: 400, end: 700 }],
	};
	assert.deepEqual(
		compactFontMetrics(font, {
			regular: {
				features: [],
				samples: [
					{ weight: 400, width: 10, lineHeight: 1.2, advanceSignature: 'same' },
					{ weight: 700, width: 11, lineHeight: 1.2, advanceSignature: 'same' },
				],
			},
		}),
		{
			metrics: [
				[400, 10, 1.2],
				[700, 11, 1.2],
			],
			multiplexed: true,
		},
	);
});

import assert from 'node:assert/strict';
import test from 'node:test';

import {
	getAvailableFontFeatures,
	getDefaultFontFeatureValue,
	getFontFeatureLabel,
	getFontFeatureValue,
	isUserToggleableFontFeature,
	serializeFontFeatureSettings,
} from '../src/lib/fontFeatures.js';

test('uses OpenType defaults until a feature is explicitly overridden', () => {
	assert.equal(getDefaultFontFeatureValue('liga'), true);
	assert.equal(getDefaultFontFeatureValue('kern'), true);
	assert.equal(getDefaultFontFeatureValue('dlig'), false);
	assert.equal(getFontFeatureValue('liga', { liga: false }), false);
	assert.equal(getFontFeatureValue('ss01', { ss01: true }), true);
});

test('labels numbered and common OpenType features', () => {
	assert.equal(getFontFeatureLabel('pnum'), 'Proportional figures');
	assert.equal(getFontFeatureLabel('ss07'), 'Stylistic set 7');
	assert.equal(getFontFeatureLabel('cv03'), 'Character variant 3');
});

test('serializes only explicit feature choices deterministically', () => {
	assert.equal(serializeFontFeatureSettings(), undefined);
	assert.equal(serializeFontFeatureSettings({ tnum: true, liga: false, ss01: true }), '"liga" 0, "ss01" 1, "tnum" 1');
	assert.equal(serializeFontFeatureSettings({ liga: false, ss01: true }, ['ss01']), '"ss01" 1');
});

test('shows only user-toggleable features supported by the active variant', () => {
	const font = {
		features: ['kern', 'mark'],
		featureGroups: [
			{ features: ['ss01'], variants: [{}] },
			{ features: ['dlig'], variants: [{ italic: 1 }] },
		],
	};
	assert.deepEqual(getAvailableFontFeatures(font, {}), ['kern', 'ss01']);
	assert.deepEqual(getAvailableFontFeatures(font, { italic: 1 }), ['dlig', 'kern']);
	assert.equal(isUserToggleableFontFeature('mark'), false);
	assert.equal(isUserToggleableFontFeature('rvrn'), false);
	assert.equal(isUserToggleableFontFeature('ss07'), true);
});

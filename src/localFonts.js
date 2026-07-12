import generatedFonts from './localFontsGenerated.json.js';
import curatedCollections from './localFontCollections.json.js';
import {
	DISPLAY_COLLECTION,
	LOCAL_FONTS_COLLECTION,
	MONOSPACE_COLLECTION,
	SANS_SERIF_COLLECTION,
	SERIF_COLLECTION,
	SYSTEM_FONTS_COLLECTION,
} from './constants.js';
import { generatePermutations } from './lib/utils.js';

const systemFontDefinitions = [
	['Times New Roman', [400, 700], [0, 1], SERIF_COLLECTION],
	['Georgia', [400, 700], [0, 1], SERIF_COLLECTION],
	['Charter', [400, 700, 900], [0, 1], SERIF_COLLECTION],
	['Palatino', [400, 700], [0, 1], SERIF_COLLECTION],
	['Arial', [400, 700], [0, 1], SANS_SERIF_COLLECTION],
	['Verdana', [400, 700], [0, 1], SANS_SERIF_COLLECTION],
	['Tahoma', [400, 700], [0], SANS_SERIF_COLLECTION],
	['Trebuchet MS', [400, 700], [0, 1], SANS_SERIF_COLLECTION],
	['Courier New', [400, 700], [0, 1], MONOSPACE_COLLECTION],
	['Arial Black', [700], [0], DISPLAY_COLLECTION],
];

// System fonts have no repository binaries. These compact values preserve the
// previous Chrome measurements, normalized to em units.
const systemFontMetrics = {
	'Times New Roman': [
		[400, 0.54924, 1.15625],
		[700, 0.577783, 1.15625],
	],
	Georgia: [
		[400, 0.580639, 1.125],
		[700, 0.664722, 1.125],
	],
	Charter: [
		[400, 0.556755, 1.21875],
		[700, 0.582257, 1.21875],
		[900, 0.644294, 1.21875],
	],
	Palatino: [
		[400, 0.580335, 1.09375],
		[700, 0.600743, 1.09375],
	],
	Arial: [
		[400, 0.575881, 1.15625],
		[700, 0.600735, 1.15625],
	],
	Verdana: [
		[400, 0.622636, 1.21875],
		[700, 0.699726, 1.21875],
	],
	Tahoma: [
		[400, 0.544797, 1.21875],
		[700, 0.629912, 1.21875],
	],
	'Trebuchet MS': [
		[400, 0.537392, 1.15625],
		[700, 0.571667, 1.15625],
	],
	'Courier New': [
		[400, 0.600098, 1.15625],
		[700, 0.600098, 1.15625],
	],
	'Arial Black': [[700, 0.68346, 1.40625]],
};

const systemFonts = systemFontDefinitions.map(([name, weight, italic, category]) => ({
	name,
	variants: generatePermutations({ weight, italic }),
	metrics: systemFontMetrics[name],
	...(name === 'Courier New' ? { multiplexed: true } : {}),
	collections: [category, SYSTEM_FONTS_COLLECTION, LOCAL_FONTS_COLLECTION],
}));

const fileBackedFonts = Object.entries(generatedFonts).map(([name, font]) => ({
	...font,
	name,
	collections: [...new Set([...(curatedCollections[name] ?? []), LOCAL_FONTS_COLLECTION])],
}));

export default [...fileBackedFonts, ...systemFonts];

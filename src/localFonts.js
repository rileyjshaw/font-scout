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

const systemFonts = systemFontDefinitions.map(([name, weight, italic, category]) => ({
	name,
	variants: generatePermutations({ weight, italic }),
	collections: [category, SYSTEM_FONTS_COLLECTION, LOCAL_FONTS_COLLECTION],
}));

const fileBackedFonts = Object.entries(generatedFonts).map(([name, font]) => ({
	...font,
	name,
	collections: [...new Set([...(curatedCollections[name] ?? []), LOCAL_FONTS_COLLECTION])],
}));

export default [...fileBackedFonts, ...systemFonts];

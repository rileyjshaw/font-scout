import multiplexedFontsArray from './multiplexedFonts.json.js';
import googleFonts from './googleFonts.js';
import localFonts from './localFonts.js';
import {
	ALL_FONTS_COLLECTION,
	SINGLE_VARIANT_COLLECTION,
	MULTIPLE_WEIGHTS_COLLECTION,
	MULTIPLE_STYLES_COLLECTION,
	MULTIPLE_WIDTHS_COLLECTION,
	MULTIPLEXED_COLLECTION,
	STARRED_COLLECTION,
	UI_FONTS_COLLECTION,
	UNCATEGORIZED_COLLECTION,
	VARIABLE_COLLECTION,
	FONT_SETTINGS,
} from './constants.js';

const variantDefaults = ['weight', 'italic', 'oblique', 'width'].reduce((acc, key) => {
	acc[key] = FONT_SETTINGS[key].defaultValue;
	return acc;
}, {});

const multiplexedFonts = new Set(multiplexedFontsArray);
const allFonts = [...localFonts, ...googleFonts]
	.map(font => ({
		...font,
		variants: font.variants.map(variant => ({
			...variantDefaults,
			...variant,
		})),
	}))
	.sort((a, b) => a.name.localeCompare(b.name));

// TODO: Save these to a DB or something.
const STARRED_FONTS = new Set([
	'Anton',
	'Atkinson Hyperlegible',
	'Azeret Mono',
	'Bricolage',
	'Cartograph CF',
	'Cousine',
	'EB Garamond',
	'Epilogue',
	'IBM Plex Mono',
	'Inclusive Sans',
	'Instrument Sans',
	'Instrument Serif',
	'Instrument',
	'Inter Tight',
	'Inter',
	'Jetbrains Mono',
	'Lexend',
	'Manrope',
	'McQueen',
	'Montserrat',
	'Newsreader',
	'Ovo',
	'Redacted Script',
	'Rethink Sans',
	'Roboto Flex',
	'Space Grotesk',
	'Space Mono',
	'Spectral',
	'Trispace',
	'Victor Mono',
	'Warbler Text',
]);

// Include fonts from scraped sources.
const UI_FONTS = new Set([
	'DM Sans',
	'Inter Tight',
	'Inter',
	'Plus Jakarta Sans',
	'Poppins',
	'Public Sans',
	'Work Sans',
]);

allFonts.forEach(font => {
	// Index variants by their properties for quick lookup.
	const propertyKeys = [...new Set(font.variants.flatMap(variant => Object.keys(variant)))];
	font.variantGroupsByProperty = new Map(
		propertyKeys.map(key => [
			key,
			new Map(
				font.variants.reduce((acc, variant) => {
					const value = variant[key];
					if (!acc.has(value)) {
						acc.set(value, []);
					}
					acc.get(value).push(variant);
					return acc;
				}, new Map())
			),
		])
	);

	// Add collections based on font properties.
	if (STARRED_FONTS.has(font.name)) font.collections.push(STARRED_COLLECTION);
	if (UI_FONTS.has(font.name)) font.collections.push(UI_FONTS_COLLECTION);
	if (multiplexedFonts.has(font.name)) font.collections.push(MULTIPLEXED_COLLECTION);
	if (font.isVariable) {
		font.collections.push(VARIABLE_COLLECTION);
	} else if (font.variants.length === 1) {
		font.collections.push(SINGLE_VARIANT_COLLECTION);
	}

	const weightVariants = font.variantGroupsByProperty.get('weight');
	if (weightVariants.size > 1 || Array.isArray(weightVariants.values().next().value) || font.axes?.wght) {
		font.collections.push(MULTIPLE_WEIGHTS_COLLECTION);
	}
	const widthVariants = font.variantGroupsByProperty.get('width');
	if (widthVariants.size > 1 || Array.isArray(widthVariants.values().next().value) || font.axes?.wdth) {
		font.collections.push(MULTIPLE_WIDTHS_COLLECTION);
	}
	const italicVariants = font.variantGroupsByProperty.get('italic');
	const obliqueVariants = font.variantGroupsByProperty.get('oblique');
	if (
		italicVariants.size > 1 ||
		Array.isArray(italicVariants.values().next().value) ||
		obliqueVariants.size > 1 ||
		Array.isArray(obliqueVariants.values().next().value) ||
		font.axes?.ital ||
		font.axes?.slnt
	) {
		font.collections.push(MULTIPLE_STYLES_COLLECTION);
	}
	if (font.collections.length === 0) font.collections.push(UNCATEGORIZED_COLLECTION);
	font.collections.push(ALL_FONTS_COLLECTION);
});

export default allFonts;

// Also export allFonts as an object indexed by name.
export const allFontsByName = allFonts.reduce((acc, font) => {
	acc[font.name] = font;
	return acc;
}, {});

import googleFonts from './googleFonts.js';
import localFonts from './localFonts.js';
import {
	WEIGHTS,
	ALL_FONTS_COLLECTION,
	SINGLE_VARIANT_COLLECTION,
	MULTIPLE_WEIGHTS_COLLECTION,
	MULTIPLE_STYLES_COLLECTION,
	MULTIPLE_WIDTHS_COLLECTION,
	MULTIPLEXED_COLLECTION,
	STARRED_COLLECTION,
	UI_FONTS_COLLECTION,
	UNCATEGORIZED_COLLECTION,
	WIDTH_PERCENTAGES,
} from './constants.js';
import multiplexedFontsArray from './multiplexed_fonts.json'; // assert { type: 'json' };

const multiplexedFonts = new Set(multiplexedFontsArray);
const allFonts = [...googleFonts, ...localFonts]
	.map(font => ({
		name: font.name,
		href: font.href,
		// TODO: This needs to be reworked to handle variable fonts properly.
		// TODO: I can make a bunch of utility functions to make this easier. For instance:
		// generatePermutations({
		//   weight: [REGULAR],
		//   italic: [false, true],
		//   width: ['normal', 'condensed'],
		// })
		variants: [
			...font.regularWeights.map(weight => ({
				weight: WEIGHTS[weight],
				italic: 0,
				width: WIDTH_PERCENTAGES.normal,
			})),
			...(Array.isArray(font.italicWeights) ? font.italicWeights : font.italicWeights ? font.regularWeights : []).map(
				weight => ({
					weight: WEIGHTS[weight],
					italic: 1,
					width: WIDTH_PERCENTAGES.normal,
				})
			),
			...(Array.isArray(font.obliqueWeights)
				? font.obliqueWeights
				: font.obliqueWeights
				? font.regularWeights
				: []
			).map(weight => ({
				weight: WEIGHTS[weight],
				italic: 1, // TODO: This should be oblique: 1
				width: WIDTH_PERCENTAGES.normal,
			})),
			...(font.widths
				? Reflect.ownKeys(font.widths).flatMap(weight => {
						const { values, italicWeights, obliqueWeights } = font.widths[weight];
						const variants = values.map(width => ({
							weight: WEIGHTS[weight],
							italic: 0,
							width: WIDTH_PERCENTAGES[width],
						}));
						return [
							...variants,
							...(italicWeights
								? variants.map(variant => ({
										...variant,
										italic: 1,
								  }))
								: []),
							...(obliqueWeights
								? variants.map(variant => ({
										...variant,
										italic: 1, // TODO: This should be oblique: 1
								  }))
								: []),
						];
				  })
				: []),
		],
		collections: font.collections ?? [],
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
	const propertyKeys = Object.keys(font.variants[0] || {});
	font.variantsByProperty = new Map(
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
	if (font.variants.length === 1) font.collections.push(SINGLE_VARIANT_COLLECTION);
	else {
		if (font.variantsByProperty.get('weight').size > 1) font.collections.push(MULTIPLE_WEIGHTS_COLLECTION);
		if (font.variantsByProperty.get('width').size > 1) font.collections.push(MULTIPLE_WIDTHS_COLLECTION);
		if (font.variantsByProperty.get('italic').size > 1) font.collections.push(MULTIPLE_STYLES_COLLECTION);
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

import {
	GOOGLE_FONTS_COLLECTION,
	GOOGLE_FONTS_SHORTLIST_COLLECTION,
	FREE_OPEN_COLLECTION,
	DISPLAY_COLLECTION,
	HANDWRITING_COLLECTION,
	MONOSPACE_COLLECTION,
	SANS_SERIF_COLLECTION,
	SERIF_COLLECTION,
	WEIGHT_REGULAR,
} from './constants.js';
import responseJson from './google_fonts_raw.json'; // assert { type: 'json' };

const TYPEWOLF_BEST_GOOGLE_FONTS = [
	'Alegreya',
	'Alegreya Sans',
	'Anonymous Pro',
	'Archivo Narrow',
	'BioRhyme',
	'Cabin',
	'Cardo',
	'Chivo',
	'Cormorant',
	'Crimson Text',
	'Eczar',
	'Fira Sans',
	'IBM Plex Sans',
	'Inconsolata',
	'Inknut Antiqua',
	'Inter',
	'Karla',
	'Lato',
	'Libre Baskerville',
	'Libre Franklin',
	'Lora',
	'Merriweather',
	'Montserrat',
	'Neuton',
	'Open Sans',
	'Playfair Display',
	'Poppins',
	'Proza Libre',
	'PT Sans',
	'PT Serif',
	'Raleway',
	'Roboto',
	'Roboto Slab',
	'Rubik',
	'Source Sans Pro',
	'Source Serif Pro',
	'Space Grotesk',
	'Space Mono',
	'Spectral',
	'Work Sans',
];

const AWWWARDS_BEST_GOOGLE_FONTS = [
	'Sora',
	'Hahmlet',
	'JetBrains Mono',
	'Andada Pro',
	'Epilogue ',
	'Inter',
	'Encode Sans',
	'Manrope',
	'Lora',
	'BioRhyme',
	'Playfair Display',
	'Archivo',
	'Roboto',
	'Cormorant',
	'Spectral',
	'Raleway',
	'Work Sans',
	'Lato',
	'Anton',
	'Old Standard TT',
	'Oswald',
	'Montserrat',
	'Poppins',
	'Nunito',
	'Source Sans Pro',
	'Oxygen',
	'Open Sans',
];

const IGNORED_FONTS = [
	'Victor Mono', // The local version includes obliques.
];

const GOOGLE_FONTS_SHORTLIST = [...TYPEWOLF_BEST_GOOGLE_FONTS, ...AWWWARDS_BEST_GOOGLE_FONTS]
	.sort((a, b) => a.localeCompare(b))
	.filter((name, i, arr) => arr[i - 1] !== name);

const FONT_CATEGORY_COLLECTIONS = {
	display: DISPLAY_COLLECTION,
	handwriting: HANDWRITING_COLLECTION,
	monospace: MONOSPACE_COLLECTION,
	'sans-serif': SANS_SERIF_COLLECTION,
	serif: SERIF_COLLECTION,
};

const googleFonts = responseJson.items
	.filter(font => !IGNORED_FONTS.includes(font.family))
	.map(font => {
		const name = font.family;
		const hrefBase = `https://fonts.googleapis.com/css2?family=${name.replace(/ /g, '+')}`;
		// A lot of Google fonts with variable axes may still have a static `ital` axis.
		// As of 2024-12-28, Google doesn’t differentiate between a font with a variable
		// `ital` axis (eg. EB Garamond), and a font with a static 0|1 `font-style: italic`
		// switch. I’m not really sure how to handle this, but my current thinking is that
		// any variable font with italics should automatically have a 0..1 `ital` slider.
		const [regularWeights, italicWeights] = font.variants.reduce(
			(acc, variant) => {
				const [regularWeights, italicWeights] = acc;
				if (variant === 'regular') regularWeights.push(WEIGHT_REGULAR);
				else if (variant === 'italic') italicWeights.push(WEIGHT_REGULAR);
				else {
					const [, weight, isItalic] = variant.match(/([0-9]+)(italic)?/);
					(isItalic ? italicWeights : regularWeights).push(weight);
				}
				return acc;
			},
			[[], []]
		);

		const variants = [
			...regularWeights.map(weight => ({
				weight,
				italic: 0,
			})),
			...italicWeights.map(weight => ({
				weight,
				italic: 1,
			})),
		];

		// TODO: Remove this once we have a way to handle variable fonts.
		const isVariable = false && !!font.axes?.find(axis => axis.tag === 'wght');
		const commonProperties = {
			name,
			isVariable,
			variants,
			collections: [
				GOOGLE_FONTS_COLLECTION,
				FREE_OPEN_COLLECTION,
				FONT_CATEGORY_COLLECTIONS[font.category],
				...(GOOGLE_FONTS_SHORTLIST.includes(font.family) ? [GOOGLE_FONTS_SHORTLIST_COLLECTION] : []),
			],
		};

		let additionalProperties = {};
		if (isVariable) {
			// Switch from Google’s object format to a simpler { wght: [100, 900], ital: [0, 1] } format.
			const axes = font.axes.reduce((acc, cur) => {
				acc[cur.tag] = [cur.start, cur.end];
				return acc;
			}, {});
			const hasStaticItalics = font.variants.includes('italic');
			const href = `${hrefBase}:${Object.entries(axes)
				.sort(([tagA], [tagB]) => tagB.localeCompare(tagA))
				.reduce(
					(acc, [tag, range]) => {
						// TODO: Form a string like "ital,opsz,wght@0..1,8..30,100..900" if hasVariableItalics, otherwise "ital,opsz,wght@0,8..30,100..900;1,8..30,100..900" if hasStaticItalics
					},
					[[], []]
				)}&display=block`;

			additionalProperties = {
				href,
				axes,
			};
		} else {
			const href = `${hrefBase}:ital,wght@${[regularWeights, italicWeights]
				.flatMap((arr, i) => arr.map(weight => `${i},${weight}`))
				.join(';')}&display=block`;

			additionalProperties = {
				href,
			};
		}

		return {
			...commonProperties,
			...additionalProperties,
		};
	});

export default googleFonts;

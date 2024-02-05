import {
	WEIGHTS,
	WEIGHT_SYMBOLS,
	GOOGLE_FONTS_COLLECTION,
	GOOGLE_FONTS_SHORTLIST_COLLECTION,
	FREE_OPEN_COLLECTION,
	DISPLAY_COLLECTION,
	HANDWRITING_COLLECTION,
	MONOSPACE_COLLECTION,
	SANS_SERIF_COLLECTION,
	SERIF_COLLECTION,
	VARIABLE_COLLECTION,
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
	'Martian Mono', // The local version includes various stretches.
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
		const [weights, italics] = font.variants.reduce(
			(acc, variant) => {
				const [weights, italics] = acc;
				if (variant === 'regular') weights.push(WEIGHT_SYMBOLS[400]);
				else if (variant === 'italic') italics.push(WEIGHT_SYMBOLS[400]);
				else {
					const [, weight, isItalic] = variant.match(/([0-9]+)(italic)?/);
					(isItalic ? italics : weights).push(WEIGHT_SYMBOLS[weight]);
				}
				return acc;
			},
			[[], []]
		);
		return {
			name: font.family,
			weights,
			italics,
			collections: [
				GOOGLE_FONTS_COLLECTION,
				FREE_OPEN_COLLECTION,
				FONT_CATEGORY_COLLECTIONS[font.category],
				...(font.axes ? [VARIABLE_COLLECTION] : []),
				...(GOOGLE_FONTS_SHORTLIST.includes(font.family) ? [GOOGLE_FONTS_SHORTLIST_COLLECTION] : []),
			],
			href: `https://fonts.googleapis.com/css2?family=${font.family.replace(/ /g, '+')}:ital,wght@${[weights, italics]
				.flatMap((arr, i) => arr.map(symbol => `${i},${WEIGHTS[symbol].value}`))
				.join(';')}&display=block`,
		};
	});

export default googleFonts;

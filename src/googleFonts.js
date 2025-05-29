// To reduce the size of the processed JSON, we do some last-minute processing here.
import googleFontsJson from './googleFontsProcessed.json.js';
import { generatePermutations } from './lib/utils.js';
import {
	GOOGLE_FONTS_COLLECTION,
	GOOGLE_FONTS_SHORTLIST_COLLECTION,
	FREE_OPEN_COLLECTION,
	DISPLAY_COLLECTION,
	HANDWRITING_COLLECTION,
	MONOSPACE_COLLECTION,
	SANS_SERIF_COLLECTION,
	SERIF_COLLECTION,
} from './constants.js';

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

const GOOGLE_FONTS_SHORTLIST = new Set([...TYPEWOLF_BEST_GOOGLE_FONTS, ...AWWWARDS_BEST_GOOGLE_FONTS]);

const FONT_CATEGORY_COLLECTIONS = {
	display: DISPLAY_COLLECTION,
	handwriting: HANDWRITING_COLLECTION,
	monospace: MONOSPACE_COLLECTION,
	'sans-serif': SANS_SERIF_COLLECTION,
	serif: SERIF_COLLECTION,
};

const googleFonts = googleFontsJson.map(({ category, variants, ...font }) => ({
	...font,
	collections: [
		GOOGLE_FONTS_COLLECTION,
		FREE_OPEN_COLLECTION,
		FONT_CATEGORY_COLLECTIONS[category],
		...(GOOGLE_FONTS_SHORTLIST.has(font.name) ? [GOOGLE_FONTS_SHORTLIST_COLLECTION] : []),
	],
	variants: variants.flatMap(generatePermutations),
}));

export default googleFonts;

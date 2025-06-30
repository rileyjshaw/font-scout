import {
	WEIGHT_MIN,
	WEIGHT_THIN,
	WEIGHT_EXTRA_LIGHT,
	WEIGHT_LIGHT,
	WEIGHT_REGULAR,
	WEIGHT_BOOK,
	WEIGHT_MEDIUM,
	WEIGHT_SEMI_BOLD,
	WEIGHT_BOLD,
	WEIGHT_ULTRA_BOLD,
	WEIGHT_BLACK,
	WEIGHT_ULTRA_BLACK,
	WEIGHT_MAX,
	ALL_CAPS_COLLECTION,
	ATIPO_COLLECTION,
	DISPLAY_COLLECTION,
	DJR_FONT_OF_THE_MONTH_COLLECTION,
	FREE_OPEN_COLLECTION,
	FRESH_FONTS_COLLECTION,
	FUTURE_FONTS_COLLECTION,
	LICENSED_COLLECTION,
	LOCAL_FONTS_COLLECTION,
	MONOSPACE_COLLECTION,
	SANS_SERIF_COLLECTION,
	SERIF_COLLECTION,
	SYSTEM_FONTS_COLLECTION,
	MULTIPLEXED_COLLECTION,
	UI_FONTS_COLLECTION,
	WIDTH_CONDENSED,
	WIDTH_EXTRA_CONDENSED,
	WIDTH_ULTRA_CONDENSED,
	WIDTH_NORMAL,
	WIDTH_SEMI_EXPANDED,
	WIDTH_EXPANDED,
	WIDTH_ULTRA_EXPANDED,
	WIDTH_SEMI_CONDENSED,
	WIDTH_EXTRA_EXPANDED,
} from './constants.js';
import { generatePermutations } from './lib/utils.js';

const atipoFonts = [
	{
		name: 'Archia',
		variants: generatePermutations({
			weight: [WEIGHT_THIN, WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_SEMI_BOLD, WEIGHT_BOLD],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Argesta Display',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
			italic: [0, 1],
		}),
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Argesta Hairline',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
			italic: [0, 1],
		}),
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Argesta Headline',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
			italic: [0, 1],
		}),
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Bariol',
		variants: generatePermutations({
			weight: [WEIGHT_THIN, WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_BOLD],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Bariol Serif',
		variants: generatePermutations({
			weight: [WEIGHT_THIN, WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_BOLD],
			italic: [0, 1],
		}),
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Basier Circle',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_SEMI_BOLD, WEIGHT_BOLD],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Basier Circle Mono',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_SEMI_BOLD, WEIGHT_BOLD],
			italic: [0, 1],
		}),
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Basier Square',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_SEMI_BOLD, WEIGHT_BOLD],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Basier Square Mono',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_SEMI_BOLD, WEIGHT_BOLD],
			italic: [0, 1],
		}),
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Bould',
		variants: generatePermutations({
			weight: [
				WEIGHT_THIN,
				WEIGHT_EXTRA_LIGHT,
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_MEDIUM,
				WEIGHT_SEMI_BOLD,
				WEIGHT_BOLD,
			],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Calendas Plus',
		variants: [
			...generatePermutations({
				weight: [WEIGHT_REGULAR],
				italic: [0, 1],
			}),
			...generatePermutations({
				weight: [WEIGHT_BOLD],
			}),
		],
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Cassannet Plus',
		variants: generatePermutations({
			weight: [WEIGHT_THIN, WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_BOLD, WEIGHT_BLACK, WEIGHT_ULTRA_BLACK],
		}),
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Chaney',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
			width: [WIDTH_NORMAL, WIDTH_SEMI_EXPANDED, WIDTH_EXPANDED, WIDTH_ULTRA_EXPANDED],
		}),
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Geomanist',
		variants: generatePermutations({
			weight: [
				WEIGHT_THIN,
				WEIGHT_EXTRA_LIGHT,
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_BOOK,
				WEIGHT_MEDIUM,
				WEIGHT_BOLD,
				WEIGHT_BLACK,
				WEIGHT_ULTRA_BLACK,
			],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Knile',
		variants: generatePermutations({
			weight: [
				WEIGHT_THIN,
				WEIGHT_EXTRA_LIGHT,
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_MEDIUM,
				WEIGHT_SEMI_BOLD,
				WEIGHT_BOLD,
				WEIGHT_BLACK,
			],
			italic: [0, 1],
		}),
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'MUSETTA',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
		}),
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Noway',
		variants: generatePermutations({
			weight: [WEIGHT_THIN, WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_BOLD],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Noway Round',
		variants: generatePermutations({
			weight: [WEIGHT_THIN, WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_BOLD],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'PARKING',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
		}),
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Salome',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
			italic: [0, 1],
		}),
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Salome Deco',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
		}),
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Salome Fine',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
			italic: [0, 1],
		}),
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Salome Stencil',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
			italic: [0, 1],
		}),
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Sawton Bauhaus',
		variants: generatePermutations({
			weight: [WEIGHT_THIN, WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_BOLD],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Sawton Circular',
		variants: generatePermutations({
			weight: [WEIGHT_THIN, WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_BOLD],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Sawton Industrial',
		variants: generatePermutations({
			weight: [WEIGHT_THIN, WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_BOLD],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Scilla',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
			width: [WIDTH_NORMAL, WIDTH_CONDENSED],
			italic: [0, 1],
		}),
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Silka',
		variants: generatePermutations({
			weight: [
				WEIGHT_THIN,
				WEIGHT_EXTRA_LIGHT,
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_MEDIUM,
				WEIGHT_SEMI_BOLD,
				WEIGHT_BOLD,
				WEIGHT_BLACK,
			],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Silka Mono',
		variants: generatePermutations({
			weight: [
				WEIGHT_THIN,
				WEIGHT_EXTRA_LIGHT,
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_MEDIUM,
				WEIGHT_SEMI_BOLD,
				WEIGHT_BOLD,
				WEIGHT_BLACK,
			],
			italic: [0, 1],
		}),
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Strawford',
		variants: generatePermutations({
			weight: [WEIGHT_THIN, WEIGHT_EXTRA_LIGHT, WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_BOLD, WEIGHT_BLACK],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Wotfard',
		variants: generatePermutations({
			weight: [
				WEIGHT_THIN,
				WEIGHT_EXTRA_LIGHT,
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_MEDIUM,
				WEIGHT_SEMI_BOLD,
				WEIGHT_BOLD,
			],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
].map(font => ({
	...font,
	collections: [...(font.collections ?? []), ATIPO_COLLECTION, LICENSED_COLLECTION],
}));

const djrFontOfTheMonth = [
	{
		name: 'Job Clarendon',
		variants: generatePermutations({
			weight: [WEIGHT_THIN],
			width: [WIDTH_CONDENSED, WIDTH_EXTRA_CONDENSED, WIDTH_ULTRA_CONDENSED],
		}),
		collections: [SANS_SERIF_COLLECTION, DISPLAY_COLLECTION],
	},
	{
		name: 'Megazoid',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
		}),
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Megazoid Fill',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
		}),
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Megazoid Shade Left',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
		}),
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Megazoid Shade Right',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
		}),
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Nickel',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
		}),
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Nickel Gothic',
		isVariable: true,
		variants: generatePermutations({
			width: [[WIDTH_NORMAL, WIDTH_EXTRA_EXPANDED]],
		}),
		collections: [SANS_SERIF_COLLECTION, DISPLAY_COLLECTION],
	},
	{
		name: 'Nickel Open Face',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
		}),
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Output Sans 2 Beta',
		isVariable: true,
		variants: generatePermutations({
			weight: [[WEIGHT_MIN, WEIGHT_ULTRA_BOLD]],
			width: [[WIDTH_CONDENSED, WIDTH_EXPANDED]],
		}),
		axes: {
			opsz: ['Optical Size', 10, 48, 48],
			slnt: ['Slant', -13, 0, 0],
			GRAD: ['Grade', 0, 10, 0],
			TERM: ['Terminals', -1, 1, 0],
		},
		collections: [SANS_SERIF_COLLECTION, UI_FONTS_COLLECTION],
	},
	{
		name: 'Pomfret',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
		}),
		collections: [SERIF_COLLECTION, DISPLAY_COLLECTION],
	},
	{
		name: 'Roslindale Extended',
		isVariable: true,
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
			width: [[80, WIDTH_EXTRA_EXPANDED]],
		}),
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Warbler Text',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
			italic: [0, 1],
		}),
		collections: [SERIF_COLLECTION],
	},
].map(font => ({
	...font,
	collections: [...(font.collections ?? []), DJR_FONT_OF_THE_MONTH_COLLECTION, LICENSED_COLLECTION],
}));

const freeOpenFonts = [
	{
		name: 'Apfel Grotezk',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_BOLD],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Apfel Grotezk Brukt',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
		}),
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'AUTHENTIC Sans',
		variants: generatePermutations({
			weight: [WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_BOLD, WEIGHT_BLACK],
			width: [WIDTH_NORMAL, WIDTH_CONDENSED],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Bagnard',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
		}),
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Blackout 2AM',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
		}),
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Blackout Midnight',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
		}),
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Blackout Sunrise',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
		}),
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Butler',
		variants: generatePermutations({
			weight: [
				WEIGHT_EXTRA_LIGHT,
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_MEDIUM,
				WEIGHT_BOLD,
				WEIGHT_ULTRA_BOLD,
				WEIGHT_BLACK,
			],
		}),
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Butler Stencil',
		variants: generatePermutations({
			weight: [
				WEIGHT_EXTRA_LIGHT,
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_MEDIUM,
				WEIGHT_BOLD,
				WEIGHT_ULTRA_BOLD,
				WEIGHT_BLACK,
			],
		}),
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Cooper Hewitt',
		variants: generatePermutations({
			weight: [WEIGHT_THIN, WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_SEMI_BOLD, WEIGHT_BOLD, WEIGHT_BLACK],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Golos UI',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_SEMI_BOLD, WEIGHT_BOLD],
		}),
		collections: [SANS_SERIF_COLLECTION, UI_FONTS_COLLECTION, MULTIPLEXED_COLLECTION],
	},
	{
		name: 'Junction',
		variants: generatePermutations({
			weight: [WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_BOLD],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'League Mono',
		variants: generatePermutations({
			weight: [
				WEIGHT_THIN,
				WEIGHT_EXTRA_LIGHT,
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_MEDIUM,
				WEIGHT_SEMI_BOLD,
				WEIGHT_BOLD,
				WEIGHT_ULTRA_BOLD,
			],
			width: [WIDTH_NORMAL, WIDTH_CONDENSED, WIDTH_SEMI_CONDENSED, WIDTH_SEMI_EXPANDED, WIDTH_EXPANDED],
		}),
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Liberation Mono',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_BOLD],
			italic: [0, 1],
		}),
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Liberation Sans',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_BOLD],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Liberation Serif',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_BOLD],
			italic: [0, 1],
		}),
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Metropolis',
		variants: generatePermutations({
			weight: [
				WEIGHT_THIN,
				WEIGHT_EXTRA_LIGHT,
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_MEDIUM,
				WEIGHT_SEMI_BOLD,
				WEIGHT_BOLD,
				WEIGHT_ULTRA_BOLD,
				WEIGHT_BLACK,
			],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Open Sauce One',
		variants: generatePermutations({
			weight: [
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_MEDIUM,
				WEIGHT_SEMI_BOLD,
				WEIGHT_BOLD,
				WEIGHT_ULTRA_BOLD,
				WEIGHT_BLACK,
			],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Open Sauce Sans',
		variants: generatePermutations({
			weight: [
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_MEDIUM,
				WEIGHT_SEMI_BOLD,
				WEIGHT_BOLD,
				WEIGHT_ULTRA_BOLD,
				WEIGHT_BLACK,
			],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Open Sauce Two',
		variants: generatePermutations({
			weight: [
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_MEDIUM,
				WEIGHT_SEMI_BOLD,
				WEIGHT_BOLD,
				WEIGHT_ULTRA_BOLD,
				WEIGHT_BLACK,
			],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'PT Root UI',
		variants: generatePermutations({
			weight: [WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_SEMI_BOLD, WEIGHT_BOLD],
		}),
		collections: [SANS_SERIF_COLLECTION, UI_FONTS_COLLECTION],
	},
	{
		name: 'Satoshi',
		isVariable: true,
		variants: generatePermutations({
			weight: [[WEIGHT_LIGHT, WEIGHT_BLACK]],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION, UI_FONTS_COLLECTION],
	},
	{
		name: 'SuperDuper',
		variants: generatePermutations({
			weight: [WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_BOLD],
		}),
		collections: [SANS_SERIF_COLLECTION, DISPLAY_COLLECTION],
	},
	{
		name: 'Victor Mono',
		variants: generatePermutations({
			weight: [
				WEIGHT_THIN,
				WEIGHT_EXTRA_LIGHT,
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_MEDIUM,
				WEIGHT_SEMI_BOLD,
				WEIGHT_BOLD,
			],
			italic: [0, 1],
			oblique: [0, 1],
		}),
		collections: [MONOSPACE_COLLECTION],
	},
].map(font => ({
	...font,
	collections: [...(font.collections ?? []), FREE_OPEN_COLLECTION],
}));

const systemFonts = [
	{
		name: 'Times New Roman',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_BOLD],
			italic: [0, 1],
		}),
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Georgia',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_BOLD],
			italic: [0, 1],
		}),
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Charter',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_BOLD, WEIGHT_BLACK],
			italic: [0, 1],
		}),
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Palatino',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_BOLD],
			italic: [0, 1],
		}),
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Arial',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_BOLD],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Verdana',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_BOLD],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Tahoma',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_BOLD],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Trebuchet MS',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_BOLD],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Courier New',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_BOLD],
			italic: [0, 1],
		}),
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Arial Black',
		variants: generatePermutations({
			weight: [WEIGHT_BOLD],
		}),
		collections: [DISPLAY_COLLECTION],
	},
].map(font => ({
	...font,
	collections: [...(font.collections ?? []), SYSTEM_FONTS_COLLECTION],
}));

const otherLicensedFonts = [
	{
		name: 'Acorn',
		isVariable: true,
		variants: generatePermutations({
			weight: [[WEIGHT_THIN, WEIGHT_BOLD]],
		}),
		collections: [DISPLAY_COLLECTION, SANS_SERIF_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'ALT Riviera',
		isVariable: true,
		variants: generatePermutations({
			weight: [[WEIGHT_EXTRA_LIGHT, WEIGHT_ULTRA_BOLD]],
		}),
		collections: [SANS_SERIF_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'AUTHENTIC Classified',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
		}),
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Bureau Serif',
		variants: generatePermutations({
			weight: [WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_SEMI_BOLD, WEIGHT_BOLD],
			italic: [0, 1],
		}),
		collections: [SERIF_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Cabrio',
		isVariable: true,
		variants: generatePermutations({
			weight: [[WEIGHT_LIGHT, WEIGHT_ULTRA_BLACK]],
		}),
		collections: [SANS_SERIF_COLLECTION, FRESH_FONTS_COLLECTION, UI_FONTS_COLLECTION],
	},
	{
		name: 'Cartograph CF',
		variants: generatePermutations({
			weight: [
				WEIGHT_THIN,
				WEIGHT_EXTRA_LIGHT,
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_SEMI_BOLD,
				WEIGHT_BOLD,
				WEIGHT_ULTRA_BOLD,
				WEIGHT_BLACK,
			],
			italic: [0, 1],
		}),
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Def Sans',
		isVariable: true,
		variants: generatePermutations({
			weight: [[WEIGHT_THIN, WEIGHT_BLACK]],
			width: [[WIDTH_CONDENSED, WIDTH_NORMAL]],
		}),
		axes: {
			slnt: ['Slant', -8, 0, 0],
		},
		collections: [SANS_SERIF_COLLECTION, UI_FONTS_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Easy Grotesk',
		isVariable: true,
		variants: generatePermutations({
			weight: [[WEIGHT_EXTRA_LIGHT, WEIGHT_BLACK]],
		}),
		axes: {
			slnt: ['Slant', 0, 10],
		},
		collections: [SANS_SERIF_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Ernst',
		isVariable: true,
		variants: generatePermutations({
			weight: [[WEIGHT_THIN, WEIGHT_ULTRA_BOLD]],
			italic: [0, 1],
		}),
		collections: [SERIF_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'FL Prefere',
		isVariable: true,
		variants: generatePermutations({
			weight: [[WEIGHT_LIGHT, WEIGHT_ULTRA_BOLD]],
			italic: [0, 1],
		}),
		collections: [SERIF_COLLECTION, DISPLAY_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Gangster Grotesk',
		variants: generatePermutations({
			weight: [WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_BOLD],
		}),
		collections: [SANS_SERIF_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Gestura Text',
		isVariable: true,
		variants: generatePermutations({
			weight: [[WEIGHT_THIN, WEIGHT_BLACK]],
			italic: [0, 1],
		}),
		collections: [SERIF_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Greycliff CF',
		variants: generatePermutations({
			weight: [
				WEIGHT_THIN,
				WEIGHT_EXTRA_LIGHT,
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_MEDIUM,
				WEIGHT_SEMI_BOLD,
				WEIGHT_BOLD,
				WEIGHT_ULTRA_BOLD,
				WEIGHT_BLACK,
			],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Gosh',
		variants: generatePermutations({
			weight: [WEIGHT_BOLD],
			width: [
				WIDTH_NORMAL,
				WIDTH_EXTRA_CONDENSED,
				WIDTH_CONDENSED,
				WIDTH_SEMI_CONDENSED,
				WIDTH_EXPANDED,
				WIDTH_EXTRA_EXPANDED,
			],
		}),
		collections: [DISPLAY_COLLECTION, SANS_SERIF_COLLECTION, FUTURE_FONTS_COLLECTION],
	},
	{
		name: 'Henrietta',
		variants: [
			...generatePermutations({
				weight: [WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_SEMI_BOLD, WEIGHT_BOLD, WEIGHT_BLACK],
				width: [WIDTH_NORMAL],
				italic: [0, 1],
			}),
			...generatePermutations({
				weight: [WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_SEMI_BOLD, WEIGHT_BOLD, WEIGHT_BLACK],
				width: [WIDTH_CONDENSED],
			}),
		],
		collections: [DISPLAY_COLLECTION, SANS_SERIF_COLLECTION, FUTURE_FONTS_COLLECTION],
	},
	{
		name: 'HEX Franklin',
		isVariable: true,
		variants: generatePermutations({
			weight: [[WEIGHT_MIN, WEIGHT_MAX]],
			width: [[60, 120]],
		}),
		collections: [SANS_SERIF_COLLECTION, FUTURE_FONTS_COLLECTION, MULTIPLEXED_COLLECTION],
	},
	{
		name: 'HEX Franklin Tyght',
		isVariable: true,
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
			width: [[60, WIDTH_NORMAL]],
		}),
		axes: {
			TYTE: ['Tyght', -100, 0, -100],
			NOTC: ['Not Touching', 0, 1, 0],
		},
		collections: [SANS_SERIF_COLLECTION, FUTURE_FONTS_COLLECTION, MULTIPLEXED_COLLECTION],
	},
	{
		name: 'Hop',
		isVariable: true,
		variants: generatePermutations({
			weight: [[WEIGHT_THIN, WEIGHT_BLACK]],
		}),
		axes: {
			cstm: ['Rounded', 0, 100, 0],
		},
		collections: [SANS_SERIF_COLLECTION, DISPLAY_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Hypertext Display',
		variants: generatePermutations({
			weight: [WEIGHT_THIN, WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_BOLD, WEIGHT_BLACK],
		}),
		collections: [DISPLAY_COLLECTION, SANS_SERIF_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Integral CF',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_SEMI_BOLD, WEIGHT_BOLD, WEIGHT_ULTRA_BOLD, WEIGHT_BLACK],
			italic: [0, 1],
		}),
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Loretta',
		variants: generatePermutations({
			weight: [WEIGHT_LIGHT, WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_SEMI_BOLD, WEIGHT_BOLD, WEIGHT_ULTRA_BOLD],
			italic: [0, 1],
		}),
		collections: [SERIF_COLLECTION, FRESH_FONTS_COLLECTION, FUTURE_FONTS_COLLECTION],
	},
	{
		name: 'Louche',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_SEMI_BOLD, WEIGHT_BOLD, WEIGHT_BLACK],
		}),
		collections: [DISPLAY_COLLECTION, FRESH_FONTS_COLLECTION, FUTURE_FONTS_COLLECTION],
	},
	{
		name: 'Macabre',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR],
		}),
		collections: [DISPLAY_COLLECTION, FUTURE_FONTS_COLLECTION],
	},
	{
		name: 'Marcin Antique',
		variants: generatePermutations({
			weight: [
				WEIGHT_THIN,
				WEIGHT_EXTRA_LIGHT,
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_BOOK,
				WEIGHT_MEDIUM,
				WEIGHT_SEMI_BOLD,
				WEIGHT_BOLD,
				WEIGHT_ULTRA_BOLD,
				WEIGHT_BLACK,
				WEIGHT_ULTRA_BLACK,
			],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION, FRESH_FONTS_COLLECTION, FUTURE_FONTS_COLLECTION],
	},
	{
		name: 'McQueen',
		variants: generatePermutations({
			weight: [
				WEIGHT_EXTRA_LIGHT,
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_MEDIUM,
				WEIGHT_SEMI_BOLD,
				WEIGHT_BOLD,
				WEIGHT_ULTRA_BOLD,
				WEIGHT_BLACK,
				WEIGHT_ULTRA_BLACK,
			],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION, DISPLAY_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'MD Nichrome',
		isVariable: true,
		variants: generatePermutations({
			weight: [[WEIGHT_THIN, WEIGHT_BLACK]],
		}),
		axes: {
			slnt: ['Slant', -10, 0, 0],
		},
		collections: [SANS_SERIF_COLLECTION, DISPLAY_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Metra',
		variants: generatePermutations({
			weight: [WEIGHT_REGULAR, WEIGHT_MEDIUM, WEIGHT_BOLD, WEIGHT_ULTRA_BOLD, WEIGHT_BLACK, WEIGHT_ULTRA_BLACK],
		}),
		collections: [SANS_SERIF_COLLECTION, FRESH_FONTS_COLLECTION, FUTURE_FONTS_COLLECTION],
	},
	{
		name: 'Micrograph',
		isVariable: true,
		variants: generatePermutations({
			weight: [[WEIGHT_THIN, WEIGHT_ULTRA_BOLD]],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION, FRESH_FONTS_COLLECTION, UI_FONTS_COLLECTION],
	},
	{
		name: 'Mint Grotesk',
		variants: generatePermutations({
			weight: [
				WEIGHT_THIN,
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_MEDIUM,
				WEIGHT_BOLD,
				WEIGHT_ULTRA_BOLD,
				WEIGHT_BLACK,
				WEIGHT_ULTRA_BLACK,
			],
			italic: [0, 1],
		}),
		collections: [SERIF_COLLECTION, FRESH_FONTS_COLLECTION, FUTURE_FONTS_COLLECTION],
	},
	{
		name: 'Mint Grotesk Display',
		variants: generatePermutations({
			weight: [
				WEIGHT_THIN,
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_MEDIUM,
				WEIGHT_BOLD,
				WEIGHT_ULTRA_BOLD,
				WEIGHT_BLACK,
				WEIGHT_ULTRA_BLACK,
			],
			italic: [0, 1],
		}),
		collections: [DISPLAY_COLLECTION, SERIF_COLLECTION, FRESH_FONTS_COLLECTION, FUTURE_FONTS_COLLECTION],
	},
	{
		name: 'Nicephore',
		isVariable: true,
		variants: generatePermutations({
			weight: [[0, WEIGHT_MAX]],
		}),
		collections: [DISPLAY_COLLECTION, SERIF_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Peridot PE',
		isVariable: true,
		variants: generatePermutations({
			weight: [[WEIGHT_THIN, WEIGHT_ULTRA_BLACK]],
			width: [[WIDTH_ULTRA_CONDENSED, WIDTH_EXTRA_EXPANDED]],
		}),
		axes: {
			ital: ['Italic', 0, 1, 0],
		},
		collections: [SANS_SERIF_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Protest Grotesk',
		variants: generatePermutations({
			weight: [
				WEIGHT_THIN,
				WEIGHT_LIGHT,
				WEIGHT_REGULAR,
				WEIGHT_BOOK,
				WEIGHT_MEDIUM,
				WEIGHT_BOLD,
				WEIGHT_ULTRA_BOLD,
				WEIGHT_BLACK,
			],
			italic: [0, 1],
		}),
		collections: [SANS_SERIF_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Quasar',
		isVariable: true,
		variants: generatePermutations({
			weight: [[10, 180]],
		}),
		collections: [DISPLAY_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'SFT Schrifted Serif',
		isVariable: true,
		variants: generatePermutations({
			weight: [[WEIGHT_EXTRA_LIGHT, WEIGHT_BLACK]],
			italic: [0, 1],
		}),
		axes: {
			opsz: ['Optical Size', 12, 36, 24],
		},
		collections: [SERIF_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Softcore',
		isVariable: true,
		variants: generatePermutations({
			weight: [[10, WEIGHT_MAX]],
			italic: [0, 1],
		}),
		collections: [SERIF_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Ufficio Display',
		isVariable: true,
		variants: generatePermutations({
			weight: [[WEIGHT_LIGHT, WEIGHT_BLACK]],
		}),
		collections: [DISPLAY_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Ufficio Sans',
		isVariable: true,
		variants: generatePermutations({
			weight: [[WEIGHT_LIGHT, WEIGHT_BLACK]],
		}),
		collections: [SANS_SERIF_COLLECTION, FRESH_FONTS_COLLECTION],
	},
].map(font => ({
	...font,
	collections: [...(font.collections ?? []), LICENSED_COLLECTION],
}));

const localFonts = [...atipoFonts, ...djrFontOfTheMonth, ...freeOpenFonts, ...systemFonts, ...otherLicensedFonts].map(
	font => ({
		...font,
		collections: [...(font.collections ?? []), LOCAL_FONTS_COLLECTION],
	})
);

export default localFonts;

import {
	THIN,
	EXTRA_LIGHT,
	LIGHT,
	REGULAR,
	BOOK,
	MEDIUM,
	SEMI_BOLD,
	BOLD,
	ULTRA_BOLD,
	BLACK,
	ULTRA_BLACK,
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
	VARIABLE_COLLECTION,
	MULTIPLEXED_COLLECTION,
	UI_FONTS_COLLECTION,
} from './constants.js';

const atipoFonts = [
	{
		name: 'Archia',
		regularWeights: [THIN, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Argesta Display',
		regularWeights: [REGULAR],
		italicWeights: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Argesta Hairline',
		regularWeights: [REGULAR],
		italicWeights: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Argesta Headline',
		regularWeights: [REGULAR],
		italicWeights: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Bariol',
		regularWeights: [THIN, LIGHT, REGULAR, BOLD],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Bariol Serif',
		regularWeights: [THIN, LIGHT, REGULAR, BOLD],
		italicWeights: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Basier Circle',
		regularWeights: [REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Basier Circle Mono',
		regularWeights: [REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		italicWeights: true,
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Basier Square',
		regularWeights: [REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Basier Square Mono',
		regularWeights: [REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		italicWeights: true,
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Bould',
		regularWeights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Calendas Plus',
		regularWeights: [REGULAR, BOLD],
		italicWeights: [REGULAR],
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Cassannet Plus',
		regularWeights: [THIN, LIGHT, REGULAR, BOLD, BLACK, ULTRA_BLACK],
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Chaney',
		regularWeights: [REGULAR],
		stretches: {
			[REGULAR]: {
				values: ['semi-expanded', 'expanded', 'ultra-expanded'],
			},
		},
		aliases: {
			'semi-expanded': 'wide',
		},
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Geomanist',
		regularWeights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, BOOK, MEDIUM, BOLD, BLACK, ULTRA_BLACK],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Knile',
		regularWeights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, BLACK],
		italicWeights: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'MUSETTA',
		regularWeights: [REGULAR],
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Noway',
		regularWeights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Noway Round',
		regularWeights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'PARKING',
		regularWeights: [REGULAR],
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Salome',
		regularWeights: [REGULAR],
		italicWeights: true,
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Salome Deco',
		regularWeights: [REGULAR],
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Salome Fine',
		regularWeights: [REGULAR],
		italicWeights: true,
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Salome Stencil',
		regularWeights: [REGULAR],
		italicWeights: true,
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Sawton Bauhaus',
		regularWeights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD],
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Sawton Circular',
		regularWeights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD],
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Sawton Industrial',
		regularWeights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD],
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Scilla',
		regularWeights: [REGULAR],
		italicWeights: true,
		stretches: {
			[REGULAR]: {
				values: ['condensed'],
				italicWeights: true,
			},
		},
		aliases: {
			condensed: 'narrow',
			'italic condensed': 'italic narrow',
		},
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Silka',
		regularWeights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, BLACK],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Silka Mono',
		regularWeights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, BLACK],
		italicWeights: true,
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Strawford',
		regularWeights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, BOLD, BLACK],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Wotfard',
		regularWeights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
].map(font => ({
	...font,
	collections: [...(font.collections ?? []), ATIPO_COLLECTION, LICENSED_COLLECTION],
}));

const djrFontOfTheMonth = [
	{
		name: 'Job Clarendon',
		regularWeights: [],
		stretches: {
			[THIN]: {
				values: ['condensed', 'extra-condensed', 'ultra-condensed'],
			},
		},
		collections: [SANS_SERIF_COLLECTION, DISPLAY_COLLECTION],
	},
	{
		name: 'Megazoid',
		regularWeights: [REGULAR],
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Megazoid Fill',
		regularWeights: [REGULAR],
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Megazoid Shade Left',
		regularWeights: [REGULAR],
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Megazoid Shade Right',
		regularWeights: [REGULAR],
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Nickel',
		regularWeights: [REGULAR],
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Nickel Gothic',
		regularWeights: [REGULAR],
		stretches: {
			[REGULAR]: {
				values: ['semi-expanded', 'expanded'],
			},
		},
		collections: [SANS_SERIF_COLLECTION, DISPLAY_COLLECTION],
	},
	{
		name: 'Nickel Gothic Variable',
		regularWeights: [REGULAR],
		stretches: {
			[REGULAR]: {
				values: ['expanded', 'ultra-expanded'],
			},
		},
		collections: [SANS_SERIF_COLLECTION, DISPLAY_COLLECTION, VARIABLE_COLLECTION],
	},
	{
		name: 'Nickel Open Face',
		regularWeights: [REGULAR],
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Output Sans 2 Beta',
		regularWeights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, BOOK, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION, VARIABLE_COLLECTION, UI_FONTS_COLLECTION],
	},
	{
		name: 'Pomfret',
		regularWeights: [REGULAR],
		collections: [SERIF_COLLECTION, DISPLAY_COLLECTION],
	},
	{
		name: 'Roslindale Extended',
		regularWeights: [REGULAR],
		stretches: {
			[REGULAR]: {
				values: ['expanded'],
			},
		},
		aliases: {
			_font: 'Roslindale',
			_regular: 'Wide',
			expanded: 'Extended',
		},
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Roslindale Extended Variable',
		regularWeights: [REGULAR],
		collections: [DISPLAY_COLLECTION, VARIABLE_COLLECTION],
	},
	{
		name: 'Warbler Text',
		regularWeights: [REGULAR],
		italicWeights: true,
		collections: [SERIF_COLLECTION],
	},
].map(font => ({
	...font,
	collections: [...(font.collections ?? []), DJR_FONT_OF_THE_MONTH_COLLECTION, LICENSED_COLLECTION],
}));

const freeOpenFonts = [
	{
		name: 'Apfel Grotezk',
		regularWeights: [REGULAR, BOLD],
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Apfel Grotezk Brukt',
		regularWeights: [REGULAR],
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'AUTHENTIC Sans',
		regularWeights: [LIGHT, REGULAR, BOLD, BLACK],
		stretches: [LIGHT, REGULAR, BOLD, BLACK].reduce((acc, weight) => {
			acc[weight] = {
				values: ['condensed'],
			};
			return acc;
		}, {}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Bagnard',
		regularWeights: [REGULAR],
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Blackout 2AM',
		regularWeights: [REGULAR],
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Blackout Midnight',
		regularWeights: [REGULAR],
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Blackout Sunrise',
		regularWeights: [REGULAR],
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Butler',
		regularWeights: [EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, BOLD, ULTRA_BOLD, BLACK],
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Butler Stencil',
		regularWeights: [EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, BOLD, ULTRA_BOLD, BLACK],
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Cooper Hewitt',
		regularWeights: [THIN, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, BLACK],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Golos UI',
		regularWeights: [REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		collections: [SANS_SERIF_COLLECTION, UI_FONTS_COLLECTION, MULTIPLEXED_COLLECTION],
	},
	{
		name: 'Junction',
		regularWeights: [LIGHT, REGULAR, BOLD],
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'League Mono',
		regularWeights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD],
		stretches: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD].reduce((acc, weight) => {
			acc[weight] = {
				values: ['condensed', 'semi-condensed', 'semi-expanded', 'expanded'],
			};
			return acc;
		}, {}),
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Liberation Mono',
		regularWeights: [REGULAR, BOLD],
		italicWeights: true,
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Liberation Sans',
		regularWeights: [REGULAR, BOLD],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Liberation Serif',
		regularWeights: [REGULAR, BOLD],
		italicWeights: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Martian Mono',
		regularWeights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, BOLD, ULTRA_BOLD],
		stretches: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, BOLD, ULTRA_BOLD].reduce((acc, weight) => {
			acc[weight] = {
				values: ['condensed', 'semi-condensed', 'expanded'],
			};
			return acc;
		}, {}),
		collections: [MONOSPACE_COLLECTION, VARIABLE_COLLECTION],
	},
	{
		name: 'Metropolis',
		regularWeights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Open Sauce One',
		regularWeights: [LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Open Sauce Sans',
		regularWeights: [LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Open Sauce Two',
		regularWeights: [LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'PT Root UI',
		regularWeights: [LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		collections: [SANS_SERIF_COLLECTION, UI_FONTS_COLLECTION, MULTIPLEXED_COLLECTION],
	},
	{
		name: 'SuperDuper',
		regularWeights: [LIGHT, REGULAR, MEDIUM, BOLD],
		collections: [SANS_SERIF_COLLECTION, DISPLAY_COLLECTION],
	},
	{
		name: 'Victor Mono',
		regularWeights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		italicWeights: true,
		obliqueWeights: true,
		collections: [MONOSPACE_COLLECTION],
	},
].map(font => ({
	...font,
	collections: [...(font.collections ?? []), FREE_OPEN_COLLECTION],
}));

const systemFonts = [
	{
		name: 'Times New Roman',
		regularWeights: [REGULAR, BOLD],
		italicWeights: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Georgia',
		regularWeights: [REGULAR, BOLD],
		italicWeights: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Charter',
		regularWeights: [REGULAR, BOLD, BLACK],
		italicWeights: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Palatino',
		regularWeights: [REGULAR, BOLD],
		italicWeights: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Arial',
		regularWeights: [REGULAR, BOLD],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Verdana',
		regularWeights: [REGULAR, BOLD],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Tahoma',
		regularWeights: [REGULAR, BOLD],
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Trebuchet MS',
		regularWeights: [REGULAR, BOLD],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Courier New',
		regularWeights: [REGULAR, BOLD],
		italicWeights: true,
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Arial Black',
		regularWeights: [BOLD],
		collections: [DISPLAY_COLLECTION],
	},
].map(font => ({
	...font,
	collections: [...(font.collections ?? []), SYSTEM_FONTS_COLLECTION],
}));

const otherLicensedFonts = [
	{
		name: 'Acorn',
		regularWeights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		collections: [DISPLAY_COLLECTION, SANS_SERIF_COLLECTION, VARIABLE_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'ALT Riviera',
		regularWeights: [EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, BOLD, ULTRA_BOLD],
		collections: [SANS_SERIF_COLLECTION, VARIABLE_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'AUTHENTIC Classified',
		regularWeights: [REGULAR],
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Cartograph CF',
		regularWeights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		italicWeights: true,
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Def Sans',
		regularWeights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		italicWeights: true,
		stretches: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK].reduce((acc, weight) => {
			acc[weight] = {
				values: ['condensed'],
				italicWeights: true,
			};
			return acc;
		}, {}),
		collections: [SANS_SERIF_COLLECTION, UI_FONTS_COLLECTION, VARIABLE_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Gestura Text',
		regularWeights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, SEMI_BOLD, BOLD, BLACK],
		italicWeights: true,
		collections: [SERIF_COLLECTION, VARIABLE_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Greycliff CF',
		regularWeights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Gosh',
		regularWeights: [BOLD],
		collections: [DISPLAY_COLLECTION, SANS_SERIF_COLLECTION, FUTURE_FONTS_COLLECTION],
	},
	{
		name: 'Henrietta',
		regularWeights: [LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, BLACK],
		italicWeights: true,
		collections: [DISPLAY_COLLECTION, SANS_SERIF_COLLECTION, FUTURE_FONTS_COLLECTION],
		stretches: [LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, BLACK].reduce((acc, weight) => {
			acc[weight] = {
				values: ['condensed'],
			};
			return acc;
		}, {}),
	},
	{
		name: 'HEX Franklin',
		regularWeights: [REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		stretches: [REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK].reduce((acc, weight) => {
			acc[weight] = {
				values: ['semi-condensed', 'condensed', 'extra-condensed'],
			};
			return acc;
		}, {}),
		collections: [SANS_SERIF_COLLECTION, VARIABLE_COLLECTION, FUTURE_FONTS_COLLECTION, MULTIPLEXED_COLLECTION],
	},
	{
		name: 'Hop Rounded',
		regularWeights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD, BLACK, ULTRA_BLACK],
		collections: [SANS_SERIF_COLLECTION, DISPLAY_COLLECTION, VARIABLE_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Hop Standard',
		regularWeights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD, BLACK, ULTRA_BLACK],
		collections: [SANS_SERIF_COLLECTION, DISPLAY_COLLECTION, VARIABLE_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Hypertext Display',
		regularWeights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD, BLACK],
		collections: [DISPLAY_COLLECTION, SANS_SERIF_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Integral CF',
		regularWeights: [REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		italicWeights: true,
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Loretta',
		regularWeights: [LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD],
		italicWeights: true,
		collections: [SERIF_COLLECTION, FRESH_FONTS_COLLECTION, FUTURE_FONTS_COLLECTION],
	},
	{
		name: 'Louche',
		regularWeights: [REGULAR, MEDIUM, SEMI_BOLD, BOLD, BLACK],
		collections: [DISPLAY_COLLECTION, FRESH_FONTS_COLLECTION, FUTURE_FONTS_COLLECTION],
	},
	{
		name: 'Macabre',
		regularWeights: [REGULAR],
		collections: [DISPLAY_COLLECTION, FUTURE_FONTS_COLLECTION],
	},
	{
		name: 'McQueen',
		regularWeights: [EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK, ULTRA_BLACK],
		italicWeights: true,
		collections: [SANS_SERIF_COLLECTION, DISPLAY_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Mint Grotesk',
		regularWeights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD, ULTRA_BOLD, BLACK, ULTRA_BLACK],
		italicWeights: true,
		collections: [SERIF_COLLECTION, FRESH_FONTS_COLLECTION, FUTURE_FONTS_COLLECTION],
	},
	{
		name: 'Mint Grotesk Display',
		regularWeights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD, ULTRA_BOLD, BLACK, ULTRA_BLACK],
		italicWeights: true,
		collections: [DISPLAY_COLLECTION, SERIF_COLLECTION, FRESH_FONTS_COLLECTION, FUTURE_FONTS_COLLECTION],
	},
	{
		name: 'Nicephore',
		regularWeights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD, ULTRA_BOLD, BLACK, ULTRA_BLACK],
		collections: [DISPLAY_COLLECTION, SERIF_COLLECTION, VARIABLE_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Peridot PE',
		regularWeights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK, ULTRA_BLACK],
		italicWeights: true,
		stretches: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK, ULTRA_BLACK].reduce(
			(acc, weight) => {
				acc[weight] = {
					values: ['expanded', 'semi-expanded', 'semi-condensed', 'condensed', 'extra-condensed'],
					italicWeights: true,
				};
				return acc;
			},
			{}
		),
		collections: [SANS_SERIF_COLLECTION, VARIABLE_COLLECTION, FRESH_FONTS_COLLECTION],
	},
	{
		name: 'Protest Grotesk',
		regularWeights: [THIN, LIGHT, REGULAR, BOOK, MEDIUM, BOLD, ULTRA_BOLD, BLACK],
		italicWeights: true,
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

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
	FUTURE_FONTS_COLLECTION,
	LICENSED_COLLECTION,
	LOCAL_FONTS_COLLECTION,
	MONOSPACE_COLLECTION,
	SANS_SERIF_COLLECTION,
	SERIF_COLLECTION,
	SYSTEM_FONTS_COLLECTION,
	VARIABLE_COLLECTION,
} from './constants.js';

const atipoFonts = [
	{
		name: 'Archia',
		weights: [THIN, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		italics: false,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Argesta Display',
		weights: [REGULAR],
		italics: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Argesta Hairline',
		weights: [REGULAR],
		italics: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Argesta Headline',
		weights: [REGULAR],
		italics: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Bariol',
		weights: [THIN, LIGHT, REGULAR, BOLD],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Bariol Serif',
		weights: [THIN, LIGHT, REGULAR, BOLD],
		italics: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Basier Circle',
		weights: [REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Basier Circle Mono',
		weights: [REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		italics: true,
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Basier Square',
		weights: [REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Basier Square Mono',
		weights: [REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		italics: true,
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Bould',
		weights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Calendas Plus',
		weights: [REGULAR, BOLD],
		italics: [REGULAR],
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Cassannet Plus',
		weights: [THIN, LIGHT, REGULAR, BOLD, BLACK, ULTRA_BLACK],
		italics: false,
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Chaney',
		weights: [REGULAR],
		italics: false,
		stretches: {
			[REGULAR]: {
				values: ['semi-expanded', 'expanded', 'ultra-expanded'],
				italics: false,
			},
		},
		aliases: {
			'semi-expanded': 'wide',
		},
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Geomanist',
		weights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, BOOK, MEDIUM, BOLD, BLACK, ULTRA_BLACK],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Knile',
		weights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, BLACK],
		italics: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'MUSETTA',
		weights: [REGULAR],
		italics: false,
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Noway',
		weights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Noway Round',
		weights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'PARKING',
		weights: [REGULAR],
		italics: false,
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Salome',
		weights: [REGULAR],
		italics: true,
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Salome Deco',
		weights: [REGULAR],
		italics: false,
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Salome Fine',
		weights: [REGULAR],
		italics: true,
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Salome Stencil',
		weights: [REGULAR],
		italics: true,
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Sawton Bauhaus',
		weights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD],
		italics: false,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Sawton Circular',
		weights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD],
		italics: false,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Sawton Industrial',
		weights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD],
		italics: false,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Scilla',
		weights: [REGULAR],
		italics: true,
		stretches: {
			[REGULAR]: {
				values: ['condensed'],
				italics: true,
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
		weights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, BLACK],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Silka Mono',
		weights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, BLACK],
		italics: true,
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Strawford',
		weights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, BOLD, BLACK],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Wotfard',
		weights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
].map(font => ({
	...font,
	collections: [...(font.collections ?? []), ATIPO_COLLECTION, LICENSED_COLLECTION],
}));

const djrFontOfTheMonth = [
	{
		name: 'Megazoid',
		weights: [REGULAR],
		italics: false,
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Megazoid Fill',
		weights: [REGULAR],
		italics: false,
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Megazoid Shade Left',
		weights: [REGULAR],
		italics: false,
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Megazoid Shade Right',
		weights: [REGULAR],
		italics: false,
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Nickel',
		weights: [REGULAR],
		italics: false,
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Nickel Gothic',
		weights: [REGULAR],
		italics: false,
		stretches: {
			[REGULAR]: {
				values: ['semi-expanded', 'expanded'],
				italics: false,
			},
		},
		collections: [SANS_SERIF_COLLECTION, DISPLAY_COLLECTION],
	},
	{
		name: 'Nickel Gothic Variable',
		weights: [REGULAR],
		italics: false,
		stretches: {
			[REGULAR]: {
				values: ['expanded', 'ultra-expanded'],
				italics: false,
			},
		},
		collections: [SANS_SERIF_COLLECTION, DISPLAY_COLLECTION, VARIABLE_COLLECTION],
	},
	{
		name: 'Nickel Open Face',
		weights: [REGULAR],
		italics: false,
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Output Sans 2 Beta',
		weights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, BOOK, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD],
		italics: true,
		collections: [SANS_SERIF_COLLECTION, VARIABLE_COLLECTION],
	},
	{
		name: 'Pomfret',
		weights: [REGULAR],
		italics: false,
		collections: [SERIF_COLLECTION, DISPLAY_COLLECTION],
	},
	{
		name: 'Roslindale Extended',
		weights: [REGULAR],
		italics: false,
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
		weights: [REGULAR],
		italics: false,
		collections: [DISPLAY_COLLECTION, VARIABLE_COLLECTION],
	},
	{
		name: 'Warbler Text',
		weights: [REGULAR],
		italics: true,
		collections: [SERIF_COLLECTION],
	},
].map(font => ({
	...font,
	collections: [...(font.collections ?? []), DJR_FONT_OF_THE_MONTH_COLLECTION, LICENSED_COLLECTION],
}));

const freeOpenFonts = [
	{
		name: 'AUTHENTIC Sans',
		weights: [LIGHT, REGULAR, BOLD, BLACK],
		italics: false,
		stretches: [LIGHT, REGULAR, BOLD, BLACK].reduce((acc, weight) => {
			acc[weight] = {
				values: ['condensed'],
				italics: false,
			};
			return acc;
		}, {}),
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Bagnard',
		weights: [REGULAR],
		italics: false,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Blackout 2AM',
		weights: [REGULAR],
		italics: false,
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Blackout Midnight',
		weights: [REGULAR],
		italics: false,
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Blackout Sunrise',
		weights: [REGULAR],
		italics: false,
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Butler',
		weights: [EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, BOLD, ULTRA_BOLD, BLACK],
		italics: false,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Butler Stencil',
		weights: [EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, BOLD, ULTRA_BOLD, BLACK],
		italics: false,
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Cooper Hewitt',
		weights: [THIN, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, BLACK],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Junction',
		weights: [LIGHT, REGULAR, BOLD],
		italics: false,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'League Mono',
		weights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD],
		italics: false,
		stretches: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD].reduce((acc, weight) => {
			acc[weight] = {
				values: ['condensed', 'semi-condensed', 'semi-expanded', 'expanded'],
				italics: false,
			};
			return acc;
		}, {}),
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Liberation Mono',
		weights: [REGULAR, BOLD],
		italics: true,
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Liberation Sans',
		weights: [REGULAR, BOLD],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Liberation Serif',
		weights: [REGULAR, BOLD],
		italics: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Martian Mono',
		weights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, BOLD, ULTRA_BOLD],
		italics: false,
		stretches: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, BOLD, ULTRA_BOLD].reduce((acc, weight) => {
			acc[weight] = {
				values: ['condensed', 'semi-condensed', 'expanded'],
				italics: false,
			};
			return acc;
		}, {}),
		collections: [MONOSPACE_COLLECTION, VARIABLE_COLLECTION],
	},
	{
		name: 'Metropolis',
		weights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Open Sauce One',
		weights: [LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Open Sauce Sans',
		weights: [LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Open Sauce Two',
		weights: [LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'SuperDuper',
		weights: [LIGHT, REGULAR, MEDIUM, BOLD],
		italics: false,
		collections: [SANS_SERIF_COLLECTION, DISPLAY_COLLECTION],
	},
].map(font => ({
	...font,
	collections: [...(font.collections ?? []), FREE_OPEN_COLLECTION],
}));

const systemFonts = [
	{
		name: 'Times New Roman',
		weights: [REGULAR, BOLD],
		italics: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Georgia',
		weights: [REGULAR, BOLD],
		italics: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Charter',
		weights: [REGULAR, BOLD, BLACK],
		italics: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Palatino',
		weights: [REGULAR, BOLD],
		italics: true,
		collections: [SERIF_COLLECTION],
	},
	{
		name: 'Arial',
		weights: [REGULAR, BOLD],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Verdana',
		weights: [REGULAR, BOLD],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Tahoma',
		weights: [REGULAR, BOLD],
		italics: false,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Trebuchet MS',
		weights: [REGULAR, BOLD],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Courier New',
		weights: [REGULAR, BOLD],
		italics: true,
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Arial Black',
		weights: [BOLD],
		italics: false,
		collections: [DISPLAY_COLLECTION],
	},
].map(font => ({
	...font,
	collections: [...(font.collections ?? []), SYSTEM_FONTS_COLLECTION],
}));

const otherLicensedFonts = [
	{
		name: 'AUTHENTIC Classified',
		weights: [REGULAR],
		italics: false,
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Cartograph CF',
		weights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		italics: true,
		collections: [MONOSPACE_COLLECTION],
	},
	{
		name: 'Default Sans',
		weights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Greycliff CF',
		weights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
	{
		name: 'Henrietta',
		weights: [LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		italics: false,
		collections: [DISPLAY_COLLECTION, SANS_SERIF_COLLECTION, FUTURE_FONTS_COLLECTION],
	},
	{
		name: 'HEX Franklin',
		weights: [REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		italics: false,
		stretches: [REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK].reduce((acc, weight) => {
			acc[weight] = {
				values: ['semi-condensed', 'condensed', 'extra-condensed'],
				italics: false,
			};
			return acc;
		}, {}),
		collections: [SANS_SERIF_COLLECTION, VARIABLE_COLLECTION, FUTURE_FONTS_COLLECTION],
	},
	{
		name: 'Integral CF',
		weights: [REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		italics: true,
		collections: [DISPLAY_COLLECTION, ALL_CAPS_COLLECTION],
	},
	{
		name: 'Macabre',
		weights: [REGULAR],
		italics: false,
		collections: [DISPLAY_COLLECTION, FUTURE_FONTS_COLLECTION],
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

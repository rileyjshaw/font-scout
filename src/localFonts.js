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
	ATIPO_COLLECTION,
	LOCAL_FONTS_COLLECTION,
	FREE_OPEN_COLLECTION,
	DISPLAY_COLLECTION,
	MONOSPACE_COLLECTION,
	SANS_SERIF_COLLECTION,
	SERIF_COLLECTION,
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
		collections: [DISPLAY_COLLECTION],
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
		collections: [DISPLAY_COLLECTION],
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
		collections: [DISPLAY_COLLECTION],
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
		collections: [DISPLAY_COLLECTION],
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
		collections: [DISPLAY_COLLECTION],
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
		name: 'Wotfard',
		weights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
].map(font => ({
	...font,
	collections: [...(font.collections ?? []), ATIPO_COLLECTION],
}));

const freeOpenFonts = [
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
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Blackout Midnight',
		weights: [REGULAR],
		italics: false,
		collections: [DISPLAY_COLLECTION],
	},
	{
		name: 'Blackout Sunrise',
		weights: [REGULAR],
		italics: false,
		collections: [DISPLAY_COLLECTION],
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
		name: 'League Gothic',
		weights: [REGULAR],
		italics: true,
		stretches: {
			[REGULAR]: {
				values: ['condensed'],
				italics: true,
			},
		},
		collections: [DISPLAY_COLLECTION],
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
		name: 'League Spartan',
		weights: [EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		italics: false,
		collections: [DISPLAY_COLLECTION],
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
		name: 'Metropolis',
		weights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, ULTRA_BOLD, BLACK],
		italics: true,
		collections: [SANS_SERIF_COLLECTION],
	},
].map(font => ({
	...font,
	collections: [...(font.collections ?? []), FREE_OPEN_COLLECTION],
}));

const localFonts = [...atipoFonts, ...freeOpenFonts].map(font => ({
	...font,
	collections: [...(font.collections ?? []), LOCAL_FONTS_COLLECTION],
}));

export default localFonts;

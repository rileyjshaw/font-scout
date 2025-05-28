export const MIN_COLUMN_WIDTH = 600;

export const WEIGHT_MIN = 1;
export const WEIGHT_HAIRLINE = 50;
export const WEIGHT_THIN = 100;
export const WEIGHT_EXTRA_LIGHT = 200;
export const WEIGHT_LIGHT = 300;
export const WEIGHT_REGULAR = 400;
export const WEIGHT_BOOK = 450;
export const WEIGHT_MEDIUM = 500;
export const WEIGHT_SEMI_BOLD = 600;
export const WEIGHT_BOLD = 700;
export const WEIGHT_ULTRA_BOLD = 800;
export const WEIGHT_BLACK = 900;
export const WEIGHT_ULTRA_BLACK = 950;
export const WEIGHT_MAX = 1000;

export const WIDTH_ULTRA_CONDENSED = 50;
export const WIDTH_EXTRA_CONDENSED = 62.5;
export const WIDTH_CONDENSED = 75;
export const WIDTH_SEMI_CONDENSED = 87.5;
export const WIDTH_NORMAL = 100;
export const WIDTH_SEMI_EXPANDED = 112.5;
export const WIDTH_EXPANDED = 125;
export const WIDTH_EXTRA_EXPANDED = 150;
export const WIDTH_ULTRA_EXPANDED = 200;

export const READABLE_VALUES = {
	weight: {
		WEIGHT_HAIRLINE: 'Hairline',
		WEIGHT_THIN: 'Thin',
		WEIGHT_EXTRA_LIGHT: 'Extra Light',
		WEIGHT_LIGHT: 'Light',
		WEIGHT_REGULAR: 'Regular',
		WEIGHT_BOOK: 'Book',
		WEIGHT_MEDIUM: 'Medium',
		WEIGHT_SEMI_BOLD: 'Semi Bold',
		WEIGHT_BOLD: 'Bold',
		WEIGHT_ULTRA_BOLD: 'Ultra Bold',
		WEIGHT_BLACK: 'Black',
		WEIGHT_ULTRA_BLACK: 'Ultra Black',
	},
	width: {
		WIDTH_ULTRA_CONDENSED: 'Ultra condensed',
		WIDTH_EXTRA_CONDENSED: 'Extra condensed',
		WIDTH_CONDENSED: 'Condensed',
		WIDTH_SEMI_CONDENSED: 'Semi condensed',
		WIDTH_NORMAL: 'Normal',
		WIDTH_SEMI_EXPANDED: 'Semi expanded',
		WIDTH_EXPANDED: 'Expanded',
		WIDTH_EXTRA_EXPANDED: 'Extra expanded',
		WIDTH_ULTRA_EXPANDED: 'Ultra expanded',
	},
	italic: {
		0: 'Normal',
		1: 'Italic',
	},
	oblique: {
		0: 'Normal',
		1: 'Oblique',
	},
};

export const defaultPreviews = [
	['David\nWowie!', 120, 0.8, 900, 'left', 'grid'],
	['The thundering machines sputtered…\n…then stopped.', 24, 1, 400, 'right', 'grid'],
	['I can’t believe the way we flowww', 32, 1.5, 400, 'center', 'grid'],
	['Right to Repair', 72, 1.2, 400, 'center', 'grid'],
	['1968', 96, 1.5, 100, 'center', 'grid'],
	['Handgloves', 60, 1.5, 400, 'center', 'grid'],
	['Högertrafikomläggningen', 36, 1.5, 400, 'center', 'grid'],
	['The tattletale flag football halfback’s office shift fit two spriggy beeflowers.', 24, 1.5, 400, 'left', 'list'],
	['Sphinx of black quartz, judge my vow!', 32, 1.5, 400, 'center', 'list'],
	['Grumpy wizards make toxic brew for the evil Queen and Jack.', 24, 1.2, 400, 'center', 'list'],
	['Béziers', 72, 2, 100, 'center', 'grid'],
	['minimoog&\ndigitakt&\nwavestation&\ngrandmother&\ntb-303', 44, 1.2, 700, 'left', 'grid'],
	['Love Is the Only Serious Work.', 24, 2, 400, 'center', 'grid'],
	// H&Co Lowercase 1.0
	[
		'Angel Adept Blind Bodice Clique Coast Dunce Docile Enact Eosin Furlong Focal Gnome Gondola Human Hoist Inlet Iodine Justin Jocose Knoll Koala Linden Loads Milliner Modal Number Nodule Onset Oddball Pneumo Poncho Quanta Qophs Rhone Roman Snout Sodium Tundra Tocsin Uncle Udder Vulcan Vocal Whale Woman Xmas Xenon Yunnan Young Zloty Zodiac. Angel angel adept for the nuance loads of the arena cocoa and quaalude. Blind blind bodice for the submit oboe of the club snob and abbot. Clique clique coast for the pouch loco of the franc assoc and accede. Dunce dunce docile for the loudness mastodon of the loud statehood and huddle. Enact enact eosin for the quench coed of the pique canoe and bleep. Furlong furlong focal for the genuflect profound of the motif aloof and offers. Gnome gnome gondola for the impugn logos of the unplug analog and smuggle. Human human hoist for the buddhist alcohol of the riyadh caliph and bathhouse. Inlet inlet iodine for the quince champion of the ennui scampi and shiite. Justin justin jocose for the djibouti sojourn of the oranj raj and hajjis. Knoll knoll koala for the banknote lookout of the dybbuk outlook and trekked. Linden linden loads for the ulna monolog of the consul menthol and shallot. Milliner milliner modal for the alumna solomon of the album custom and summon. Number number nodule for the unmade economic of the shotgun bison and tunnel. Onset onset oddball for the abandon podium of the antiquo tempo and moonlit. Pneumo pneumo poncho for the dauphin opossum of the holdup bishop and supplies. Quanta quanta qophs for the inquest sheqel of the cinq coq and suqqu. Rhone rhone roman for the burnt porous of the lemur clamor and carrot. Snout snout sodium for the ensnare bosom of the genus pathos and missing. Tundra tundra tocsin for the nutmeg isotope of the peasant ingot and ottoman. Uncle uncle udder for the dunes cloud of the hindu thou and continuum. Vulcan vulcan vocal for the alluvial ovoid of the yugoslav chekhov and revved. Whale whale woman for the meanwhile blowout of the forepaw meadow and glowworm. Xmas xmas xenon for the bauxite doxology of the tableaux equinox and exxon. Yunnan yunnan young for the dynamo coyote of the obloquy employ and sayyid. Zloty zloty zodiac for the gizmo ozone of the franz laissez and buzzing.',
		16,
		1.2,
		400,
		'left',
		'list',
	],
	// Pangrams
	[
		'William said that everything about his jacket was in\nquite good condition except for the zipper.',
		32,
		1.2,
		400,
		'left',
		'list',
	],
	['The July sun caused a fragment of black pine wax to ooze on the velvet quilt.', 96, 1.2, 700, 'left', 'list'],
	['Pack my box with five dozen liquor jugs.', 28, 1.2, 400, 'center', 'grid'],
	['We have just quoted on nine dozen boxes of gray lamp wicks.', 26, 1.2, 400, 'left', 'grid'],
	// [
	// 	'aabacadaeafagahaiajakalamanaoapaqarasatauavawaxayaza\nbabbcbdbebfbgbhbibjbkblbmbnbobpbqbrbsbtbubvbwbxbybzb\ncacbccdcecfcgchcicjckclcmcncocpcqcrcsctcucvcwcxcyczc\ndadbdcddedfdgdhdidjdkdldmdndodpdqdrdsdtdudvdwdxdydzd\neaebecedeefegeheiejekelemeneoepeqereseteuevewexeyeze\nfafbfcfdfeffgfhfifjfkflfmfnfofpfqfrfsftfufvfwfxfyfzf\ngagbgcgdgegfgghgigjgkglgmgngogpgqgrgsgtgugvgwgxgygzg\nhahbhchdhehfhghhihjhkhlhmhnhohphqhrhshthuhvhwhxhyhzh\niaibicidieifigihiijikiliminioipiqirisitiuiviwixiyizi\njajbjcjdjejfjgjhjijjkjljmjnjojpjqjrjsjtjujvjwjxjyjzj\nkakbkckdkekfkgkhkikjkklkmknkokpkqkrksktkukvkwkxkykzk\nlalblcldlelflglhliljlkllmlnlolplqlrlsltlulvlwlxlylzl\nmambmcmdmemfmgmhmimjmkmlmmnmompmqmrmsmtmumvmwmxmymzm\nnanbncndnenfngnhninjnknlnmnnonpnqnrnsntnunvnwnxnynzn\noaobocodoeofogohoiojokolomonoopoqorosotouovowoxoyozo\npapbpcpdpepfpgphpipjpkplpmpnpoppqprpsptpupvpwpxpypzp\nqaqbqcqdqeqfqgqhqiqjqkqlqmqnqoqpqqrqsqtquqvqwqxqyqzq\nrarbrcrdrerfrgrhrirjrkrlrmrnrorprqrrsrtrurvrwrxryrzr\nsasbscsdsesfsgshsisjskslsmsnsospsqsrsstsusvswsxsyszs\ntatbtctdtetftgthtitjtktltmtntotptqtrtsttutvtwtxtytzt\nuaubucudueufuguhuiujukulumunuoupuqurusutuuvuwuxuyuzu\nvavbvcvdvevfvgvhvivjvkvlvmvnvovpvqvrvsvtvuvvwvxvyvzv\nwawbwcwdwewfwgwhwiwjwkwlwmwnwowpwqwrwswtwuwvwwxwywzw\nxaxbxcxdxexfxgxhxixjxkxlxmxnxoxpxqxrxsxtxuxvxwxxyxzx\nyaybycydyeyfygyhyiyjykylymynyoypyqyrysytyuyvywyxyyzy\nzazbzczdzezfzgzhzizjzkzlzmznzozpzqzrzsztzuzvzwzxzyzz',
	// 	8,
	// 	1,
	// 	400,
	// 	'left',
	// 	'grid',
	// ],
];

// Note: Not using Symbols because React Select doesn’t expect them.
export const ALL_FONTS_COLLECTION = 'ALL_FONTS_COLLECTION';
export const ATIPO_COLLECTION = 'ATIPO_COLLECTION';
export const DJR_FONT_OF_THE_MONTH_COLLECTION = 'DJR_FONT_OF_THE_MONTH_COLLECTION';
export const FRESH_FONTS_COLLECTION = 'FRESH_FONTS_COLLECTION';
export const FUTURE_FONTS_COLLECTION = 'FUTURE_FONTS_COLLECTION';
export const GOOGLE_FONTS_COLLECTION = 'GOOGLE_FONTS_COLLECTION';
export const GOOGLE_FONTS_SHORTLIST_COLLECTION = 'GOOGLE_FONTS_SHORTLIST_COLLECTION';
export const LOCAL_FONTS_COLLECTION = 'LOCAL_FONTS_COLLECTION';
export const SYSTEM_FONTS_COLLECTION = 'SYSTEM_FONTS_COLLECTION';
export const FREE_OPEN_COLLECTION = 'FREE_OPEN_COLLECTION';
export const LICENSED_COLLECTION = 'LICENSED_COLLECTION';
export const DISPLAY_COLLECTION = 'DISPLAY_COLLECTION';
export const HANDWRITING_COLLECTION = 'HANDWRITING_COLLECTION';
export const MONOSPACE_COLLECTION = 'MONOSPACE_COLLECTION';
export const SANS_SERIF_COLLECTION = 'SANS_SERIF_COLLECTION';
export const SERIF_COLLECTION = 'SERIF_COLLECTION';
export const SINGLE_VARIANT_COLLECTION = 'SINGLE_VARIANT_COLLECTION';
export const ALL_CAPS_COLLECTION = 'ALL_CAPS_COLLECTION';
export const MULTIPLE_WEIGHTS_COLLECTION = 'MULTIPLE_WEIGHTS_COLLECTION';
export const MULTIPLE_STYLES_COLLECTION = 'MULTIPLE_STYLES_COLLECTION';
export const MULTIPLE_WIDTHS_COLLECTION = 'MULTIPLE_WIDTHS_COLLECTION';
export const MULTIPLEXED_COLLECTION = 'MULTIPLEXED_COLLECTION';
export const STARRED_COLLECTION = 'STARRED_COLLECTION';
export const UI_FONTS_COLLECTION = 'UI_FONTS_COLLECTION';
export const VARIABLE_COLLECTION = 'VARIABLE_COLLECTION';
export const UNCATEGORIZED_COLLECTION = 'UNCATEGORIZED_COLLECTION';

export const COLLECTION_GROUPS = [
	{
		label: 'Font category',
		options: {
			ALL_FONTS_COLLECTION: 'All fonts',
			SANS_SERIF_COLLECTION: 'Sans-serif',
			SERIF_COLLECTION: 'Serif',
			MONOSPACE_COLLECTION: 'Monospace',
			DISPLAY_COLLECTION: 'Display',
			HANDWRITING_COLLECTION: 'Handwriting',
		},
	},
	{
		label: 'Application context',
		options: {
			SINGLE_VARIANT_COLLECTION: 'Single variant',
			MULTIPLE_WEIGHTS_COLLECTION: 'Multiple weights',
			MULTIPLE_STYLES_COLLECTION: 'Multiple styles',
			MULTIPLE_WIDTHS_COLLECTION: 'Multiple widths',
			MULTIPLEXED_COLLECTION: 'Multiplexed (uniwidth) fonts',
			ALL_CAPS_COLLECTION: 'All caps',
			UI_FONTS_COLLECTION: 'Unobtrusive UI fonts',
		},
	},
	{
		label: 'Source / foundry',
		options: {
			ATIPO_COLLECTION: 'Atipo foundry',
			DJR_FONT_OF_THE_MONTH_COLLECTION: 'DJR Font of the Month',
			FRESH_FONTS_COLLECTION: 'Fresh Fonts',
			FUTURE_FONTS_COLLECTION: 'Future Fonts',
			GOOGLE_FONTS_COLLECTION: 'Google fonts',
			LOCAL_FONTS_COLLECTION: 'Riley’s local fonts',
			SYSTEM_FONTS_COLLECTION: 'System fonts',
		},
	},
	{
		label: 'Miscellaneous',
		options: {
			STARRED_COLLECTION: 'Starred fonts',
			GOOGLE_FONTS_SHORTLIST_COLLECTION: 'Selected Google fonts from Typewolf, Awwwards, etc.',
			FREE_OPEN_COLLECTION: 'Free and/or open source',
			LICENSED_COLLECTION: 'Licensed fonts',
			VARIABLE_COLLECTION: 'Variable fonts',
			UNCATEGORIZED_COLLECTION: 'Uncategorized fonts',
		},
	},
];

export const FONT_SETTINGS = {
	weight: {
		label: 'Weight',
		defaultValue: WEIGHT_REGULAR,
	},
	italic: {
		label: 'Italic',
		defaultValue: 0,
	},
	oblique: {
		label: 'Oblique',
		defaultValue: 0,
	},
	width: {
		label: 'Width',
		defaultValue: WIDTH_NORMAL,
		isUniformSteps: true,
	},
	scale: {
		label: 'Scale',
		min: 0.5,
		max: 2,
		step: 0.01,
		defaultValue: 1,
		// Logarithmic scale.
		scale: {
			transform: x => Math.log2(x),
			inverse: x => Math.pow(2, x),
		},
	},
	lineHeightOffset: {
		label: 'Line height offset',
		min: -1,
		max: 1,
		step: 0.01,
		defaultValue: 0,
	},
};

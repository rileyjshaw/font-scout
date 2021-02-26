export const MIN_COLUMN_WIDTH = 600;

export const THIN = Symbol('THIN');
export const EXTRA_LIGHT = Symbol('EXTRA_LIGHT');
export const LIGHT = Symbol('LIGHT');
export const REGULAR = Symbol('REGULAR');
export const BOOK = Symbol('BOOK');
export const MEDIUM = Symbol('MEDIUM');
export const SEMI_BOLD = Symbol('SEMI_BOLD');
export const BOLD = Symbol('BOLD');
export const ULTRA_BOLD = Symbol('ULTRA_BOLD');
export const BLACK = Symbol('BLACK');
export const ULTRA_BLACK = Symbol('ULTRA_BLACK');

export const WEIGHTS = {
	[THIN]: {
		name: 'Thin',
		value: 100,
	},
	[EXTRA_LIGHT]: {
		name: 'Extra light',
		value: 200,
	},
	[LIGHT]: {
		name: 'Light',
		value: 300,
	},
	[REGULAR]: {
		name: '',
		value: 400,
	},
	[BOOK]: {
		name: 'Book',
		value: 450,
	},
	[MEDIUM]: {
		name: 'Medium',
		value: 500,
	},
	[SEMI_BOLD]: {
		name: 'Semi bold',
		value: 600,
	},
	[BOLD]: {
		name: 'Bold',
		value: 700,
	},
	[ULTRA_BOLD]: {
		name: 'Ultra bold',
		value: 800,
	},
	[BLACK]: {
		name: 'Black',
		value: 900,
	},
	[ULTRA_BLACK]: {
		name: 'Ultra black',
		value: 950,
	},
};

export const WEIGHT_SYMBOLS = Reflect.ownKeys(WEIGHTS).reduce((acc, key) => {
	const { value } = WEIGHTS[key];
	acc[value] = key;
	return acc;
}, {});

export const STRETCH_ORDER = [
	'ultra-condensed',
	'extra-condensed',
	'condensed',
	'semi-condensed',
	'normal',
	'semi-expanded',
	'expanded',
	'extra-expanded',
	'ultra-expanded',
];

export const defaultPreviews = [
	['David\nBowie', 108, 'center'],
	['The thundering machines sputtered…\n…then stopped.', 22, 'right'],
	['I can’t believe the way we flow!', 32, 'center'],
	['Right to Repair', 72, 'center'],
	['1968', 96, 'center'],
	['Handgloves', 60, 'center'],
	['Högertrafikomläggningen', 60, 'center'],
	['minimom & the difficult waffles', 44, 'center'],
	// H&Co Lowercase 1.0
	[
		'Angel Adept Blind Bodice Clique Coast Dunce Docile Enact Eosin Furlong Focal Gnome Gondola Human Hoist Inlet Iodine Justin Jocose Knoll Koala Linden Loads Milliner Modal Number Nodule Onset Oddball Pneumo Poncho Quanta Qophs Rhone Roman Snout Sodium Tundra Tocsin Uncle Udder Vulcan Vocal Whale Woman Xmas Xenon Yunnan Young Zloty Zodiac. Angel angel adept for the nuance loads of the arena cocoa and quaalude. Blind blind bodice for the submit oboe of the club snob and abbot. Clique clique coast for the pouch loco of the franc assoc and accede. Dunce dunce docile for the loudness mastodon of the loud statehood and huddle. Enact enact eosin for the quench coed of the pique canoe and bleep. Furlong furlong focal for the genuflect profound of the motif aloof and offers. Gnome gnome gondola for the impugn logos of the unplug analog and smuggle. Human human hoist for the buddhist alcohol of the riyadh caliph and bathhouse. Inlet inlet iodine for the quince champion of the ennui scampi and shiite. Justin justin jocose for the djibouti sojourn of the oranj raj and hajjis. Knoll knoll koala for the banknote lookout of the dybbuk outlook and trekked. Linden linden loads for the ulna monolog of the consul menthol and shallot. Milliner milliner modal for the alumna solomon of the album custom and summon. Number number nodule for the unmade economic of the shotgun bison and tunnel. Onset onset oddball for the abandon podium of the antiquo tempo and moonlit. Pneumo pneumo poncho for the dauphin opossum of the holdup bishop and supplies. Quanta quanta qophs for the inquest sheqel of the cinq coq and suqqu. Rhone rhone roman for the burnt porous of the lemur clamor and carrot. Snout snout sodium for the ensnare bosom of the genus pathos and missing. Tundra tundra tocsin for the nutmeg isotope of the peasant ingot and ottoman. Uncle uncle udder for the dunes cloud of the hindu thou and continuum. Vulcan vulcan vocal for the alluvial ovoid of the yugoslav chekhov and revved. Whale whale woman for the meanwhile blowout of the forepaw meadow and glowworm. Xmas xmas xenon for the bauxite doxology of the tableaux equinox and exxon. Yunnan yunnan young for the dynamo coyote of the obloquy employ and sayyid. Zloty zloty zodiac for the gizmo ozone of the franz laissez and buzzing.',
		12,
		'left',
	],
	// Pangrams
	['William said that everything about his jacket was in quite good condition except for the zipper.', 18, 'left'],
	['The July sun caused a fragment of black pine wax to ooze on the velvet quilt.', 24, 'left'],
	['Pack my box with five dozen liquor jugs.', 28, 'left'],
	['We have just quoted on nine dozen boxes of gray lamp wicks.', 26, 'left'],
	[
		'aabacadaeafagahaiajakalamanaoapaqarasatauavawaxayaza\nbabbcbdbebfbgbhbibjbkblbmbnbobpbqbrbsbtbubvbwbxbybzb\ncacbccdcecfcgchcicjckclcmcncocpcqcrcsctcucvcwcxcyczc\ndadbdcddedfdgdhdidjdkdldmdndodpdqdrdsdtdudvdwdxdydzd\neaebecedeefegeheiejekelemeneoepeqereseteuevewexeyeze\nfafbfcfdfeffgfhfifjfkflfmfnfofpfqfrfsftfufvfwfxfyfzf\ngagbgcgdgegfgghgigjgkglgmgngogpgqgrgsgtgugvgwgxgygzg\nhahbhchdhehfhghhihjhkhlhmhnhohphqhrhshthuhvhwhxhyhzh\niaibicidieifigihiijikiliminioipiqirisitiuiviwixiyizi\njajbjcjdjejfjgjhjijjkjljmjnjojpjqjrjsjtjujvjwjxjyjzj\nkakbkckdkekfkgkhkikjkklkmknkokpkqkrksktkukvkwkxkykzk\nlalblcldlelflglhliljlkllmlnlolplqlrlsltlulvlwlxlylzl\nmambmcmdmemfmgmhmimjmkmlmmnmompmqmrmsmtmumvmwmxmymzm\nnanbncndnenfngnhninjnknlnmnnonpnqnrnsntnunvnwnxnynzn\noaobocodoeofogohoiojokolomonoopoqorosotouovowoxoyozo\npapbpcpdpepfpgphpipjpkplpmpnpoppqprpsptpupvpwpxpypzp\nqaqbqcqdqeqfqgqhqiqjqkqlqmqnqoqpqqrqsqtquqvqwqxqyqzq\nrarbrcrdrerfrgrhrirjrkrlrmrnrorprqrrsrtrurvrwrxryrzr\nsasbscsdsesfsgshsisjskslsmsnsospsqsrsstsusvswsxsyszs\ntatbtctdtetftgthtitjtktltmtntotptqtrtsttutvtwtxtytzt\nuaubucudueufuguhuiujukulumunuoupuqurusutuuvuwuxuyuzu\nvavbvcvdvevfvgvhvivjvkvlvmvnvovpvqvrvsvtvuvvwvxvyvzv\nwawbwcwdwewfwgwhwiwjwkwlwmwnwowpwqwrwswtwuwvwwxwywzw\nxaxbxcxdxexfxgxhxixjxkxlxmxnxoxpxqxrxsxtxuxvxwxxyxzx\nyaybycydyeyfygyhyiyjykylymynyoypyqyrysytyuyvywyxyyzy\nzazbzczdzezfzgzhzizjzkzlzmznzozpzqzrzsztzuzvzwzxzyzz',
		8,
		'center',
	],
];

// Note: Not using Symbols because React Select doesn’t expect them.
export const ATIPO_COLLECTION = 'ATIPO_COLLECTION';
export const GOOGLE_FONTS_COLLECTION = 'GOOGLE_FONTS_COLLECTION';
export const TYPEWOLF_40_GOOGLE_FONTS_COLLECTION = 'TYPEWOLF_40_GOOGLE_FONTS_COLLECTION';
export const LOCAL_FONTS_COLLECTION = 'LOCAL_FONTS_COLLECTION';
export const FREE_OPEN_COLLECTION = 'FREE_OPEN_COLLECTION';
export const DISPLAY_COLLECTION = 'DISPLAY_COLLECTION';
export const HANDWRITING_COLLECTION = 'HANDWRITING_COLLECTION';
export const MONOSPACE_COLLECTION = 'MONOSPACE_COLLECTION';
export const SANS_SERIF_COLLECTION = 'SANS_SERIF_COLLECTION';
export const SERIF_COLLECTION = 'SERIF_COLLECTION';
export const SINGLE_VARIANT_COLLECTION = 'SINGLE_VARIANT_COLLECTION';
export const UNCATEGORIZED_COLLECTION = 'UNCATEGORIZED_COLLECTION';

export const COLLECTION_GROUPS = [
	{
		label: 'Font category',
		options: {
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
			BODY_SAFE_COLLECTION: 'Body safe (italic and bold included)',
			SINGLE_VARIANT_COLLECTION: 'Single variant',
		},
	},
	{
		label: 'Source / foundry',
		options: {
			ATIPO_COLLECTION: 'Atipo foundry',
			GOOGLE_FONTS_COLLECTION: 'Google fonts',
			LOCAL_FONTS_COLLECTION: 'Local fonts',
		},
	},
	{
		label: 'Miscellaneous',
		options: {
			TYPEWOLF_40_GOOGLE_FONTS_COLLECTION: 'Typewolf’s “40 Best Google fonts”',
			FREE_OPEN_COLLECTION: 'Free and/or open source',
			UNCATEGORIZED: 'Uncategorized fonts',
		},
	},
];

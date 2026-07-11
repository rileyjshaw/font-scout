// Overrides are intentionally limited to metadata that is absent or broken in a font file.
// Keys are project-relative paths so moving a font makes the scanner reconsider its metadata.
export const FONT_FILE_OVERRIDES = {
	'public/fonts/Cabrio-Variable.woff2': { family: 'Cabrio', subfamily: 'Regular' },
	'public/fonts/Cabrio-Variable-Italic.woff2': {
		family: 'Cabrio',
		subfamily: 'Italic',
		italic: 1,
	},
	'public/fonts/cartograph-cf-regular.woff2': { family: 'Cartograph CF', subfamily: 'Regular' },
	'public/fonts/cartograph-cf-regular-italic.woff2': {
		family: 'Cartograph CF',
		subfamily: 'Regular Italic',
		italic: 1,
	},
	'public/fonts/integral-cf-regular.woff2': { family: 'Integral CF', subfamily: 'Regular' },
	'public/fonts/integral-cf-regular-oblique.woff2': {
		family: 'Integral CF',
		subfamily: 'Regular Oblique',
		oblique: 1,
	},
	'public/fonts/Hop.woff2': { axes: { cstm: ['Rounded', 0, 100, 0, 0.01] } },
	'public/fonts/ProtestGrotesk[slnt,wght].woff2': { axes: { slnt: ['Slant', -11, 0, 0, 0.01] } },
	'public/fonts/SoftcoreVar.woff2': {
		family: 'Softcore',
		subfamily: 'Regular',
		weight: [10, 1000],
		width: 100,
		italic: 0,
		oblique: 0,
		axes: { wght: ['Weight', 10, 1000, 400, 1] },
	},
	'public/fonts/SoftcoreVarItalic.woff2': {
		family: 'Softcore',
		subfamily: 'Italic',
		weight: [10, 1000],
		width: 100,
		italic: 1,
		oblique: 0,
		axes: { wght: ['Weight', 10, 1000, 400, 1] },
	},
	'public/publicFonts/Satoshi-Variable.woff2': { family: 'Satoshi' },
	'public/publicFonts/Satoshi-VariableItalic.woff2': { family: 'Satoshi', italic: 1 },
};

const FAMILY_ALIASES = {
	AH_SuperDuper: 'SuperDuper',
	CHANEY: 'Chaney',
	'Copyright D0UBLE ZER0': 'Hypertext Display',
	'Def Sans VF': 'Def Sans',
	'Easy Grotesk Variable': 'Easy Grotesk',
	'FL Prefere Italic Variable': 'FL Prefere',
	'FL Prefere Variable': 'FL Prefere',
	'Gestura Text VF': 'Gestura Text',
	'Golos UI VF': 'Golos UI',
	'HEX Franklin v0.3 Tyght Variable': 'HEX Franklin Tyght',
	'HEX Franklin v0.3 Variable': 'HEX Franklin',
	'Job Clarendon Compressed': 'Job Clarendon',
	'Job Clarendon Condensed': 'Job Clarendon',
	'Job Clarendon Extra Compressed': 'Job Clarendon',
	'Marcin Antique Standard': 'Marcin Antique',
	'MD Nichrome Variable': 'MD Nichrome',
	'Micrograph VF': 'Micrograph',
	'Nickel Gothic v2': 'Nickel Gothic',
	'Nickel Gothic v2 Variable': 'Nickel Gothic',
	'Pomfret v2': 'Pomfret',
	'PT Root UI VF': 'PT Root UI',
	'Resist Mono Italic Variable': 'Resist Mono',
	'Resist Mono Variable': 'Resist Mono',
	'RG Quasar': 'Quasar',
	'Roslindale Extended Variable': 'Roslindale Extended',
	'SFT Schrifted Serif Var': 'SFT Schrifted Serif',
	'STK Bureau Serif': 'Bureau Serif',
	'TRJN DaVinci': 'DaVinci',
	Ufficio: 'Ufficio Sans',
	'VC Gosh': 'Gosh',
	'VC Henrietta': 'Henrietta',
	'VC Henrietta Condensed': 'Henrietta',
};

// These patterns correct a group of older webfonts whose name table contains the
// same ".<DEL>" placeholder. They are explicit migrations, not filename fallback.
const FAMILY_PATTERNS = [
	[/\/Blackout-TwoAM\./, 'Blackout 2AM'],
	[/\/Blackout-Midnight\./, 'Blackout Midnight'],
	[/\/Blackout-Sunrise\./, 'Blackout Sunrise'],
	[/\/CloitreV2-Regular\./, 'Cloitre'],
	[/\/CloitreV2-Rounded\./, 'Cloitre Rounded'],
	[/\/NickelV2-OpenFace\./, 'Nickel Open Face'],
	[/\/NickelV2-Regular\./, 'Nickel'],
	[/\/ApfelGrotezk-Brukt\./, 'Apfel Grotezk Brukt'],
	[/\/Megazoid-Fill\./, 'Megazoid Fill'],
	[/\/Megazoid-ShadeLeft\./, 'Megazoid Shade Left'],
	[/\/Megazoid-ShadeRight\./, 'Megazoid Shade Right'],
	[/\/argestadisplay-/, 'Argesta Display'],
	[/\/argestahairline-/, 'Argesta Hairline'],
	[/\/argestaheadline-/, 'Argesta Headline'],
	[/\/argestatext-/, 'Argesta Text'],
	[/\/bariol_serif_/, 'Bariol Serif'],
	[/\/bariol_/, 'Bariol'],
	[/\/basiersquaremono-/, 'Basier Square Mono'],
	[/\/basiersquare-/, 'Basier Square'],
	[/\/calendas_plus/, 'Calendas Plus'],
	[/\/cassannet_plus/, 'Cassannet Plus'],
	[/\/geomanist-/, 'Geomanist'],
	[/\/knile-/, 'Knile'],
	[/\/musetta-/, 'MUSETTA'],
	[/\/nowayround-/, 'Noway Round'],
	[/\/noway[_-]/, 'Noway'],
	[/\/parking-/, 'PARKING'],
	[/\/PeridotPEVF/, 'Peridot PE'],
	[/\/salome_deco-/, 'Salome Deco'],
	[/\/salome_fine[_-]/, 'Salome Fine'],
	[/\/salome_stencil/, 'Salome Stencil'],
	[/\/salome[_-]/, 'Salome'],
	[/\/sawtonbauhaus-/, 'Sawton Bauhaus'],
	[/\/sawtoncircular-/, 'Sawton Circular'],
	[/\/sawtonindustrial-/, 'Sawton Industrial'],
	[/\/scilla(?:narrow)?-/, 'Scilla'],
	[/\/silkamono-/, 'Silka Mono'],
	[/\/silka-/, 'Silka'],
	[/\/strawford-/, 'Strawford'],
	[/\/wotfard-/, 'Wotfard'],
	[/\/archia-regular-/, 'Archia'],
];

// Static OS/2 weight and width classes are occasionally broken or encode a
// foundry-internal scale. Preserve the old CSS values when the embedded style
// name and the rest of the family make the intended CSS value unambiguous.
const PROPERTY_PATTERNS = [
	[/\/MarcinAntiqueStandard-(?:Black|BlackItalic)\./, { weight: 900 }],
	[/\/MarcinAntiqueStandard-(?:Book|BookItalic)\./, { weight: 450 }],
	[/\/MarcinAntiqueStandard-(?:Extra|ExtraItalic)\./, { weight: 800 }],
	[/\/MarcinAntiqueStandard-(?:Super|SuperItalic)\./, { weight: 950 }],
	[/\/Megazoid-(?:Fill|ShadeLeft|ShadeRight)\./, { weight: 400 }],
	[/\/MintGrotesk(?:Display)?-Thin(?:Italic)?\./, { weight: 100 }],
	[/\/MintGrotesk(?:Display)?-Bold(?:Italic)?\./, { weight: 700 }],
	[/\/MintGrotesk(?:Display)?-ExtraBold(?:Italic)?\./, { weight: 800 }],
	[/\/MintGrotesk(?:Display)?-Black(?:Italic)?\./, { weight: 900 }],
	[/\/MintGrotesk(?:Display)?-Heavy(?:Italic)?\./, { weight: 950 }],
	[/\/VCHenrietta(?:Condensed)?-Medium(?:Italic)?\./, { weight: 500 }],
	[/\/archia-thin-/, { weight: 100 }],
	[/\/bariol(?:_serif)?_thin(?:_italic)?-/, { weight: 100 }],
	[/\/cassannet_plus_thin-/, { weight: 100 }],
	[/\/cassannet_plus_ultra-/, { weight: 950 }],
	[/\/geomanist-book(?:-italic)?-/, { weight: 450 }],
	[/\/geomanist-extralight-italic-/, { weight: 200 }],
	[/\/geomanist-thin(?:-italic)?-/, { weight: 100 }],
	[/\/geomanist-ultra(?:-italic)?-/, { weight: 950 }],
	[/\/knile-extralight(?:italic)?-/, { weight: 200 }],
	[/\/knile-thin(?:italic)?-/, { weight: 100 }],
	[/\/noway-thin-/, { weight: 100 }],
	[/\/noway_thin_italic-/, { weight: 100 }],
	[/\/nowayround-thin(?:italic)?-/, { weight: 100 }],
	[/\/silka(?:mono)?-thin(?:italic)?-/, { weight: 100 }],
	[/\/AUTHENTICSans-(?:Condensed-)?130\./, { weight: 700 }],
	[/\/AUTHENTICSans-(?:Condensed-)?150\./, { weight: 900 }],
	[/\/Butler(?:Stencil)?-UltraLight\./, { weight: 200 }],
	[/\/CooperHewitt-Thin(?:Italic)?\./, { weight: 100 }],
	[/\/CooperHewitt-Light(?:Italic)?\./, { weight: 300 }],
	[/\/CooperHewitt(?:-Italic)?\.woff2$/, { weight: 400 }],
	[/\/CooperHewitt-Medium(?:Italic)?\./, { weight: 500 }],
	[/\/CooperHewitt-Semibold(?:Italic)?\./, { weight: 600 }],
	[/\/CooperHewitt-Bold(?:Italic)?\./, { weight: 700 }],
	[/\/CooperHewitt-Heavy(?:Italic)?\./, { weight: 900 }],
	[/\/Junction-Regular\./, { weight: 400 }],
	[/\/Metropolis-Thin(?:Italic)?\./, { weight: 100 }],
	[/\/Metropolis-ExtraLight(?:Italic)?\./, { weight: 200 }],
	[/\/Metropolis-Light(?:Italic)?\./, { weight: 300 }],
	[/\/Metropolis-MediumItalic\./, { weight: 500 }],
	[/\/Metropolis-SemiBoldItalic\./, { weight: 600 }],
	[/\/NickelV2-OpenFace\./, { width: 100 }],
	[/\/VCGosh-ExtraWide(?:Black|Bold|ExtraBold)\./, { width: 150 }],
	[/\/VCHenrietta-(?:Black|BlackItalic)\./, { width: 100 }],
	[/\/scillanarrow-/, { width: 75 }],
	[/\/AH_SuperDuper-(?:Bold|Light)\./, { width: 100 }],
];

export function getFontFileOverride(relativePath) {
	const exact = FONT_FILE_OVERRIDES[relativePath] ?? {};
	const familyFromPattern = FAMILY_PATTERNS.find(([pattern]) => pattern.test(relativePath))?.[1];
	const propertyOverrides = Object.assign(
		{},
		...PROPERTY_PATTERNS.filter(([pattern]) => pattern.test(relativePath)).map(([, properties]) => properties),
	);
	const embeddedFamily = exact.family;
	return {
		...(familyFromPattern ? { family: familyFromPattern } : {}),
		...propertyOverrides,
		...exact,
		...(embeddedFamily && FAMILY_ALIASES[embeddedFamily] ? { family: FAMILY_ALIASES[embeddedFamily] } : {}),
	};
}

export function applyFamilyAlias(family) {
	return FAMILY_ALIASES[family] ?? family;
}

for (const [filename, weight] of Object.entries({
	'HLC-Metra-Regular.woff2': 400,
	'HLC-Metra-Medium.woff2': 500,
	'HLC-Metra-Bold.woff2': 700,
	'HLC-Metra-Extrabold.woff2': 800,
	'HLC-Metra-Black.woff2': 900,
	'HLC-Metra-Ultra.woff2': 950,
})) {
	FONT_FILE_OVERRIDES[`public/fonts/${filename}`] = { family: 'Metra', weight };
}

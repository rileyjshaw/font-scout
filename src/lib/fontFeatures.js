const FEATURE_LABELS = {
	aalt: 'Access all alternates',
	c2sc: 'Capitals to small caps',
	calt: 'Contextual alternates',
	case: 'Case-sensitive forms',
	ccmp: 'Glyph composition',
	clig: 'Contextual ligatures',
	cpsp: 'Capital spacing',
	dlig: 'Discretionary ligatures',
	dnom: 'Denominators',
	frac: 'Fractions',
	fwid: 'Full-width forms',
	hist: 'Historical forms',
	hlig: 'Historical ligatures',
	kern: 'Kerning',
	liga: 'Standard ligatures',
	lnum: 'Lining figures',
	locl: 'Localized forms',
	mark: 'Mark positioning',
	mkmk: 'Mark-to-mark positioning',
	numr: 'Numerators',
	onum: 'Oldstyle figures',
	ordn: 'Ordinals',
	ornm: 'Ornaments',
	pnum: 'Proportional figures',
	rlig: 'Required ligatures',
	salt: 'Stylistic alternates',
	sinf: 'Scientific inferiors',
	smcp: 'Small caps',
	subs: 'Subscript',
	sups: 'Superscript',
	swsh: 'Swashes',
	titl: 'Titling alternates',
	tnum: 'Tabular figures',
	zero: 'Slashed zero',
};

const DEFAULT_ENABLED_FEATURES = new Set(['calt', 'ccmp', 'clig', 'kern', 'liga', 'locl', 'mark', 'mkmk', 'rlig']);
const NON_TOGGLE_FEATURES = new Set(['ccmp', 'locl', 'mark', 'mkmk', 'rlig']);
const VARIANT_PROPERTIES = ['weight', 'italic', 'oblique', 'width'];
const VARIANT_DEFAULTS = { weight: 400, italic: 0, oblique: 0, width: 100 };

export function getFontFeatureLabel(tag) {
	if (/^ss\d{2}$/.test(tag)) return `Stylistic set ${Number(tag.slice(2))}`;
	if (/^cv\d{2}$/.test(tag)) return `Character variant ${Number(tag.slice(2))}`;
	return FEATURE_LABELS[tag] ?? tag.toUpperCase();
}

export function getDefaultFontFeatureValue(tag) {
	return DEFAULT_ENABLED_FEATURES.has(tag);
}

export function getFontFeatureValue(tag, values = {}) {
	return values[tag] ?? getDefaultFontFeatureValue(tag);
}

export function isUserToggleableFontFeature(tag) {
	return (
		(/^ss\d{2}$/.test(tag) || /^cv\d{2}$/.test(tag) || Object.hasOwn(FEATURE_LABELS, tag)) &&
		!NON_TOGGLE_FEATURES.has(tag)
	);
}

function variantMatchesSettings(variant, settings) {
	return VARIANT_PROPERTIES.every(property => {
		const expected = variant[property] ?? VARIANT_DEFAULTS[property];
		const actual = settings[property] ?? VARIANT_DEFAULTS[property];
		return Array.isArray(expected) ? actual >= expected[0] && actual <= expected[1] : actual === expected;
	});
}

export function getAvailableFontFeatures(font, settings = {}) {
	const features = [...(font.features ?? [])];
	const group = font.featureGroups?.find(({ variants }) =>
		variants.some(variant => variantMatchesSettings(variant, settings)),
	);
	if (group) features.push(...group.features);
	return [...new Set(features)].filter(isUserToggleableFontFeature).sort();
}

export function serializeFontFeatureSettings(values = {}, availableFeatures) {
	const available = availableFeatures ? new Set(availableFeatures) : null;
	const entries = Object.entries(values)
		.filter(([tag]) => !available || available.has(tag))
		.sort(([tagA], [tagB]) => tagA.localeCompare(tagB));
	if (!entries.length) return undefined;
	return entries.map(([tag, enabled]) => `"${tag}" ${enabled ? 1 : 0}`).join(', ');
}

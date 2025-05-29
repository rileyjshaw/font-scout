import { WEIGHT_REGULAR, WIDTH_NORMAL } from '../src/constants.js';

// Copied from https://fonts.google.com/variablefonts#axis-definitions on 2025-05-29.
const GOOGLE_AXIS_DEFINITIONS = {
	// NOTE: I modified the Italic step value from 1 to 0.01, since Google doesn’t indicate whether a specific font has
	//       discrete or continuous italics.
	ital: ['Italic', 0, 1, 0, 0.01],
	opsz: ['Optical Size', 5, 1200, 14, 0.1],
	slnt: ['Slant', -90, 90, 0, 1],
	wght: ['Weight', 1, 1000, 400, 1],
	wdth: ['Width', 25, 200, 100, 0.1],
	ARRR: ['AR Retinal Resolution', 10, 60, 10, 1],
	YTAS: ['Ascender Height', 0, 1000, 750, 1],
	BLED: ['Bleed', 0, 100, 0, 1],
	BNCE: ['Bounce', -100, 100, 0, 1],
	CASL: ['Casual', 0, 1, 0, 0.01],
	XTRA: ['Counter Width', -1000, 2000, 400, 1],
	CRSV: ['Cursive', 0, 1, 0.5, 0.1],
	YTDE: ['Descender Depth', -1000, 0, -250, 1],
	EHLT: ['Edge Highlight', 0, 1000, 12, 1],
	ELXP: ['Element Expansion', 0, 100, 0, 1],
	ELGR: ['Element Grid', 1, 2, 1, 0.1],
	ELSH: ['Element Shape', 0, 100, 0, 0.1],
	EDPT: ['Extrusion Depth', 0, 1000, 100, 1],
	YTFI: ['Figure Height', -1000, 2000, 600, 1],
	FILL: ['Fill', 0, 1, 0, 0.01],
	FLAR: ['Flare', 0, 100, 0, 1],
	GRAD: ['Grade', -1000, 1000, 0, 1],
	XELA: ['Horizontal Element Alignment', -100, 100, 0, 1],
	XPN1: ['Horizontal Position of Paint 1', -100, 100, 0, 1],
	XPN2: ['Horizontal Position of Paint 2', -100, 100, 0, 1],
	HEXP: ['Hyper Expansion', 0, 100, 0, 0.1],
	INFM: ['Informality', 0, 100, 0, 1],
	YTLC: ['Lowercase Height', 0, 1000, 500, 1],
	MONO: ['Monospace', 0, 1, 0, 0.01],
	MORF: ['Morph', 0, 60, 0, 1],
	XROT: ['Rotation in X', -180, 180, 0, 1],
	YROT: ['Rotation in Y', -180, 180, 0, 1],
	ZROT: ['Rotation in Z', -180, 180, 0, 1],
	ROND: ['Roundness', 0, 100, 0, 1],
	SCAN: ['Scanlines', -100, 100, 0, 1],
	SHLN: ['Shadow Length', 0, 100, 50, 0.1],
	SHRP: ['Sharpness', 0, 100, 0, 1],
	SZP1: ['Size of Paint 1', -100, 100, 0, 1],
	SZP2: ['Size of Paint 2', -100, 100, 0, 1],
	SOFT: ['Softness', 0, 100, 0, 0.1],
	SPAC: ['Spacing', -100, 100, 0, 0.1],
	XOPQ: ['Thick Stroke', -1000, 2000, 88, 1],
	YOPQ: ['Thin Stroke', -1000, 2000, 116, 1],
	YTUC: ['Uppercase Height', 0, 1000, 725, 1],
	YELA: ['Vertical Element Alignment', -100, 100, 0, 1],
	YEXT: ['Vertical Extension', 0, 100, 0, 1],
	YPN1: ['Vertical Position of Paint 1', -100, 100, 0, 1],
	YPN2: ['Vertical Position of Paint 2', -100, 100, 0, 1],
	VOLM: ['Volume', 0, 100, 0, 1],
	WONK: ['Wonky', 0, 1, 0, 1],
	YEAR: ['Year', -4000, 4000, 2000, 1],
};

const IGNORED_FONTS = [
	'Victor Mono', // The local version includes obliques.
];

export default function processGoogleFonts(rawJson) {
	return rawJson.items
		.filter(font => !IGNORED_FONTS.includes(font.family))
		.map(font => {
			const name = font.family;
			const hrefBase = `https://fonts.googleapis.com/css2?family=${name.replace(/ /g, '+')}`;

			const isVariable = !!font.axes;
			const commonProperties = {
				name,
				category: font.category,
			};
			if (isVariable) {
				commonProperties.isVariable = true;
			}

			let additionalProperties = {};
			if (isVariable) {
				// Switch from Google’s object format to our expected format.
				const { wght, ital, wdth, ...axes } = font.axes.reduce((acc, cur) => {
					const { tag, start, end } = cur;
					const [label, _min, _max, defaultValue, step] = GOOGLE_AXIS_DEFINITIONS[tag];
					acc[tag] = [label, start, end, defaultValue, step];
					return acc;
				}, {});

				// A lot of Google fonts with variable axes may still have a static `ital` axis.
				// As of 2024-12-28, Google doesn’t differentiate between a font with a variable
				// `ital` axis (eg. EB Garamond), and a font with a static 0|1 `font-style: italic`
				// switch. I’m not really sure how to handle this, but my current thinking is that
				// any variable font with italics should automatically have a 0..1 `ital` slider.
				if (ital) {
					// Warn if the above comment becomes outdated.
					console.warn(
						'Google may have changed their API to include a variable `ital` axis for variable fonts. This script assumes italics are defined in the `variants` property. Please update the script.'
					);
				}
				const hasItalics = font.variants.includes('italic');
				const variant = {};
				if (wght) variant.weight = [[wght[1], wght[2]]];
				if (hasItalics) variant.italic = [[0, 1]];
				if (wdth) variant.width = [[wdth[1], wdth[2]]];
				const variants = [variant];

				const href = `${hrefBase}:${font.axes
					.sort(({ tag: tagA }, { tag: tagB }) => tagA.localeCompare(tagB))
					// Form a string like "ital,opsz,wght@0..1,8..30,100..900".
					.reduce(
						(acc, { tag, start, end }) => {
							acc[0].push(tag);
							acc[1].push(`${start}..${end}`);
							return acc;
						},
						[[], []]
					)
					.map(arr => arr.join(','))
					.join('@')}&display=block`;

				additionalProperties = {
					href,
					variants,
				};
				if (Object.keys(axes).length) {
					additionalProperties.axes = axes;
				}
			} else {
				const [regularWeights, italicWeights] = font.variants.reduce(
					(acc, variant) => {
						const [regularWeights, italicWeights] = acc;
						if (variant === 'regular') regularWeights.push(WEIGHT_REGULAR);
						else if (variant === 'italic') italicWeights.push(WEIGHT_REGULAR);
						else {
							const [, weight, isItalic] = variant.match(/([0-9]+)(italic)?/);
							(isItalic ? italicWeights : regularWeights).push(weight);
						}
						return acc;
					},
					[[], []]
				);

				const href = `${hrefBase}:ital,wght@${[regularWeights, italicWeights]
					.flatMap((arr, i) => arr.map(weight => `${i},${weight}`))
					.join(';')}&display=block`;
				const variants = [
					...(regularWeights.length ? [{ weight: regularWeights, italic: 0 }] : []),
					...(italicWeights.length ? [{ weight: italicWeights, italic: 1 }] : []),
				];

				additionalProperties = {
					href,
					variants,
				};
			}

			return {
				...commonProperties,
				...additionalProperties,
			};
		});
}

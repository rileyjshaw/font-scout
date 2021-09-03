import googleFonts from './googleFonts.js';
import localFonts from './localFonts.js';
import { REGULAR, WEIGHTS, STRETCH_ORDER, SINGLE_VARIANT_COLLECTION, UNCATEGORIZED_COLLECTION } from './constants.js';

const allFonts = [...googleFonts, ...localFonts]
	.map(font => ({
		name: font.name,
		href: font.href,
		variants: [
			...font.weights.map(weight => ({
				weight: WEIGHTS[weight].value,
				name: WEIGHTS[weight].name,
				style: 'normal',
				stretch: 'normal',
			})),
			...(typeof font.italics === 'boolean' ? (font.italics ? font.weights : []) : font.italics).map(weight => ({
				weight: WEIGHTS[weight].value,
				name: [WEIGHTS[weight].name, 'italic'].filter(x => x).join(' '),
				style: 'italic',
				stretch: 'normal',
			})),
			...(font.stretches
				? Reflect.ownKeys(font.stretches).flatMap(weight => {
						const { values, italics } = font.stretches[weight];
						const variants = values.map(stretch => ({
							weight: WEIGHTS[weight].value,
							name: [WEIGHTS[weight].name, stretch].filter(x => x).join(' '),
							style: 'normal',
							stretch,
						}));
						return italics
							? [
									...variants,
									...variants.map(variant => ({
										...variant,
										name: [WEIGHTS[weight].name, italics ? 'italic' : '', variant.stretch].filter(x => x).join(' '),
										style: 'italic',
									})),
							  ]
							: variants;
				  })
				: []),
		]
			.map(variant => {
				const fontName = font.aliases?._font ?? font.name;
				const variantName = font.aliases?.[variant.name || '_regular'] ?? variant.name;
				return {
					...variant,
					name: [fontName, variantName].filter(x => x).join(' '),
				};
			})
			.sort(
				(a, b) =>
					a.weight -
					b.weight +
					((a.style === 'italic') - (b.style === 'italic')) * 10 +
					(STRETCH_ORDER.indexOf(a.stretch) - STRETCH_ORDER.indexOf(b.stretch))
			),
		show: true,
		marked: false,
		sizeOffset: 1,
		collections: font.collections ?? [],
	}))
	.sort((a, b) => a.name.localeCompare(b.name));
allFonts.forEach(font => {
	if (font.variants.length === 1) font.collections.push(SINGLE_VARIANT_COLLECTION);
	// else if (font variants contains regular, italic, and bold) font.collections.push(BODY_SAFE_COLLECTION);
	else if (font.collections.length === 0) font.collections.push(UNCATEGORIZED_COLLECTION);
});
allFonts.forEach(
	font =>
		(font.activeVariant = Math.max(
			0,
			font.variants.findIndex(
				variant =>
					variant.weight === WEIGHTS[REGULAR].value && variant.style === 'normal' && variant.stretch === 'normal'
			)
		))
);

export default allFonts;

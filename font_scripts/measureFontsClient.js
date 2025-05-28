// Expands an object with arrays of values into an array of objects with all possible combinations of values.
// For example, generatePermutations({ weight: [400, 700], italic: [false, true] }) returns:
// [{ weight: 400, italic: false }, { weight: 400, italic: true }, { weight: 700, italic: false }, { weight: 700, italic: true }]
function generatePermutations(options) {
	return Object.entries(options).reduce(
		(results, [key, values]) =>
			results.flatMap(result =>
				Array.isArray(values)
					? values.map(value => ({
							...result,
							[key]: value,
					  }))
					: [
							{
								...result,
								[key]: values,
							},
					  ]
			),
		[{}]
	);
}
// ^ copied from utils.js.

const notice = document.createElement('p');
const fontFamily = document.createElement('span');
const progress = document.createElement('span');
fontFamily.textContent = '(waiting)';
progress.textContent = '0';
notice.append('Keep open. Measuring ');
notice.append(fontFamily);
notice.append('; ');
notice.append(progress);
notice.append('%');
Object.assign(notice.style, {
	position: 'fixed',
	top: '50%',
	left: '50%',
	width: '100%',
	transform: 'translate(-50%, -50%)',
	textAlign: 'center',
	font: 'normal normal normal normal 1em -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
});
document.body.append(notice);

const alphabet = Array.from({ length: 26 }, (_, i) => [String.fromCharCode(65 + i), String.fromCharCode(97 + i)])
	.flat()
	.concat(Array.from({ length: 10 }, (_, i) => i));
const [widthProbe, heightProbe] = [
	alphabet
		.flatMap(
			letter1 => `<span>${letter1}</span> ${alphabet.map(letter2 => `<span>${letter1}${letter2}</span>`).join('')}`
		)
		.join(''),
	alphabet.join('\n'),
].map(innerHTML => {
	const probe = document.createElement('div');
	probe.innerHTML = innerHTML;
	Object.assign(probe.style, {
		display: 'inline-block',
		whiteSpace: 'pre',
	});
	document.body.append(probe);
	return probe;
});
const characterWidthProbes = Array.from(widthProbe.querySelectorAll('span'));

/*global allFonts*/
const nVariants = allFonts.reduce((acc, font) => acc + font.variants.length, 0);
document.fonts.ready.then(async () => {
	const processedFonts = [];
	let variantIdx = 0;
	for (const font of allFonts) {
		const bestVariants = {
			width: {
				value: 0,
				variant: null,
			},
			height: {
				value: 0,
				variant: null,
			},
			size: {
				value: 0,
				variant: null,
			},
		};
		fontFamily.textContent = font.name;

		const variantsWithStats = [];
		for (const variant of font.variants) {
			const permutations = generatePermutations(variant);
			for (const permutation of permutations) {
				const style = {
					fontFamily: font.name,
					fontStyle: permutation.italic ? 'italic' : permutation.oblique ? 'oblique' : 'normal',
					fontWeight: permutation.weight,
					fontStretch: permutation.width,
					overflow: 'hidden',
				};
				Object.assign(document.body.style, style);
				await new Promise(r => setTimeout(r, 400));
				const characterWidths = characterWidthProbes.map(span => span.getBoundingClientRect().width);
				const width = widthProbe.getBoundingClientRect().width;
				const height = heightProbe.getBoundingClientRect().height;
				const size = width * height;

				variantsWithStats.push({
					variant: permutation,
					characterWidths,
					width,
					height,
					size,
				});
			}
			progress.textContent = Math.round((++variantIdx / nVariants) * 100);
		}

		for (const variant of variantsWithStats) {
			if (variant.width > bestVariants.width.value) {
				bestVariants.width.variant = variant.variant;
				bestVariants.width.value = variant.width;
			}
			if (variant.height > bestVariants.height.value) {
				bestVariants.height.variant = variant.variant;
				bestVariants.height.value = variant.height;
			}
			if (variant.size > bestVariants.size.value) {
				bestVariants.size.variant = variant.variant;
				bestVariants.size.value = variant.size;
			}
		}

		// A font is multiplexed if for any set fontStyle and fontWidth, the
		// measured width is the same. Just to be safe, we also check that the
		// width is the same across all characterWidthProbes.
		const groupedVariants = variantsWithStats.reduce((acc, variant) => {
			const key = `${variant.variant.style} ${variant.variant.width}`;
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(variant);
			return acc;
		}, {});
		const groupedVariantsWithMultipleWeights = Object.values(groupedVariants).filter(variants => variants.length > 1);
		let isMultiplexed;
		if (!groupedVariantsWithMultipleWeights.length) {
			isMultiplexed = false;
		} else {
			isMultiplexed = true;
			for (const variants of groupedVariantsWithMultipleWeights) {
				if (
					variants
						.slice(1)
						.some(
							variant =>
								variant.width !== variants[0].width ||
								variant.characterWidths.some((width, i) => width !== variants[0].characterWidths[i])
						)
				) {
					isMultiplexed = false;
					break;
				}
			}
		}

		processedFonts.push({
			name: font.name,
			href: font.href,
			bestVariants,
			isMultiplexed,
		});
	}

	const allFontsSorted = ['width', 'height', 'size'].reduce((acc, property) => {
		acc[property] = processedFonts
			.sort((a, b) => b.bestVariants[property].value - a.bestVariants[property].value)
			.map(font => ({
				name: font.name,
				href: font.href,
				variant: font.bestVariants[property].variant,
			}));
		return acc;
	}, {});

	await fetch('/results', {
		method: 'POST',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(allFontsSorted),
	});

	const multiplexedFonts = new Set();
	for (const font of processedFonts) {
		if (font.isMultiplexed) {
			multiplexedFonts.add(font.name);
		}
	}
	await fetch('/multiplexed', {
		method: 'POST',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(Array.from(multiplexedFonts).sort((a, b) => a.localeCompare(b))),
	});

	await fetch('/done', {
		method: 'POST',
	});
});

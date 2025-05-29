function getWeights(variants) {
	return [
		...new Set(
			variants.flatMap(variant => {
				// For variable weights, generate weights in increments of 100.
				if (Array.isArray(variant.weight)) {
					const [min, max] = variant.weight;
					const weights = [];
					for (let weight = min; weight < max; weight += 100) {
						weights.push(weight);
					}
					weights.push(max);
					return weights;
				}
				// Otherwise, just return the static weight.
				return [variant.weight];
			})
		),
	];
}

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
const nVariants = allFonts.reduce((acc, font) => acc + getWeights(font.variants).length, 0);
document.fonts.ready.then(async () => {
	const measuredFonts = [];
	let variantIdx = 0;
	for (const font of allFonts) {
		fontFamily.textContent = font.name;

		const perWeightStats = [];
		const weights = getWeights(font.variants);
		for (const weight of weights) {
			const style = {
				fontFamily: font.name,
				fontWeight: weight,
				overflow: 'hidden',
			};
			Object.assign(document.body.style, style);
			await new Promise(r => setTimeout(r, 300));
			const characterWidths = characterWidthProbes.map(span => span.getBoundingClientRect().width);
			const width = widthProbe.getBoundingClientRect().width;
			const height = heightProbe.getBoundingClientRect().height;
			const size = width * height;

			perWeightStats.push({
				weight,
				characterWidths,
				width,
				height,
				size,
			});
			progress.textContent = Math.round((++variantIdx / nVariants) * 100);
		}

		// A font is multiplexed if for any set font weight, the measured width
		// is the same. Just to be safe, we also check that the width is the
		// same across all characterWidthProbes.
		const isMultiplexed =
			perWeightStats.length > 1 &&
			perWeightStats
				.slice(1)
				.every(
					stats =>
						stats.width === perWeightStats[0].width &&
						stats.characterWidths.every((width, i) => width === perWeightStats[0].characterWidths[i])
				);

		const result = {
			name: font.name,
			measurements: perWeightStats,
		};
		if (isMultiplexed) {
			result.isMultiplexed = true;
		}
		measuredFonts.push(result);
	}

	await fetch('/results', {
		method: 'POST',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(measuredFonts),
	});

	const multiplexedFonts = measuredFonts
		.filter(font => font.isMultiplexed)
		.map(font => font.name)
		.sort((a, b) => a.localeCompare(b));

	await fetch('/multiplexed', {
		method: 'POST',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(multiplexedFonts),
	});

	await fetch('/done', {
		method: 'POST',
	});
});

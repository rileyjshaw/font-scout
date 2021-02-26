const notice = document.createElement('p');
notice.innerText = 'Measuring fonts; keep this window open.';
Object.assign(notice.style, {
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	font:
		'normal normal normal normal 1em -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
});
document.body.append(notice);

const alphabet = Array.from({ length: 26 }, (_, i) => [String.fromCharCode(65 + i), String.fromCharCode(97 + i)])
	.flat()
	.concat(Array.from({ length: 10 }, (_, i) => i));
const [widthProbe, heightProbe] = [
	alphabet.flatMap(letter1 => alphabet.map(letter2 => `${letter1}${letter2}`).join('')).join(''),
	alphabet.join('\n'),
].map(textContent => {
	const probe = document.createElement('div');
	probe.textContent = textContent;
	Object.assign(probe.style, {
		display: 'inline-block',
		whiteSpace: 'pre',
	});
	document.body.append(probe);
	return probe;
});

document.fonts.ready.then(async () => {
	const unsortedBestVariants = [];
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

		for (const variant of font.variants) {
			const style = {
				fontFamily: font.name,
				fontStyle: variant.style,
				fontWeight: variant.weight,
				fontStretch: variant.stretch,
				overflow: 'visible',
			};
			Object.assign(document.body.style, style);
			await new Promise(r => setTimeout(r, 400));
			const width = widthProbe.getBoundingClientRect().width;
			const height = heightProbe.getBoundingClientRect().height;
			const size = width * height;

			if (width > bestVariants.width.value) {
				bestVariants.width.variant = variant;
				bestVariants.width.value = width;
			}
			if (height > bestVariants.height.value) {
				bestVariants.height.variant = variant;
				bestVariants.height.value = height;
			}
			if (size > bestVariants.size.value) {
				bestVariants.size.variant = variant;
				bestVariants.size.value = size;
			}
		}
		unsortedBestVariants.push({
			name: font.name,
			href: font.href,
			bestVariants,
		});
	}

	const allFontsSorted = ['width', 'height', 'size'].reduce((acc, property) => {
		acc[property] = unsortedBestVariants
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
});

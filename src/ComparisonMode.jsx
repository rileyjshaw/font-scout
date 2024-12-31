import { useEffect, useState } from 'react';
import useKeypress from 'react-use-keypress';

function ComparisonMode({ markedFonts, Preview, setComparisonMode, loadFont }) {
	const [comparisonIdx, setComparisonIdx] = useState(0);

	useKeypress('Escape', () => {
		setComparisonMode(false);
		setComparisonIdx(0);
	});
	useKeypress('ArrowLeft', () => {
		setComparisonIdx(i => (markedFonts.length + (i - 1)) % markedFonts.length);
	});
	useKeypress('ArrowRight', () => {
		setComparisonIdx(i => (i + 1) % markedFonts.length);
	});

	const comparisonFont = markedFonts[comparisonIdx];
	console.log(comparisonFont);
	useEffect(() => {
		if (loadFont) loadFont(comparisonFont);
	}, [comparisonFont, loadFont]);

	return (
		<div className="comparison-mode">
			<div className="font-preview-wrapper">
				<pre
					className="font-preview"
					style={{
						fontFamily: `"${comparisonFont.name}"`,
						fontWeight: comparisonFont.variants[comparisonFont.activeVariant].weight,
						fontSize: `${comparisonFont.sizeOffset}em`,
						fontStyle: comparisonFont.variants[comparisonFont.activeVariant].style,
						fontStretch: comparisonFont.variants[comparisonFont.activeVariant].stretch,
					}}
				>
					<Preview />
				</pre>
			</div>
			<div className="comparison-mode-font-name">{comparisonFont.variants[comparisonFont.activeVariant].name}</div>
		</div>
	);
}

export default ComparisonMode;

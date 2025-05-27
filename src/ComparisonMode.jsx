import { useEffect, useMemo, useState } from 'react';
import useKeypress from 'react-use-keypress';

import { FontPreview } from './FontContainer';
import { allFontsByName } from './allFonts';

function ComparisonMode({ markedFonts, hiddenFonts, Preview, setIsComparisonMode, loadFont }) {
	const [comparisonIdx, setComparisonIdx] = useState(0);

	const comparisonFonts = useMemo(() => {
		return Array.from(markedFonts.difference(hiddenFonts));
	}, [markedFonts, hiddenFonts]);

	useKeypress('Escape', () => {
		setIsComparisonMode(false);
		setComparisonIdx(0);
	});
	useKeypress('ArrowLeft', () => {
		setComparisonIdx(i => (comparisonFonts.length + (i - 1)) % comparisonFonts.length);
	});
	useKeypress('ArrowRight', () => {
		setComparisonIdx(i => (i + 1) % comparisonFonts.length);
	});

	const comparisonFont = allFontsByName[comparisonFonts[comparisonIdx]];

	useEffect(() => {
		if (loadFont) loadFont(comparisonFont);
	}, [comparisonFont, loadFont]);

	return (
		<div className="h-dvh w-screen flex items-center justify-center flex-col relative">
			<FontPreview font={comparisonFont} settings={comparisonFont.settings} Preview={Preview} />
			<div className="absolute bottom-9 text-gray-300">{comparisonFont.name}</div>
		</div>
	);
}

export default ComparisonMode;

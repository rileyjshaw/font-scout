import { useCallback, useMemo, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { getPreviewComponent } from './Preview';
import ComparisonMode from './ComparisonMode';
import ExplorationMode from './ExplorationMode';

import allFonts from './allFonts.js';
import { defaultPreviews, LOCAL_FONTS_COLLECTION } from './constants.js';

import './App.css';

const helmetContext = {};

const allFontsWithIndex = allFonts.map((font, i) => ({
	...font,
	originalIndex: i,
}));

function App() {
	const [[defaultPreviewContent, defaultFontSize, defaultAlignment, defaultListMode], setDefaultPreview] = useState(
		() => defaultPreviews[Math.floor(Math.random() * defaultPreviews.length)]
	);
	const [comparisonMode, setComparisonMode] = useState(false);
	const [loadedStylesheets, setLoadedStylesheets] = useState({});
	const [fonts, setFonts] = useState(allFontsWithIndex);
	const [configMode, setConfigMode] = useState(true);
	const [fontSize, setFontSize] = useState(defaultFontSize);
	const [lineHeight, setLineHeight] = useState(1.7);
	const [fontWeight, setFontWeight] = useState(400);
	const [previewContent, setPreviewContent] = useState(null);
	const [alignment, setAlignment] = useState(defaultAlignment);
	const [includedCollections, setIncludedCollections] = useState(() => [LOCAL_FONTS_COLLECTION]);
	const [includeMethod, setIncludeMethod] = useState('ALL');
	const [excludedCollections, setExcludedCollections] = useState(() => []);
	const [excludeMethod, setExcludeMethod] = useState('ANY');
	const [listMode, setListMode] = useState(defaultListMode);
	const [isShowingTitles, setIsShowingTitles] = useState(false);

	const loadFont = useCallback(
		font => {
			if (font.href) {
				setLoadedStylesheets(prevLoadedStylesheets => {
					if (prevLoadedStylesheets[font.name]) return prevLoadedStylesheets;
					return {
						...prevLoadedStylesheets,
						[font.name]: font.href,
					};
				});
			}
		},
		[setLoadedStylesheets]
	);

	const unsetDefaultPreview = useCallback(() => {
		if (defaultPreviewContent) setDefaultPreview(['', defaultFontSize, defaultAlignment]);
	}, [defaultAlignment, defaultFontSize, defaultPreviewContent]);

	const markedFonts = fonts.filter(font => font.marked && font.show);
	const Preview = useMemo(
		() => getPreviewComponent(previewContent ?? defaultPreviewContent),
		[defaultPreviewContent, previewContent]
	);

	const appStyles = useMemo(
		() => ({
			'--font-preview-size': `${fontSize}px`,
			'--font-preview-line-height': lineHeight,
			'--font-preview-align': alignment,
		}),
		[fontSize, lineHeight, alignment]
	);

	return (
		<HelmetProvider context={helmetContext}>
			<>
				<div className="app" style={appStyles}>
					<Helmet>
						{Object.entries(loadedStylesheets).map(([name, href]) => (
							<link key={name} href={href} rel="stylesheet" type="text/css" />
						))}
					</Helmet>
					{comparisonMode ? (
						<ComparisonMode
							markedFonts={markedFonts}
							Preview={Preview}
							setComparisonMode={setComparisonMode}
							loadFont={loadFont}
						/>
					) : (
						<>
							<ExplorationMode
								configMode={configMode}
								setConfigMode={setConfigMode}
								fontSize={fontSize}
								setFontSize={setFontSize}
								lineHeight={lineHeight}
								setLineHeight={setLineHeight}
								fontWeight={fontWeight}
								setFontWeight={setFontWeight}
								defaultPreviewContent={defaultPreviewContent}
								unsetDefaultPreview={unsetDefaultPreview}
								previewContent={previewContent}
								setPreviewContent={setPreviewContent}
								alignment={alignment}
								setAlignment={setAlignment}
								includedCollections={includedCollections}
								setIncludedCollections={setIncludedCollections}
								includeMethod={includeMethod}
								setIncludeMethod={setIncludeMethod}
								excludedCollections={excludedCollections}
								setExcludedCollections={setExcludedCollections}
								excludeMethod={excludeMethod}
								setExcludeMethod={setExcludeMethod}
								listMode={listMode}
								setListMode={setListMode}
								isShowingTitles={isShowingTitles}
								setIsShowingTitles={setIsShowingTitles}
								allFontsWithIndex={allFontsWithIndex}
								fonts={fonts}
								loadFont={loadFont}
								setFonts={setFonts}
								Preview={Preview}
							/>
							{markedFonts.length > 1 && (
								<button className="start-comparison-button" onClick={() => setComparisonMode(true)}>
									Compare {markedFonts.length} marked fonts
								</button>
							)}
						</>
					)}
				</div>
			</>
		</HelmetProvider>
	);
}

export default App;

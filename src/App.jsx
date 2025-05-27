import { useCallback, useMemo, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { PinOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getPreviewComponent } from './Preview';
import ComparisonMode from './ComparisonMode';
import ExplorationMode from './ExplorationMode';
import { defaultPreviews, LOCAL_FONTS_COLLECTION } from './constants.js';

import './App.css';

const helmetContext = {};

function App() {
	const [
		[defaultPreviewContent, defaultFontSize, defaultLineHeight, defaultWeight, defaultAlignment, defaultListMode],
		// setDefaultPreview,
	] = useState(() => defaultPreviews[Math.floor(Math.random() * defaultPreviews.length)]);
	const [isComparisonMode, setIsComparisonMode] = useState(false);
	const [loadedStylesheets, setLoadedStylesheets] = useState({});
	const [configMode, setConfigMode] = useState(true);
	const [fontSize, setFontSize] = useState(defaultFontSize);
	const [globalLineHeight, setGlobalLineHeight] = useState(defaultLineHeight);
	const [globalFontWeight, setGlobalFontWeight] = useState(defaultWeight);
	const [previewContent, setPreviewContent] = useState(null);
	const [alignment, setAlignment] = useState(defaultAlignment);
	const [includedCollections, setIncludedCollections] = useState(() => [LOCAL_FONTS_COLLECTION]);
	const [includeMethod, setIncludeMethod] = useState('ALL');
	const [excludedCollections, setExcludedCollections] = useState(() => []);
	const [excludeMethod, setExcludeMethod] = useState('ANY');
	const [listMode, setListMode] = useState(defaultListMode);
	const [isShowingTitles, setIsShowingTitles] = useState(true);
	const [fontSettings, setFontSettings] = useState({});
	const [manuallyAdjustedSettings, setManuallyAdjustedSettings] = useState({});
	const [markedFonts, setMarkedFonts] = useState(new Set());
	const [hiddenFonts, setHiddenFonts] = useState(new Set());

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

	const Preview = useMemo(
		() => getPreviewComponent(previewContent || defaultPreviewContent),
		[defaultPreviewContent, previewContent]
	);

	const appStyles = useMemo(
		() => ({
			'--font-preview-size': `${fontSize}px`,
			'--font-preview-line-height': globalLineHeight,
			'--font-preview-align': alignment,
		}),
		[fontSize, globalLineHeight, alignment]
	);

	const handleMarkFont = useCallback((name, shouldMark) => {
		setMarkedFonts(prev => {
			const next = new Set(prev);
			if (shouldMark) {
				next.add(name);
			} else {
				next.delete(name);
			}
			return next;
		});
	}, []);

	const handleMarkFontsBatch = useCallback((names, shouldMark) => {
		setMarkedFonts(prev => {
			const next = new Set(prev);
			if (shouldMark) {
				names.forEach(name => next.add(name));
			} else {
				names.forEach(name => next.delete(name));
			}
			return next;
		});
	}, []);

	const handleHideFont = useCallback((name, shouldHide) => {
		setHiddenFonts(prev => {
			const next = new Set(prev);
			if (shouldHide) {
				next.add(name);
			} else {
				next.delete(name);
			}
			return next;
		});
	}, []);

	// Keep track of manually adjusted settings.
	const handleFontSettingsChange = useCallback((settings, font, isManual) => {
		setFontSettings(prev => ({
			...prev,
			[font.name]: { ...prev[font.name], ...settings },
		}));

		setManuallyAdjustedSettings(prev => {
			const next = { ...prev };
			if (isManual) {
				next[font.name] = new Set([...(prev[font.name] || []), ...Object.keys(settings)]);
			} else if (next[font.name]) {
				Object.keys(settings).forEach(key => next[font.name].delete(key));
				if (next[font.name].size === 0) delete next[font.name];
			}
			return next;
		});
	}, []);

	const handleFontSettingsChangeBatch = useCallback((fontSettingsMap, isManual) => {
		setFontSettings(prev => {
			const next = { ...prev };
			Object.entries(fontSettingsMap).forEach(([fontName, settings]) => {
				next[fontName] = { ...prev[fontName], ...settings };
			});
			return next;
		});

		setManuallyAdjustedSettings(prev => {
			const next = { ...prev };
			Object.entries(fontSettingsMap).forEach(([fontName, settings]) => {
				if (isManual) {
					next[fontName] = new Set([...(prev[fontName] || []), ...Object.keys(settings)]);
				} else if (next[fontName]) {
					Object.keys(settings).forEach(key => next[fontName].delete(key));
					if (next[fontName].size === 0) delete next[fontName];
				}
			});
			return next;
		});
	}, []);

	return (
		<HelmetProvider context={helmetContext}>
			<>
				<div className="h-full w-full flex flex-col" style={appStyles}>
					<Helmet>
						{Object.entries(loadedStylesheets).map(([name, href]) => (
							<link key={name} href={href} rel="stylesheet" type="text/css" />
						))}
					</Helmet>
					{isComparisonMode ? (
						<ComparisonMode
							markedFonts={markedFonts}
							hiddenFonts={hiddenFonts}
							Preview={Preview}
							setIsComparisonMode={setIsComparisonMode}
							loadFont={loadFont}
						/>
					) : (
						<>
							<ExplorationMode
								configMode={configMode}
								setConfigMode={setConfigMode}
								fontSize={fontSize}
								setFontSize={setFontSize}
								globalLineHeight={globalLineHeight}
								setGlobalLineHeight={setGlobalLineHeight}
								globalFontWeight={globalFontWeight}
								setGlobalFontWeight={setGlobalFontWeight}
								defaultPreviewContent={defaultPreviewContent}
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
								loadFont={loadFont}
								Preview={Preview}
								fontSettings={fontSettings}
								setFontSettings={setFontSettings}
								markedFonts={markedFonts}
								hiddenFonts={hiddenFonts}
								onChangeMarked={handleMarkFont}
								onChangeMarkedBatch={handleMarkFontsBatch}
								onChangeHidden={handleHideFont}
								manuallyAdjustedSettings={manuallyAdjustedSettings}
								onChangeFontSettings={handleFontSettingsChange}
								onChangeFontSettingsBatch={handleFontSettingsChangeBatch}
							/>
							{markedFonts.size > 1 && (
								<div className="flex gap-2 fixed bottom-8 left-1/2 -translate-x-1/2 align-stretch">
									<Button
										className="rounded-full font-semibold px-5 h-10 bg-green-400 text-secondary-foreground hover:bg-green-300 shadow-lg"
										onClick={() => setIsComparisonMode(true)}
										size="lg"
									>
										Compare {markedFonts.size} marked fonts
									</Button>
									<Button
										className="rounded-full h-10 w-10 p-0 bg-white text-foreground hover:bg-red-50 shadow-lg"
										onClick={() => setMarkedFonts(new Set())}
									>
										<PinOff className="w-3 h-3" />
									</Button>
								</div>
							)}
						</>
					)}
				</div>
			</>
		</HelmetProvider>
	);
}

export default App;

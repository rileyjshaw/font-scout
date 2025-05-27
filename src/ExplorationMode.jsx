import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { FixedSizeGrid as Grid, areEqual } from 'react-window';
import useKeypress from 'react-use-keypress';
import useResizeObserver from '@react-hook/resize-observer';
import { ChevronUp, ChevronDown, AlignLeft, AlignCenter, AlignRight, RectangleVertical, Columns2 } from 'lucide-react';

import allFonts, { allFontsByName } from './allFonts.js';
import { cn, getNearestValue } from '@/lib/utils';
import { Input } from './components/ui/input';
import { Select } from './components/ui/select';
import { TextArea } from './components/ui/textarea';
import FontContainer, { FontPreview } from './FontContainer';
import { COLLECTION_GROUPS, LOCAL_FONTS_COLLECTION, MIN_COLUMN_WIDTH } from './constants.js';
import sizeSortedFontVariants from './size_sorted_font_variants.json'; // assert { type: 'json' };

const collectionOptions = COLLECTION_GROUPS.map(group => ({
	...group,
	options: Object.entries(group.options).map(([value, label]) => ({
		value,
		label,
	})),
}));

function useSize(target) {
	const [size, setSize] = useState({ width: 0, height: 0 });

	useLayoutEffect(() => {
		setSize(target.current.getBoundingClientRect());
	}, [target]);

	useResizeObserver(target, entry => setSize(entry.contentRect));
	return size;
}

function matchedFontsFromCollections(includedCollections, includeMethod, excludedCollections, excludeMethod) {
	if (!includedCollections.length) return false;
	const includeArrayMethod = includeMethod === 'ANY' ? 'some' : 'every';
	const excludeArrayMethod = excludeMethod === 'ANY' ? 'some' : 'every';
	const matchedFonts = allFonts.filter(
		({ collections }) =>
			includedCollections[includeArrayMethod](collection => collections.includes(collection)) &&
			!(
				excludedCollections.length &&
				excludedCollections[excludeArrayMethod](collection => collections.includes(collection))
			)
	);
	if (!matchedFonts.length) return false;
	return matchedFonts.reduce((acc, font) => {
		acc[font.name] = font;
		return acc;
	}, {});
}

const GridCell = React.memo(function GridCell({ columnIndex, rowIndex, style, data }) {
	const { columnCount, visibleFonts, fontSettings, markedFonts, hiddenFonts, ...props } = data;
	const font = visibleFonts[columnIndex + rowIndex * columnCount];
	return font ? (
		<FontContainer
			font={font}
			isMarked={markedFonts.has(font.name)}
			isHidden={hiddenFonts.has(font.name)}
			settings={fontSettings[font.name] ?? {}}
			style={style}
			{...props}
		/>
	) : null;
}, areEqual);

function ExplorationMode({
	configMode,
	setConfigMode,
	fontSize,
	setFontSize,
	globalLineHeight,
	setGlobalLineHeight,
	globalFontWeight,
	setGlobalFontWeight,
	defaultPreviewContent,
	previewContent,
	setPreviewContent,
	alignment,
	setAlignment,
	includedCollections,
	setIncludedCollections,
	includeMethod,
	setIncludeMethod,
	excludedCollections,
	setExcludedCollections,
	excludeMethod,
	setExcludeMethod,
	listMode,
	setListMode,
	isShowingTitles,
	setIsShowingTitles,
	loadFont,
	Preview,
	fontSettings,
	markedFonts,
	hiddenFonts,
	onChangeMarked,
	onChangeMarkedBatch,
	onChangeHidden,
	manuallyAdjustedSettings,
	onChangeFontSettings,
	onChangeFontSettingsBatch,
}) {
	const gridRef = useRef(null);
	const probeRef = useRef(null);
	const { height: probeHeight } = useSize(probeRef);
	const { width: gridWidth, height: gridHeight } = useSize(gridRef);
	const [filterText, setFilterText] = useState('');
	const [isShowingFilter, setIsShowingFilter] = useState(false);
	const matchedFonts = useMemo(
		() => matchedFontsFromCollections(includedCollections, includeMethod, excludedCollections, excludeMethod),
		[includedCollections, includeMethod, excludedCollections, excludeMethod]
	);

	const columnCount = listMode === 'grid' ? Math.max(Math.floor(gridWidth / MIN_COLUMN_WIDTH), 1) : 1;
	const columnWidth = gridWidth / columnCount;

	const [visibleFonts, bigFonts] = useMemo(() => {
		const [selectedFonts, unselectedFonts] = matchedFonts
			? Object.values(matchedFonts).reduce(
					(acc, font) => {
						const [_selectedFonts, _unselectedFonts] = acc;
						(hiddenFonts.has(font.name) ? _unselectedFonts : _selectedFonts).push(font);
						return acc;
					},
					[[], []]
			  )
			: [[], []];
		const listedFonts = configMode ? [...selectedFonts, ...unselectedFonts] : selectedFonts;

		const filteredFonts = filterText
			? listedFonts.filter(font => font.name.toLowerCase().includes(filterText.toLowerCase()))
			: listedFonts;

		// Our virtual grid needs to know the height of the tallest font, since it doesn’t handle dynamic row heights.
		// We measure all fonts with manually adjusted settings, since their new settings might make them taller than
		// the tallest untweaked font. Then we take the 3 biggest untweaked fonts in each category.
		// TODO: This doesn’t actually make sense. We should look through whatever variants are actually being shown,
		//       not their biggest variants. For instance, even if the interface is showing hairline weights right now,
		//       the “biggest” fonts that are matched are based on their size at ultra-bold, then rendered at hairline.
		const bigFonts = [];
		filteredFonts.forEach(font => {
			if (manuallyAdjustedSettings[font.name]) {
				bigFonts.push({
					font,
					settings: fontSettings[font.name] ?? {},
				});
			}
		});

		const visibleFontNames = new Set(filteredFonts.map(font => font.name));
		const untweakedBigFonts = new Set();
		Object.values(sizeSortedFontVariants).forEach(sizeSortedList => {
			let count = 0;
			for (const { name } of sizeSortedList) {
				if (visibleFontNames.has(name) && !manuallyAdjustedSettings[name] && !untweakedBigFonts.has(name)) {
					untweakedBigFonts.add(name);
					if (++count >= 3) break;
				}
			}
		});
		bigFonts.push(
			...Array.from(untweakedBigFonts).map(name => ({
				font: allFontsByName[name],
				settings: {},
			}))
		);

		return [filteredFonts, bigFonts];
	}, [matchedFonts, configMode, fontSettings, hiddenFonts, manuallyAdjustedSettings, filterText]);

	const onChangeAllVisibleMarked = useCallback(
		marked => {
			onChangeMarkedBatch(
				visibleFonts.map(font => font.name),
				marked
			);
		},
		[visibleFonts, onChangeMarkedBatch]
	);

	const itemData = useMemo(
		() => ({
			columnCount,
			Preview,
			loadFont,
			showSettings: configMode,
			visibleFonts,
			isShowingTitles,
			fontSettings,
			markedFonts,
			hiddenFonts,
			onChangeMarked,
			onChangeHidden,
			onChangeFontSettings,
		}),
		[
			columnCount,
			configMode,
			Preview,
			loadFont,
			visibleFonts,
			isShowingTitles,
			fontSettings,
			markedFonts,
			hiddenFonts,
			onChangeMarked,
			onChangeHidden,
			onChangeFontSettings,
		]
	);

	const isEveryVisibleFontMarked = useMemo(
		() => visibleFonts.length <= markedFonts.size && visibleFonts.every(font => markedFonts.has(font.name)),
		[visibleFonts, markedFonts]
	);

	useEffect(() => {
		// Update all fonts' weights to their nearest available weight.
		const updates = allFonts.reduce((acc, font) => {
			const availableWeights = font.variantsByProperty.get('weight').keys();
			const closestWeight = getNearestValue(globalFontWeight, availableWeights);
			return {
				...acc,
				[font.name]: { weight: closestWeight },
			};
		}, {});

		onChangeFontSettingsBatch(updates, false);
	}, [globalFontWeight]);

	useKeypress(['f'], event => {
		if (event.ctrlKey || event.metaKey) {
			event.preventDefault();
			setIsShowingFilter(true);
		}
	});

	useKeypress(['Escape'], () => {
		if (isShowingFilter) {
			setIsShowingFilter(false);
			setFilterText('');
		}
	});

	return (
		<>
			<div className={cn('min-h-6 border-b shadow-sm', configMode && 'pt-4')}>
				{!configMode && (
					<div className="details">
						<span>Showing {visibleFonts.length} fonts</span>
						<button onClick={() => setIsShowingTitles(x => !x)}>{isShowingTitles ? 'Hide' : 'Show'} titles</button>
						<button onClick={() => onChangeAllVisibleMarked(!isEveryVisibleFontMarked)}>
							{isEveryVisibleFontMarked ? 'Unmark' : 'Mark'} all
						</button>
					</div>
				)}
				<button
					className={`top-0.5 right-1 absolute ${configMode ? 'active' : ''}`}
					onClick={() => setConfigMode(x => !x)}
				>
					{configMode ? <ChevronUp /> : <ChevronDown />}
				</button>
				{configMode && (
					<div className="flex flex-col">
						<div className="global-settings-row">
							<label className="self-end">
								Font size
								<Input
									className="mt-0.5"
									type="number"
									min={1}
									value={fontSize}
									onChange={e => setFontSize(+e.target.value)}
								/>
							</label>
							<label className="self-end">
								Line height
								<Input
									className="mt-0.5"
									type="number"
									min={0}
									step={0.05}
									value={globalLineHeight}
									onChange={e => setGlobalLineHeight(+e.target.value)}
								/>
							</label>
							<label className="self-end">
								Nearest weight
								<Input
									className="mt-0.5"
									type="number"
									value={globalFontWeight}
									step={50}
									min={0}
									max={1000}
									onChange={e => {
										const targetWeight = Number(e.target.value);
										setGlobalFontWeight(targetWeight);
									}}
								/>
							</label>
							<TextArea
								rows={2}
								className="preview-text-input"
								value={previewContent ?? ''}
								placeholder={defaultPreviewContent}
								onChange={e => {
									setPreviewContent(e.target.value);
								}}
							/>
							<fieldset className="alignment-options">
								<legend>Align</legend>
								<label>
									<input
										className="sr-only"
										type="radio"
										value="left"
										checked={alignment === 'left'}
										onChange={e => {
											setAlignment(e.target.value);
										}}
									/>
									<AlignLeft className={`radio-icon ${alignment === 'left' ? 'selected' : ''}`} title="Left align" />
								</label>
								<label>
									<input
										className="sr-only"
										type="radio"
										value="center"
										checked={alignment === 'center'}
										onChange={e => {
											setAlignment(e.target.value);
										}}
									/>
									<AlignCenter
										className={`radio-icon ${alignment === 'center' ? 'selected' : ''}`}
										title="Center align"
									/>
								</label>
								<label>
									<input
										className="sr-only"
										type="radio"
										value="right"
										checked={alignment === 'right'}
										onChange={e => {
											setAlignment(e.target.value);
										}}
									/>
									<AlignRight className={`radio-icon ${alignment === 'right' ? 'selected' : ''}`} title="Right align" />
								</label>
							</fieldset>
						</div>
						<div className="global-settings-row">
							<div className="flex-1 flex flex-col">
								<label
									htmlFor={'include'}
									onClick={() => setIncludeMethod(method => (method === 'ALL' ? 'ANY' : 'ALL'))}
									className="cursor-pointer"
								>
									Include fonts matching <span className="underline">{includeMethod.toLowerCase()}</span> of
								</label>
								<Select
									inputId="include"
									className="mt-0.5"
									placeholder="Include collections…"
									isMulti={true}
									isSearchable={true}
									options={collectionOptions}
									defaultValue={collectionOptions
										.flatMap(group => group.options)
										.filter(option => option.value === LOCAL_FONTS_COLLECTION)}
									onChange={collections => {
										setIncludedCollections(collections.map(collection => collection.value));
									}}
								/>
							</div>
							<div className="flex-1 flex flex-col">
								<label
									htmlFor={'exclude'}
									onClick={() => setExcludeMethod(method => (method === 'ALL' ? 'ANY' : 'ALL'))}
									className="cursor-pointer"
								>
									Exclude fonts matching <span className="underline">{excludeMethod.toLowerCase()}</span> of
								</label>
								<Select
									inputId="exclude"
									className="mt-0.5"
									placeholder="Exclude collections…"
									isMulti={true}
									isSearchable={true}
									options={collectionOptions}
									onChange={collections => {
										setExcludedCollections(collections.map(collection => collection.value));
									}}
								/>
							</div>
							<fieldset className="list-mode-options pr-1">
								<legend>Display</legend>
								<label>
									<input
										className="sr-only"
										type="radio"
										value="list"
										checked={listMode === 'list'}
										onChange={e => {
											setListMode(e.target.value);
										}}
									/>
									<RectangleVertical
										className={`radio-icon ${listMode === 'list' ? 'selected' : ''}`}
										title="List view"
									/>
								</label>
								<label>
									<input
										className="sr-only"
										type="radio"
										value="grid"
										checked={listMode === 'grid'}
										onChange={e => {
											setListMode(e.target.value);
										}}
									/>
									<Columns2 className={`radio-icon ${listMode === 'grid' ? 'selected' : ''}`} title="Grid view" />
								</label>
							</fieldset>
						</div>
					</div>
				)}
				{isShowingFilter && (
					<div className="border-t py-2 px-4 flex items-center gap-2">
						<label htmlFor="filter">Filter results</label>
						<Input
							autoFocus
							id="filter"
							type="text"
							value={filterText}
							onChange={e => setFilterText(e.target.value)}
							placeholder="Font name"
							className="flex-1"
						/>
						<button
							onClick={() => {
								setIsShowingFilter(false);
								setFilterText('');
							}}
							className="text-sm text-gray-500 hover:text-gray-700"
						>
							✕
						</button>
					</div>
				)}
			</div>
			<div className="probe" aria-hidden="true" ref={probeRef}>
				{bigFonts.map((font, i) => (
					// TODO: This is pretty hack; it mimics the spacing of the real list
					<div
						key={`${font.font.name}-${i}`}
						className="shrink-0 grow-0 px-5 py-4"
						style={{
							width: columnWidth,
						}}
					>
						<FontPreview font={font.font} settings={font.settings} Preview={Preview} loadFont={loadFont} />
					</div>
				))}
			</div>
			<div className="flex flex-grow overflow-hidden" ref={gridRef}>
				{matchedFonts ? (
					visibleFonts.length ? (
						<Grid
							className="list-none"
							columnCount={columnCount}
							columnWidth={columnWidth}
							rowCount={Math.ceil(visibleFonts.length / columnCount)}
							rowHeight={probeHeight + 80}
							height={gridHeight}
							width={gridWidth}
							itemData={itemData}
						>
							{GridCell}
						</Grid>
					) : (
						<p className="no-fonts-warning">
							<strong>No fonts to display.</strong> Select one or more fonts in config mode.
						</p>
					)
				) : (
					<p className="no-fonts-warning">
						<strong>No fonts to display.</strong> Include more categories in config mode.
					</p>
				)}
			</div>
		</>
	);
}

export default ExplorationMode;

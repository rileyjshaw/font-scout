import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Select from 'react-select';
import { FixedSizeGrid as Grid, areEqual } from 'react-window';
import useResizeObserver from '@react-hook/resize-observer';
import {
	LuChevronUp,
	LuChevronDown,
	LuAlignLeft,
	LuAlignCenter,
	LuAlignRight,
	LuRectangleVertical,
	LuColumns2,
} from 'react-icons/lu';

import FontContainer, { FontPreview } from './FontContainer';
import { COLLECTION_GROUPS, LOCAL_FONTS_COLLECTION, MIN_COLUMN_WIDTH } from './constants.js';
import sizeSortedFontVariants from './size_sorted_font_variants.json'; // assert { type: 'json' };

function setDeepValue(object, value, ...keys) {
	keys.reduce((branch, key, i, { length }) => {
		if (i + 1 === length) {
			branch[key] = Math.max(branch[key] ?? 0, value);
		} else {
			branch[key] = branch[key] ?? {};
		}
		return branch[key];
	}, object);
}

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

function matchedFontsFromCollections(includedCollections, includeMethod, excludedCollections, excludeMethod, fonts) {
	const includeArrayMethod = includeMethod === 'ANY' ? 'some' : 'every';
	const excludeArrayMethod = excludeMethod === 'ANY' ? 'some' : 'every';
	const matchedFonts = fonts.filter(
		({ collections }) =>
			includedCollections.length &&
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
	const { columnCount, visibleFonts, ...props } = data;
	const font = visibleFonts[columnIndex + rowIndex * columnCount];
	return font ? <FontContainer font={font} style={style} {...props} /> : null;
}, areEqual);

function ExplorationMode({
	configMode,
	setConfigMode,
	fontSize,
	setFontSize,
	lineHeight,
	setLineHeight,
	fontWeight,
	setFontWeight,
	defaultPreviewContent,
	unsetDefaultPreview,
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
	allFontsWithIndex,
	fonts,
	loadFont,
	setFonts,
	Preview,
}) {
	const gridRef = useRef(null);
	const probeRef = useRef(null);
	const { height: probeHeight } = useSize(probeRef);
	const { width: gridWidth, height: gridHeight } = useSize(gridRef);
	const matchedFonts = useMemo(
		() =>
			matchedFontsFromCollections(
				includedCollections,
				includeMethod,
				excludedCollections,
				excludeMethod,
				allFontsWithIndex
			),
		[includedCollections, includeMethod, excludedCollections, excludeMethod, allFontsWithIndex]
	);

	const columnCount = listMode === 'grid' ? Math.max(Math.floor(gridWidth / MIN_COLUMN_WIDTH), 1) : 1;

	const [visibleFonts, bigFonts] = useMemo(() => {
		const [selectedFonts, unselectedFonts] = matchedFonts
			? fonts
					.filter(font => matchedFonts[font.name])
					.reduce(
						(acc, font) => {
							const [_selectedFonts, _unselectedFonts] = acc;
							(font.show ? _selectedFonts : _unselectedFonts).push(font);
							return acc;
						},
						[[], []]
					)
			: [[], []];
		const visibleFonts = configMode ? [...selectedFonts, ...unselectedFonts] : selectedFonts;
		const visibleFontNames = visibleFonts.reduce((acc, font) => {
			acc[font.name] = true;
			return acc;
		}, {});

		const bigFontMap = {};
		Object.values(sizeSortedFontVariants).forEach(sortedList => {
			for (const { name, href, variant } of sortedList) {
				if (visibleFontNames[name]) {
					setDeepValue(bigFontMap, 1, name, 'variants', variant.weight, variant.style, variant.stretch);
					if (href) bigFontMap[name].href = href;
					break;
				}
			}
		});
		visibleFonts
			.filter(font => font.sizeOffset > 1)
			.forEach(offsetFont => {
				Object.values(sizeSortedFontVariants).forEach(sortedList => {
					const { variant: biggestVariant } = sortedList.find(font => font.name === offsetFont.name);
					if (biggestVariant) {
						setDeepValue(
							bigFontMap,
							offsetFont.sizeOffset,
							offsetFont.name,
							'variants',
							biggestVariant.weight,
							biggestVariant.style,
							biggestVariant.stretch
						);
						if (offsetFont.href) bigFontMap[offsetFont.name].href = offsetFont.href;
					}
				});
			});

		const bigFonts = Object.entries(bigFontMap).flatMap(([name, { href, variants }]) =>
			Object.entries(variants).flatMap(([weight, _obj2]) =>
				Object.entries(_obj2).flatMap(([style, _obj3]) =>
					Object.entries(_obj3).map(([stretch, sizeOffset]) => ({
						font: { name, href, sizeOffset },
						variant: { weight, style, stretch },
					}))
				)
			)
		);

		return [visibleFonts, bigFonts];
	}, [matchedFonts, configMode, fonts]);

	const onChangeShowToggle = useCallback(
		(checked, font) => {
			const { originalIndex } = font;
			setFonts(fonts => {
				const newFonts = [...fonts];
				newFonts[originalIndex] = {
					...fonts[originalIndex],
					show: checked,
					marked: checked && fonts[originalIndex].marked,
				};
				return newFonts;
			});
		},
		[setFonts]
	);

	const onChangeMarkedToggle = useCallback(
		(checked, font) => {
			const { originalIndex } = font;
			setFonts(fonts => {
				const newFonts = [...fonts];
				newFonts[originalIndex] = {
					...fonts[originalIndex],
					marked: checked,
				};
				return newFonts;
			});
		},
		[setFonts]
	);

	const onChangeAllVisibleMarked = useCallback(
		checked => {
			setFonts(fonts => {
				const newFonts = [...fonts];
				visibleFonts.forEach(({ originalIndex }) => {
					newFonts[originalIndex] = {
						...fonts[originalIndex],
						marked: checked,
					};
				});
				return newFonts;
			});
		},
		[setFonts, visibleFonts]
	);

	const onChangeSizeOffset = useCallback(
		(sizeOffset, font) => {
			const { originalIndex } = font;
			setFonts(fonts => {
				const newFonts = [...fonts];
				newFonts[originalIndex] = {
					...fonts[originalIndex],
					sizeOffset,
				};
				return newFonts;
			});
		},
		[setFonts]
	);

	const onChangeSelect = useCallback(
		(activeVariant, font) => {
			const { originalIndex } = font;
			setFonts(fonts => {
				const newFonts = [...fonts];
				newFonts[originalIndex] = {
					...fonts[originalIndex],
					activeVariant,
				};
				return newFonts;
			});
		},
		[setFonts]
	);

	const itemData = useMemo(
		() => ({
			columnCount,
			onChangeMarkedToggle,
			onChangeSelect,
			onChangeShowToggle,
			onChangeSizeOffset,
			Preview,
			loadFont,
			showSettings: configMode,
			visibleFonts,
			isShowingTitles,
		}),
		[
			columnCount,
			configMode,
			onChangeMarkedToggle,
			onChangeSelect,
			onChangeShowToggle,
			onChangeSizeOffset,
			Preview,
			loadFont,
			visibleFonts,
			isShowingTitles,
		]
	);

	const isAllFontsMarked = useMemo(() => visibleFonts.every(font => font.marked), [visibleFonts]);
	return (
		<>
			<div className={`global-settings${configMode ? ' show-global-settings' : ''}`}>
				{!configMode && (
					<div className="details">
						<span>Showing {visibleFonts.length} fonts</span>
						<button onClick={() => setIsShowingTitles(x => !x)}>{isShowingTitles ? 'Hide' : 'Show'} titles</button>
						<button onClick={() => onChangeAllVisibleMarked(!isAllFontsMarked)}>
							{isAllFontsMarked ? 'Unmark' : 'Mark'} all
						</button>
					</div>
				)}
				<button className={`config-mode-toggle ${configMode ? 'active' : ''}`} onClick={() => setConfigMode(x => !x)}>
					{configMode ? <LuChevronUp /> : <LuChevronDown />}
				</button>
				<div className="global-settings-rows">
					<div className="global-settings-row">
						<label className="self-end">
							Font size
							<input type="number" min={1} value={fontSize} onChange={e => setFontSize(+e.target.value)} />
						</label>
						<label className="self-end">
							Line height
							<input
								type="number"
								min={0}
								step={0.05}
								value={lineHeight}
								onChange={e => setLineHeight(+e.target.value)}
							/>
						</label>
						<label className="self-end">
							Nearest weight
							<input
								className="global-font-weight-input"
								type="number"
								value={fontWeight}
								step={100}
								min={0}
								max={1000}
								onChange={e => {
									const targetWeight = +e.target.value;
									setFontWeight(targetWeight);
									setFonts(fonts =>
										fonts.map(font => {
											const activeStyle = font.variants[font.activeVariant].style;
											return {
												...font,
												activeVariant: font.variants
													.map((variant, index) => ({
														index,
														score: Math.abs(variant.weight - targetWeight) - (variant.style === activeStyle),
													}))
													.sort((a, b) => a.score - b.score)[0].index,
											};
										})
									);
								}}
							/>
						</label>
						<textarea
							rows={2}
							className="preview-text-input"
							value={previewContent ?? ''}
							placeholder={defaultPreviewContent}
							onChange={e => {
								setPreviewContent(e.target.value);
								unsetDefaultPreview();
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
								<LuAlignLeft className={`radio-icon ${alignment === 'left' ? 'selected' : ''}`} title="Left align" />
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
								<LuAlignCenter
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
								<LuAlignRight className={`radio-icon ${alignment === 'right' ? 'selected' : ''}`} title="Right align" />
							</label>
						</fieldset>
					</div>
					<div className="global-settings-row">
						<div className="select-with-label">
							<label
								htmlFor={'include'}
								onClick={() => setIncludeMethod(method => (method === 'ALL' ? 'ANY' : 'ALL'))}
								className="cursor-pointer"
							>
								Include fonts matching <span className="underline">{includeMethod.toLowerCase()}</span> of
							</label>
							<Select
								inputId="include"
								className="collection-select"
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
						<div className="select-with-label">
							<label
								htmlFor={'exclude'}
								onClick={() => setExcludeMethod(method => (method === 'ALL' ? 'ANY' : 'ALL'))}
								className="cursor-pointer"
							>
								Exclude fonts matching <span className="underline">{excludeMethod.toLowerCase()}</span> of
							</label>
							<Select
								inputId="exclude"
								className="collection-select"
								placeholder="Exclude collections…"
								isMulti={true}
								isSearchable={true}
								options={collectionOptions}
								onChange={collections => {
									setExcludedCollections(collections.map(collection => collection.value));
								}}
							/>
						</div>
						<fieldset className="list-mode-options">
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
								<LuRectangleVertical
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
								<LuColumns2 className={`radio-icon ${listMode === 'grid' ? 'selected' : ''}`} title="Grid view" />
							</label>
						</fieldset>
					</div>
				</div>
			</div>
			<div className="probe" aria-hidden="true" ref={probeRef}>
				{bigFonts.map((font, i) => (
					<FontPreview
						key={i}
						font={font.font}
						variant={font.variant}
						Preview={Preview}
						loadFont={loadFont}
						style={{
							width: gridWidth / columnCount,
							flexShrink: 0,
							flexGrow: 0,
						}}
					/>
				))}
			</div>
			<div className="grid-container" ref={gridRef}>
				{matchedFonts ? (
					visibleFonts.length ? (
						<Grid
							className="font-containers"
							columnCount={columnCount}
							columnWidth={gridWidth / columnCount}
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

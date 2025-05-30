import React, { useEffect, useRef } from 'react';
import useHover from '@react-hook/hover';
import { Eye, EyeOff, Pin, PinOff } from 'lucide-react';

import { cn, getMatchingVariants, getNearestValue, getNearestValueFromRange } from '@/lib/utils';
import { SettingsPopover } from '@/components/SettingsPopover';
import { Button } from '@/components/ui/button';
import { FONT_SETTINGS } from '@/constants';
import './FontContainer.css';

const FontPreview = ({ font, settings = {}, Preview, loadFont, isMarked, ...props }) => {
	useEffect(() => {
		if (loadFont) loadFont(font);
	}, [font, loadFont]);

	const fontVariationSettings = font.axes
		? Object.entries(settings.axes ?? {})
				.map(([axis, value]) => `"${axis}" ${value}`)
				.join(', ')
		: undefined;

	return (
		<div className="flex-grow text-[length:--font-preview-size] flex justify-center" {...props}>
			<pre
				className={cn('font-preview p-3', isMarked && 'marked')}
				style={{
					fontFamily: `"${font.name}"`,
					fontWeight: settings.weight ?? FONT_SETTINGS.weight.defaultValue,
					fontSize: `${settings.scale ?? FONT_SETTINGS.scale.defaultValue}em`,
					fontStyle: settings.italic ? 'italic' : settings.oblique ? 'oblique' : 'normal',
					fontStretch: `${settings.width ?? FONT_SETTINGS.width.defaultValue}%`,
					lineHeight: `calc(var(--font-preview-line-height) + ${
						settings.lineHeightOffset ?? FONT_SETTINGS.lineHeightOffset.defaultValue
					})`,
					fontVariationSettings,
				}}
				title={font.name}
			>
				<Preview />
			</pre>
		</div>
	);
};

function getSettingsFromVariant(variant, oldSettings) {
	const newSettings = { ...variant };
	Object.entries(newSettings).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			newSettings[key] = getNearestValueFromRange(oldSettings[key], value);
		}
	});
	return newSettings;
}

const FontContainer = React.memo(function FontContainer({
	font,
	isMarked,
	isHidden,
	onChangeMarked,
	onChangeHidden,
	onChangeFontSettings,
	Preview,
	loadFont,
	showSettings,
	style,
	isShowingTitles,
	settings = {},
}) {
	const ref = useRef(null);
	const isHovering = useHover(ref);

	const handleValueChange = ({ id, type }, value, isManual) => {
		const newSettings = {
			...settings,
		};

		if (type === 'axis') {
			newSettings.axes = {
				...settings.axes,
				[id]: value,
			};
			return onChangeFontSettings(newSettings, font, isManual);
		}

		newSettings[id] = value;

		const variantGroupsForChangedProperty = font.variantGroupsByProperty.get(id);
		if (!variantGroupsForChangedProperty) {
			// For properties that don’t have specific valid variants, we assume any value is valid.
			return onChangeFontSettings(newSettings, font, isManual);
		}

		const validVariantsForNewValue = getMatchingVariants(value, variantGroupsForChangedProperty);
		if (!validVariantsForNewValue.length) {
			// We should never get here. Throw an error.
			console.error(`No valid variants found for ${id} = ${value}`);
		}

		// Find the variant with the closest other properties.
		const bestMatch = validVariantsForNewValue.reduce(
			(best, variant) => {
				const [bestDiff] = best;
				const variantSettings = getSettingsFromVariant(variant, newSettings);
				const [weightDiff, italicDiff, obliqueDiff, widthDiff] = ['weight', 'italic', 'oblique', 'width'].map(key => {
					const defaultValue = FONT_SETTINGS[key].defaultValue;
					const oldValue = newSettings[key] ?? defaultValue;
					const newValue = variantSettings[key] ?? defaultValue;
					return Math.abs(newValue - oldValue);
				});
				const currentDiff = weightDiff + italicDiff * 1000 + obliqueDiff * 1000 + widthDiff * 1000;
				return currentDiff < bestDiff ? [currentDiff, variantSettings] : best;
			},
			[Infinity, null]
		)[1];

		onChangeFontSettings(bestMatch, font, isManual);
	};

	// const handleToggleFeature = feature => {
	// 	setSelectedFeatures(prev => (prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]));
	// };
	const shouldHideButtons = !(showSettings || isHovering);
	const PinIcon = isMarked ? PinOff : Pin;
	const EyeIcon = isHidden ? Eye : EyeOff;

	const validSettings = [
		...Array.from(font.variantGroupsByProperty.entries())
			.filter(([_, variants]) => variants.size > 1 || Array.isArray(variants.keys().next().value))
			.map(([id, variants]) => {
				const keys = [...variants.keys()];
				const variableRange = keys.find(key => Array.isArray(key));

				const settingsProperties = {};
				if (variableRange) {
					const [min, max] = variableRange;
					settingsProperties.min = min;
					settingsProperties.max = max;
					settingsProperties.step = 0.1;
				} else {
					const steps = keys.map(Number).sort((a, b) => a - b);
					settingsProperties.steps = steps;
					settingsProperties.defaultValue = getNearestValue(FONT_SETTINGS[id].defaultValue, steps);
				}
				return {
					id,
					type: 'property',
					...FONT_SETTINGS[id],
					...settingsProperties,
				};
			}),
		...(font.axes
			? Object.entries(font.axes).map(([axisName, [label, min, max, defaultValue = min, step = 0.01]]) => ({
					id: axisName,
					type: 'axis',
					label,
					min,
					max,
					step,
					defaultValue,
			  }))
			: []),
		{
			id: 'scale',
			type: 'default',
			...FONT_SETTINGS.scale,
		},
		{ id: 'lineHeightOffset', type: 'default', ...FONT_SETTINGS.lineHeightOffset },
	];

	return (
		<li ref={ref} className="px-2 pt-2" style={style}>
			<div className={cn('h-full flex flex-col rounded-xl px-1 pb-4', isMarked && 'bg-green-400')}>
				<div
					className={cn(
						'grid items-center grid-cols-[auto_1fr_auto] w-full text-gray-300',
						isMarked && 'text-foreground/50'
					)}
				>
					{/* HACK: This empty container simplifies title alignment */}
					<div className="flex flex-nowrap">
						<div className="w-6" />
						<div className="w-6" />
						<div className="w-6" />
					</div>
					<div className="grow font-title text-center">
						{isShowingTitles ? (
							<>
								{font.name} • <span>{font.isVariable ? '∞' : font.variants.length}</span>
							</>
						) : null}
					</div>
					<div className="flex flex-nowrap">
						<Button
							variant="simple"
							size="icon"
							className={cn('transition-opacity', shouldHideButtons && 'opacity-0')}
							onClick={() => onChangeHidden(font.name, !isHidden)}
						>
							<EyeIcon className="h-3 w-3" />
							<span className="sr-only">{isHidden ? 'Show font in list' : 'Hide font from list'}</span>
						</Button>
						<Button
							variant="simple"
							size="icon"
							className={cn('transition-opacity', shouldHideButtons && 'opacity-0')}
							onClick={() => onChangeMarked(font.name, !isMarked)}
						>
							<PinIcon className="h-3 w-3 relative top-[1px]" />
							<span className="sr-only">{isMarked ? 'Unmark font for comparison' : 'Mark font for comparison'}</span>
						</Button>
						<SettingsPopover
							validSettings={validSettings}
							values={settings}
							onChangeValue={handleValueChange}
							shouldHideButton={shouldHideButtons}
							// selectedFeatures={selectedFeatures}
							// onToggleFeature={handleToggleFeature}
						/>
					</div>
				</div>
				<FontPreview font={font} isMarked={isMarked} settings={settings} Preview={Preview} loadFont={loadFont} />
			</div>
		</li>
	);
});

export { FontPreview };
export default FontContainer;

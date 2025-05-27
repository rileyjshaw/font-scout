import React, { useEffect, useRef, useMemo } from 'react';
import useHover from '@react-hook/hover';
import { Eye, EyeOff, Pin, PinOff } from 'lucide-react';

import { cn, getNearestValue } from '@/lib/utils';
import { SettingsPopover } from '@/components/settings-popover';
import { Button } from '@/components/ui/button';
import { FONT_SETTINGS } from '@/constants';
import './FontContainer.css';

const FontPreview = ({ font, settings = {}, Preview, loadFont, isMarked, ...props }) => {
	useEffect(() => {
		if (loadFont) loadFont(font);
	}, [font, loadFont]);

	return (
		<div className="text-[length:--font-preview-size] flex justify-center" {...props}>
			<pre
				className={cn('font-preview p-3', isMarked && 'marked')}
				style={{
					fontFamily: `"${font.name}"`,
					fontWeight: settings.weight ?? 'normal',
					fontSize: `${settings.scale ?? 1}em`,
					fontStyle: settings.italic ? 'italic' : 'normal',
					fontStretch: settings.width == null ? 'normal' : `${settings.width}%`,
					lineHeight: `calc(var(--font-preview-line-height) + ${settings.lineHeightOffset ?? 0})`,
				}}
				title={font.name}
			>
				<Preview />
			</pre>
		</div>
	);
};

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

	const handleValueChange = (id, value, isManual) => {
		const newSettings = {
			...settings,
			[id]: value,
		};

		const validVariantsForChangedProperty = font.variantsByProperty.get(id);
		if (!validVariantsForChangedProperty) {
			// For properties that don’t have specific valid variants, we assume any value is valid.
			return onChangeFontSettings(newSettings, font, isManual);
		}

		const validVariantsForNewValue = validVariantsForChangedProperty.get(value);
		if (!validVariantsForNewValue) {
			// We should never get here. Throw an error.
			console.error(`No valid variants found for ${id} = ${value}`);
		}

		// Find the variant with the closest other properties
		const bestMatch = validVariantsForNewValue.reduce(
			(best, variant) => {
				const [bestDiff] = best;
				const weightDiff = Math.abs(variant.weight - (newSettings.weight ?? FONT_SETTINGS.weight.defaultValue));
				const italicDiff = Math.abs(variant.italic - (newSettings.italic ?? FONT_SETTINGS.italic.defaultValue));
				const widthDiff = Math.abs(variant.width - (newSettings.width ?? FONT_SETTINGS.width.defaultValue));
				const currentDiff = weightDiff + italicDiff * 1000 + widthDiff * 1000;
				return currentDiff < bestDiff ? [currentDiff, variant] : best;
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
		...Array.from(font.variantsByProperty.entries())
			.filter(([_, variants]) => variants.size > 1)
			.map(([id, variants]) => {
				const steps = [...variants.keys()].map(Number).sort((a, b) => a - b);
				return {
					id,
					...FONT_SETTINGS[id],
					steps,
					defaultValue: getNearestValue(FONT_SETTINGS[id].defaultValue, steps),
				};
			}),
		{
			id: 'scale',
			...FONT_SETTINGS.scale,
		},
		{ id: 'lineHeightOffset', ...FONT_SETTINGS.lineHeightOffset },
	];

	return (
		<li ref={ref} className="px-2 pt-2" style={style}>
			<div className={cn('flex flex-col rounded-xl px-1', isMarked && 'bg-green-400')}>
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
								{/* TODO: Handle variable fonts properly here. */}
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

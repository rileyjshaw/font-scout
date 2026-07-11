import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Select } from '@/components/ui/select';
import { Settings, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { READABLE_VALUES } from '@/constants';
import { getFontFeatureLabel, getFontFeatureValue } from '@/lib/fontFeatures';

function SettingSlider({ setting, value, onChange }) {
	const defaultValue = setting.defaultValue;
	const currentValue = value ?? defaultValue;

	let input;
	if (setting.steps) {
		let selectedValue;
		const options = setting.steps.map(value => {
			const option = {
				label: READABLE_VALUES[setting.id]?.[value] ?? value,
				value,
			};
			if (value === currentValue) {
				selectedValue = option;
			}
			return option;
		});
		input = (
			<Select
				id={`${setting.id}-input`}
				value={selectedValue}
				className="w-36"
				onChange={newOption => onChange(Number(newOption.value), true)}
				options={options}
			/>
		);
	} else {
		input = (
			<Input
				id={`${setting.id}-input`}
				type="number"
				min={setting.min}
				max={setting.max}
				step={setting.step}
				value={currentValue}
				onChange={e => onChange(Number(e.target.value), true)}
				className="w-16 h-8"
			/>
		);
	}

	return (
		<div className="grid gap-2">
			<div className="flex items-center justify-between">
				<Label htmlFor={setting.id}>{setting.label || setting.id}</Label>
				<div className="flex items-center space-x-2">
					{input}
					<Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onChange(defaultValue, false)}>
						<RotateCcw className="h-3 w-3" />
						<span className="sr-only">Reset {setting.label}</span>
					</Button>
				</div>
			</div>
			<Slider
				id={setting.id}
				min={setting.min}
				max={setting.max}
				step={setting.step}
				steps={setting.steps}
				scale={setting.scale}
				isUniformSteps={setting.isUniformSteps}
				value={[currentValue]}
				onValueChange={values => onChange(values[0], true)}
				className="[&_[role=slider]]:h-3 [&_[role=slider]]:w-4"
			/>
		</div>
	);
}

function FeatureToggles({ features, values, onChange, onReset }) {
	if (!features.length) return null;

	return (
		<div className="grid gap-2 border-t pt-4">
			<div className="flex items-center justify-between">
				<Label>OpenType features</Label>
				<Button
					variant="outline"
					size="icon"
					className="h-8 w-8"
					disabled={!Object.keys(values).length}
					onClick={onReset}
				>
					<RotateCcw className="h-3 w-3" />
					<span className="sr-only">Reset OpenType features</span>
				</Button>
			</div>
			<div className="grid grid-cols-2 gap-2">
				{features.map(tag => {
					const enabled = getFontFeatureValue(tag, values);
					return (
						<Button
							key={tag}
							type="button"
							variant="outline"
							size="sm"
							className={cn(
								'h-auto min-h-8 justify-between gap-2 px-2 py-1 text-left whitespace-normal',
								enabled && 'bg-[#ffdc00] text-foreground hover:bg-[#ffe740] hover:text-foreground',
							)}
							aria-pressed={enabled}
							onClick={() => onChange(tag, !enabled)}
						>
							<span>{getFontFeatureLabel(tag)}</span>
							<code className="shrink-0 text-[10px] opacity-60">{tag}</code>
						</Button>
					);
				})}
			</div>
		</div>
	);
}

export function SettingsPopover({
	validSettings,
	values,
	availableFeatures = [],
	onChangeValue,
	onChangeFeature,
	onResetFeatures,
	shouldHideButton,
}) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="simple" size="icon" className={cn('transition-opacity', shouldHideButton && 'opacity-0')}>
					<Settings className="h-3 w-3" />
					<span className="sr-only">Open settings</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent side="top" align="start" className="w-96 max-h-[80vh] overflow-y-auto m-2">
				<div className="grid gap-4">
					{validSettings.map(setting => (
						<SettingSlider
							key={setting.id}
							setting={setting}
							value={setting.type === 'axis' ? values.axes?.[setting.id] : values[setting.id]}
							onChange={(value, isManual) => onChangeValue(setting, value, isManual)}
						/>
					))}
					<FeatureToggles
						features={availableFeatures}
						values={values.features ?? {}}
						onChange={onChangeFeature}
						onReset={onResetFeatures}
					/>
				</div>
			</PopoverContent>
		</Popover>
	);
}

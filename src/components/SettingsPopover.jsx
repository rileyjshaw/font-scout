import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Select } from '@/components/ui/select';
import { Settings, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { READABLE_VALUES } from '@/constants';

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

export function SettingsPopover({ validSettings, values, onChangeValue, shouldHideButton }) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="simple" size="icon" className={cn('transition-opacity', shouldHideButton && 'opacity-0')}>
					<Settings className="h-3 w-3" />
					<span className="sr-only">Open settings</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent side="top" align="start" className="w-80 m-2">
				<div className="grid gap-4">
					{validSettings.map(setting => (
						<SettingSlider
							key={setting.id}
							setting={setting}
							value={setting.type === 'axis' ? values.axes?.[setting.id] : values[setting.id]}
							onChange={(value, isManual) => onChangeValue(setting, value, isManual)}
						/>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
}

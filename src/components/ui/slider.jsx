import React, { useMemo } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn, getNearestValue, identity } from '@/lib/utils';

const linearScale = {
	transform: identity,
	inverse: identity,
};

const Slider = React.forwardRef(
	(
		{
			className,
			isUniformSteps: isUniformStepsProp,
			max: maxProp,
			min: minProp,
			onValueChange,
			step,
			steps,
			value,
			scale = linearScale,
			...props
		},
		ref
	) => {
		const isUniformSteps = !!(isUniformStepsProp && steps);
		const [sortedSteps, stepIdxFromValue, stepValueFromIdx] = useMemo(() => {
			if (!steps) return [];
			const sortedSteps = [...steps].sort((a, b) => a - b);
			const stepIdxFromValue = Object.fromEntries(sortedSteps.map((v, i) => [v, i]));
			const stepValueFromIdx = Object.fromEntries(sortedSteps.map((v, i) => [i, v]));
			return [sortedSteps, stepIdxFromValue, stepValueFromIdx];
		}, [steps]);

		const getStepValue = () => {
			if (!steps) return step;
			if (isUniformSteps) return 1;
			const scaledSteps = sortedSteps.map(scale.transform);
			const minDiff = Math.min(...scaledSteps.slice(1).map((v, i) => v - scaledSteps[i]));
			return minDiff;
		};

		// If steps array is provided, snap to nearest valid value.
		const handleValueChange = newValue => {
			const descaledValue = newValue.map(scale.inverse);

			if (!steps) {
				// Fix floating point issues by rounding to a reasonable number of decimal places.
				const nDecimals = Math.max(0, -Math.floor(Math.log10(step)));
				return onValueChange(descaledValue.map(v => Number((Math.round(v / step) * step).toFixed(nDecimals))));
			}
			if (isUniformSteps) {
				return onValueChange(newValue.map(v => stepValueFromIdx[v]));
			}
			const snappedValue = descaledValue.map(v => getNearestValue(v, steps));
			if (!value || !snappedValue.every((v, i) => v === value[i])) {
				onValueChange(snappedValue);
			}
		};

		const min = isUniformSteps ? 0 : steps ? sortedSteps[0] : minProp;
		const max = isUniformSteps ? steps.length - 1 : steps ? sortedSteps[sortedSteps.length - 1] : maxProp;
		const shouldShowMarkers = !!steps;

		const internalValue = isUniformSteps ? value?.map(v => stepIdxFromValue[v]) : value;

		const scaledMin = isUniformSteps ? min : scale.transform(min);
		const scaledMax = isUniformSteps ? max : scale.transform(max);
		const scaledValue = isUniformSteps ? internalValue : internalValue?.map(scale.transform);

		return (
			<SliderPrimitive.Root
				ref={ref}
				className={cn('relative flex w-full touch-none select-none items-center', className)}
				min={scaledMin}
				max={scaledMax}
				step={getStepValue()}
				onValueChange={handleValueChange}
				value={scaledValue}
				{...props}
			>
				<SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
					<SliderPrimitive.Range className="absolute h-full bg-primary" />
					{shouldShowMarkers && (
						<div className="absolute inset-0">
							{steps.map((step, i) => {
								const scaledVal = isUniformSteps ? i : scale.transform(step);
								if (scaledVal <= scaledMin || scaledVal >= scaledMax) return null;
								const percent = ((scaledVal - scaledMin) / (scaledMax - scaledMin)) * 100;
								const thumbOffset = (22 / 2) * (1 - percent / 50);
								return (
									<div
										key={step}
										className="absolute top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-gray-400"
										style={{ left: `calc(${percent}% + ${thumbOffset}px)` }}
									/>
								);
							})}
						</div>
					)}
				</SliderPrimitive.Track>
				<SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
			</SliderPrimitive.Root>
		);
	}
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

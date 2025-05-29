import fontMeasurements from './fontMeasurements.json.js';
import { findNearestFontWeight } from './lib/utils.js';
import { STANDARD_GLOBAL_FONT_WEIGHTS } from './constants.js';

const createWeightMap = measurementType => {
	const weightMap = {};

	// Create a new array for each target weight. For instance,
	// `weightMap[300]` will be an array of font names, sorted by size when
	// the global font weight is set to 300.
	for (const targetWeight of STANDARD_GLOBAL_FONT_WEIGHTS) {
		weightMap[targetWeight] = [];
	}

	fontMeasurements.forEach(font => {
		const availableWeights = font.measurements.map(measurement => measurement.weight); // Already sorted.
		for (const targetWeight of STANDARD_GLOBAL_FONT_WEIGHTS) {
			const nearestWeight = findNearestFontWeight(targetWeight, availableWeights);
			const nearestMeasurement = font.measurements.find(measurement => measurement.weight === nearestWeight);

			if (nearestMeasurement) {
				weightMap[targetWeight].push({
					name: font.name,
					value: nearestMeasurement[measurementType],
				});
			}
		}
	});

	// Sort each weight’s array by the measurement value, then extract just the names.
	Object.entries(weightMap).forEach(([weight, items]) => {
		items.sort((a, b) => b.value - a.value);
		weightMap[weight] = items.map(item => item.name);
	});

	return weightMap;
};

const sizeSortedFontLists = {
	height: createWeightMap('height'),
	width: createWeightMap('width'),
	size: createWeightMap('size'),
};

export default sizeSortedFontLists;

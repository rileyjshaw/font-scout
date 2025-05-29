import cnz from 'cnz';
import { twMerge } from 'tailwind-merge';

export const identity = x => x;

export function cn(...inputs) {
	return twMerge(cnz(inputs));
}

export function getNearestValueFromRange(target, [min, max]) {
	if (target < min) return min;
	if (target > max) return max;
	return target;
}

export function getNearestValue(target, values) {
	return values.reduce((closest, current) => {
		const value = Array.isArray(current) ? getNearestValueFromRange(target, current) : current;

		const currentDistance = Math.abs(value - target);
		const closestDistance = Math.abs(closest - target);

		return currentDistance < closestDistance ? value : closest;
	}, Infinity);
}

export function getMatchingVariants(target, variantGroups) {
	return Array.from(variantGroups).reduce((matchingVariants, [variantValue, variants]) => {
		const exactValue = Array.isArray(variantValue) ? getNearestValueFromRange(target, variantValue) : variantValue;
		return exactValue === target ? [...matchingVariants, ...variants] : matchingVariants;
	}, []);
}

// Expands an object with arrays of values into an array of objects with all possible combinations of values.
// For example, generatePermutations({ weight: [400, 700], italic: [false, true] }) returns:
// [{ weight: 400, italic: false }, { weight: 400, italic: true }, { weight: 700, italic: false }, { weight: 700, italic: true }]
export function generatePermutations(options) {
	return Object.entries(options).reduce(
		(results, [key, values]) =>
			results.flatMap(result =>
				Array.isArray(values)
					? values.map(value => ({
							...result,
							[key]: value,
					  }))
					: [
							{
								...result,
								[key]: values,
							},
					  ]
			),
		[{}]
	);
}

export function findNearestFontWeight(target, sortedWeights) {
	// Find first weight >= target.
	let i = 0;
	while (i < sortedWeights.length && sortedWeights[i] < target) {
		i++;
	}

	if (i === sortedWeights.length) {
		// Return early; target is larger than all weights.
		return sortedWeights[sortedWeights.length - 1];
	}

	if (i === 0 || sortedWeights[i] === target) {
		// Return early; exact match found, or target is smaller than all weights.
		return sortedWeights[i];
	}

	// Choose the closer weight. In the case of a tie, round up to the bigger weight.
	const lighterDiff = target - sortedWeights[i - 1];
	const heavierDiff = sortedWeights[i] - target;
	return heavierDiff <= lighterDiff ? sortedWeights[i] : sortedWeights[i - 1];
}

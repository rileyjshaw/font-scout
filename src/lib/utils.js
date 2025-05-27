import cnz from 'cnz';
import { twMerge } from 'tailwind-merge';

export const identity = x => x;

export function cn(...inputs) {
	return twMerge(cnz(inputs));
}

export function getNearestValue(value, array, isRange) {
	if (isRange) {
		return value < array[0] ? array[0] : value > array[1] ? array[1] : value;
	}
	return array.reduce((acc, closest) => {
		return Math.abs(closest - value) < Math.abs(acc - value) ? closest : acc;
	});
}

// Expands an object with arrays of values into an array of objects with all possible combinations of values.
// For example, generatePermutations({ weight: [400, 700], italic: [false, true] }) returns:
// [{ weight: 400, italic: false }, { weight: 400, italic: true }, { weight: 700, italic: false }, { weight: 700, italic: true }]
export function generatePermutations(options) {
	return Object.entries(options).reduce(
		(results, [key, values]) =>
			results.flatMap(result =>
				values.map(value => ({
					...result,
					[key]: value,
				}))
			),
		[{}]
	);
}

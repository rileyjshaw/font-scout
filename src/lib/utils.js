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

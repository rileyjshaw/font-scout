import assert from 'node:assert/strict';
import test from 'node:test';

import { fuzzySearch } from '../src/lib/fuzzySearch.js';

const fonts = ['Roboto Flex', 'Montserrat', 'Inter Tight', 'Winter', 'Inter', 'Instrument Sans'].map(name => ({
	name,
}));

test('fuzzy matches partial and misspelled font names', () => {
	assert.deepEqual(
		fuzzySearch(fonts, 'rbt flx', 'name').map(font => font.name),
		['Roboto Flex'],
	);
	assert.deepEqual(
		fuzzySearch(fonts, 'montserat', 'name').map(font => font.name),
		['Montserrat'],
	);
});

test('ranks exact and prefix matches ahead of looser matches', () => {
	assert.deepEqual(
		fuzzySearch(fonts, 'inter', 'name').map(font => font.name),
		['Inter', 'Inter Tight', 'Winter'],
	);
});

test('keeps explicitly included items after actual matches', () => {
	assert.deepEqual(
		fuzzySearch(fonts.slice(0, 2), 'rbt', 'name', font => font.name === 'Montserrat'),
		fonts.slice(0, 2),
	);
});

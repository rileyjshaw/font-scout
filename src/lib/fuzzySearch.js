import fuzzysort from 'fuzzysort';

export function fuzzySearch(items, searchText, key, shouldAlwaysInclude = () => false) {
	const matches = fuzzysort.go(searchText, items, { key, limit: 0, threshold: 0 }).map(result => result.obj);
	const matchedItems = new Set(matches);
	const alwaysIncludedItems = items.filter(item => shouldAlwaysInclude(item) && !matchedItems.has(item));

	return [...matches, ...alwaysIncludedItems];
}

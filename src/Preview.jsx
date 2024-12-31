import React, { Fragment } from 'react';

function parseBrackets(str, startIdx = 0, isChild = false) {
	const result = [];
	for (let i = startIdx + 1, _len = str.length; i < _len; ++i) {
		const char = str[i];
		let isOpen = false,
			isClosed = false;
		if (char === str[i - 1]) {
			if (char === '[') isOpen = true;
			else if (char === ']') isClosed = true;
		}
		if (isOpen || isClosed) {
			// Ensure the possible substring between the prior token and here is captured.
			if (i > startIdx + 1) result.push(str.slice(startIdx, i - 1));
			if (isOpen) {
				const [contents, nextIdx] = parseBrackets(str, i + 1, true);
				result.push(contents);
				i = startIdx = nextIdx;
			} else if (isClosed) {
				return isChild ? [result, i + 1] : <div>{result}</div>;
			}
		}
	}
	if (str.length !== startIdx) result.push(str.slice(startIdx, str.length));
	return isChild ? [result, str.length] : result;
}

function treeToComponent(tree, classPrefix = 'span') {
	return tree.map((child, i) => {
		const key = `${classPrefix}-${i + 1}`;
		return Array.isArray(child) ? (
			<span key={key} className={key}>
				{treeToComponent(child, key)}
			</span>
		) : (
			<Fragment key={key}>{child}</Fragment>
		);
	});
}

function getPreviewComponent(str) {
	const tree = parseBrackets(str);
	const Component = <div>{treeToComponent(tree)}</div>;
	return () => Component;
}

export { getPreviewComponent };

import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import findGoogleFontFeatures from './findGoogleFontFeatures.js';

const projectRoot = path.resolve(import.meta.dirname, '..');

function responseFor(buffer) {
	return {
		ok: true,
		arrayBuffer: async () => buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength),
	};
}

test('caches Google binary analysis, invalidates versions, and prunes stale URLs', async () => {
	const temporaryRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'font-scout-google-cache-'));
	const cachePath = path.join(temporaryRoot, 'analysis.json');
	const source = await fs.readFile(path.join(projectRoot, 'public/publicFonts/Junction-Regular.woff2'));
	const raw = {
		items: [{ family: 'Junction', files: { regular: 'https://example.test/junction.woff2' } }],
	};
	let requests = 0;
	const fetchImpl = async () => {
		requests += 1;
		return responseFor(source);
	};

	const first = await findGoogleFontFeatures(raw, { fetchImpl, cachePath, concurrency: 1 });
	const second = await findGoogleFontFeatures(raw, {
		fetchImpl: async () => {
			throw new Error('cache miss');
		},
		cachePath,
		concurrency: 1,
	});
	assert.deepEqual(first, second);
	assert.equal(requests, 1);

	const cache = JSON.parse(await fs.readFile(cachePath, 'utf8'));
	await fs.writeFile(cachePath, JSON.stringify({ ...cache, version: 0 }));
	await findGoogleFontFeatures(raw, { fetchImpl, cachePath, concurrency: 1 });
	assert.equal(requests, 2);

	await findGoogleFontFeatures({ items: [] }, { fetchImpl, cachePath, concurrency: 1 });
	assert.deepEqual(JSON.parse(await fs.readFile(cachePath, 'utf8')).files, {});
});

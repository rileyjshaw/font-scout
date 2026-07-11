import * as fontkit from 'fontkit';

import { isUserToggleableFontFeature } from '../src/lib/fontFeatures.js';

const DEFAULT_CONCURRENCY = 16;
const MAX_ATTEMPTS = 3;

async function downloadFont(url, fetchImpl) {
	let lastError;
	for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
		try {
			const response = await fetchImpl(url);
			if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
			return Buffer.from(await response.arrayBuffer());
		} catch (error) {
			lastError = error;
		}
	}
	throw lastError;
}

export function extractToggleableFeatures(buffer) {
	const font = fontkit.create(buffer);
	return [...new Set(font.availableFeatures ?? [])].filter(isUserToggleableFontFeature).sort();
}

export default async function findGoogleFontFeatures(
	rawJson,
	{ fetchImpl = fetch, concurrency = DEFAULT_CONCURRENCY, onProgress } = {},
) {
	const jobs = rawJson.items.flatMap(font =>
		Object.entries(font.files ?? {}).map(([variant, url]) => ({ family: font.family, variant, url })),
	);
	const result = {};
	let nextJob = 0;
	let completed = 0;

	async function worker() {
		while (nextJob < jobs.length) {
			const job = jobs[nextJob++];
			try {
				const buffer = await downloadFont(job.url, fetchImpl);
				(result[job.family] ??= {})[job.variant] = extractToggleableFeatures(buffer);
			} catch (error) {
				throw new Error(
					`Could not inspect Google font “${job.family}” (${job.variant}) at ${job.url}: ${error.message}`,
				);
			}
			completed += 1;
			onProgress?.(completed, jobs.length);
		}
	}

	await Promise.all(Array.from({ length: Math.min(concurrency, jobs.length) }, worker));
	return result;
}

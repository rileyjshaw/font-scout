import fs from 'node:fs/promises';
import path from 'node:path';
import { Worker } from 'node:worker_threads';

import stableStringify from 'json-stable-stringify';

import { isUserToggleableFontFeature } from '../src/lib/fontFeatures.js';

const DEFAULT_CONCURRENCY = 8;
const ANALYSIS_WORKERS = 2;
const JOBS_PER_ANALYSIS_WORKER = 20;
const MAX_ATTEMPTS = 3;
export const GOOGLE_ANALYSIS_CACHE_VERSION = 1;
const DEFAULT_CACHE_PATH = 'font_scripts/.cache/google-font-analysis.json';
let cacheWriteId = 0;

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

async function readCache(cachePath) {
	try {
		const cache = JSON.parse(await fs.readFile(cachePath, 'utf8'));
		return cache.version === GOOGLE_ANALYSIS_CACHE_VERSION ? (cache.files ?? {}) : {};
	} catch (error) {
		if (error.code === 'ENOENT' || error instanceof SyntaxError) return {};
		throw error;
	}
}

async function writeCache(cachePath, files) {
	await fs.mkdir(path.dirname(cachePath), { recursive: true });
	const temporary = `${cachePath}.${process.pid}.${cacheWriteId++}.tmp`;
	await fs.writeFile(
		temporary,
		`${stableStringify({ version: GOOGLE_ANALYSIS_CACHE_VERSION, files }, { space: '\t' })}\n`,
	);
	await fs.rename(temporary, cachePath);
}

function staticWeightForVariant(variant) {
	if (variant === 'regular' || variant === 'italic') return 400;
	return Number(variant.match(/^[0-9]+/)?.[0] ?? 400);
}

class AnalysisPool {
	constructor(size = ANALYSIS_WORKERS) {
		this.queue = [];
		this.nextId = 0;
		this.slots = Array.from({ length: size }, () => ({ worker: null, active: null, jobs: 0 }));
		this.slots.forEach(slot => this.startWorker(slot));
	}

	startWorker(slot) {
		slot.worker = new Worker(new URL('./fontAnalysisWorker.js', import.meta.url), {
			execArgv: process.execArgv.filter(argument => !argument.startsWith('--input-type')),
		});
		slot.active = null;
		slot.jobs = 0;
		slot.worker.on('message', message => {
			if (!slot.active || message.id !== slot.active.id) return;
			if (message.error) slot.active.reject(new Error(message.error));
			else slot.active.resolve(message.result);
			slot.active = null;
			slot.jobs += 1;
			if (slot.jobs >= JOBS_PER_ANALYSIS_WORKER) {
				slot.worker.terminate();
				this.startWorker(slot);
			}
			this.pump();
		});
		slot.worker.on('error', error => {
			const failed = slot.active;
			slot.active = null;
			this.startWorker(slot);
			if (failed && !failed.options.safeMode) {
				failed.options = { ...failed.options, safeMode: true };
				this.queue.unshift(failed);
			} else {
				failed?.reject(error);
			}
			this.pump();
		});
	}

	pump() {
		for (const slot of this.slots) {
			if (slot.active || !this.queue.length) continue;
			const job = this.queue.shift();
			slot.active = job;
			slot.worker.postMessage({ id: job.id, source: job.source, options: job.options });
		}
	}

	analyze(source, options) {
		return new Promise((resolve, reject) => {
			this.queue.push({ id: this.nextId++, source, options, resolve, reject });
			this.pump();
		});
	}

	async close() {
		await Promise.all(this.slots.map(slot => slot.worker.terminate()));
	}
}

export default async function findGoogleFontFeatures(
	rawJson,
	{
		fetchImpl = fetch,
		concurrency = DEFAULT_CONCURRENCY,
		onProgress,
		cachePath = path.resolve(DEFAULT_CACHE_PATH),
		analysisPool = new AnalysisPool(),
	} = {},
) {
	const jobs = rawJson.items.flatMap(font =>
		Object.entries(font.files ?? {}).map(([variant, url]) => ({ family: font.family, variant, url })),
	);
	const result = {};
	const previousCache = await readCache(cachePath);
	const nextCache = {};
	let nextJob = 0;
	let completed = 0;
	let newAnalyses = 0;

	async function worker() {
		while (nextJob < jobs.length) {
			const job = jobs[nextJob++];
			try {
				let analysis = previousCache[job.url];
				if (!analysis) {
					const buffer = await downloadFont(job.url, fetchImpl);
					const extracted = await analysisPool.analyze(buffer, {
						staticWeight: staticWeightForVariant(job.variant),
						allowStaticFallback: true,
					});
					analysis = {
						features: extracted.features.filter(isUserToggleableFontFeature),
						samples: extracted.samples,
					};
					newAnalyses += 1;
				}
				nextCache[job.url] = analysis;
				(result[job.family] ??= {})[job.variant] = analysis;
			} catch (error) {
				throw new Error(
					`Could not inspect Google font “${job.family}” (${job.variant}) at ${job.url}: ${error.message}`,
				);
			}
			completed += 1;
			if (newAnalyses > 0 && newAnalyses % 100 === 0) {
				await writeCache(cachePath, { ...previousCache, ...nextCache });
			}
			onProgress?.(completed, jobs.length);
		}
	}

	try {
		await Promise.all(Array.from({ length: Math.min(concurrency, jobs.length) }, worker));
		await writeCache(cachePath, nextCache);
		return result;
	} finally {
		await analysisPool.close();
	}
}

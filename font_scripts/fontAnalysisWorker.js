import { parentPort } from 'node:worker_threads';

import { analyzeFontBuffer } from './fontMetrics.js';

parentPort.on('message', async ({ id, source, options }) => {
	try {
		const result = await analyzeFontBuffer(Buffer.from(source), options);
		parentPort.postMessage({ id, result });
	} catch (error) {
		parentPort.postMessage({ id, error: error.message });
	}
});

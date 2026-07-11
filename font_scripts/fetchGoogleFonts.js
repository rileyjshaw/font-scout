import request from 'request-promise-native';
import 'dotenv/config.js';

import { writeJson } from './util.js';
import findGoogleFontFeatures from './findGoogleFontFeatures.js';
import processGoogleFonts from './processGoogleFonts.js';

const params = new URLSearchParams({
	subset: 'latin',
	capability: 'VF',
	sort: 'alpha',
	key: process.env.GOOGLE_FONTS_API_KEY,
});
params.append('capability', 'WOFF2');
const url = `https://www.googleapis.com/webfonts/v1/webfonts?${params}`;

async function fetchFonts() {
	const response = await request(url);
	const responseJson = JSON.parse(response);
	writeJson('googleFontsRaw', responseJson);
	return responseJson;
}

export default async function fetchAndProcessFonts() {
	const responseJson = await fetchFonts();
	let lastProgress = 0;
	const featureMap = await findGoogleFontFeatures(responseJson, {
		onProgress(completed, total) {
			const percent = Math.floor((completed / total) * 100);
			if (percent >= lastProgress + 5 || completed === total) {
				lastProgress = percent;
				console.log(`Inspecting Google font features… ${completed}/${total} (${percent}%)`);
			}
		},
	});
	const processedFonts = processGoogleFonts(responseJson, featureMap);
	writeJson('googleFontsProcessed', processedFonts);
}

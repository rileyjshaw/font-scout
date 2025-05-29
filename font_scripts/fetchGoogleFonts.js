import request from 'request-promise-native';
import 'dotenv/config.js';

import { writeJson } from './util.js';
import processGoogleFonts from './processGoogleFonts.js';

const url = `https://www.googleapis.com/webfonts/v1/webfonts?subset=latin&capability=vf&sort=alpha&key=${process.env.GOOGLE_FONTS_API_KEY}`;

async function fetchFonts() {
	const response = await request(url);
	const responseJson = JSON.parse(response);
	writeJson('googleFontsRaw', responseJson);
	return responseJson;
}

export default async function fetchAndProcessFonts() {
	const responseJson = await fetchFonts();
	const processedFonts = processGoogleFonts(responseJson);
	writeJson('googleFontsProcessed', processedFonts);
}

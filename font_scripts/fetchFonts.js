import fs from 'fs';
import request from 'request-promise-native';
import stableStringify from 'json-stable-stringify';
import 'dotenv/config.js';

const url = `https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=${process.env.GOOGLE_FONTS_API_KEY}`;

async function fetchFonts() {
	const response = await request(url);
	fs.writeFileSync('./src/google_fonts_raw.json', stableStringify(JSON.parse(response), {space: '\t'}));
}

export default fetchFonts;

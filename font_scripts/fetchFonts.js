import fs from 'fs';
import request from 'request-promise-native';
import 'dotenv/config.js';

const url = `https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=${process.env.GOOGLE_FONTS_API_KEY}`;

async function fetchFonts() {
	const response = await request(url);
	fs.writeFileSync('./src/google_fonts_raw.json', JSON.stringify(JSON.parse(response), null, '\t'));
}

export default fetchFonts;

import { dirname } from 'path';
import { fileURLToPath } from 'url';

import fetchFonts from './font_scripts/fetchFonts.js';
import measureFonts from './font_scripts/measureFonts.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('Fetching fonts…');
await fetchFonts();
console.log('Done.');
console.log('Measuring fonts…');
await measureFonts(__dirname);
console.log('Done.');
process.exit(0);

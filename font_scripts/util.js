import fs from 'fs';
import stableStringify from 'json-stable-stringify';

export function writeJson(filename, json) {
	fs.writeFileSync(`./src/${filename}.json.js`, 'export default ' + stableStringify(json, { space: '\t' }) + ';\n');
}

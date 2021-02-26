import puppeteer from 'puppeteer';
import fs from 'fs';
import http from 'http';

import allFonts from '../src/allFonts.js';

const remoteFonts = allFonts.filter(font => font.href);

const measureFonts = (__dirname) => new Promise((resolve, reject) => {
	let browser;
	http.createServer(function (req, res) {
		switch (req.method) {
			case 'GET':
				switch (req.url) {
					case '/':
						res.end(`<html><head><link href="./public/fonts/typography.css" rel="stylesheet" type="text/css" /><link href="./public/publicFonts/typography.css" rel="stylesheet" type="text/css" />${remoteFonts.map(font => (
							`<link href="${font.href}&display=block" rel="stylesheet" type="text/css" />`)).join('')
						}</head><body><script>var allFonts = JSON.parse('${JSON.stringify(allFonts)}')</script><script src="./font_scripts/measureFontsClient.js"></script></body></html>`);
						break;
					default:
						fs.readFile(__dirname + req.url, function (err,data) {
							if (err) {
								res.writeHead(404);
								res.end(JSON.stringify(err));
								return;
							}
							res.writeHead(200);
							res.end(data);
						});
				}
				break;
			case 'POST':
				switch (req.url) {
					case '/results':
						let body = '';
						req.on('data', function(data) {
							body += data
						})
						req.on('end', async function () {
							const result = JSON.parse(body);
							fs.writeFileSync('./src/size_sorted_font_variants.json', JSON.stringify(result));
							res.writeHead(200);
							res.end();
							await browser.close();
							resolve();
						})
						break;
					default:
						res.writeHead(404);
						res.end();
				}
				break;
			default:
				res.writeHead(405);
				res.end();
				break;
		}
	}).listen(5678);

	(async () => {
		browser = await puppeteer.launch({
			headless: false,
			executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
		});
		const page = await browser.newPage();
		await page.goto('http://localhost:5678');
	})();
});

export default measureFonts;

import puppeteer from 'puppeteer';
import fs from 'fs';
import http from 'http';

import { writeJson } from './util.js';

async function measureFonts(__dirname) {
	const { default: allFonts } = await import('../src/allFonts.js');
	const remoteFonts = allFonts.filter(font => font.href);
	return new Promise((resolve, _reject) => {
		let browser;
		http
			.createServer(async function (req, res) {
				switch (req.method) {
					case 'GET':
						switch (req.url) {
							case '/':
								res.end(
									`<html><head><link href="./public/fonts/typography.css" rel="stylesheet" type="text/css" /><link href="./public/publicFonts/typography.css" rel="stylesheet" type="text/css" />${remoteFonts
										.map(font => `<link href="${font.href}&display=block" rel="stylesheet" type="text/css" />`)
										.join('')}</head><body><script>var allFonts = JSON.parse('${JSON.stringify(
										allFonts
									)}')</script><script src="./font_scripts/measureFontsClient.js"></script></body></html>`
								);
								break;
							default:
								fs.readFile(__dirname + req.url, function (err, data) {
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
								let resultsBody = '';
								req.on('data', function (data) {
									resultsBody += data;
								});
								req.on('end', async function () {
									const result = JSON.parse(resultsBody);
									writeJson('sizeSortedFontVariants', result);
									res.writeHead(200);
									res.end();
								});
								break;
							case '/multiplexed':
								let multiplexedBody = '';
								req.on('data', function (data) {
									multiplexedBody += data;
								});
								req.on('end', async function () {
									const result = JSON.parse(multiplexedBody);
									writeJson('multiplexedFonts', result);
									res.writeHead(200);
									res.end();
								});
								break;
							case '/done':
								res.writeHead(200);
								res.end();
								await browser.close();
								resolve();
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
			})
			.listen(5678);

		(async () => {
			browser = await puppeteer.launch({
				headless: false,
				executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
				defaultViewport: null,
				args: ['--window-size=400,400'],
			});
			const page = await browser.newPage();
			await page.goto('http://localhost:5678');
		})();
	});
}

export default measureFonts;

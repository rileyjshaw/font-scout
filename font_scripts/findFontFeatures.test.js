import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { aggregateFonts, generateCatalogModule, generateCss, parseFontFile, scanFonts } from './findFontFeatures.js';

const projectRoot = path.resolve(import.meta.dirname, '..');

test('extracts static OpenType metadata, features, and explicit corrections', async () => {
	const face = await parseFontFile('public/publicFonts/CooperHewitt-Heavy.woff2', { projectRoot });
	const uncorrected = await parseFontFile('public/publicFonts/CooperHewitt-Heavy.woff2', {
		projectRoot,
		overrides: {},
	});
	assert.equal(face.family, 'Cooper Hewitt');
	assert.equal(face.subfamily, 'Heavy');
	assert.equal(face.weight, 900);
	assert.equal(uncorrected.weight, 713);
	assert.equal(face.width, 100);
	assert.equal(face.italic, 0);
	assert.ok(face.features.includes('dlig'));
	assert.ok(face.features.includes('kern'));
});

test('extracts static width and italic or oblique metadata', async () => {
	const condensed = await parseFontFile('public/publicFonts/AUTHENTICSans-Condensed-150.woff2', { projectRoot });
	const uncorrectedCondensed = await parseFontFile('public/publicFonts/AUTHENTICSans-Condensed-150.woff2', {
		projectRoot,
		overrides: {},
	});
	const oblique = await parseFontFile('public/publicFonts/VictorMono-LightOblique.woff2', { projectRoot });
	assert.equal(condensed.width, 75);
	assert.equal(condensed.weight, 900);
	assert.equal(uncorrectedCondensed.weight, 700);
	assert.equal(oblique.oblique, 1);
	assert.equal(oblique.italic, 0);
});

test('converts registered variable axes to variant ranges', async () => {
	const roman = await parseFontFile('public/publicFonts/Satoshi-Variable.woff2', { projectRoot });
	const italic = await parseFontFile('public/publicFonts/Satoshi-VariableItalic.woff2', { projectRoot });
	const [family] = aggregateFonts([roman, italic]);
	assert.equal(family.name, 'Satoshi');
	assert.equal(family.isVariable, true);
	assert.deepEqual(
		family.variants.map(variant => variant.weight),
		[
			[300, 900],
			[300, 900],
		],
	);
	assert.deepEqual(
		family.variants.map(variant => variant.italic),
		[0, 1],
	);
	assert.equal(family.axes, undefined);
	assert.ok(family.features.includes('ss04'));
});

test('retains compatible custom axes and rejects incompatible definitions', () => {
	const base = {
		family: 'Axis Test',
		path: 'fonts/a.woff2',
		format: 'woff2',
		subfamily: 'Regular',
		weight: 400,
		width: 100,
		italic: 0,
		oblique: 0,
		features: [],
		isVariable: true,
		axes: { GRAD: ['Grade', -100, 100, 0, 1] },
	};
	assert.deepEqual(aggregateFonts([base])[0].axes, base.axes);
	assert.throws(
		() => aggregateFonts([base, { ...base, path: 'fonts/b.woff2', axes: { GRAD: ['Grade', 0, 100, 0, 1] } }]),
		/incompatible/,
	);
});

test('groups faces, unions features, and emits escaped root-relative CSS', () => {
	const faces = [
		{
			family: "A'B",
			path: 'fonts/A B(1).woff2',
			format: 'woff2',
			subfamily: 'Regular',
			weight: [200, 800],
			width: 100,
			italic: 0,
			oblique: 0,
			axes: { wght: ['Weight', 200, 800, 400, 1] },
			features: ['liga'],
			isVariable: true,
		},
	];
	const css = generateCss(aggregateFonts(faces));
	assert.match(css, /font-family: 'A\\'B'/);
	assert.match(css, /url\('\/fonts\/A%20B%281%29\.woff2'\)/);
	assert.match(css, /font-weight: 200 800/);
});

test('emits compact per-variant feature groups only when faces differ', () => {
	const base = {
		family: 'Feature Family',
		format: 'woff2',
		subfamily: 'Regular',
		weight: 400,
		width: 100,
		italic: 0,
		oblique: 0,
		axes: {},
		isVariable: false,
	};
	const [family] = aggregateFonts([
		{ ...base, path: 'fonts/regular.woff2', features: ['kern', 'mark', 'ss01'] },
		{ ...base, path: 'fonts/italic.woff2', subfamily: 'Italic', italic: 1, features: ['dlig', 'kern', 'mark'] },
	]);
	const source = generateCatalogModule([family]);
	const runtimeCatalog = JSON.parse(source.match(/export default ([\s\S]+);\n$/)[1]);
	assert.deepEqual(runtimeCatalog['Feature Family'].features, ['kern', 'mark']);
	assert.equal(runtimeCatalog['Feature Family'].featureGroups.length, 2);
	assert.doesNotMatch(source, /regular\.woff2/);
});

test('emits normal and italic faces for a variable ital axis', () => {
	const css = generateCss([
		{
			name: 'Variable Italic',
			faces: [
				{
					path: 'fonts/variable.woff2',
					format: 'woff2',
					weight: 400,
					width: 100,
					italic: [0, 1],
					oblique: 0,
				},
			],
		},
	]);
	assert.equal((css.match(/@font-face/g) ?? []).length, 2);
	assert.match(css, /font-style: normal/);
	assert.match(css, /font-style: italic/);
});

test('requires complete overrides when parsing fails', async () => {
	const temporaryRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'font-scout-invalid-'));
	await fs.mkdir(path.join(temporaryRoot, 'fonts'));
	await fs.writeFile(path.join(temporaryRoot, 'fonts', 'invalid.woff2'), 'not a font');
	await assert.rejects(
		parseFontFile('fonts/invalid.woff2', {
			projectRoot: temporaryRoot,
			overrides: { 'fonts/invalid.woff2': { family: 'Invalid' } },
		}),
		/override is missing/,
	);
	const corrected = await parseFontFile('fonts/invalid.woff2', {
		projectRoot: temporaryRoot,
		overrides: {
			'fonts/invalid.woff2': {
				family: 'Corrected',
				subfamily: 'Regular',
				weight: 400,
				width: 100,
				italic: 0,
				oblique: 0,
				axes: {},
				metrics: [[400, 10, 1.2]],
			},
		},
	});
	assert.equal(corrected.family, 'Corrected');
});

test('discovers recursively and produces deterministic output', async () => {
	const temporaryRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'font-scout-scan-'));
	await fs.mkdir(path.join(temporaryRoot, 'fonts', 'nested'), { recursive: true });
	await fs.copyFile(
		path.join(projectRoot, 'public/publicFonts/Junction-Regular.woff2'),
		path.join(temporaryRoot, 'fonts', 'nested', 'Junction-Regular.woff2'),
	);
	await fs.writeFile(path.join(temporaryRoot, 'fonts', 'ignored.txt'), 'ignored');
	const first = await scanFonts({ projectRoot: temporaryRoot, roots: ['fonts'], overrides: {}, write: false });
	const second = await scanFonts({ projectRoot: temporaryRoot, roots: ['fonts'], overrides: {}, write: false });
	assert.equal(first.faces.length, 1);
	assert.equal(first.catalog, second.catalog);
	assert.equal(first.css, second.css);
	assert.doesNotMatch(first.catalog, /"faces"/);
	assert.doesNotMatch(first.catalog, /"isVariable": false/);
	assert.doesNotMatch(first.catalog, /"oblique": 0/);
	assert.match(first.catalog, /"Junction"/);

	await scanFonts({
		projectRoot: temporaryRoot,
		roots: ['fonts'],
		overrides: {},
		catalogOutput: 'generated.js',
		cssOutput: 'generated.css',
	});
	await fs.rm(path.join(temporaryRoot, 'fonts', 'nested', 'Junction-Regular.woff2'));
	const afterDeletion = await scanFonts({
		projectRoot: temporaryRoot,
		roots: ['fonts'],
		overrides: {},
		catalogOutput: 'generated.js',
		cssOutput: 'generated.css',
	});
	assert.equal(afterDeletion.families.length, 0);
	assert.doesNotMatch(await fs.readFile(path.join(temporaryRoot, 'generated.js'), 'utf8'), /Junction/);
});

test('fails explicitly for unsupported font collections', async () => {
	const temporaryRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'font-scout-collection-'));
	await fs.mkdir(path.join(temporaryRoot, 'fonts'));
	await fs.writeFile(path.join(temporaryRoot, 'fonts', 'collection.ttc'), 'collection');
	await assert.rejects(scanFonts({ projectRoot: temporaryRoot, roots: ['fonts'], write: false }), /Unsupported/);
});

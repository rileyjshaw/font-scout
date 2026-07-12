# Font Scout

I made this tool to compare a bunch of local fonts side-by-side. I eventually added the entire catalog of [Google Fonts](https://fonts.google.com) too. This tool is scrappy and built for personal use, so I didn’t have public consumption in mind. For instance, there are a bunch of paid font definitions hardcoded in, but the fonts themselves aren’t included in the repo. Remix it however you want.

I included some open fonts in the repo, but didn’t include any paid or non-open fonts. If you [buy the referenced fonts from Atipo](https://www.atipofoundry.com/), for instance, copy them to `./public/fonts`.

## Get started

```
git clone git@github.com:rileyjshaw/font-scout
cd font-scout
yarn install
# Optionally copy non-open fonts into ./public/fonts, or add some of your own
# local fonts into the `defaultFonts` array in `App.js`
yarn start
```

## Add local fonts

Copy `.woff`, `.woff2`, `.ttf`, or `.otf` files anywhere under `public/fonts` or `public/publicFonts`, then regenerate the local catalog and stylesheet:

```sh
yarn scan-fonts
```

The command reads names, variants, variable axes, OpenType features, and normalized layout metrics directly from each font. It fails with the affected path when a font has invalid metadata; known broken files can be corrected explicitly in `font_scripts/localFontOverrides.js`.

To refresh both local and Google font metadata, run:

```sh
yarn update-fonts
```

Google binary analysis is cached by versioned font URL under `font_scripts/.cache`, so subsequent refreshes only inspect changed files.

## Where is the rest of the documentation?

Sorry, I haven’t written any! [Here’s a quick screen recording of an early version instead.](https://youtu.be/TRGodGOu3Ww)

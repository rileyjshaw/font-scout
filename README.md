# Font comparison tool

I made this tool to compare a bunch of local fonts side-by-side. I eventually added the entire catalog of [Google Fonts](https://fonts.google.com) too. This tool is scrappy and built for personal use, so I didn’t have public consumption in mind. For instance, there are a bunch of paid font definitions from [Atipo Foundry](https://www.atipofoundry.com/) hardcoded in. Remix it however you want.

I included some open fonts in the repo, but didn’t include any paid or non-open fonts. If you [buy the referenced fonts from Atipo](https://www.atipofoundry.com/), for instance, copy them to `./public/fonts`.

## Get started

```
git clone git@github.com:rileyjshaw/font-comparison-tool
cd font-comparison-tool
yarn install
# Optionally copy non-open fonts into ./public/fonts, or add some of your own
# local fonts into the `defaultFonts` array in `App.js`
yarn start
```

## Where is the rest of the documentation?

Sorry, I haven’t written any! [Here’s a quick screen recording of an early version instead.](https://youtu.be/TRGodGOu3Ww)

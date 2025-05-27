# TODO

Add variable font support. Variable axes can be arrays. For instance:

```.js
variants = [
  {
    weight: [200, 900],
    italic: false,
  },
  {
    weight: [200, 900],
    italic: true,
  }
]
```

These are the axes from Google Fonts:

```.js
{
  ARRR: [ 10, 60 ],
  wght: [ 1, 1000 ],
  wdth: [ 25, 200 ],
  opsz: [ 5, 1200 ],
  slnt: [ -15, 13 ],
  YEAR: [ 1979, 2050 ],
  FLAR: [ 0, 100 ],
  VOLM: [ 0, 100 ],
  SOFT: [ 0, 100 ],
  WONK: [ 0, 1 ],
  CRSV: [ 0, 1 ],
  SHRP: [ 0, 100 ],
  ELGR: [ 1, 2 ],
  ELSH: [ 0, 16 ],
  MORF: [ 0, 60 ],
  SHLN: [ 0, 100 ],
  YOPQ: [ 25, 300 ],
  EDPT: [ 0, 200 ],
  EHLT: [ 0, 24 ],
  YTLC: [ 416, 570 ],
  HEXP: [ 0, 100 ],
  CASL: [ 0, 1 ],
  MONO: [ 0, 1 ],
  GRAD: [ -200, 150 ],
  XTRA: [ 323, 603 ],
  YTAS: [ 649, 854 ],
  YTDE: [ -305, -98 ],
  YTFI: [ 560, 788 ],
  YTUC: [ 528, 760 ],
  BNCE: [ -100, 100 ],
  INFM: [ 0, 100 ],
  SPAC: [ 0, 100 ],
  BLED: [ 0, 100 ],
  SCAN: [ -53, 100 ],
  XROT: [ -45, 45 ],
  YROT: [ -45, 45 ]
}
```

Also handle font toggle features.
// const FONT_FEATURES = ['liga', 'pnum', 'tnum', 'kern', 'dlig', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07'];

---

- Add more font sources

  - http://velvetyne.fr/fonts/basteleur/
  - https://www.fontshare.com/
  - http://usemodify.com/
  - https://twitter.com/oguzyagizkara/status/1609945203414007809
  - https://www.fontshare.com/

- Add integration with the localfonts API, like this site does: https://fallback.localfonts.xyz
- Also take some design inspiration from https://fallback.localfonts.xyz. The small grid option with two characters is nice, as is adding a background.

- Improve filtering. For instance, I should be able to fuzzy search a specific font name
- Add a stylistic alternatives popup like this site has: https://www.paratype.com/fonts/pt/pt-root-ui/light

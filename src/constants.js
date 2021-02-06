export const THIN = Symbol("THIN");
export const EXTRA_LIGHT = Symbol("EXTRA_LIGHT");
export const LIGHT = Symbol("LIGHT");
export const REGULAR = Symbol("REGULAR");
export const BOOK = Symbol("BOOK");
export const MEDIUM = Symbol("MEDIUM");
export const SEMI_BOLD = Symbol("SEMI_BOLD");
export const BOLD = Symbol("BOLD");
export const ULTRA_BOLD = Symbol("ULTRA_BOLD");
export const BLACK = Symbol("BLACK");
export const ULTRA_BLACK = Symbol("ULTRA_BLACK");

export const WEIGHTS = {
  [THIN]: {
    name: "Thin",
    value: 100,
  },
  [EXTRA_LIGHT]: {
    name: "Extra light",
    value: 200,
  },
  [LIGHT]: {
    name: "Light",
    value: 300,
  },
  [REGULAR]: {
    name: "",
    value: 400,
  },
  [BOOK]: {
    name: "Book",
    value: 450,
  },
  [MEDIUM]: {
    name: "Medium",
    value: 500,
  },
  [SEMI_BOLD]: {
    name: "Semi bold",
    value: 600,
  },
  [BOLD]: {
    name: "Bold",
    value: 700,
  },
  [ULTRA_BOLD]: {
    name: "Ultra bold",
    value: 800,
  },
  [BLACK]: {
    name: "Black",
    value: 900,
  },
  [ULTRA_BLACK]: {
    name: "Ultra black",
    value: 950,
  },
};

export const WEIGHT_SYMBOLS = Reflect.ownKeys(WEIGHTS).reduce((acc, key) => {
  const { value } = WEIGHTS[key];
  acc[value] = key;
  return acc;
}, {});

export const STRETCH_ORDER = [
  "ultra-condensed",
  "extra-condensed",
  "condensed",
  "semi-condensed",
  "normal",
  "semi-expanded",
  "expanded",
  "extra-expanded",
  "ultra-expanded",
];

// Note: Not using Symbols because React Select doesn’t expect them.
export const ATIPO_COLLECTION = "ATIPO_COLLECTION";
export const GOOGLE_FONTS_COLLECTION = "GOOGLE_FONTS_COLLECTION";
export const TYPEWOLF_40_GOOGLE_FONTS_COLLECTION =
  "TYPEWOLF_40_GOOGLE_FONTS_COLLECTION";
export const LOCAL_FONTS_COLLECTION = "LOCAL_FONTS_COLLECTION";
export const FREE_OPEN_COLLECTION = "FREE_OPEN_COLLECTION";
export const UNCATEGORIZED_COLLECTION = "UNCATEGORIZED_COLLECTION";

export const COLLECTION_NAMES = {
  ATIPO_COLLECTION: "Atipo foundry",
  GOOGLE_FONTS_COLLECTION: "Google fonts",
  TYPEWOLF_40_GOOGLE_FONTS_COLLECTION: "Typewolf’s “40 Best Google fonts”",
  LOCAL_FONTS_COLLECTION: "Local fonts",
  FREE_OPEN_COLLECTION: "Free and/or open source",
  UNCATEGORIZED: "Uncategorized fonts",
};

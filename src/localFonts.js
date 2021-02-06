import {
  THIN,
  EXTRA_LIGHT,
  LIGHT,
  REGULAR,
  BOOK,
  MEDIUM,
  SEMI_BOLD,
  BOLD,
  ULTRA_BOLD,
  BLACK,
  ULTRA_BLACK,
  ATIPO_COLLECTION,
  LOCAL_FONTS_COLLECTION,
  FREE_OPEN_COLLECTION,
} from "./constants";

const atipoFonts = [
  {
    name: "Archia",
    weights: [THIN, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD],
    italics: false,
  },
  {
    name: "Argesta Display",
    weights: [REGULAR],
    italics: true,
  },
  {
    name: "Argesta Hairline",
    weights: [REGULAR],
    italics: true,
  },
  {
    name: "Argesta Headline",
    weights: [REGULAR],
    italics: true,
  },
  {
    name: "Bariol",
    weights: [THIN, LIGHT, REGULAR, BOLD],
    italics: true,
  },
  {
    name: "Bariol Serif",
    weights: [THIN, LIGHT, REGULAR, BOLD],
    italics: true,
  },
  {
    name: "Basier Circle",
    weights: [REGULAR, MEDIUM, SEMI_BOLD, BOLD],
    italics: true,
  },
  {
    name: "Basier Circle Mono",
    weights: [REGULAR, MEDIUM, SEMI_BOLD, BOLD],
    italics: true,
  },
  {
    name: "Basier Square",
    weights: [REGULAR, MEDIUM, SEMI_BOLD, BOLD],
    italics: true,
  },
  {
    name: "Basier Square Mono",
    weights: [REGULAR, MEDIUM, SEMI_BOLD, BOLD],
    italics: true,
  },
  {
    name: "Bould",
    weights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD],
    italics: true,
  },
  {
    name: "Calendas Plus",
    weights: [REGULAR, BOLD],
    italics: [REGULAR],
  },
  {
    name: "Cassannet Plus",
    weights: [THIN, LIGHT, REGULAR, BOLD, BLACK, ULTRA_BLACK],
    italics: false,
  },
  {
    name: "Chaney",
    weights: [REGULAR],
    stretches: {
      [REGULAR]: {
        values: ["semi-expanded", "expanded", "ultra-expanded"],
        italics: false,
      },
    },
    italics: false,
    aliases: {
      "semi-expanded": "wide",
    },
  },
  {
    name: "Geomanist",
    weights: [
      THIN,
      EXTRA_LIGHT,
      LIGHT,
      REGULAR,
      BOOK,
      MEDIUM,
      BOLD,
      BLACK,
      ULTRA_BLACK,
    ],
    italics: true,
  },
  {
    name: "Knile",
    weights: [
      THIN,
      EXTRA_LIGHT,
      LIGHT,
      REGULAR,
      MEDIUM,
      SEMI_BOLD,
      BOLD,
      BLACK,
    ],
    italics: true,
  },
  {
    name: "MUSETTA",
    weights: [REGULAR],
    italics: false,
  },
  {
    name: "Noway",
    weights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD],
    italics: true,
  },
  {
    name: "Noway Round",
    weights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD],
    italics: true,
  },
  {
    name: "PARKING",
    weights: [REGULAR],
    italics: false,
  },
  {
    name: "Salome",
    weights: [REGULAR],
    italics: true,
  },
  {
    name: "Salome Deco",
    weights: [REGULAR],
    italics: false,
  },
  {
    name: "Salome Fine",
    weights: [REGULAR],
    italics: true,
  },
  {
    name: "Salome Stencil",
    weights: [REGULAR],
    italics: true,
  },
  {
    name: "Sawton Bauhaus",
    weights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD],
    italics: false,
  },
  {
    name: "Sawton Circular",
    weights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD],
    italics: false,
  },
  {
    name: "Sawton Industrial",
    weights: [THIN, LIGHT, REGULAR, MEDIUM, BOLD],
    italics: false,
  },
  {
    name: "Scilla",
    weights: [REGULAR],
    italics: true,
    stretches: {
      [REGULAR]: {
        values: ["condensed"],
        italics: true,
      },
    },
    aliases: {
      condensed: "narrow",
      "italic condensed": "italic narrow",
    },
  },
  {
    name: "Silka",
    weights: [
      THIN,
      EXTRA_LIGHT,
      LIGHT,
      REGULAR,
      MEDIUM,
      SEMI_BOLD,
      BOLD,
      BLACK,
    ],
    italics: true,
  },
  {
    name: "Silka Mono",
    weights: [
      THIN,
      EXTRA_LIGHT,
      LIGHT,
      REGULAR,
      MEDIUM,
      SEMI_BOLD,
      BOLD,
      BLACK,
    ],
    italics: true,
  },
  {
    name: "Wotfard",
    weights: [THIN, EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD],
    italics: true,
  },
].map((font) => ({
  ...font,
  collections: [...(font.collections ?? []), ATIPO_COLLECTION],
}));

const freeOpenFonts = [
  {
    name: "Bagnard",
    weights: [REGULAR],
    italics: false,
  },
  {
    name: "Blackout 2AM",
    weights: [REGULAR],
    italics: false,
  },
  {
    name: "Blackout Midnight",
    weights: [REGULAR],
    italics: false,
  },
  {
    name: "Blackout Sunrise",
    weights: [REGULAR],
    italics: false,
  },
  {
    name: "Butler",
    weights: [EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, BOLD, ULTRA_BOLD, BLACK],
    italics: false,
  },
  {
    name: "Butler Stencil",
    weights: [EXTRA_LIGHT, LIGHT, REGULAR, MEDIUM, BOLD, ULTRA_BOLD, BLACK],
    italics: false,
  },
  {
    name: "Cooper Hewitt",
    weights: [THIN, LIGHT, REGULAR, MEDIUM, SEMI_BOLD, BOLD, BLACK],
    italics: true,
  },
  {
    name: "Junction",
    weights: [LIGHT, REGULAR, BOLD],
    italics: false,
  },
  {
    name: "League Gothic",
    weights: [REGULAR],
    italics: true,
    stretches: {
      [REGULAR]: {
        values: ["condensed"],
        italics: true,
      },
    },
  },
  {
    name: "League Mono",
    weights: [
      THIN,
      EXTRA_LIGHT,
      LIGHT,
      REGULAR,
      MEDIUM,
      SEMI_BOLD,
      BOLD,
      ULTRA_BOLD,
    ],
    italics: false,
    stretches: [
      THIN,
      EXTRA_LIGHT,
      LIGHT,
      REGULAR,
      MEDIUM,
      SEMI_BOLD,
      BOLD,
      ULTRA_BOLD,
    ].reduce((acc, weight) => {
      acc[weight] = {
        values: ["condensed", "semi-condensed", "semi-expanded", "expanded"],
        italics: false,
      };
      return acc;
    }, {}),
  },
  {
    name: "League Spartan",
    weights: [
      EXTRA_LIGHT,
      LIGHT,
      REGULAR,
      MEDIUM,
      SEMI_BOLD,
      BOLD,
      ULTRA_BOLD,
      BLACK,
    ],
    italics: false,
  },
  {
    name: "Liberation Mono",
    weights: [REGULAR, BOLD],
    italics: true,
  },
  {
    name: "Liberation Sans",
    weights: [REGULAR, BOLD],
    italics: true,
  },
  {
    name: "Liberation Serif",
    weights: [REGULAR, BOLD],
    italics: true,
  },
  {
    name: "Metropolis",
    weights: [
      THIN,
      EXTRA_LIGHT,
      LIGHT,
      REGULAR,
      MEDIUM,
      SEMI_BOLD,
      BOLD,
      ULTRA_BOLD,
      BLACK,
    ],
    italics: true,
  },
].map((font) => ({
  ...font,
  collections: [...(font.collections ?? []), FREE_OPEN_COLLECTION],
}));

const localFonts = [...atipoFonts, ...freeOpenFonts].map((font) => ({
  ...font,
  collections: [...(font.collections ?? []), LOCAL_FONTS_COLLECTION],
}));

export default localFonts;

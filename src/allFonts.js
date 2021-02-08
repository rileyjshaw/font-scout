import googleFonts from "./googleFonts.js";
import localFonts from "./localFonts.js";

import {
  REGULAR,
  WEIGHTS,
  STRETCH_ORDER,
  UNCATEGORIZED_COLLECTION,
} from "./constants";

const allFonts = [...googleFonts, ...localFonts]
  .map((font) => ({
    name: font.name,
    href: font.href,
    variants: [
      ...font.weights.map((weight) => ({
        weight: WEIGHTS[weight].value,
        name: WEIGHTS[weight].name,
        style: "normal",
        stretch: "normal",
      })),
      ...(typeof font.italics === "boolean"
        ? font.italics
          ? font.weights
          : []
        : font.italics
      ).map((weight) => ({
        weight: WEIGHTS[weight].value,
        name: [WEIGHTS[weight].name, "italic"].filter((x) => x).join(" "),
        style: "italic",
        stretch: "normal",
      })),
      ...(font.stretches
        ? Reflect.ownKeys(font.stretches).flatMap((weight) => {
            const { values, italics } = font.stretches[weight];
            const variants = values.map((stretch) => ({
              weight: WEIGHTS[weight].value,
              name: [WEIGHTS[weight].name, stretch].filter((x) => x).join(" "),
              style: "normal",
              stretch,
            }));
            return italics
              ? [
                  ...variants,
                  ...variants.map((variant) => ({
                    ...variant,
                    name: [
                      WEIGHTS[weight].name,
                      italics ? "italic" : "",
                      variant.stretch,
                    ]
                      .filter((x) => x)
                      .join(" "),
                    style: "italic",
                  })),
                ]
              : variants;
          })
        : []),
    ]
      .map((variant) => ({
        ...variant,
        name: [font.name, font.aliases?.[variant.name] ?? variant.name]
          .filter((x) => x)
          .join(" "),
      }))
      .sort(
        (a, b) =>
          a.weight -
          b.weight +
          ((a.style === "italic") - (b.style === "italic")) * 10 +
          (STRETCH_ORDER.indexOf(a.stretch) - STRETCH_ORDER.indexOf(b.stretch))
      ),
    show: true,
    marked: false,
    sizeOffset: 1,
    collections: font.collections ?? [UNCATEGORIZED_COLLECTION],
  }))
  .sort((a, b) => a.name.localeCompare(b.name));
allFonts.forEach(
  (font) =>
    (font.activeVariant = Math.max(
      0,
      font.variants.findIndex(
        (variant) =>
          variant.weight === WEIGHTS[REGULAR].value &&
          variant.style === "normal" &&
          variant.stretch === "normal"
      )
    ))
);

export default allFonts;

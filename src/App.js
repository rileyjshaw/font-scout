import { useRef, useState } from "react";
import Select from "react-select";
import useHover from "@react-hook/hover";
import useKeypress from "react-use-keypress";

import "./App.css";

const weights = Object.entries({
  THIN: 100,
  EXTRA_LIGHT: 200,
  LIGHT: 300,
  REGULAR: 400,
  BOOK: 450,
  MEDIUM: 500,
  SEMI_BOLD: 600,
  BOLD: 700,
  ULTRA_BOLD: 800,
  BLACK: 900,
  ULTRA_BLACK: 950,
}).reduce(
  (acc, [curKey, curVal]) => ({
    ...acc,
    [curKey]: {
      value: curVal,
      name:
        curKey === "REGULAR"
          ? ""
          : `${curKey[0]}${curKey.slice(1).replace("_", " ")}`.toLowerCase(),
    },
  }),
  {}
);

const stretchOrder = [
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

const defaultFonts = [
  {
    name: "Archia",
    weights: ["THIN", "LIGHT", "REGULAR", "MEDIUM", "SEMI_BOLD", "BOLD"],
    italics: false,
  },
  {
    name: "Argesta Display",
    weights: ["REGULAR"],
    italics: true,
  },
  {
    name: "Argesta Hairline",
    weights: ["REGULAR"],
    italics: true,
  },
  {
    name: "Argesta Headline",
    weights: ["REGULAR"],
    italics: true,
  },
  {
    name: "Bariol",
    weights: ["THIN", "LIGHT", "REGULAR", "BOLD"],
    italics: true,
  },
  {
    name: "Bariol Serif",
    weights: ["THIN", "LIGHT", "REGULAR", "BOLD"],
    italics: true,
  },
  {
    name: "Basier Circle",
    weights: ["REGULAR", "MEDIUM", "SEMI_BOLD", "BOLD"],
    italics: true,
  },
  {
    name: "Basier Circle Mono",
    weights: ["REGULAR", "MEDIUM", "SEMI_BOLD", "BOLD"],
    italics: true,
  },
  {
    name: "Basier Square",
    weights: ["REGULAR", "MEDIUM", "SEMI_BOLD", "BOLD"],
    italics: true,
  },
  {
    name: "Basier Square Mono",
    weights: ["REGULAR", "MEDIUM", "SEMI_BOLD", "BOLD"],
    italics: true,
  },
  {
    name: "Bould",
    weights: [
      "THIN",
      "EXTRA_LIGHT",
      "LIGHT",
      "REGULAR",
      "MEDIUM",
      "SEMI_BOLD",
      "BOLD",
    ],
    italics: true,
  },
  {
    name: "Calendas Plus",
    weights: ["REGULAR", "BOLD"],
    italics: ["REGULAR"],
  },
  {
    name: "Cassannet Plus",
    weights: ["THIN", "LIGHT", "REGULAR", "BOLD", "BLACK", "ULTRA_BLACK"],
    italics: false,
  },
  {
    name: "Chaney",
    weights: ["REGULAR"],
    stretches: {
      REGULAR: {
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
      "THIN",
      "EXTRA_LIGHT",
      "LIGHT",
      "REGULAR",
      "BOOK",
      "MEDIUM",
      "BOLD",
      "BLACK",
      "ULTRA_BLACK",
    ],
    italics: true,
  },
  {
    name: "Knile",
    weights: [
      "THIN",
      "EXTRA_LIGHT",
      "LIGHT",
      "REGULAR",
      "MEDIUM",
      "SEMI_BOLD",
      "BOLD",
      "BLACK",
    ],
    italics: true,
  },
  {
    name: "MUSETTA",
    weights: ["REGULAR"],
    italics: false,
  },
  {
    name: "Noway",
    weights: ["THIN", "LIGHT", "REGULAR", "MEDIUM", "BOLD"],
    italics: true,
  },
  {
    name: "Noway Round",
    weights: ["THIN", "LIGHT", "REGULAR", "MEDIUM", "BOLD"],
    italics: true,
  },
  {
    name: "PARKING",
    weights: ["REGULAR"],
    italics: false,
  },
  {
    name: "Salome",
    weights: ["REGULAR"],
    italics: true,
  },
  {
    name: "Salome Deco",
    weights: ["REGULAR"],
    italics: false,
  },
  {
    name: "Salome Fine",
    weights: ["REGULAR"],
    italics: true,
  },
  {
    name: "Salome Stencil",
    weights: ["REGULAR"],
    italics: true,
  },
  {
    name: "Sawton Bauhaus",
    weights: ["THIN", "LIGHT", "REGULAR", "MEDIUM", "BOLD"],
    italics: false,
  },
  {
    name: "Sawton Circular",
    weights: ["THIN", "LIGHT", "REGULAR", "MEDIUM", "BOLD"],
    italics: false,
  },
  {
    name: "Sawton Industrial",
    weights: ["THIN", "LIGHT", "REGULAR", "MEDIUM", "BOLD"],
    italics: false,
  },
  {
    name: "Scilla",
    weights: ["REGULAR"],
    italics: true,
    stretches: {
      REGULAR: {
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
      "THIN",
      "EXTRA_LIGHT",
      "LIGHT",
      "REGULAR",
      "MEDIUM",
      "SEMI_BOLD",
      "BOLD",
      "BLACK",
    ],
    italics: true,
  },
  {
    name: "Silka Mono",
    weights: [
      "THIN",
      "EXTRA_LIGHT",
      "LIGHT",
      "REGULAR",
      "MEDIUM",
      "SEMI_BOLD",
      "BOLD",
      "BLACK",
    ],
    italics: true,
  },
  {
    name: "Wotfard",
    weights: [
      "THIN",
      "EXTRA_LIGHT",
      "LIGHT",
      "REGULAR",
      "MEDIUM",
      "SEMI_BOLD",
      "BOLD",
    ],
    italics: true,
  },
].map((font) => ({
  name: font.name,
  variants: [
    ...font.weights.map((weight, i) => ({
      weight: weights[weight].value,
      name: weights[weight].name,
      style: "normal",
      stretch: "normal",
    })),
    ...(typeof font.italics === "boolean"
      ? font.italics
        ? font.weights
        : []
      : font.italics
    ).map((weight) => ({
      weight: weights[weight].value,
      name: [weights[weight].name, "italic"].filter((x) => x).join(" "),
      style: "italic",
      stretch: "normal",
    })),
    ...(font.stretches
      ? Object.entries(font.stretches).flatMap(
          ([weight, { values, italics }]) => {
            const variants = values.map((stretch) => ({
              weight: weights[weight].value,
              name: [weights[weight].name, stretch].filter((x) => x).join(" "),
              style: "normal",
              stretch,
            }));
            return italics
              ? [
                  ...variants,
                  ...variants.map((variant) => ({
                    ...variant,
                    name: [
                      weights[weight].name,
                      italics ? "italic" : "",
                      variant.stretch,
                    ]
                      .filter((x) => x)
                      .join(" "),
                    style: "italic",
                  })),
                ]
              : variants;
          }
        )
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
        (stretchOrder.indexOf(a.stretch) - stretchOrder.indexOf(b.stretch))
    ),
  show: true,
  marked: false,
  sizeOffset: 0,
}));
defaultFonts.forEach(
  (font) =>
    (font.activeVariant = font.variants.findIndex(
      (variant) =>
        variant.weight === weights.REGULAR.value &&
        variant.style === "normal" &&
        variant.stretch === "normal"
    ))
);

function FontContainer({
  font,
  onChangeShowToggle,
  onChangeMarkedToggle,
  onChangeSizeOffset,
  onChangeSelect,
  showSettings,
  previewContent,
  alignment,
  fontSize,
}) {
  const ref = useRef(null);
  const isHovering = useHover(ref);

  const variantOptions = font.variants.map((variant, i) => ({
    value: i,
    label: `${variant.name}`,
  }));

  return (
    <li ref={ref} className="font-container">
      {showSettings && (
        <div className="font-settings">
          <input
            className="show-font-toggle"
            type="checkbox"
            checked={font.show}
            onChange={onChangeShowToggle}
            id={`show-font-toggle-${font.name
              .toLowerCase()
              .replace(/[ _]/g, "-")}`}
          />
          <label
            htmlFor={`show-font-toggle-${font.name
              .toLowerCase()
              .replace(/[ _]/g, "-")}`}
          />
          <input
            className="marked-font-toggle"
            type="checkbox"
            checked={font.marked}
            onChange={onChangeMarkedToggle}
            id={`marked-font-toggle-${font.name
              .toLowerCase()
              .replace(/[ _]/g, "-")}`}
          />
          <label
            htmlFor={`marked-font-toggle-${font.name
              .toLowerCase()
              .replace(/[ _]/g, "-")}`}
          />
          <Select
            value={variantOptions[font.activeVariant]}
            options={variantOptions}
            className="select-font-variant"
            styles={{
              option: (provided, state) => ({
                ...provided,
                fontFamily: font.name,
                fontWeight: font.variants[state.value].weight,
                fontStyle: font.variants[state.value].style,
                fontStretch: font.variants[state.value].stretch,
              }),
              singleValue: (provided, state) => ({
                ...provided,
                fontFamily: font.name,
                fontWeight: font.variants[state.data.value].weight,
                fontStyle: font.variants[state.data.value].style,
                fontStretch: font.variants[state.data.value].stretch,
              }),
            }}
            onChange={onChangeSelect}
          />
          <input
            className="font-size-offset-input"
            type="number"
            value={font.sizeOffset}
            onChange={onChangeSizeOffset}
          />
        </div>
      )}
      {!showSettings && isHovering && (
        <div className="font-hover-settings">
          <input
            className="show-font-toggle"
            type="checkbox"
            checked={font.show}
            onChange={onChangeShowToggle}
            id={`show-font-toggle-hover-${font.name
              .toLowerCase()
              .replace(/[ _]/g, "-")}`}
          />
          <label
            htmlFor={`show-font-toggle-hover-${font.name
              .toLowerCase()
              .replace(/[ _]/g, "-")}`}
          />
          <input
            className="marked-font-toggle"
            type="checkbox"
            checked={font.marked}
            onChange={onChangeMarkedToggle}
            id={`marked-font-toggle-hover-${font.name
              .toLowerCase()
              .replace(/[ _]/g, "-")}`}
          />
          <label
            htmlFor={`marked-font-toggle-hover-${font.name
              .toLowerCase()
              .replace(/[ _]/g, "-")}`}
          />
        </div>
      )}
      <pre
        className={`font-preview${font.marked ? " marked" : ""}`}
        style={{
          textAlign: alignment,
          fontFamily: font.name,
          fontWeight: font.variants[font.activeVariant].weight,
          fontSize: `${fontSize + font.sizeOffset}px`,
          fontStyle: font.variants[font.activeVariant].style,
          fontStretch: font.variants[font.activeVariant].stretch,
        }}
        title={font.variants[font.activeVariant].name}
        {...(font.show
          ? {
              dangerouslySetInnerHTML: {
                __html: previewContent,
              },
            }
          : {})}
      />
    </li>
  );
}

function App() {
  const [fonts, setFonts] = useState(defaultFonts);
  const [previewContent, setPreviewContent] = useState(
    "The thundering machines sputtered…\n\n…and stopped."
  );
  const [fontSize, setFontSize] = useState(22);
  const [fontWeight, setFontWeight] = useState(400);
  const [alignment, setAlignment] = useState("center");
  const [configMode, setConfigMode] = useState(true);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonIdx, setComparisonIdx] = useState(0);

  const markedFonts = fonts.filter((font) => font.marked && font.show);

  useKeypress("Escape", () => {
    setComparisonMode(false);
    setComparisonIdx(0);
  });
  useKeypress("ArrowLeft", () => {
    if (comparisonMode)
      setComparisonIdx(
        (i) => (markedFonts.length + (i - 1)) % markedFonts.length
      );
  });
  useKeypress("ArrowRight", () => {
    if (comparisonMode)
      setComparisonIdx(
        (i) => (markedFonts.length + (i - 1)) % markedFonts.length
      );
  });

  if (comparisonMode) {
    const font = markedFonts[comparisonIdx];
    return (
      <div className="comparison-mode">
        <pre
          className="font-preview"
          style={{
            textAlign: alignment,
            fontFamily: font.name,
            fontWeight: font.variants[font.activeVariant].weight,
            fontSize: `${fontSize + font.sizeOffset}px`,
            fontStyle: font.variants[font.activeVariant].style,
            fontStretch: font.variants[font.activeVariant].stretch,
          }}
        >
          {previewContent}
        </pre>
        <div className="comparison-mode-font-name">
          {font.variants[font.activeVariant].name}
        </div>
      </div>
    );
  }

  return (
    <div className={markedFonts.length ? "comparison-button-visible" : ""}>
      <div
        className={`global-settings${
          configMode ? " show-global-settings" : ""
        }`}
      >
        <label>
          Font size:
          <input
            className="global-font-size-input"
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(+e.target.value)}
          />
        </label>
        <label>
          Nearest weight:
          <input
            className="global-font-weight-input"
            type="number"
            value={fontWeight}
            step={100}
            onChange={(e) => {
              const targetWeight = +e.target.value;
              setFontWeight(targetWeight);
              setFonts((fonts) =>
                fonts.map((font) => {
                  const activeStyle = font.variants[font.activeVariant].style;
                  return {
                    ...font,
                    activeVariant: font.variants
                      .map((variant, index) => ({
                        index,
                        score:
                          Math.abs(variant.weight - targetWeight) -
                          (variant.style === activeStyle),
                      }))
                      .sort((a, b) => a.score - b.score)[0].index,
                  };
                })
              );
            }}
          />
        </label>
        <textarea
          rows={3}
          className="preview-text-input"
          value={previewContent}
          onChange={(e) => setPreviewContent(e.target.value)}
        />
        <fieldset className="alignment-options">
          Align:&nbsp;
          <input
            type="radio"
            value="left"
            checked={alignment === "left"}
            onChange={(e) => {
              setAlignment(e.target.value);
            }}
          />
          <input
            type="radio"
            value="center"
            checked={alignment === "center"}
            onChange={(e) => {
              setAlignment(e.target.value);
            }}
          />
          <input
            type="radio"
            value="right"
            checked={alignment === "right"}
            onChange={(e) => {
              setAlignment(e.target.value);
            }}
          />
        </fieldset>
        <input
          className="config-mode-toggle"
          type="checkbox"
          checked={configMode}
          onChange={(e) => setConfigMode(e.target.checked)}
          id="config-mode-toggle"
        />
        <label htmlFor="config-mode-toggle"></label>
      </div>

      <ul className="font-containers">
        {fonts
          .sort((a, b) => b.show - a.show || a.name.localeCompare(b.name))
          .map((font, i) => {
            if (!configMode && !font.show) return null;

            return (
              <FontContainer
                key={font.name}
                font={font}
                onChangeShowToggle={(e) =>
                  setFonts((fonts) => [
                    ...fonts.slice(0, i),
                    {
                      ...fonts[i],
                      show: e.target.checked,
                      marked: e.target.checked && fonts[i].marked,
                    },
                    ...fonts.slice(i + 1),
                  ])
                }
                onChangeMarkedToggle={(e) =>
                  setFonts((fonts) => [
                    ...fonts.slice(0, i),
                    { ...fonts[i], marked: e.target.checked },
                    ...fonts.slice(i + 1),
                  ])
                }
                onChangeSizeOffset={(e) =>
                  setFonts((fonts) => [
                    ...fonts.slice(0, i),
                    { ...fonts[i], sizeOffset: +e.target.value },
                    ...fonts.slice(i + 1),
                  ])
                }
                onChangeSelect={(newActiveVariant) =>
                  setFonts((fonts) => [
                    ...fonts.slice(0, i),
                    {
                      ...fonts[i],
                      activeVariant: newActiveVariant.value,
                    },
                    ...fonts.slice(i + 1),
                  ])
                }
                showSettings={configMode}
                previewContent={previewContent}
                fontSize={fontSize}
                alignment={alignment}
              />
            );
          })}
      </ul>
      {markedFonts.length > 1 && (
        <button
          className="start-comparison-button"
          onClick={() => setComparisonMode(true)}
        >
          Compare {markedFonts.length} marked fonts
        </button>
      )}
    </div>
  );
}

export default App;

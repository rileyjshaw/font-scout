import { useRef, useState } from "react";

import { Helmet } from "react-helmet";
import Select from "react-select";
import useHover from "@react-hook/hover";
import useKeypress from "react-use-keypress";

import {
  REGULAR,
  WEIGHTS,
  STRETCH_ORDER,
  COLLECTION_NAMES,
  LOCAL_FONTS_COLLECTION,
} from "./constants";
import googleFonts from "./googleFonts.js";
import localFonts from "./localFonts.js";

import "./App.css";

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
    sizeOffset: 0,
    collections: font.collections ?? [],
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

const collectionOptions = Object.entries(COLLECTION_NAMES).map(
  ([value, label]) => ({
    value,
    label,
  })
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
            isDisabled={variantOptions.length < 2}
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

const fontsFromCollections = (collections) =>
  allFonts.filter((font) =>
    font.collections.some((collection) => collections.includes(collection))
  );

function App() {
  const [fonts, setFonts] = useState(allFonts);
  const [previewContent, setPreviewContent] = useState(
    "The thundering machines sputtered…\n…and stopped."
  );
  const [fontSize, setFontSize] = useState(22);
  const [fontWeight, setFontWeight] = useState(400);
  const [alignment, setAlignment] = useState("center");
  const [configMode, setConfigMode] = useState(true);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonIdx, setComparisonIdx] = useState(0);
  const [activeFontNames, setActiveFontNames] = useState(
    fontsFromCollections([LOCAL_FONTS_COLLECTION]).map((font) => font.name)
  );
  const [loadedStylesheets, setLoadedStylesheets] = useState({});

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

  const [shownFonts, hiddenFonts] = activeFontNames.length
    ? fonts
        .map((font, i) => ({
          ...font,
          originalIndex: i,
        }))
        .filter((font) => activeFontNames.includes(font.name))
        .reduce(
          (acc, font) => {
            const [_shownFonts, _hiddenFonts] = acc;
            (font.show ? _shownFonts : _hiddenFonts).push(font);
            return acc;
          },
          [[], []]
        )
    : [[], []];

  const comparisonFont = markedFonts[comparisonIdx];
  return (
    <div className="app">
      <Helmet>
        {Object.entries(loadedStylesheets).map(([name, href]) => (
          <link key={name} href={href} rel="stylesheet" type="text/css" />
        ))}
      </Helmet>
      {comparisonMode ? (
        <div className="comparison-mode">
          <pre
            className="font-preview"
            style={{
              textAlign: alignment,
              fontFamily: comparisonFont.name,
              fontWeight:
                comparisonFont.variants[comparisonFont.activeVariant].weight,
              fontSize: `${fontSize + comparisonFont.sizeOffset}px`,
              fontStyle:
                comparisonFont.variants[comparisonFont.activeVariant].style,
              fontStretch:
                comparisonFont.variants[comparisonFont.activeVariant].stretch,
            }}
          >
            {previewContent}
          </pre>
          <div className="comparison-mode-font-name">
            {comparisonFont.variants[comparisonFont.activeVariant].name}
          </div>
        </div>
      ) : (
        <div className={markedFonts.length ? "comparison-button-visible" : ""}>
          <div
            className={`global-settings${
              configMode ? " show-global-settings" : ""
            }`}
          >
            <div className="global-settings-row">
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
                        const activeStyle =
                          font.variants[font.activeVariant].style;
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
            <div className="global-settings-row">
              <Select
                className="collection-select"
                placeholder="Collections…"
                isMulti={true}
                isSearchable={true}
                options={collectionOptions}
                defaultValue={collectionOptions.filter(
                  (option) => option.value === LOCAL_FONTS_COLLECTION
                )}
                onChange={(collections) => {
                  const newFonts = fontsFromCollections(
                    collections.map((collection) => collection.value)
                  );
                  setActiveFontNames(newFonts.map((font) => font.name));
                  setLoadedStylesheets((loadedStylesheets) => {
                    newFonts
                      .filter((font) => font.href)
                      .reduce((_loadedStylesheets, font) => {
                        if (!loadedStylesheets[font.name])
                          loadedStylesheets[font.name] = font.href;
                        return _loadedStylesheets;
                      }, loadedStylesheets);
                    return loadedStylesheets;
                  });
                }}
              />
            </div>
          </div>

          {activeFontNames.length ? (
            <>
              {!!shownFonts.length && (
                <ul className="font-containers">
                  {shownFonts.map((font) => (
                    <FontContainer
                      key={font.name}
                      font={font}
                      onChangeShowToggle={(e) =>
                        setFonts((fonts) => [
                          ...fonts.slice(0, font.originalIndex),
                          {
                            ...fonts[font.originalIndex],
                            show: e.target.checked,
                            marked:
                              e.target.checked &&
                              fonts[font.originalIndex].marked,
                          },
                          ...fonts.slice(font.originalIndex + 1),
                        ])
                      }
                      onChangeMarkedToggle={(e) =>
                        setFonts((fonts) => [
                          ...fonts.slice(0, font.originalIndex),
                          {
                            ...fonts[font.originalIndex],
                            marked: e.target.checked,
                          },
                          ...fonts.slice(font.originalIndex + 1),
                        ])
                      }
                      onChangeSizeOffset={(e) =>
                        setFonts((fonts) => [
                          ...fonts.slice(0, font.originalIndex),
                          {
                            ...fonts[font.originalIndex],
                            sizeOffset: +e.target.value,
                          },
                          ...fonts.slice(font.originalIndex + 1),
                        ])
                      }
                      onChangeSelect={(newActiveVariant) =>
                        setFonts((fonts) => [
                          ...fonts.slice(0, font.originalIndex),
                          {
                            ...fonts[font.originalIndex],
                            activeVariant: newActiveVariant.value,
                          },
                          ...fonts.slice(font.originalIndex + 1),
                        ])
                      }
                      showSettings={configMode}
                      previewContent={previewContent}
                      fontSize={fontSize}
                      alignment={alignment}
                    />
                  ))}
                </ul>
              )}
              <hr />
              {!!hiddenFonts.length && configMode && (
                <ul className="font-containers hidden">
                  {hiddenFonts.map((font) => (
                    <FontContainer
                      key={font.name}
                      font={font}
                      onChangeShowToggle={(e) =>
                        setFonts((fonts) => [
                          ...fonts.slice(0, font.originalIndex),
                          {
                            ...fonts[font.originalIndex],
                            show: e.target.checked,
                            marked:
                              e.target.checked &&
                              fonts[font.originalIndex].marked,
                          },
                          ...fonts.slice(font.originalIndex + 1),
                        ])
                      }
                      onChangeMarkedToggle={(e) =>
                        setFonts((fonts) => [
                          ...fonts.slice(0, font.originalIndex),
                          {
                            ...fonts[font.originalIndex],
                            marked: e.target.checked,
                          },
                          ...fonts.slice(font.originalIndex + 1),
                        ])
                      }
                      onChangeSizeOffset={(e) =>
                        setFonts((fonts) => [
                          ...fonts.slice(0, font.originalIndex),
                          {
                            ...fonts[font.originalIndex],
                            sizeOffset: +e.target.value,
                          },
                          ...fonts.slice(font.originalIndex + 1),
                        ])
                      }
                      onChangeSelect={(newActiveVariant) =>
                        setFonts((fonts) => [
                          ...fonts.slice(0, font.originalIndex),
                          {
                            ...fonts[font.originalIndex],
                            activeVariant: newActiveVariant.value,
                          },
                          ...fonts.slice(font.originalIndex + 1),
                        ])
                      }
                      showSettings={configMode}
                      previewContent={previewContent}
                      fontSize={fontSize}
                      alignment={alignment}
                    />
                  ))}
                </ul>
              )}
            </>
          ) : (
            <p className="no-fonts-warning">No fonts to display.</p>
          )}
          {markedFonts.length > 1 && (
            <button
              className="start-comparison-button"
              onClick={() => setComparisonMode(true)}
            >
              Compare {markedFonts.length} marked fonts
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

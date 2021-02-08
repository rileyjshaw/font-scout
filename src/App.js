import { useCallback, useState } from "react";

import { Helmet } from "react-helmet";
import Select from "react-select";
import styled from "styled-components";

import ComparisonMode from "./ComparisonMode";
import FontContainer from "./FontContainer";

import allFonts from "./allFonts";
import { COLLECTION_NAMES, LOCAL_FONTS_COLLECTION } from "./constants";

import "./App.css";

const allFontsWithIndex = allFonts.map((font, i) => ({
  ...font,
  originalIndex: i,
}));
const collectionOptions = Object.entries(COLLECTION_NAMES).map(
  ([value, label]) => ({
    value,
    label,
  })
);

const activeFontsFromCollections = (collections) => {
  const activeFonts = allFontsWithIndex.filter((font) =>
    font.collections.some((collection) => collections.includes(collection))
  );
  if (!activeFonts.length) return false;
  return activeFonts.reduce((acc, font) => {
    acc[font.name] = font;
    return acc;
  }, {});
};

const StyledWrapper = styled.div`
  --font-preview-size: ${(props) => props.size}px;
  --font-preview-align: ${(props) => props.align};
`;

function App() {
  const [fonts, setFonts] = useState(allFontsWithIndex);
  const [previewContent, setPreviewContent] = useState(
    "The thundering machines sputtered…\n…and stopped."
  );
  const [fontSize, setFontSize] = useState(22);
  const [fontWeight, setFontWeight] = useState(400);
  const [alignment, setAlignment] = useState("center");
  const [configMode, setConfigMode] = useState(true);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [activeFonts, setActiveFonts] = useState(() =>
    activeFontsFromCollections([LOCAL_FONTS_COLLECTION])
  );
  const [loadedStylesheets, setLoadedStylesheets] = useState({});

  const markedFonts = fonts.filter((font) => font.marked && font.show);

  const [shownFonts, hiddenFonts] = activeFonts
    ? fonts
        .filter((font) => activeFonts[font.name])
        .reduce(
          (acc, font) => {
            const [_shownFonts, _hiddenFonts] = acc;
            (font.show ? _shownFonts : _hiddenFonts).push(font);
            return acc;
          },
          [[], []]
        )
    : [[], []];

  const onChangeShowToggle = useCallback(
    (checked, font) => {
      const { originalIndex } = font;
      setFonts((fonts) => {
        const newFonts = [...fonts];
        newFonts[originalIndex] = {
          ...fonts[originalIndex],
          show: checked,
          marked: checked && fonts[originalIndex].marked,
        };
        return newFonts;
      });
    },
    [setFonts]
  );

  const onChangeMarkedToggle = useCallback(
    (checked, font) => {
      const { originalIndex } = font;
      setFonts((fonts) => {
        const newFonts = [...fonts];
        newFonts[originalIndex] = {
          ...fonts[originalIndex],
          marked: checked,
        };
        return newFonts;
      });
    },
    [setFonts]
  );

  const onChangeSizeOffset = useCallback(
    (sizeOffset, font) => {
      const { originalIndex } = font;
      setFonts((fonts) => {
        const newFonts = [...fonts];
        newFonts[originalIndex] = {
          ...fonts[originalIndex],
          sizeOffset,
        };
        return newFonts;
      });
    },
    [setFonts]
  );

  const onChangeSelect = useCallback(
    (activeVariant, font) => {
      const { originalIndex } = font;
      setFonts((fonts) => {
        const newFonts = [...fonts];
        newFonts[originalIndex] = {
          ...fonts[originalIndex],
          activeVariant,
        };
        return newFonts;
      });
    },
    [setFonts]
  );

  return (
    <StyledWrapper className="app" size={fontSize} align={alignment}>
      <Helmet>
        {Object.entries(loadedStylesheets).map(([name, href]) => (
          <link key={name} href={href} rel="stylesheet" type="text/css" />
        ))}
      </Helmet>
      {comparisonMode ? (
        <ComparisonMode
          markedFonts={markedFonts}
          previewContent={previewContent}
          setComparisonMode={setComparisonMode}
        />
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
                  const newFonts = activeFontsFromCollections(
                    collections.map((collection) => collection.value)
                  );
                  setActiveFonts(newFonts);
                  setLoadedStylesheets((loadedStylesheets) => {
                    Object.values(newFonts)
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

          {activeFonts ? (
            <>
              {!!shownFonts.length && (
                <ul className="font-containers">
                  {shownFonts.map((font) => (
                    <FontContainer
                      key={font.name}
                      font={font}
                      onChangeShowToggle={onChangeShowToggle}
                      onChangeMarkedToggle={onChangeMarkedToggle}
                      onChangeSizeOffset={onChangeSizeOffset}
                      onChangeSelect={onChangeSelect}
                      showSettings={configMode}
                      previewContent={previewContent}
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
                      onChangeShowToggle={onChangeShowToggle}
                      onChangeMarkedToggle={onChangeMarkedToggle}
                      onChangeSizeOffset={onChangeSizeOffset}
                      onChangeSelect={onChangeSelect}
                      showSettings={configMode}
                      previewContent={previewContent}
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
    </StyledWrapper>
  );
}

export default App;

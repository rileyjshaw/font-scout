import React, { useCallback, useMemo, useState } from "react";
import Select from "react-select";
import { FixedSizeGrid as Grid, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import styled from "styled-components";

import FontContainer from "./FontContainer";

import { COLLECTION_NAMES, LOCAL_FONTS_COLLECTION } from "./constants";

// TODO: add a script to the scraper to measure the widest and tallest fonts,
// and save them to the constants file. Re-run the script whenever I add new
// fonts. Calculate row height dynamically by rendering the tallest font (and
// any other font with a +ve font size offset) in a hidden <pre>. Do the same
// to calculate how many max-width columns can fit on screen.
const COLUMN_COUNT = 2;
const ROW_HEIGHT = 420;

const collectionOptions = Object.entries(COLLECTION_NAMES).map(
  ([value, label]) => ({
    value,
    label,
  })
);

const StyledTextArea = styled.textarea`
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 4px;
`;

function activeFontsFromCollections(collections, fonts) {
  const activeFonts = fonts.filter((font) =>
    font.collections.some((collection) => collections.includes(collection))
  );
  if (!activeFonts.length) return false;
  return activeFonts.reduce((acc, font) => {
    acc[font.name] = font;
    return acc;
  }, {});
}

const GridCell = React.memo(function GridCell({
  columnIndex,
  rowIndex,
  style,
  data,
}) {
  const { columnCount, visibleFonts, ...props } = data;
  const font = visibleFonts[columnIndex + rowIndex * columnCount];
  return font ? <FontContainer font={font} style={style} {...props} /> : null;
},
areEqual);

function ExplorationMode({
  fontSize,
  setFontSize,
  alignment,
  setAlignment,
  previewContent,
  setPreviewContent,
  Preview,
  setLoadedStylesheets,
  setFonts,
  fonts,
  allFontsWithIndex,
}) {
  const [configMode, setConfigMode] = useState(true);
  const [fontWeight, setFontWeight] = useState(400);
  const [activeFonts, setActiveFonts] = useState(() =>
    activeFontsFromCollections([LOCAL_FONTS_COLLECTION], allFontsWithIndex)
  );

  const visibleFonts = useMemo(() => {
    const [selectedFonts, unselectedFonts] = activeFonts
      ? fonts
          .filter((font) => activeFonts[font.name])
          .reduce(
            (acc, font) => {
              const [_selectedFonts, _unselectedFonts] = acc;
              (font.show ? _selectedFonts : _unselectedFonts).push(font);
              return acc;
            },
            [[], []]
          )
      : [[], []];
    return configMode ? [...selectedFonts, ...unselectedFonts] : selectedFonts;
  }, [activeFonts, configMode, fonts]);

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

  const itemData = useMemo(
    () => ({
      columnCount: COLUMN_COUNT,
      onChangeMarkedToggle,
      onChangeSelect,
      onChangeShowToggle,
      onChangeSizeOffset,
      Preview,
      setLoadedStylesheets,
      showSettings: configMode,
      visibleFonts,
    }),
    [
      configMode,
      onChangeMarkedToggle,
      onChangeSelect,
      onChangeShowToggle,
      onChangeSizeOffset,
      Preview,
      setLoadedStylesheets,
      visibleFonts,
    ]
  );

  return (
    <>
      <div
        className={`global-settings${
          configMode ? " show-global-settings" : ""
        }`}
      >
        <input
          className="config-mode-toggle"
          type="checkbox"
          checked={configMode}
          onChange={(e) => setConfigMode(e.target.checked)}
          id="config-mode-toggle"
        />
        <label htmlFor="config-mode-toggle"></label>
        <div className="global-settings-rows">
          <div className="global-settings-row">
            <label>
              Font size:
              <input
                className="global-font-size-input"
                type="number"
                min={1}
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
                min={0}
                max={1000}
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
            <StyledTextArea
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
                  collections.map((collection) => collection.value),
                  allFontsWithIndex
                );
                setActiveFonts(newFonts);
                setLoadedStylesheets((prevLoadedStylesheets) => {
                  const unloadedFonts = Object.values(newFonts)
                    .filter(
                      (font) => font.href && !prevLoadedStylesheets[font.name]
                    )
                    // Only load the first few unloaded remote fonts; anything
                    // else might slow down the initial render. Subsequent
                    // fonts are loaded when their containers render.
                    .slice(0, 8);
                  if (!unloadedFonts.length) return prevLoadedStylesheets;
                  const loadedStylesheets = { ...prevLoadedStylesheets };
                  unloadedFonts.forEach(
                    (font) => (loadedStylesheets[font.name] = font.href)
                  );
                  return loadedStylesheets;
                });
              }}
            />
          </div>
        </div>
      </div>

      {activeFonts ? (
        <>
          {!!visibleFonts.length && (
            <div className="autosizer-container">
              <AutoSizer>
                {({ height, width }) => (
                  <Grid
                    className="font-containers"
                    columnCount={COLUMN_COUNT}
                    columnWidth={width / COLUMN_COUNT}
                    rowCount={Math.ceil(visibleFonts.length / COLUMN_COUNT)}
                    rowHeight={ROW_HEIGHT}
                    height={height}
                    width={width}
                    itemData={itemData}
                  >
                    {GridCell}
                  </Grid>
                )}
              </AutoSizer>
            </div>
          )}
        </>
      ) : (
        <p className="no-fonts-warning">No fonts to display.</p>
      )}
    </>
  );
}

export default ExplorationMode;

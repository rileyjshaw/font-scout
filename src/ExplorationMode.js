import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Select from "react-select";
import { FixedSizeGrid as Grid, areEqual } from "react-window";
import useResizeObserver from "@react-hook/resize-observer";
import styled from "styled-components";

import FontContainer, { FontPreview } from "./FontContainer";
import sizeSortedFontVariants from "./size_sorted_font_variants.json";

import {
  COLLECTION_NAMES,
  LOCAL_FONTS_COLLECTION,
  MIN_COLUMN_WIDTH,
} from "./constants";

function setDeepValue(object, value, ...keys) {
  keys.reduce((branch, key, i, { length }) => {
    if (i + 1 === length) {
      branch[key] = Math.max(branch[key] ?? 0, value);
    } else {
      branch[key] = branch[key] ?? {};
    }
    return branch[key];
  }, object);
}

const collectionOptions = Object.entries(COLLECTION_NAMES).map(
  ([value, label]) => ({
    value,
    label,
  })
);

const Probe = styled.div`
  clip-path: inset(50%);
  clip: rect(0 0 0 0);
  display: flex;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  touch-action: none;
  white-space: nowrap;
  width: 1px;
`;

const StyledTextArea = styled.textarea`
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 4px;
`;

function useSize(target) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect());
  }, [target]);

  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
}

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
  lineHeight,
  setLineHeight,
  alignment,
  setAlignment,
  defaultPreviewContent,
  unsetDefaultPreview,
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
  const gridRef = useRef(null);
  const probeRef = useRef(null);
  const { height: probeHeight } = useSize(probeRef);
  const { width: gridWidth, height: gridHeight } = useSize(gridRef);

  const columnCount = Math.max(Math.floor(gridWidth / MIN_COLUMN_WIDTH), 1);

  const [visibleFonts, bigFonts] = useMemo(() => {
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
    const visibleFonts = configMode
      ? [...selectedFonts, ...unselectedFonts]
      : selectedFonts;
    const visibleFontNames = visibleFonts.reduce((acc, font) => {
      acc[font.name] = true;
      return acc;
    }, {});

    const bigFontMap = {};
    const hrefs = {};
    Object.values(sizeSortedFontVariants).forEach((sortedList) => {
      for (const { name, href, variant } of sortedList) {
        if (visibleFontNames[name]) {
          if (href) hrefs[name] = href;
          setDeepValue(
            bigFontMap,
            1,
            name,
            variant.weight,
            variant.style,
            variant.stretch
          );
          break;
        }
      }
    });
    visibleFonts
      .filter((font) => font.sizeOffset > 1)
      .forEach((offsetFont) => {
        Object.values(sizeSortedFontVariants).forEach((sortedList) => {
          const { variant: biggestVariant } = sortedList.find(
            (font) => font.name === offsetFont.name
          );
          if (biggestVariant) {
            if (offsetFont.href) hrefs[offsetFont.name] = offsetFont.href;
            setDeepValue(
              bigFontMap,
              offsetFont.sizeOffset,
              offsetFont.name,
              biggestVariant.weight,
              biggestVariant.style,
              biggestVariant.stretch
            );
          }
        });
      });

    setLoadedStylesheets((prevLoadedStylesheets) => {
      const unloadedFonts = Object.entries(hrefs).filter(
        ([name]) => !prevLoadedStylesheets[name]
      );
      if (!unloadedFonts.length) return prevLoadedStylesheets;
      const loadedStylesheets = { ...prevLoadedStylesheets };
      unloadedFonts.forEach(([name, href]) => (loadedStylesheets[name] = href));
      return loadedStylesheets;
    });

    const bigFonts = Object.entries(bigFontMap).flatMap(([name, _obj1]) =>
      Object.entries(_obj1).flatMap(([weight, _obj2]) =>
        Object.entries(_obj2).flatMap(([style, _obj3]) =>
          Object.entries(_obj3).map(([stretch, sizeOffset]) => ({
            font: { name, sizeOffset },
            variant: { weight, style, stretch },
          }))
        )
      )
    );

    return [visibleFonts, bigFonts];
  }, [activeFonts, configMode, fonts, setLoadedStylesheets]);

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
      columnCount,
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
      columnCount,
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
                type="number"
                min={1}
                value={fontSize}
                onChange={(e) => setFontSize(+e.target.value)}
              />
            </label>
            <label>
              Line height:
              <input
                type="number"
                min={0}
                step={0.05}
                value={lineHeight}
                onChange={(e) => setLineHeight(+e.target.value)}
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
              value={previewContent ?? ""}
              placeholder={defaultPreviewContent}
              onChange={(e) => {
                setPreviewContent(e.target.value);
                unsetDefaultPreview();
              }}
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
          <Probe aria-hidden="true" ref={probeRef}>
            {bigFonts.map((font, i) => (
              <FontPreview
                key={i}
                font={font.font}
                variant={font.variant}
                Preview={Preview}
                style={{
                  width: gridWidth / columnCount,
                  flexShrink: 0,
                  flexGrow: 0,
                }}
              />
            ))}
          </Probe>
          {!!visibleFonts.length && (
            <div className="grid-container" ref={gridRef}>
              <Grid
                className="font-containers"
                columnCount={columnCount}
                columnWidth={gridWidth / columnCount}
                rowCount={Math.ceil(visibleFonts.length / columnCount)}
                rowHeight={probeHeight + 80}
                height={gridHeight}
                width={gridWidth}
                itemData={itemData}
              >
                {GridCell}
              </Grid>
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

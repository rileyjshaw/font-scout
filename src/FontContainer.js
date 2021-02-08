import { memo, useRef } from "react";
import useHover from "@react-hook/hover";
import Select from "react-select";

import "./FontContainer.css";

const FontContainer = memo(function FontContainer({
  font,
  onChangeShowToggle,
  onChangeMarkedToggle,
  onChangeSizeOffset,
  onChangeSelect,
  showSettings,
  previewContent,
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
            onChange={(e) => onChangeShowToggle(e.target.checked, font)}
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
            onChange={(e) => onChangeMarkedToggle(e.target.checked, font)}
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
            onChange={({ value }) => onChangeSelect(value, font)}
          />
          <input
            className="font-size-offset-input"
            type="number"
            value={font.sizeOffset}
            step={0.05}
            onChange={(e) => onChangeSizeOffset(e.target.value, font)}
          />
        </div>
      )}
      {!showSettings && isHovering && (
        <div className="font-hover-settings">
          <input
            className="show-font-toggle"
            type="checkbox"
            checked={font.show}
            onChange={(e) => onChangeShowToggle(e.target.checked, font)}
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
            onChange={(e) => onChangeMarkedToggle(e.target.checked, font)}
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
      <div className="font-preview-wrapper">
        <pre
          className={`font-preview${font.marked ? " marked" : ""}`}
          style={{
            fontFamily: font.name,
            fontWeight: font.variants[font.activeVariant].weight,
            fontSize: `${font.sizeOffset}em`,
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
      </div>
    </li>
  );
});

export default FontContainer;

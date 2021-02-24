import { useMemo, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styled, { createGlobalStyle } from "styled-components";

import { getPreviewComponent } from "./Preview";
import ComparisonMode from "./ComparisonMode";
import ExplorationMode from "./ExplorationMode";

import allFonts from "./allFonts";

import "./App.css";

const helmetContext = {};

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #faf9f7;
    color: #0a0b08;
    font: 400 22px -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    margin: 0;
    text-rendering: optimizeLegibility;
  }

  #root {
    height: 100vh;
    width: 100vw;
  }
`;

const allFontsWithIndex = allFonts.map((font, i) => ({
  ...font,
  originalIndex: i,
}));

const StyledWrapper = styled.div`
  --font-preview-size: ${(props) => props.size}px;
  --font-preview-align: ${(props) => props.align};
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [fonts, setFonts] = useState(allFontsWithIndex);
  const [previewContent, setPreviewContent] = useState(
    "The thundering machines sputtered…\n…and stopped."
  );
  const [fontSize, setFontSize] = useState(22);
  const [alignment, setAlignment] = useState("center");
  const [comparisonMode, setComparisonMode] = useState(false);
  const [loadedStylesheets, setLoadedStylesheets] = useState({});

  const markedFonts = fonts.filter((font) => font.marked && font.show);
  const Preview = useMemo(() => getPreviewComponent(previewContent), [
    previewContent,
  ]);

  return (
    <HelmetProvider context={helmetContext}>
      <>
        <GlobalStyles />
        <StyledWrapper className="app" size={fontSize} align={alignment}>
          <Helmet>
            {Object.entries(loadedStylesheets).map(([name, href]) => (
              <link key={name} href={href} rel="stylesheet" type="text/css" />
            ))}
          </Helmet>
          {comparisonMode ? (
            <ComparisonMode
              markedFonts={markedFonts}
              Preview={Preview}
              setComparisonMode={setComparisonMode}
            />
          ) : (
            <>
              <ExplorationMode
                allFontsWithIndex={allFontsWithIndex}
                fonts={fonts}
                fontSize={fontSize}
                setFontSize={setFontSize}
                alignment={alignment}
                setAlignment={setAlignment}
                setLoadedStylesheets={setLoadedStylesheets}
                setFonts={setFonts}
                previewContent={previewContent}
                setPreviewContent={setPreviewContent}
                Preview={Preview}
              />
              {markedFonts.length > 1 && (
                <button
                  className="start-comparison-button"
                  onClick={() => setComparisonMode(true)}
                >
                  Compare {markedFonts.length} marked fonts
                </button>
              )}
            </>
          )}
        </StyledWrapper>
      </>
    </HelmetProvider>
  );
}

export default App;

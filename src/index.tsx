import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./theme";
import { GlobalStyle } from "./GlobalStyle";

function Root() {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </RecoilRoot>
    </React.StrictMode>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

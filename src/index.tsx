import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle";

function Root() {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <GlobalStyle />
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </CookiesProvider>
      </RecoilRoot>
    </React.StrictMode>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

import React from "react";
import ReactDOM from "react-dom";
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
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <GlobalStyle />
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </RecoilRoot>
    </React.StrictMode>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

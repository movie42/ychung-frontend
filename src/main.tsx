import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import App from "./App";
import { theme, GlobalStyle } from "./lib/style";

const queryClient = new QueryClient();

function Root() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <GlobalStyle />
              <App />
              <ReactQueryDevtools initialIsOpen={true} />
            </BrowserRouter>
          </ThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

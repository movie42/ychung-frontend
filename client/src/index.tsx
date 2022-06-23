import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

function Root() {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <HelmetProvider>
              <QueryClientProvider client={queryClient}>
                <GlobalStyle />
                <App />
                <ReactQueryDevtools initialIsOpen={true} />
              </QueryClientProvider>
            </HelmetProvider>
          </BrowserRouter>
        </ThemeProvider>
      </RecoilRoot>
    </React.StrictMode>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

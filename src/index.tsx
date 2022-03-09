import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { Normalize } from "styled-normalize";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Normalize />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root"),
);

import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginState } from "./state/Authrization";
import Router from "./routes/Routes";

import { Header, SEO } from "@/components";

const Wrapper = styled.main`
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1rem 2rem;
`;

function App() {
  const currentLogin = useSetRecoilState(loginState);
  const currentUser = JSON.parse(localStorage.getItem("ycUser") || "{}");

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    currentLogin((state) => ({ ...state, ...currentUser }));

    return;
  }, []);

  return (
    <>
      <SEO />
      <Header />
      <Wrapper>
        <Router />
      </Wrapper>
    </>
  );
}

export default App;

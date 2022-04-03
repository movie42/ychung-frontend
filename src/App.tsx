import React, { useEffect, useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginState } from "./Authrization";
import Router from "./routes/Routes";

const Wrapper = styled.main`
  padding: 1rem 2rem;
`;

function App() {
  const currentLogin = useSetRecoilState(loginState);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    currentLogin((state) => ({ ...state, ...currentUser }));

    return;
  }, []);

  return (
    <Wrapper>
      <Router />
    </Wrapper>
  );
}

export default withCookies(App);

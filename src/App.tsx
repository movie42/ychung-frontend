import React, { useEffect, useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import styled from "styled-components";
import Router from "./routes/Routes";

const Wrapper = styled.main`
  padding: 1rem 2rem;
`;

function App() {
  return (
    <Wrapper>
      <Router />
    </Wrapper>
  );
}

export default withCookies(App);

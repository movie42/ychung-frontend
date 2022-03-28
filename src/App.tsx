import React from "react";
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

export default App;

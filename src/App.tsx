import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";
import { loginState } from "./Authrization";
import Router from "./routes/Routes";

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </Wrapper>
  );
}

export default App;

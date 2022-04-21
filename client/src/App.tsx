import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styled from "styled-components";
import { loginState } from "./state/Authrization";
import Router from "./routes/Routes";
import Header from "./components/Header/Header";

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
    <>
      <Header />
      <Wrapper>
        <QueryClientProvider client={queryClient}>
          <Router />
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </Wrapper>
    </>
  );
}

export default App;
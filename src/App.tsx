import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginState, snackbarState } from "@/lib/state";
import { Header, SEO, Snackbar } from "@/components";
import Router from "./routes/Routes";

const Wrapper = styled.main`
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1rem 2rem;
`;

function App() {
  const currentLogin = useSetRecoilState(loginState);
  const currentUser = JSON.parse(localStorage.getItem("ycUser") || "{}");
  const [snackbarQueue, setSnackbarQueue] = useRecoilState(snackbarState);
  useEffect(() => {
    if (!currentUser) {
      return;
    }

    currentLogin((state) => ({ ...state, ...currentUser }));

    return;
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => setSnackbarQueue([]), 6000);
    return () => clearTimeout(timer);
  }, [snackbarQueue]);

  return (
    <>
      <SEO />

      <Header />
      <Wrapper>
        <Snackbar>
          {snackbarQueue.map(({ id, message, type }) => (
            <Snackbar.Item
              key={id}
              data-set={id}
              message={message}
              type={type}
            />
          ))}
        </Snackbar>
        <Router />
      </Wrapper>
    </>
  );
}

export default App;

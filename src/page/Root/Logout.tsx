import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styled from "styled-components";

import { Loading } from "@/Components";
import { useLogout } from "./hooks";
import { useResetRecoilState } from "recoil";
import { loginState } from "@/lib/state";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  h1 {
    font-size: 4rem;
  }
`;

interface Logout {
  logout: boolean;
}

interface RouteState {
  state: {
    message?: string;
  };
}

const Logout = () => {
  const { state } = useLocation() as RouteState;
  const navigate = useNavigate();
  const removeLoginState = useResetRecoilState(loginState);
  const { isLoading, isSuccess } = useLogout();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSuccess && !state?.message) {
      timer = setTimeout(() => {
        removeLoginState();
        localStorage.removeItem("ycUser");
        navigate("/");
      }, 2000);
      return;
    }

    if (isSuccess && state?.message) {
      timer = setTimeout(() => {
        removeLoginState();
        localStorage.removeItem("ycUser");
      }, 2000);
      return;
    }

    return () => clearTimeout(timer);
  }, [isSuccess, state?.message]);

  if (isLoading) {
    return <Loading />;
  }

  if (state?.message) {
    return (
      <Wrapper>
        <h1>{state?.message}</h1>
        <p>로그인 하고 좀 오래 지난것 같아요</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h1>로그아웃 되었습니다.</h1>
      <p>다음에 또 만나요!</p>
    </Wrapper>
  );
};

export default Logout;

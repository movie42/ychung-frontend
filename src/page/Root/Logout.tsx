import { useEffect } from "react";
import { useNavigate } from "react-router";

import styled from "styled-components";

import { Loading } from "@/components";
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

const Logout = () => {
  const navigate = useNavigate();
  const removeLoginState = useResetRecoilState(loginState);
  const { isLoading, isSuccess } = useLogout();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSuccess) {
      timer = setTimeout(() => {
        removeLoginState();
        localStorage.removeItem("ycUser");
        navigate("/");
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [isSuccess]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <h1>로그아웃 되었습니다.</h1>
      <p>다음에 또 만나요!</p>
    </Wrapper>
  );
};

export default Logout;

import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useResetRecoilState } from "recoil";
import styled from "styled-components";
import { loginState } from "../../state/Authrization";
import { useGet } from "../../utils/hooks/useGet";

import { Loading } from "@/components";

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
  const removeLoginState = useResetRecoilState(loginState);
  const navigate = useNavigate();
  const { data, isLoading, isSuccess } = useGet<Logout>({
    url: `/api/logout`,
    queryKey: "login",
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isSuccess) {
      timeout = setTimeout(() => {
        removeLoginState();
        localStorage.removeItem("ycUser");
        navigate("/");
      }, 2000);
    }

    return () => clearTimeout(timeout);
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

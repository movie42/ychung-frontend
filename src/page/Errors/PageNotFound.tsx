import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  h1 {
    font-size: 3rem;
  }
`;

const PageNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    timer = setTimeout(() => navigate("/", { replace: true }), 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper>
      <h1>😢 페이지를 찾을 수 없어요. 입력하신 주소가 맞나요?</h1>
    </Wrapper>
  );
};

export default PageNotFound;

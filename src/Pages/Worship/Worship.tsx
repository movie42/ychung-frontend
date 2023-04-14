import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { WorshipHeader } from ".";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 8rem;
`;

function Worship() {
  return (
    <Wrapper>
      <WorshipHeader />
      <Outlet />
    </Wrapper>
  );
}

export default Worship;

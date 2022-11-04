import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { SEO } from "@/Components";
import { WorshipHeader } from ".";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 8rem;
`;

function Worship() {
  return (
    <>
      <SEO title="주보" keywords="양청 주보, 주보, 양정교회 청년부 주보" />
      <Wrapper>
        <WorshipHeader />
        <Outlet />
      </Wrapper>
    </>
  );
}

export default Worship;

import React from "react";
import styled from "styled-components";
import { useFetch } from "../../customhooks/useFectch";
import WorshipItem from "./WorshipItem";

const Wrapper = styled.div``;

const Items = styled.ul`
  padding: 0;
`;

function Worship() {
  const { loading, error, data } = useFetch("http://localhost:4000/worship");

  return (
    <Wrapper>
      <h1>예배</h1>
      <Items>
        {data.map((item) => (
          <WorshipItem />
        ))}
      </Items>
    </Wrapper>
  );
}

export default Worship;

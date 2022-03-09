import React from "react";

import styled from "styled-components";

const Wrapper = styled.div``;

const ListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100vw;

  padding: 1rem 2rem;
`;

const ListItem = styled.li`
  width: 100%;
  height: 100px;
  border: 2px solid ${(props) => props.theme.basicColor};
`;

function Notice() {
  return (
    <Wrapper>
      <ListContainer>
        <ListItem></ListItem>
      </ListContainer>
    </Wrapper>
  );
}

export default Notice;

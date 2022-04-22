import React from "react";
import styled from "styled-components";

const Wrapper = styled.ul`
  display: grid;
  grid-auto-rows: minmax(30rem, auto);
  margin: 0;
  @media (min-width: ${(props) => props.theme.screen.labtop}) {
    grid-template-columns: repeat(auto-fill, minmax(35rem, auto));
    gap: 1.5rem;
  }
  padding: 0;
`;

interface IListComponentProps<T> {
  data: T[];
  renderData: (item: T) => React.ReactNode;
}

const ListContainer = <T extends { _id: string }>({
  data,
  renderData,
}: React.PropsWithChildren<IListComponentProps<T>>) => {
  return <Wrapper>{data.map(renderData)}</Wrapper>;
};

export default ListContainer;

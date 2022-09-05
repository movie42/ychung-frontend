import { AnimatePresence } from "framer-motion";
import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import SkeletonForListContainer from "../Loading/Skeletons/SkeletonForListContainer";
import SkeletonForListItem from "../Loading/Skeletons/SkeletonForListItem";

const List = styled.ul`
  display: grid;
  grid-auto-rows: minmax(30rem, auto);
  margin: 0;
  @media (min-width: ${(props) => props.theme.screen.labtop}) {
    grid-template-columns: repeat(auto-fill, minmax(35rem, auto));
    gap: 1.5rem;
  }
  padding: 0;
`;

interface IListComponentProps<T, V>
  extends React.HTMLAttributes<HTMLUListElement> {
  isLoading: boolean;
  isRefetching: boolean;
  data: T[];
  renderFunc: (item: T) => React.ReactNode;
}

const ListContainer = <T, V extends unknown>({
  isLoading,
  isRefetching,
  data,
  renderFunc,
}: IListComponentProps<T, V>) => {
  return (
    <List>
      <>
        {isLoading && <SkeletonForListItem />}
        {data.map(renderFunc)}
        {isRefetching && <SkeletonForListItem />}
      </>
    </List>
  );
};

export default ListContainer;

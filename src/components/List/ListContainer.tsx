import { AnimatePresence } from "framer-motion";
import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import SkeletonForListContainer from "../Loading/Skeletons/SkeletonForListContainer";

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
  data: T[];
  renderFunc: (item: T) => React.ReactNode;
  skeletonRenderFunc: (value: V, index: number, array: V[]) => React.ReactNode;
}

const ListContainer = <T, V extends unknown>({
  isLoading,
  data,
  renderFunc,
  skeletonRenderFunc,
}: IListComponentProps<T, V>) => {
  const [isSkeleton, setIsSkeleton] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isLoading) {
      timer = setTimeout(() => setIsSkeleton(false), 1500);
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  return isSkeleton ? (
    <SkeletonForListContainer amount={6} renderFunc={skeletonRenderFunc} />
  ) : (
    <List>{data.map(renderFunc)}</List>
  );
};

export default ListContainer;

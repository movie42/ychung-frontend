import React, { useEffect, useState } from "react";
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

interface ISkeletonForListContainerProps<T> {
  amount: number;
  renderFunc: (value: T, index: number, array: T[]) => React.ReactNode;
}

const SkeletonForListContainer = <T,>({
  amount,
  renderFunc
}: ISkeletonForListContainerProps<T>) => {
  const [state, setState] = useState<T[]>([]);

  useEffect(() => {
    const array = new Array(amount).fill(1);
    setState(array);
  }, []);

  return <Wrapper>{state.map(renderFunc)}</Wrapper>;
};

export default SkeletonForListContainer;

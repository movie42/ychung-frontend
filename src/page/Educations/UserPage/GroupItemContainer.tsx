import React from "react";
import styled from "styled-components";

const List = styled.ul`
  display: grid;
  margin: 0;
  @media (min-width: ${(props) => props.theme.screen.labtop}) {
    grid-template-columns: repeat(auto-fill, minmax(35rem, auto));
    gap: 1.5rem;
  }
  padding: 0;
`;

interface IGroupItemContainerProps<T>
  extends React.HTMLAttributes<HTMLUListElement> {
  data: T[];
  renderFunc: (item: T) => React.ReactNode;
}

const GroupItemContainer = <T,>({
  data,
  renderFunc
}: IGroupItemContainerProps<T>) => {
  return <List>{data.map(renderFunc)}</List>;
};

export default GroupItemContainer;

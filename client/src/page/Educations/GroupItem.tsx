import React from "react";
import styled from "styled-components";

const Item = styled.li`
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.color.gray300};
  padding: 1rem;
  &:hover {
    background-color: ${(props) => props.theme.color.secondary100};
    border: 1px solid ${(props) => props.theme.color.secondary100};
  }
`;

interface IGroupItemProps<T> extends React.LiHTMLAttributes<HTMLLIElement> {}

const GroupItem = <T extends unknown>({
  children,
  ...props
}: IGroupItemProps<T>) => {
  return <Item {...props}>{children}</Item>;
};

export default GroupItem;

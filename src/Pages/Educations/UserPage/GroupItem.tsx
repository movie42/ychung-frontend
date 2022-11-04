import React, { ReactNode } from "react";
import styled from "styled-components";

const Item = styled.li`
  box-sizing: border-box;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.color.gray300};
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  &:hover {
    background-color: ${(props) => props.theme.color.primary700};
    color: ${(props) => props.theme.color.fontColorWhite};
    border: 1px solid ${(props) => props.theme.color.primary700};
  }
`;

interface IGroupItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: ReactNode;
}

const GroupItem = ({ children, ...props }: IGroupItemProps) => {
  return <Item {...props}>{children}</Item>;
};

export default GroupItem;

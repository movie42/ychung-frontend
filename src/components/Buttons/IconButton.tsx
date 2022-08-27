import React from "react";
import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  font-size: 3rem;
  color: ${(props) => props.theme.color.fontColorWhite};
  padding: 0 0.4rem;
  margin: 0;
  border: 0;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.gray300};
  svg {
    transform: translate(0.1rem, 0.3rem);
  }
  &:hover {
    background-color: ${(props) => props.theme.color.primary400};
  }
`;

interface IIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const IconButton = ({ ...props }: IIconButtonProps) => {
  return <Button {...props}>{props.children}</Button>;
};

export default IconButton;

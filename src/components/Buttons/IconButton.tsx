import React, { Children } from "react";
import styled from "styled-components";

const Button = styled.button`
  border: 0;
  background-color: unset;
`;

interface IIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const IconButton: React.FC<IIconButtonProps> = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export default IconButton;

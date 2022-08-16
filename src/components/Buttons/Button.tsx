import React from "react";
import styled from "styled-components";

const IconButtonStyle = styled.button`
  border: 0;
  background-color: unset;
  cursor: pointer;
`;
const BlockButtonStyle = styled.button`
  cursor: pointer;
  border: 0;
  border-radius: 0.4rem;
  padding: 0.8rem 2.2rem;
  background-color: ${(props) => props.theme.color.gray300};
`;

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: "block" | "icon";
}

const Button = ({ buttonType, ...props }: IButtonProps) => {
  return buttonType === "icon" ? (
    <IconButtonStyle {...props}>{props.children}</IconButtonStyle>
  ) : (
    <BlockButtonStyle {...props}>{props.children}</BlockButtonStyle>
  );
};

export default Button;

import React from "react";
import styled from "styled-components";

const IconButtonStyle = styled.button`
  border: 0;
  background-color: unset;
`;
const BlockButtonStyle = styled.button`
  padding: 0.8rem 2.2rem;
  background-color: ${(props) => props.theme.grayBackgroundColor};
`;

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: "block" | "icon";
}

const Button: React.FC<IButtonProps> = ({ buttonType, ...props }) => {
  return buttonType === "icon" ? (
    <IconButtonStyle {...props}>{props.children}</IconButtonStyle>
  ) : (
    <BlockButtonStyle {...props}>{props.children}</BlockButtonStyle>
  );
};

export default Button;

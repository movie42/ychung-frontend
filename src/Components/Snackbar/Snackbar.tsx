import React from "react";
import styled, { keyframes } from "styled-components";

const snackbarTimerKeyframe = keyframes`
  0%{
    visibility: visible;
    transform-origin: top left;
    transform: scaleX(0%);
  }
  100%{
    visibility: visible;
    transform-origin: top left;
    transform: scaleX(100%);
  }
`;

const snackbarTranslaterKeyframe = keyframes`
  0%{
    transform : translateX(100%);
  }
  5%{
    transform: translateX(0);
  }
  95%{
    transform: translateX(0);
  }
  100%{
    transform : translateX(100%);
  }
`;

const Container = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 1rem;
  z-index: 1000;
`;
const MessageContainer = styled.div<{
  type: "success" | "warning" | "caution";
}>`
  position: relative;
  background-color: #2c2c2c;
  color: ${({ theme }) => theme.color.fontColorWhite};
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  height: 100%;
  transform: translateX(120%);
  animation: ${snackbarTranslaterKeyframe} 3.5s 1 linear;
  margin: 1rem 0;
  &::before {
    position: absolute;
    visibility: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: inherit;
    border-radius: 0.5rem;
    ${({ type }) => {
      if (type === "success") {
        return "background-color : #26e432";
      }
      if (type === "warning") {
        return "background-color : #f12c2c";
      }
      return "background-color : #ffd000";
    }};
    animation: ${snackbarTimerKeyframe} 3.3s 1 linear;
    content: "";
    z-index: 0;
  }
  h1 {
    position: relative;
    font-size: 1.8rem;
    z-index: 2;
  }
`;

type ISnackbarProps = React.HTMLAttributes<HTMLElement>;

const Snackbar = (props: ISnackbarProps) => {
  return <Container>{props.children}</Container>;
};

interface ISnackbarItemProps {
  type: "success" | "warning" | "caution";
  message: string;
}

Snackbar.Item = function Item({ message, type }: ISnackbarItemProps) {
  return (
    <MessageContainer
      type={type}
      role="alert"
    >
      <h1>{message}</h1>
    </MessageContainer>
  );
};
export default Snackbar;

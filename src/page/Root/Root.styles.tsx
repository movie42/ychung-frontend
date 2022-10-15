import { Button, FormItem, Label } from "@/components";
import styled, { css, keyframes } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  margin-top: 8rem;
  form {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: center;
    height: inherit;
    width: 100%;
    max-width: 90rem;
  }
`;

export const errorShaker = keyframes`
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
`;

export const SubmitButton = styled(Button)`
  cursor: ${(props) => (props.disabled ? "unset" : "pointer")};
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  width: 12rem;
  font-size: 2rem;
  color: ${(props) => props.theme.color.fontColorWhite};
  background-color: ${(props) =>
    props.disabled ? props.theme.color.gray200 : props.theme.color.primary400};
  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? props.theme.color.gray200
        : props.theme.color.primary800};
  }
  &:active {
    background-color: ${(props) =>
      props.disabled
        ? props.theme.color.gray200
        : props.theme.color.primary300};
  }
`;

export const RootFormItem = styled(FormItem)<{ error?: boolean | null }>`
  box-sizing: border-box;
  padding: 1rem;
  border-radius: unset;
  transition: all 0.5s ease-in-out;
  input {
    transition: all 0.5s ease-in-out;
  }
  ${({ error }) => {
    if (error === null) {
      return css`
        color: ${(props) => props.theme.color.fontColorBlack};
      `;
    }

    if (!error) {
      return css`
        color: ${(props) => props.theme.color.error800};
        border-bottom: 1px solid ${(props) => props.theme.color.error800};
        input {
          color: ${(props) => props.theme.color.error800};
        }
      `;
    }

    return css`
      padding: 1rem;
      position: relative;
      border: 1px solid ${(props) => props.theme.color.success200};
      border-radius: 0.8rem;
      background-color: ${(props) => props.theme.color.success100};
      color: ${(props) => props.theme.color.success200};
      &:after {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2rem;
        content: "✅";
      }
      input {
        color: ${(props) => props.theme.color.success200};
        background-color: ${(props) => props.theme.color.success100};
        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px
            ${(props) => props.theme.color.success100} inset !important;
        }
      }
    `;
  }};
`;

export const ErrorLabel = styled(Label)<{ error?: boolean | null }>`
  display: block;
  min-height: 2rem;
  margin: 0.8rem 0;
  ${({ error }) => {
    if (error === null) {
      return css`
        ${(props) => props.theme.color.fontColorBlack};
      `;
    }

    if (!error) {
      return css`
        color: ${(props) => props.theme.color.error800};
        animation: ${errorShaker} 1s linear 0.2s;
      `;
    }
  }}
`;

export const FormItemContainer = styled.div`
  margin-bottom: 2rem;
`;

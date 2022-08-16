import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  align-items: center;
  width: 100%;
  grid-template-columns: 0.5fr 4fr;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  padding: 1rem 0;
  label {
    font-size: 2rem;
  }
  input {
    font-size: 2rem;
    outline: 0;
    border: 0;
  }
`;

interface IFormItemContainer extends React.HTMLAttributes<HTMLDivElement> {}

const FormItem = ({ ...props }: IFormItemContainer) => {
  return <Container {...props}>{props.children}</Container>;
};

export default FormItem;

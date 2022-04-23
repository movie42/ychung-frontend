import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: auto;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  padding-bottom: 1rem;
  label {
    font-size: 2rem;
  }
  input {
    font-size: 2rem;
    outline: 0;
    border: 0;
  }
`;

interface IFormItemContainer
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

const FormItem: React.FC<IFormItemContainer> = ({ ...props }) => {
  return <Container>{props.children}</Container>;
};

export default FormItem;

import React from "react";

import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 4fr;
  @media screen and (max-width: 500px) {
    display: block;
  }
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  padding: 1rem 0;
  label {
    font-size: 1.7rem;
    @media screen and (max-width: 500px) {
      font-weight: 700;
    }
  }
  input {
    font-size: 2rem;
    outline: 0;
    border: 0;
  }
`;

type IFormItemContainer = React.HTMLAttributes<HTMLDivElement>;

const FormItem = ({ ...props }: IFormItemContainer) => {
  return <Container {...props}>{props.children}</Container>;
};

export default FormItem;

import React from "react";
import styled from "styled-components";

const Item = styled.textarea<ITextAreaProps>`
  border: 0;
`;

interface ITextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({ ...props }: ITextAreaProps) => {
  return <Item {...props}></Item>;
};

export default Textarea;

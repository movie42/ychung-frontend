import React from "react";
import styled from "styled-components";

const Item: React.FC<ITextAreaProps> = styled.textarea<ITextAreaProps>`
  border: 0;
`;

interface ITextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

const Textarea: React.FC<ITextAreaProps> = ({ ...props }) => {
  return <Item {...props}></Item>;
};

export default Textarea;

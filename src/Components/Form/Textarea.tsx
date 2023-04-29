import React from "react";
import styled from "styled-components";

type ITextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  (props, ref) => {
    return (
      <Item
        ref={ref}
        {...props}
      ></Item>
    );
  }
);

export default Textarea;

Textarea.displayName = "Textarea";

const Item = styled.textarea`
  border: 0;
  ::placeholder {
    font-size: 2.4rem;
  }
`;

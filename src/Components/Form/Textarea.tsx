import React from "react";

type ITextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  (props, ref) => {
    return <textarea ref={ref} {...props}></textarea>;
  }
);

Textarea.displayName = "Textarea";

export default Textarea;

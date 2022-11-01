import React from "react";

type IInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  return <input ref={ref} {...props} autoComplete="off" />;
});

Input.displayName = "Input";

export default Input;

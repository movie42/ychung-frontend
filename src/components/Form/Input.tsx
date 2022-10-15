import React from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  return <input ref={ref} {...props} autoComplete="off" />;
});

export default Input;

import React from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  return <input autoComplete="off" ref={ref} {...props} />;
});

export default Input;

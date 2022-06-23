import React from "react";
import {
  FieldValue,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});

export default Input;

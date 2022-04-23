import React from "react";
import { FieldValue, RegisterOptions, UseFormRegister } from "react-hook-form";

interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register: any;
  registerName: any;
  registerOptions?: RegisterOptions;
}

const Input = ({
  register,
  registerName,
  registerOptions,
  ...props
}: React.PropsWithChildren<IInputProps>) => {
  return <input {...props} {...register(registerName, registerOptions)} />;
};

export default Input;

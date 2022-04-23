import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface IInputProps<T>
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register: UseFormRegister<T>;
  registerName: any;
  registerOptions?: RegisterOptions<T>;
}

const Input = <T extends unknown>({
  register,
  registerName,
  registerOptions,
  ...props
}: React.PropsWithChildren<IInputProps<T>>) => {
  return <input {...props} {...register(registerName, registerOptions)} />;
};

export default Input;

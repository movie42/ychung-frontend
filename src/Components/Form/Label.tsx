import React, { ReactNode } from "react";

interface ILabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

const Label = ({ children, ...props }: ILabelProps) => {
  return <label {...props}>{children}</label>;
};

export default Label;

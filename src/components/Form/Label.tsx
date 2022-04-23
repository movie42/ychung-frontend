import React from "react";

interface ILabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  children: React.ReactNode | string;
}

const Label: React.FC<ILabelProps> = ({ ...props }) => {
  return <label {...props}>{props.children}</label>;
};

export default Label;

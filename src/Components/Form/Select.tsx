import React, { ReactNode } from "react";

interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, ISelectProps>(
  ({ options, ...props }, ref) => {
    return (
      <select
        ref={ref}
        {...props}
      >
        {options}
      </select>
    );
  }
);

Select.displayName = "Select";

export default Select;

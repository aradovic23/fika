import React from "react";

interface SelectProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  disabled: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  onChange,
  children,
  disabled,
}) => {
  return (
    <div>
      <div className="w-full">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <select
          disabled={disabled}
          onChange={onChange}
          className="select-bordered select w-full"
        >
          {children}
        </select>
      </div>
    </div>
  );
};

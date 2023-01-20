import React from "react";

export const SelectInput = ({
  label,
  onChange,
  children,
  disabled,
}: {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  disabled: boolean;
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

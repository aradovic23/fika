import React from "react";

export const SelectInput = ({
  label,
  onChange,
  children,
}: {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <select
          onChange={onChange}
          className="select-bordered select w-full max-w-xs"
        >
          {children}
        </select>
      </div>
    </div>
  );
};

import React from "react";

export const Checkbox = ({
  label,
  onChange,
}: {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="form-control my-2 mt-4 rounded-md bg-base-300/70 p-2">
      <label className="label cursor-pointer">
        <span className="label-text">{label}</span>
        <input
          type="checkbox"
          className="toggle-secondary toggle"
          onChange={onChange}
        />
      </label>
    </div>
  );
};

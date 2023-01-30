import React from "react";

export const Radio = ({
  label,
  value,
  onChange,
  checked,
}: {
  label: string;
  value: string;
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  checked: boolean;
}) => {
  return (
    <div className="form-control snap-start">
      <label className="label cursor-pointer gap-1 rounded-md bg-slate-800 px-2 md:bg-transparent">
        <span className="label-text truncate font-semibold uppercase md:font-normal">
          {label}
        </span>
        <input
          type="radio"
          value={value}
          className="radio checked:bg-accent"
          onChange={onChange}
          checked={checked}
        />
      </label>
    </div>
  );
};

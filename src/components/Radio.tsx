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
      <label
        className={`label cursor-pointer gap-1 rounded-md bg-slate-800 p-2 md:bg-transparent ${
          checked ? "bg-accent" : ""
        }`}
      >
        <span
          className={`label-text truncate font-semibold uppercase md:font-normal ${
            checked ? "md:text text-black md:text-base-content" : ""
          }`}
        >
          {label}
        </span>
        <input
          type="radio"
          value={value}
          className="radio hidden checked:bg-accent md:block"
          onChange={onChange}
          checked={checked}
        />
      </label>
    </div>
  );
};

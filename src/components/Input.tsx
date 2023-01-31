import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  inputMode: React.HTMLAttributes<HTMLLIElement>["inputMode"];
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  label,
  required = false,
  inputMode,
  placeholder = "Type here...",
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="w-full">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          type="text"
          placeholder={placeholder}
          className="input-bordered input w-full placeholder:text-sm placeholder:opacity-30"
          value={value}
          onChange={onChange}
          required={required}
          inputMode={inputMode}
        />
      </div>
    </div>
  );
};

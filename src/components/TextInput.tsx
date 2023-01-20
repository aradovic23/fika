import React from "react";

export const TextInput = ({
  value,
  onChange,
  label,
  required,
  inputMode,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required: boolean;
  inputMode: React.HTMLAttributes<HTMLLIElement>["inputMode"];
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="w-full">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input-bordered input w-full"
          value={value}
          onChange={onChange}
          required={required}
          inputMode={inputMode}
        />
      </div>
    </div>
  );
};

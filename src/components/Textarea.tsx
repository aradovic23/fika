import React from "react";

interface TextareaProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  placeholder = "Type here..",
  value,
  onChange,
  label = "Add text here",
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <textarea
        onChange={onChange}
        value={value}
        className="textarea-bordered textarea h-24"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

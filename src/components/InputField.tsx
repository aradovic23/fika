import type { FC, InputHTMLAttributes } from "react";
import type { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  register: UseFormRegister<FieldValues>;
  inputMode?: React.HTMLAttributes<HTMLLIElement>["inputMode"];
  placeholder?: string;
}

const InputField: FC<InputProps> = ({
  name,
  label,
  register,
  inputMode,
  placeholder,
}) => {
  return (
    <div>
      <label className="label" htmlFor={name}>
        <span className="label-text">{label}</span>
      </label>
      <input
        {...register(name)}
        id={name}
        className="input-bordered input w-full placeholder:text-sm placeholder:opacity-30"
        inputMode={inputMode}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;

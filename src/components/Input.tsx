import classNames from "classnames";

type InputVariant = "input-bordered" | "input-ghost";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  inputMode: React.HTMLAttributes<HTMLLIElement>["inputMode"];
  placeholder?: string;
  variant?: InputVariant;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  label,
  required = false,
  inputMode,
  placeholder = "Type here...",
  variant = "input-bordered",
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
          className={classNames(
            "input w-full placeholder:text-sm placeholder:opacity-30",
            variant
          )}
          value={value}
          onChange={onChange}
          required={required}
          inputMode={inputMode}
        />
      </div>
    </div>
  );
};

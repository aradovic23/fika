import classNames from "classnames";

type ButtonSize = "btn-lg" | "btn-md" | "btn-sm" | "btn-xs";
type ButtonVariant = "btn-block" | "btn-circle" | "btn-square" | "btn-outline";

interface ButtonProps {
  backgroundColor?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  backgroundColor = "btn-primary",
  disabled = false,
  children,
  onClick,
  size,
  variant,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        className={classNames(
          "btn w-full text-base-300",
          variant,
          backgroundColor,
          size,
          disabled && "hidden cursor-not-allowed opacity-50"
        )}
      >
        {children}
      </button>
      {disabled && <button className="loading btn">loading</button>}
    </>
  );
};

export default Button;

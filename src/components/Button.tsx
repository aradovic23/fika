import classNames from "classnames";

type ButtonSize = "btn-lg" | "btn-md" | "btn-sm" | "btn-xs";

interface ButtonProps {
  backgroundColor?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  size?: ButtonSize;
}

const Button: React.FC<ButtonProps> = ({
  backgroundColor = "btn-primary",
  disabled = false,
  children,
  onClick,
  size,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        className={classNames(
          "btn w-full text-base-300",
          backgroundColor,
          size,
          disabled ? "hidden cursor-not-allowed opacity-50" : ""
        )}
      >
        {children}
      </button>
      {disabled && <button className="loading btn">loading</button>}
    </>
  );
};

export default Button;

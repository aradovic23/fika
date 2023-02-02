import React from "react";

interface ButtonProps {
  backgroundColor?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
}

const Button: React.FC<ButtonProps> = ({
  backgroundColor = "btn-primary",
  disabled = false,
  children,
  onClick,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`btn ${backgroundColor} text-base-300 ${
          disabled ? "hidden cursor-not-allowed opacity-50" : ""
        }`}
      >
        {children}
      </button>
      {disabled && <button className="loading btn">loading</button>}
    </>
  );
};

export default Button;

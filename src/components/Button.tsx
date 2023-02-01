import React from "react";

interface ButtonProps {
  backgroundColor?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  backgroundColor = "btn-primary",
  disabled = false,
  children,
}) => {
  return (
    <>
      <button
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

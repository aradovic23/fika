import type { FC } from "react";
import React from "react";

interface FormProps {
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler;
  width?: string;
}

export const Form: FC<FormProps> = ({
  children,
  onSubmit,
  width = "max-w-96",
}) => {
  return (
    <form onSubmit={onSubmit} className={`flex ${width} flex-col gap-5 `}>
      {children}
    </form>
  );
};

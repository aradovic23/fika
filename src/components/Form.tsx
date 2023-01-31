import type { FC } from "react";
import React from "react";

interface FormProps {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler;
}

export const Form: FC<FormProps> = ({ children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="flex w-96 flex-col gap-5">
      {children}
    </form>
  );
};

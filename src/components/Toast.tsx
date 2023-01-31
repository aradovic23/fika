import React from "react";

type AlertType =
  | "alert-success"
  | "alert-info"
  | "alert-error"
  | "alert-warning";

interface ToastProps {
  label: string;
  type?: AlertType;
}

export const Toast: React.FC<ToastProps> = ({ label, type = "alert-info" }) => {
  return (
    <div className="toast">
      <div className={`alert ${type}`}>
        <div>
          <span>{label}</span>
        </div>
      </div>
    </div>
  );
};

import React from "react";

export const Toast = ({ label }: { label: string }) => {
  return (
    <div className="toast">
      <div className="alert alert-success">
        <div>
          <span>{label}</span>
        </div>
      </div>
    </div>
  );
};

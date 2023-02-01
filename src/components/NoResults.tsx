import React from "react";
import { WarningIcon } from "./icons/WarningIcon";

export const NoResults = () => {
  return (
    <div className="col-span-2 my-10 flex h-screen w-full flex-col place-items-center items-center justify-start">
      <h1>No products found...</h1>
      <WarningIcon />
    </div>
  );
};

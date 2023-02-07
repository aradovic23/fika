import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const NoResults = () => {
  return (
    <div className="col-span-2 my-10 flex h-screen w-full flex-col items-center justify-start gap-2">
      <h1 className="text-xl font-bold">No products found</h1>
      <ExclamationTriangleIcon className="h-8 w-8" />
    </div>
  );
};

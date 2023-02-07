import { PhotoIcon } from "@heroicons/react/24/solid";
import React from "react";

const Skeleton = () => {
  return (
    <div
      role="status"
      className="max-h-52 max-w-sm animate-pulse  rounded-md border border-gray-200 p-4 shadow dark:border-gray-700/50 md:p-6"
    >
      <div className="mb-4 flex h-24 items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
        <PhotoIcon className="h-8 w-8" />
      </div>
      <div className="mb-4 h-3 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="h-2  rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="mt-4 flex justify-between space-x-3">
        <div>
          <div className="h-2 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div>
          <div className="h-3 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeleton;

const Skeleton = () => {
  return (
    <div className="mx-auto flex w-full select-none flex-col gap-5 rounded-xl bg-gray-100 p-2  sm:h-64 sm:flex-row sm:p-4 ">
      <div className="h-32 animate-pulse rounded-xl bg-gray-200 sm:h-full sm:w-72"></div>
      <div className="flex flex-1 flex-col gap-5 sm:p-2">
        <div className="flex flex-1 flex-col gap-3">
          <div className="h-14 w-full animate-pulse rounded-lg bg-gray-200"></div>
          <div className="h-3 w-full animate-pulse rounded-lg bg-gray-200"></div>
          <div className="h-3 w-full animate-pulse rounded-lg bg-gray-200"></div>
          <div className="h-3 w-full animate-pulse rounded-lg bg-gray-200"></div>
          <div className="h-3 w-full animate-pulse rounded-lg bg-gray-200"></div>
        </div>
        <div className="mt-auto flex gap-3">
          <div className="h-8 w-20 animate-pulse rounded-lg bg-gray-200"></div>
          <div className="h-8 w-20 animate-pulse rounded-lg bg-gray-200"></div>
          <div className="ml-auto h-8 w-20 animate-pulse rounded-lg bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;

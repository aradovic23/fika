function ProductsSkeleton() {
  return (
    <div className="mx-auto flex w-full select-none  items-center justify-between gap-1 rounded-lg bg-gray-200 p-2">
      <div className="h-24 w-24 animate-pulse rounded-lg bg-gray-300" />
      <div className="flex h-full w-full flex-col gap-2">
        <div className="h-4 w-full animate-pulse rounded-md bg-gray-300" />
        <div className="h-4 w-full animate-pulse rounded-md bg-gray-300" />
        <div className="h-4 w-full animate-pulse rounded-md bg-gray-300" />
        <div className="h-4 w-full animate-pulse rounded-md bg-gray-300" />
      </div>
    </div>
  );
}

export default ProductsSkeleton;

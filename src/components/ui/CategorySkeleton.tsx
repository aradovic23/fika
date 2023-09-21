function CategorySkeleton() {
  return (
    <>
      {[...Array(6).keys()].map(i => (
        <div
          key={i}
          className="mx-auto flex h-28 w-full animate-pulse select-none flex-col gap-1 rounded-lg bg-gray-200 p-2 sm:flex-row sm:p-4"
        ></div>
      ))}
    </>
  );
}

export default CategorySkeleton;

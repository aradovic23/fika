import { api } from "../utils/api";

type Category = {
  id: number;
  categoryName: string;
  role?: string | null;
  url: string | null;
};

type UseGetCategoryResult = {
  category: Category | undefined;
  isLoading: boolean;
  isError: boolean;
};

export const useGetCategory = (categoryId: number): UseGetCategoryResult => {
  const categories = api.drinks.getCategories.useQuery();

  if (!categoryId)
    return {
      category: undefined,
      isLoading: categories.isLoading,
      isError: categories.isError,
    };

  const category = categories.data?.find((cat) => categoryId === cat.id);

  return {
    category,
    isLoading: categories.isLoading,
    isError: categories.isError,
  };
};

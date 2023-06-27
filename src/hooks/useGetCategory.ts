import type { Category } from '@prisma/client';
import { api } from '../utils/api';

type UseGetCategoryResult = {
  category?: Category;
  isLoading: boolean;
  isError: boolean;
};

export const useGetCategory = (categoryId: number | undefined): UseGetCategoryResult => {
  const categories = api.categories.getCategories.useQuery();

  const category = categories.data?.find(cat => categoryId === cat.id);

  if (!category) {
    return {
      category: undefined,
      isLoading: categories.isLoading,
      isError: categories.isError,
    };
  }

  return {
    category,
    isLoading: categories.isLoading,
    isError: categories.isError,
  };
};

import { api } from "./../utils/api";

export const useCategoryImage = (categoryName: string) => {
  const categories = api.drinks.getCategories.useQuery();

  if (!categoryName) return;

  const categoryImage = categories.data?.find(
    (cat) => categoryName.toLowerCase() === cat.categoryName.toLowerCase()
  );

  return categoryImage?.url;
};

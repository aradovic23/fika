import type { QueryClient, QueryKey } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { api } from '../utils/api';

const setQueryDefaultsWithoutRefetch = (queryClient: QueryClient, queryKey: QueryKey) => {
  queryClient.setQueryDefaults(queryKey, {
    refetchOnWindowFocus: false,
  });
};

const queryKeysToSetWithoutRefetch: QueryKey[] = [
  getQueryKey(api.settings.getStore, undefined, 'query'),
  getQueryKey(api.categories.getCategories, undefined, 'query'),
  getQueryKey(api.volume.getVolumeOptions, undefined, 'query'),
  getQueryKey(api.recommendations.getRecommendedProductsWithDetails, undefined, 'query'),
  getQueryKey(api.categories.getCategoriesConcise, undefined, 'query'),
  getQueryKey(api.drinks.getDrinks, undefined, 'query'),
  getQueryKey(api.recommendations.getRecommendations, undefined, 'query'),
];

export const setupQueryDefaultsWithoutRefetch = (queryClient: QueryClient) => {
  queryKeysToSetWithoutRefetch.forEach((queryKey: QueryKey) => {
    setQueryDefaultsWithoutRefetch(queryClient, queryKey);
  });
};

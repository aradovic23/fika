import { Box } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import Head from 'next/head';
import { api } from '../utils/api';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const queryClient = useQueryClient();

  const settingsKey = getQueryKey(api.settings.getStore, undefined, 'query');
  queryClient.setQueryDefaults(settingsKey, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const categoriesKey = getQueryKey(api.categories.getCategories, undefined, 'query');
  queryClient.setQueryDefaults(categoriesKey, {
    refetchOnWindowFocus: false,
  });

  const volumesKey = getQueryKey(api.volume.getVolumeOptions, undefined, 'query');
  queryClient.setQueryDefaults(volumesKey, {
    refetchOnWindowFocus: false,
  });

  const recommendedProducts = getQueryKey(api.drinks.getRecommendedProducts, undefined, 'query');
  queryClient.setQueryDefaults(recommendedProducts, {
    refetchOnWindowFocus: false,
  });

  const allDrinks = getQueryKey(api.drinks.getDrinks, undefined, 'query');
  queryClient.setQueryDefaults(allDrinks, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Box>
        <Head>
          <title>Fika</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </Head>
        <Navbar />
        {children}
      </Box>
    </>
  );
};

export default Layout;

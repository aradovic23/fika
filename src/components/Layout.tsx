import { Box } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { api } from "../utils/api";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const queryClient = useQueryClient();

  const settingsKey = getQueryKey(api.settings.getStore, undefined, "query");
  queryClient.setQueryDefaults(settingsKey, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const drinksKey = getQueryKey(api.drinks.getDrinks, undefined, "query");
  queryClient.setQueryDefaults(drinksKey, {
    refetchOnWindowFocus: false,
  });

  const categoriesKey = getQueryKey(
    api.categories.getCategories,
    undefined,
    "query"
  );
  queryClient.setQueryDefaults(categoriesKey, {
    refetchOnWindowFocus: false,
  });

  const volumesKey = getQueryKey(
    api.volume.getVolumeOptions,
    undefined,
    "query"
  );

  queryClient.setQueryDefaults(volumesKey, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Box>
        <Navbar />
        {children}
      </Box>
    </>
  );
};

export default Layout;

import {
  Container,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useIntersection } from '@mantine/hooks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import nextI18nConfig from '../../next-i18next.config.mjs';
import type { DrinkWithUnits } from '../components/DrinkList';
import { NoResults } from '../components/NoResults';
import Skeleton from '../components/Skeleton';
import CategoryCard from '../components/sections/CategoryCard';
import CategorySkeleton from '../components/ui/CategorySkeleton';
import Product from '../components/ui/Product';
import InputSearch from '../components/ui/Search';
import { STALE_TIME } from '../constants';
import { api } from '../utils/api';
import { useIsAdmin } from '../hooks/useIsAdmin';

export default function Products() {
  const [search, setSearch] = useState<string | undefined>('');
  const [showHiddenProducts, setShowHiddenProducts] = useState(false);
  const [showAdminOptions, setShowAdminOptions] = useState(true);

  const { push, query } = useRouter();

  const redirectedCategoryId = Number(query.category);

  const initialCategoryId = redirectedCategoryId ? redirectedCategoryId : 0;

  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId);

  const {
    data: products,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = api.drinks.getPaginatedDrinks.useInfiniteQuery(
    {
      limit: 10,
      id: selectedCategory,
      searchTerm: search !== '' ? search : undefined,
    },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
      staleTime: STALE_TIME,
    }
  );

  const { data: categories, isLoading: isCategoriesLoading } = api.categories.getCategoriesConcise.useQuery();

  const drinksCount = categories?.reduce((acc, current) => acc + current._count.drinks, 0);

  const _products = products?.pages.flatMap(page => page.items);

  const filteredProducts = _products?.filter(prod => showHiddenProducts || !prod.isHidden);

  const { t } = useTranslation('common');

  const updateQueryParams = async (id: number) =>
    await push({ query: { category: `${id}` } }, undefined, { shallow: true });

  const onCategorySelect = async (id: number) => {
    setSelectedCategory(id);
    setSearch(undefined);
    await updateQueryParams(id);
  };

  const lastPostRef = useRef<HTMLElement>(null);

  const isAdmin = useIsAdmin();

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    const asyncFetch = async () => {
      if (entry?.isIntersecting) await fetchNextPage();
    };

    asyncFetch().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry]);

  return (
    <>
      <Head>
        <title>{t('all_products_title')} | Fika </title>
        <meta name="description" content="List of all products" />
      </Head>
      <Container maxW="6xl" mt="10">
        <Heading mb="10">{t('products.page_title')}</Heading>

        <Grid h="100px" templateColumns="repeat(6, 1fr)" gap={4}>
          <GridItem
            colSpan={{ base: 6, md: 2, lg: 2 }}
            borderRight="1px solid"
            borderRightColor="gray.300"
            p={['0', '0', '4']}
            as="aside"
          >
            <Heading fontWeight="semibold" mb="5" size="md">
              {t('products.categories_subtitle')}
            </Heading>
            <SimpleGrid
              columns={[1, 2]}
              minChildWidth="7rem"
              spacing="2"
              autoFlow={['column', 'column', 'row', 'row']}
              overflowX="auto"
              scrollSnapType="x proximity"
              scrollSnapStop="always"
            >
              {isCategoriesLoading ? (
                <CategorySkeleton />
              ) : (
                <>
                  <CategoryCard
                    categoryId={0}
                    categoryName={t('products.all_products_card')}
                    count={drinksCount ?? 0}
                    onSelect={onCategorySelect}
                    selectedCategoryId={selectedCategory}
                  />
                  {categories?.map(category => (
                    <CategoryCard
                      key={category.id}
                      categoryId={category.id}
                      categoryName={category.categoryName}
                      count={category._count.drinks ?? 0}
                      onSelect={onCategorySelect}
                      selectedCategoryId={selectedCategory}
                    />
                  ))}
                </>
              )}
            </SimpleGrid>
          </GridItem>

          <GridItem colSpan={{ base: 6, md: 4, lg: 4 }} as="main" pos="relative">
            <VStack spacing={4} w="full">
              <InputSearch handleSearchChange={term => setSearch(term)} isLoading={isLoading} />

              {isAdmin && (
                <VStack w="full" align="flex-start" p="4" border="1px solid" borderColor="magenta.100" rounded="md">
                  <Text fontWeight="bold" color="magenta.100" textAlign="left">
                    {t('products.admin_filters_title')}
                  </Text>

                  <FormControl display="flex" alignItems="center">
                    <FormLabel color="magenta.100" htmlFor="show-hidden" mb="0">
                      {t('all_drinks.hidden_products')}
                    </FormLabel>
                    <Switch
                      id="show-hidden"
                      defaultChecked
                      onChange={() => setShowHiddenProducts(!showHiddenProducts)}
                      variant="admin"
                    />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel color="magenta.100" htmlFor="admin-options" mb="0">
                      {t('products.toggle_view_admin_options')}
                    </FormLabel>
                    <Switch
                      id="admin-options"
                      defaultChecked
                      onChange={() => setShowAdminOptions(!showAdminOptions)}
                      variant="admin"
                    />
                  </FormControl>
                </VStack>
              )}
            </VStack>

            <Stack spacing={4} my="5">
              {filteredProducts?.map((drink, i) => {
                if (i === filteredProducts.length - 1)
                  return (
                    <Product
                      key={drink.id}
                      drink={drink as DrinkWithUnits}
                      ref={ref}
                      showAdminOptions={showAdminOptions}
                    />
                  );
                return <Product key={drink.id} drink={drink} showAdminOptions={showAdminOptions} />;
              })}

              {_products && _products?.length < 1 && <NoResults />}
              {isLoading && <Skeleton />}
              {isFetchingNextPage && <Skeleton />}
            </Stack>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18nConfig, ['en', 'sr'])),
  },
});

import { Container, Grid, GridItem, Heading, SimpleGrid, Stack } from '@chakra-ui/react';
import { useDebouncedValue, useIntersection } from '@mantine/hooks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import nextI18nConfig from '../../next-i18next.config.mjs';
import type { DrinkWithUnits } from '../components/DrinkList';
import { NoResults } from '../components/NoResults';
import Skeleton from '../components/Skeleton';
import CategoryCard from '../components/sections/CategoryCard';
import Product from '../components/ui/Product';
import Search from '../components/ui/Search';
import { STALE_TIME } from '../constants';
import { api } from '../utils/api';

export default function Infinite() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [debouncedSearch] = useDebouncedValue(search, 1000);

  const {
    data: products,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = api.drinks.getPaginatedDrinks.useInfiniteQuery(
    {
      limit: 10,
      id: selectedCategory,
      searchTerm: debouncedSearch !== '' ? debouncedSearch : undefined,
    },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
      staleTime: STALE_TIME,
    }
  );

  const { data: categories } = api.categories.getCategoriesConcise.useQuery();

  const drinksCount = categories?.reduce((acc, current) => acc + current._count.drinks, 0);

  const { t } = useTranslation('common');

  const lastPostRef = useRef<HTMLElement>(null);

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

  const _products = products?.pages.flatMap(page => page.items);

  const handleSearchChange = (term: string) => {
    setSearch(term);
  };

  const clearSearch = () => {
    setSearch('');
  };

  return (
    <>
      <Head>
        <title>{t('all_products_title')} | Fika </title>
        <meta name="description" content="List of all products" />
      </Head>
      <Container maxW="6xl" mt="10">
        <Heading mb="10">New Products Page (Beta)</Heading>

        <Grid h="100px" templateColumns="repeat(6, 1fr)" gap={4}>
          <GridItem
            colSpan={{ base: 6, md: 2, lg: 2 }}
            borderRight="1px solid"
            borderRightColor="gray.300"
            p="4"
            as="aside"
          >
            <Heading fontWeight="semibold" mb="5" size="md">
              Categories
            </Heading>
            <SimpleGrid
              columns={[1, 2]}
              minChildWidth="7rem"
              spacing="5"
              autoFlow={['column', 'column', 'row', 'row']}
              overflowX="auto"
              scrollSnapType="x proximity"
              scrollSnapStop="always"
            >
              <CategoryCard
                categoryId={0}
                categoryName="All products"
                count={drinksCount ?? 0}
                onSelect={setSelectedCategory}
                selectedCategoryId={selectedCategory}
              />
              {categories?.map(category => (
                <CategoryCard
                  key={category.id}
                  categoryId={category.id}
                  categoryName={category.categoryName}
                  count={category._count.drinks ?? 0}
                  onSelect={setSelectedCategory}
                  selectedCategoryId={selectedCategory}
                />
              ))}
            </SimpleGrid>
          </GridItem>

          <GridItem colSpan={{ base: 6, md: 4, lg: 4 }} as="main" pos="relative">
            <Search handleSearchChange={handleSearchChange} clearSearch={clearSearch} />

            <Stack spacing={4} my="5">
              {_products?.map((drink, i) => {
                if (i === _products.length - 1)
                  return <Product key={drink.id} drink={drink as DrinkWithUnits} ref={ref} />;
                return <Product key={drink.id} drink={drink} />;
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

import { Container, Grid, GridItem, HStack, Heading, Icon, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { useIntersection } from '@mantine/hooks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import nextI18nConfig from '../../next-i18next.config.mjs';
import type { DrinkWithUnits } from '../components/DrinkList';
import { LoaderSpinner } from '../components/LoaderSpinner';
import Product from '../components/ui/Product';
import Search from '../components/ui/Search';
import { api } from '../utils/api';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

export default function Infinite() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);

  const {
    data: products,
    fetchNextPage,
    isFetchingNextPage,
  } = api.drinks.getPaginatedDrinks.useInfiniteQuery(
    {
      limit: 20,
    },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
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

        <Grid h="100px" templateRows="repeat(2, 1fr)" templateColumns="repeat(6, 1fr)" gap={4}>
          <GridItem rowSpan={2} colSpan={2} borderRight="1px solid" borderRightColor="gray.300" p="4">
            <SimpleGrid columns={2} spacing="4">
              <Stack
                bg={selectedCategory === 0 ? 'orange' : 'gray.300'}
                cursor="pointer"
                p="3"
                w="10rem"
                h="10rem"
                rounded="md"
                userSelect="none"
                onClick={() => setSelectedCategory(0)}
                justifyContent="space-between"
              >
                <Text fontWeight="semibold">All products</Text>
                <HStack justify="space-between">
                  <Text fontSize="sm">{drinksCount} items</Text>
                  {selectedCategory === 0 && (
                    <Icon fontWeight="bold">
                      <ChevronRightIcon />
                    </Icon>
                  )}
                </HStack>
              </Stack>
              {categories?.map(category => (
                <Stack
                  bg={selectedCategory === category.id ? 'orange' : 'gray.300'}
                  cursor="pointer"
                  key={category.id}
                  p="3"
                  w="10rem"
                  h="10rem"
                  rounded="lg"
                  onClick={() => setSelectedCategory(category.id)}
                  userSelect="none"
                  justifyContent="space-between"
                >
                  <Text fontWeight="semibold">{category.categoryName}</Text>
                  <HStack justify="space-between">
                    <Text fontSize="sm">{category._count.drinks} items</Text>
                    {selectedCategory === category.id && (
                      <Icon fontWeight="bold">
                        <ChevronRightIcon />
                      </Icon>
                    )}
                  </HStack>
                </Stack>
              ))}
            </SimpleGrid>
          </GridItem>
          <GridItem colSpan={4}>
            <Search handleSearchChange={handleSearchChange} clearSearch={clearSearch} />
            <Text>{search}</Text>
          </GridItem>

          <GridItem colSpan={4}>
            <Stack spacing={4}>
              {_products?.map((drink, i) => {
                if (i === _products.length - 1)
                  return <Product key={drink.id} drink={drink as DrinkWithUnits} ref={ref} />;
                return <Product key={drink.id} drink={drink} />;
              })}
              {isFetchingNextPage ? (
                <LoaderSpinner />
              ) : (products?.pages.length ?? 0) < (products?.pages.length ?? 0) ? (
                'Load more'
              ) : (
                <Text>All data loaded</Text>
              )}
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

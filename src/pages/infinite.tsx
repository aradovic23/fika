import { Container, Heading, Text, VStack } from '@chakra-ui/react';
import { useIntersection } from '@mantine/hooks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useRef } from 'react';
import nextI18nConfig from '../../next-i18next.config.mjs';
import type { DrinkWithUnits } from '../components/DrinkList';
import { LoaderSpinner } from '../components/LoaderSpinner';
import Product from '../components/ui/Product';
import { api } from '../utils/api';

export default function Infinite() {
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

  return (
    <Container maxW="6xl" mt="10">
      <Heading>Products (Testing)</Heading>

      <VStack mt="10">
        {_products?.map((drink, i) => {
          if (i === _products.length - 1) return <Product key={drink.id} drink={drink as DrinkWithUnits} ref={ref} />;
          return <Product key={drink.id} drink={drink} />;
        })}

        {isFetchingNextPage ? (
          <LoaderSpinner />
        ) : (products?.pages.length ?? 0) < (products?.pages.length ?? 0) ? (
          'Load more'
        ) : (
          <Text>All data loaded</Text>
        )}
      </VStack>
    </Container>
  );
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18nConfig, ['en', 'sr'])),
  },
});

import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Container, Flex, Skeleton } from '@chakra-ui/react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { type NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link.js';
import { useTranslation } from 'react-i18next';
import nextI18nConfig from '../../next-i18next.config.mjs';
import type { DrinkWithCategory } from '../components/ImageCard';
import ScrollableRow from '../components/sections/ScrollableRow';
import { api } from '../utils/api';

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18nConfig, ['en', 'sr'])),
  },
});

const Home: NextPage = () => {
  const { t } = useTranslation('common');
  const { data: storeData } = api.settings.getStore.useQuery();
  const { data: drinks, isLoading: isDrinksLoading } = api.drinks.getRecommendedProducts.useQuery();
  const { data: categories, isLoading: isCategoriesLoading } = api.categories.getCategories.useQuery();

  const buttonActions = !storeData ? 'Visit Settings' : t('elements.button.view_all');

  return (
    <>
      <Head>
        <title>Fika</title>
      </Head>

      <Container maxW="6xl">
        <Flex direction="column" gap="5" mt="5">
          <Skeleton isLoaded={!isDrinksLoading} rounded="lg" h="200">
            <ScrollableRow
              heading={`${t('home.recommendations')} 🤩`}
              type="drinks"
              data={drinks as DrinkWithCategory[]}
              showModal
            />
          </Skeleton>
          <Skeleton rounded="lg" h="200" isLoaded={!isCategoriesLoading}>
            <ScrollableRow heading={`${t('home.categories')} ☕️🥂`} type="categories" data={categories ?? []} />
          </Skeleton>
        </Flex>
        {!storeData && !isCategoriesLoading && (
          <Alert status="warning" rounded="md">
            <AlertIcon />
            <AlertTitle>No stores</AlertTitle>
            <AlertDescription>
              There is not a store added yet. Go to Settings to add a store name and logo.
            </AlertDescription>
          </Alert>
        )}
        <Link href={!storeData ? '/settings' : '/drinks'}>
          <Button pl="0" mt="5" variant="ghost" rightIcon={<ChevronRightIcon className="h-4 w-4" />}>
            {buttonActions}
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default Home;

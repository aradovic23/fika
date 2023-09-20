import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Container, Flex, Skeleton } from '@chakra-ui/react';
import { type NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link.js';
import { useTranslation } from 'react-i18next';
import nextI18nConfig from '../../next-i18next.config.mjs';
import { Row } from '../components/sections/Row';
import { RowProduct } from '../components/sections/RowProduct';
import { api } from '../utils/api';
import { ChevronRight } from 'lucide-react';

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18nConfig, ['en', 'sr'])),
  },
});

const Home: NextPage = () => {
  const { t } = useTranslation('common');
  const { data: storeData } = api.settings.getStore.useQuery();
  const { data: drinks, isLoading: isDrinksLoading } = api.recommendations.getRecommendedProductsWithDetails.useQuery();
  const { data: categories, isLoading: isCategoriesLoading } = api.categories.getCategoriesConcise.useQuery();

  const sortedDrinks = drinks?.sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt));

  // Sorted by isDefault and then by name
  const sortedCategories = categories?.slice(0).sort((a, b) => {
    if (a.isDefault && !b.isDefault) {
      return -1;
    } else if (!a.isDefault && b.isDefault) {
      return 1;
    } else {
      return a.categoryName.localeCompare(b.categoryName);
    }
  });

  const buttonActions = !storeData ? 'Visit Settings' : t('elements.button.view_all');

  return (
    <>
      <Head>
        <title>Fika</title>
      </Head>

      <Container maxW="6xl">
        <Flex direction="column" gap={4} mt="5">
          <Skeleton isLoaded={!isDrinksLoading} rounded="lg" h="200">
            <Row
              items={sortedDrinks ?? []}
              heading={`${t('home.recommendations')} 🤩`}
              render={drink => <RowProduct type="drinks" data={drink} showModal />}
            />
          </Skeleton>
          <Skeleton rounded="lg" h="200" isLoaded={!isCategoriesLoading}>
            <Row
              items={sortedCategories ?? []}
              heading={`${t('home.categories')} ☕️🥐`}
              render={category => <RowProduct type="categories" data={category} />}
            />
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
        {(!isCategoriesLoading || !isDrinksLoading) && (
          <Link href={!storeData ? '/settings' : '/products'}>
            <Button mt="5" variant="solid" size="sm" colorScheme="primary" rightIcon={<ChevronRight />}>
              {buttonActions}
            </Button>
          </Link>
        )}
      </Container>
    </>
  );
};

export default Home;

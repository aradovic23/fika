import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Container, VStack } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nConfig from '../../next-i18next.config.mjs';
import { useTranslation } from 'next-i18next';
import { api } from '../utils/api';
import { PageSpinner } from '../components/LoaderSpinner';
import { HomePageProduct } from '../components/HomePageProduct';
import HomePageCard from '../components/HomePageCard';

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18nConfig, ['en', 'sr'])),
  },
});

const Home: NextPage = () => {
  const { t } = useTranslation('common');
  const { data: storeData, isLoading } = api.settings.getStore.useQuery();
  const { data } = api.drinks.getRecommendedProducts.useQuery();

  const buttonActions = !storeData ? 'Visit Settings' : t('elements.button.view_all');

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Head>
        <title>{storeData ? storeData.name : 'Drinks App'} Digital Menu</title>
      </Head>

      <Container maxW="4xl">
        <HomePageCard heading="Recommendation! 🌼">
          {data?.map(prod => (
            <HomePageProduct product={prod} key={prod.id} />
          ))}
        </HomePageCard>
        {!storeData && (
          <Alert status="warning" rounded="md">
            <AlertIcon />
            <AlertTitle>No stores</AlertTitle>
            <AlertDescription>
              There is not a store added yet. Go to Settings to add a store name and logo.
            </AlertDescription>
          </Alert>
        )}
        {/* <Link href={!storeData ? '/settings' : '/drinks'}>
          <Button variant="user">{buttonActions}</Button>
        </Link> */}
      </Container>
    </>
  );
};

export default Home;

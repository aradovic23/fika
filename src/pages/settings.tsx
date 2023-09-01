import { type NextPage } from 'next';
import Head from 'next/head';
import { Button, Container, Grid, GridItem, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nConfig from '../../next-i18next.config.mjs';
import { useSession } from 'next-auth/react';
import AccessDenied from '../components/AccessDenied';
import CreateStoreForm from '../components/CreateStoreForm';
import { api } from '../utils/api';
import EditStoreForm from '../components/EditStoreForm';
import { PageSpinner } from '../components/LoaderSpinner';
import Notice from '../components/Notice';
import { useTranslation } from 'react-i18next';

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18nConfig, ['en', 'sr'])),
  },
});

const Settings: NextPage = () => {
  const { data: sessionData, status } = useSession();

  const { data: storeData, isLoading } = api.settings.getStore.useQuery();

  const utils = api.useContext();

  const { mutate: deleteStore } = api.settings.deleteStore.useMutation({
    async onSuccess() {
      await utils.settings.getStore.invalidate();
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleDeleteStore = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this store?')) {
      return;
    }
    deleteStore({ id });
  };

  if (status === 'loading' || isLoading) {
    return <PageSpinner />;
  }

  if (sessionData?.user?.role != 'ADMIN') {
    return <AccessDenied />;
  }

  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('settings.title')}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container as="main" maxW="3xl" mt={5}>
        <VStack spacing={5} mb={5}>
          <Heading my="15">{t('settings.title')}</Heading>
          {!storeData && (
            <Notice
              status="info"
              title={t('settings.no_store_title') ?? 'No store yet'}
              description={t('settings.no_store_description') ?? 'Please add new store'}
            />
          )}
          {!storeData && <CreateStoreForm />}
        </VStack>
        {storeData && (
          <>
            <Grid templateColumns="repeat(2, 1fr)" gap={20}>
              <GridItem>
                <Image src={storeData.fileUrl ?? ''} alt="image" />
              </GridItem>
              <GridItem>
                <EditStoreForm {...storeData} />
              </GridItem>
            </Grid>
            <HStack
              w="full"
              border="1px solid"
              borderColor="offRed.200"
              rounded="lg"
              p="5"
              justify="space-between"
              align="baseline"
            >
              <Text>{t('settings.delete_description')}</Text>
              <Button variant="ghost" colorScheme="red" onClick={() => handleDeleteStore(storeData?.id ?? 1)}>
                {t('settings.delete_store')}
              </Button>
            </HStack>
          </>
        )}
      </Container>
    </>
  );
};

export default Settings;

import { Button, Container, Grid, GridItem, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { type NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import nextI18nConfig from '../../next-i18next.config.mjs';
import AccessDenied from '../components/AccessDenied';
import CreateStoreForm from '../components/CreateStoreForm';
import EditStoreForm from '../components/EditStoreForm';
import { PageSpinner } from '../components/LoaderSpinner';
import Notice from '../components/Notice';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { api } from '../utils/api';

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18nConfig, ['en', 'sr'])),
  },
});

const Settings: NextPage = () => {
  const { data: storeData, isLoading } = api.settings.getStore.useQuery();

  const isAdmin = useIsAdmin();

  const utils = api.useContext();

  const { t } = useTranslation('common');

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

  if (isLoading) {
    return <PageSpinner />;
  }

  if (!isAdmin) {
    return <AccessDenied />;
  }

  return (
    <>
      <Head>
        <title>{t('settings.title')} | Fika </title>
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

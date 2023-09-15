import { Container, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { type NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import nextI18nConfig from '../../next-i18next.config.mjs';
import ProductSettings from '../components/sections/ProductSettings';
import StoreSettings from '../components/sections/StoreSettings';
import StoreSettingsDelete from '../components/sections/StoreSettingsDelete';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { api } from '../utils/api';

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18nConfig, ['en', 'sr'])),
  },
});

const Settings: NextPage = () => {
  const { data: storeData } = api.settings.getStore.useQuery();

  const isAdmin = useIsAdmin();

  const { t } = useTranslation('common');

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{t('settings.title')} | Fika </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container as="main" maxW="6xl" mt={5}>
        <Heading textAlign="center" my="15">
          {t('settings.title')}
        </Heading>

        <Tabs variant="soft-rounded" colorScheme="primary">
          <TabList>
            <Tab>Store</Tab>
            <Tab>Products</Tab>
            <Tab color="offRed.500">Danger</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <StoreSettings />
            </TabPanel>
            <TabPanel>
              <ProductSettings />
            </TabPanel>
            <TabPanel>
              <StoreSettingsDelete id={storeData?.id ?? 1} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};

export default Settings;

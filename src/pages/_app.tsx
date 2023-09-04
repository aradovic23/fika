import { ChakraProvider } from '@chakra-ui/react';
import '@uploadthing/react/styles.css';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { type AppType } from 'next/app';
import nextI18nConfig from '../../next-i18next.config.mjs';
import Layout from '../components/Layout';
import '../styles/globals.css';
import theme from '../theme/index';
import { api } from '../utils/api';
import { ClerkProvider } from '@clerk/nextjs';

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <ClerkProvider {...pageProps}>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </SessionProvider>
    </ClerkProvider>
  );
};

const I18nApp = appWithTranslation(MyApp, nextI18nConfig);
const TRPCApp = api.withTRPC(I18nApp);

export default TRPCApp;

import { ChakraProvider } from '@chakra-ui/react';
import '@uploadthing/react/styles.css';
import { appWithTranslation } from 'next-i18next';
import { type AppType } from 'next/app';
import nextI18nConfig from '../../next-i18next.config.mjs';
import Layout from '../components/Layout';
import '../styles/globals.css';
import theme from '../theme/index';
import { api } from '../utils/api';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
    return (
        <ClerkProvider {...pageProps}>
            <ChakraProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                    <Analytics />
                </Layout>
            </ChakraProvider>
        </ClerkProvider>
    );
};

const I18nApp = appWithTranslation(MyApp, nextI18nConfig);
const TRPCApp = api.withTRPC(I18nApp);

export default TRPCApp;

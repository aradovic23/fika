import type { AppProps } from "next/app";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";

import { api } from "../utils/api";

import "../styles/globals.css";
import { Navbar } from "../components/Navbar";
import type { ComponentType } from "react";
import Layout from "../components/Layout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Navbar />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

const I18nApp = appWithTranslation(MyApp);
const TRPCApp = api.withTRPC(I18nApp) as ComponentType<AppProps>;

export default appWithTranslation(TRPCApp);

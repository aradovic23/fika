import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import theme from "../../theme";
import Layout from "../components/Layout";
import { appWithTranslation } from "next-i18next";
import nextI18nConfig from "../../next-i18next.config.mjs";
import "@uploadthing/react/styles.css";


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  const primary = {

    50: "#fffdfd",
    100: "#fdeaec",
    200: "#fcd6da",
    300: "#fac3c9",
    400: "#f8afb7",
    500: "#f79ca6",
    600: "#f58894",
    700: "#f37583",
    800: "#f26171",
    900: "#f04e60",

  }

  const updatedTheme = extendTheme({
    ...theme,
    colors: {
      primary
    },
  })

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={updatedTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
};

const I18nApp = appWithTranslation(MyApp, nextI18nConfig);
const TRPCApp = api.withTRPC(I18nApp);

export default TRPCApp;

import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nConfig from "../../next-i18next.config.mjs";
import { useTranslation } from "next-i18next";
import { api } from "../utils/api";
import { PageSpinner } from "../components/LoaderSpinner";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"], nextI18nConfig, [
      "en",
      "sr",
    ])),
  },
});

const Home: NextPage = () => {
  const { t } = useTranslation("common");
  const { data: storeData, isLoading } = api.settings.getStore.useQuery();

  const buttonActions = !storeData
    ? "Visit Settings"
    : t("elements.button.view_all");

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Head>
        <title>{storeData ? storeData.name : "Drinks App"} Digital Menu</title>
      </Head>

      <Center h="calc(100vh)">
        <VStack spacing="5">
          {storeData && (
            <Image
              alt="logo"
              src={storeData.logo}
              boxSize="300px"
              rounded="md"
              objectFit="cover"
            />
          )}
          <Heading>{storeData?.name ?? "Welcome"}</Heading>
          {!storeData && (
            <Alert status="warning" rounded="md">
              <AlertIcon />
              <AlertTitle>No stores</AlertTitle>
              <AlertDescription>
                There is not a store added yet. Go to Settings to add a store
                name and logo.
              </AlertDescription>
            </Alert>
          )}

          <Link href={!storeData ? "/settings" : "/drinks"}>
            <Button bg="primary.500">{buttonActions}</Button>
          </Link>
        </VStack>
      </Center>
    </>
  );
};

export default Home;

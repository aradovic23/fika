import { type NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import EditDrinkForm from "../../components/EditDrinkForm";
import Head from "next/head";
import { useSession } from "next-auth/react";
import AccessDenied from "../../components/AccessDenied";
import { useGetCategory } from "../../hooks/useGetCategory";
import {
  Container,
  Heading,
  ScaleFade,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import type { Drink } from "@prisma/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nConfig from "../../../next-i18next.config.mjs";
import { useTranslation } from "next-i18next";
import moment from "moment";
import "moment/locale/sr";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"], nextI18nConfig, [
      "en",
      "sr",
    ])),
  },
});

const EditDrinkPage: NextPage = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const { data: sessionData, status } = useSession();

  const router = useRouter();
  const { id } = router.query as {
    id: string;
  };
  const { data } = api.drinks.getDrinkById.useQuery<{
    id: number;
    categoryId: number;
  }>(
    { id },
    {
      refetchOnWindowFocus: false,
    }
  );

  const utils = api.useContext();
  const updateSingleDrink = api.drinks.updateDrink.useMutation();
  const { category } = useGetCategory(data?.categoryId ?? 1);
  const addDescription = category?.addDescription ?? false;
  const addTypes = category?.addTypes ?? false;

  const setMomentLocale = (locale: string) => moment.locale(locale);
  const currentLang: string = router.locale ?? "en";
  setMomentLocale(currentLang);
  const updatedAt = moment(data?.updatedAt);
  const relativeLastUpdatedAt = moment(updatedAt).fromNow();

  const handleProductUpdate = async (data: Drink) => {
    await updateSingleDrink.mutateAsync(
      {
        id,
        data,
      },
      {
        onSuccess: () => {
          void utils.drinks.getDrinkById.invalidate({ id });
          void router.back();
          toast({
            title: `Product updated!`,
            description: `${data.title ?? ""} was successfully updated!`,
            status: "success",
            isClosable: true,
            position: "top",
          });
        },
        onError: (error) => {
          toast({
            title: `An error occurred`,
            description: `${error.message}`,
            status: "success",
            isClosable: true,
            position: "top",
          });
        },
      }
    );
  };

  if (status === "loading") {
    return (
      <Container>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Container>
    );
  }

  if (sessionData?.user?.role !== "ADMIN") {
    return <AccessDenied />;
  }

  if (data) {
    return (
      <>
        <Head>
          <title>
            {t("edit_drink")} | {data.title}
          </title>
        </Head>
        <Container>
          <Stack gap="3" mt="5">
            <Heading size="lg" textAlign="center">
              {t("edit_drink")} | {data.title}
            </Heading>
            <Text textAlign="center" opacity={0.5}>
              {t("elements.additional_field.last_edit")} {relativeLastUpdatedAt}
            </Text>
            <ScaleFade initialScale={0.9} in unmountOnExit>
              <EditDrinkForm
                drink={data}
                onSubmit={handleProductUpdate}
                addDescription={addDescription}
                addTypes={addTypes}
              />
            </ScaleFade>
          </Stack>
        </Container>
      </>
    );
  }

  return <p>Loading...</p>;
};

export default EditDrinkPage;

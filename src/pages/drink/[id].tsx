import { type NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { toast } from "react-toastify";
import EditDrinkForm from "../../components/EditDrinkForm";
import Head from "next/head";
import { useSession } from "next-auth/react";
import AccessDenied from "../../components/AccessDenied";
import Spinner from "../../components/Spinner";
import { useGetCategory } from "../../hooks/useGetCategory";
import type { TDrink } from "../../../typings";
import { Container, Heading, ScaleFade, Stack } from "@chakra-ui/react";

const EditDrinkPage: NextPage = () => {
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

  const handleProductUpdate = async (data: TDrink) => {
    await toast.promise(
      updateSingleDrink.mutateAsync(
        {
          id,
          data,
        },
        {
          onSuccess: () => {
            void utils.drinks.getDrinkById.invalidate({ id });
            void router.back();
          },
        }
      ),
      {
        pending: "Pending...",
        success: `Product ${data.title ?? ""} updated`,
        error: "An error occured 🤯",
      }
    );
  };

  if (status === "loading") {
    return <Spinner />;
  }

  if (sessionData?.user?.role !== "admin") {
    return <AccessDenied />;
  }

  if (data) {
    return (
      <>
        <Head>
          <title>Edit page | {data.title}</title>
        </Head>
        <Container>
          <Stack gap="3" mt="5">
            <Heading size="lg" textAlign="center">
              Edit drink {data.title}
            </Heading>
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

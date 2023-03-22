import { type NextPage } from "next";
import Head from "next/head";
import { api } from "../utils/api";
import { DrinkList } from "../components/DrinkList";
import { useState } from "react";
import { NoResults } from "../components/NoResults";
import {
  Container,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  ScaleFade,
  Select,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Skeleton from "../components/Skeleton";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nConfig from "../../next-i18next.config.mjs";
import { useSession } from "next-auth/react";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"], nextI18nConfig, [
      "en",
      "sr",
    ])),
  },
});

const Drinks: NextPage = () => {
  const { data: sessionData } = useSession();

  const drinks = api.drinks.getDrinks.useQuery();

  const [search, setSearch] = useState("");

  const { data, isLoading } = api.categories.getCategories.useQuery();

  const defaultCategory = data?.find((category) => category.isDefault);

  const initialSelectedCategoryId = defaultCategory ? defaultCategory.id : 0;

  const [selectedCategory, setSelectedCategory] = useState(
    initialSelectedCategoryId
  );

  const isAdmin = sessionData?.user?.role === "admin";

  const filteredDrinks = (drinks.data ?? [])
    .filter((drink) =>
      selectedCategory === 0 ? true : drink.categoryId === selectedCategory
    )
    .filter((drink) =>
      search != ""
        ? drink.title?.toLowerCase().includes(search.toLowerCase())
        : true
    )
    .filter((drink) =>
      drink.isHidden && isAdmin ? true : !drink.isHidden ? true : false
    );

  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("all_products_title")}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container as="section" maxW="6xl" mt="5">
        <Heading my="5" textAlign={{ base: "center", md: "left" }}>
          {t("all_products_title")}
        </Heading>
        <Grid templateColumns="repeat(6, 1fr)">
          <GridItem
            colSpan={{ base: 6, md: 3, lg: 2 }}
            as="aside"
            mr={{ base: "0", md: "3" }}
            mb={{ base: "3", md: "0" }}
            shadow="md"
            bg="blackAlpha.50"
            h={{ base: "10rem", md: "calc(100%)" }}
            p={{ base: "3", md: "5" }}
            rounded="md"
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MagnifyingGlassIcon className="h-6 w-6" color="gray.300" />
              </InputLeftElement>
              <Input
                id="search"
                placeholder="Enter drink name..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                variant="filled"
              />
            </InputGroup>

            <Stack mt="4">
              <FormLabel htmlFor="select-category">Select a category</FormLabel>
              <Select
                variant="filled"
                onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
                id="select-category"
              >
                {!defaultCategory ? (
                  <option value={0}>All</option>
                ) : (
                  <option value={defaultCategory.id ?? 0}>
                    {defaultCategory?.categoryName}
                  </option>
                )}
                <option value={0}>All</option>
                {(data || []).map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </Select>
            </Stack>
          </GridItem>

          <GridItem colSpan={{ base: 6, md: 3, lg: 4 }} as="main" mb="5">
            <SimpleGrid spacing="5" minChildWidth="20rem">
              {filteredDrinks.map((drink) => (
                <DrinkList key={drink.id} {...drink} />
              ))}
              {isLoading ? (
                <Skeleton />
              ) : (
                filteredDrinks.length === 0 && (
                  <ScaleFade initialScale={0.8} in unmountOnExit>
                    <NoResults />
                  </ScaleFade>
                )
              )}
            </SimpleGrid>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default Drinks;

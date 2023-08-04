import {
  Checkbox,
  Container,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  ScaleFade,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid';
import type { Category, Drink, Unit } from '@prisma/client';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router.js';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import nextI18nConfig from '../../next-i18next.config.mjs';
import { DrinkList } from '../components/DrinkList';
import { NoResults } from '../components/NoResults';
import SkeletonLoader from '../components/SkeletonLoader';
import { useGetCategory } from '../hooks/useGetCategory';
import { api } from '../utils/api';

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18nConfig, ['en', 'sr'])),
  },
});

export type DrinkWithCategory = Drink & {
  category: Category;
  unit: Unit;
};

const Drinks: NextPage = () => {
  const { data: sessionData } = useSession();

  const drinks = api.drinks.getDrinks.useQuery();

  const [search, setSearch] = useState('');

  const [showHiddenProducts, setShowHiddenProducts] = useState(true);

  const router = useRouter();

  const redirectedCategoryId = Number(router.query.category);

  const { data, isLoading } = api.categories.getCategories.useQuery();

  const defaultCategory = data?.find(category => category.isDefault);

  const initialSelectedCategoryId = redirectedCategoryId
    ? redirectedCategoryId
    : defaultCategory
    ? defaultCategory.id
    : 0;

  const [selectedCategory, setSelectedCategory] = useState(initialSelectedCategoryId);

  const { category: current } = useGetCategory(selectedCategory);

  const isAdmin = sessionData?.user?.role === 'ADMIN';

  const bg = useColorModeValue('mantle.100', 'mantle.200');

  const filteredDrinks = (drinks.data ?? [])
    .filter(drink => (selectedCategory === 0 ? true : drink.categoryId === selectedCategory))
    .filter(drink => (search != '' ? drink.title?.toLowerCase().includes(search.toLowerCase()) : true))
    .filter(drink => (drink.isHidden && isAdmin ? true : !drink.isHidden ? true : false))
    .filter(drink => (drink.isHidden && isAdmin && showHiddenProducts ? true : !drink.isHidden ? true : false));

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSelectedCategory(0);
  };

  const { t } = useTranslation('common');

  useEffect(() => {
    setSelectedCategory(initialSelectedCategoryId);
  }, [initialSelectedCategoryId]);

  return (
    <>
      <Head>
        <title>{t('all_products_title')}</title>
        <meta name="description" content="List of all products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container as="section" maxW="6xl" mt="5" mb="4">
        <Grid templateColumns="repeat(6, 1fr)">
          <GridItem
            colSpan={{ base: 6, md: 3, lg: 2 }}
            as="aside"
            mr={{ base: '0', md: '3' }}
            mb={{ base: '10', md: '0' }}
            p={{ base: '3', md: '5' }}
            rounded="md"
            shadow="xs"
          >
            <Text fontWeight="medium" my="2" pl="2">
              Currently viewing{' '}
              <Text as="span" fontWeight="semibold">
                {current?.categoryName ?? 'All'}
              </Text>
            </Text>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MagnifyingGlassCircleIcon className="h-6 w-6" color="gray.300" />
              </InputLeftElement>
              <Input
                id="search"
                placeholder="Start typing to search..."
                onChange={handleSearchChange}
                value={search}
                variant="flushed"
              />
            </InputGroup>

            <Stack mt="4">
              <FormLabel htmlFor="select-category" pl="2">
                Categories
              </FormLabel>
              <Select
                variant="filled"
                onChange={e => setSelectedCategory(parseInt(e.target.value))}
                id="select-category"
                value={selectedCategory}
              >
                {defaultCategory && <option value={defaultCategory.id}>{defaultCategory.categoryName}</option>}
                <option value={0}>All</option>
                {(data || []).map(category => {
                  if (defaultCategory && category.id === defaultCategory.id) {
                    return null;
                  }
                  return (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  );
                })}
              </Select>
            </Stack>
            {isAdmin && (
              <HStack mt="4">
                <Checkbox onChange={() => setShowHiddenProducts(!showHiddenProducts)} defaultChecked>
                  View hidden products (admin view)
                </Checkbox>
              </HStack>
            )}
          </GridItem>

          <GridItem colSpan={{ base: 6, md: 3, lg: 4 }} as="main" mb={{ base: '6rem', md: 0 }}>
            <SimpleGrid spacing="5" minChildWidth="20rem">
              {isLoading ? (
                <SkeletonLoader height="10rem" />
              ) : filteredDrinks.length === 0 ? (
                <ScaleFade initialScale={0.8} in unmountOnExit>
                  <NoResults />
                </ScaleFade>
              ) : (
                filteredDrinks.map(drink => <DrinkList key={drink.id} {...drink} />)
              )}
            </SimpleGrid>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default Drinks;

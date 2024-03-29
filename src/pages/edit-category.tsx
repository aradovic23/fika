import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  Select,
  Stack,
  Switch,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import type { Category } from '@prisma/client';
import { type NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import nextI18nConfig from '../../next-i18next.config.mjs';
import AccessDenied from '../components/AccessDenied';
import { Form } from '../components/Form';
import ImageSearch from '../components/ImageSearch';
import { PageSpinner } from '../components/LoaderSpinner';
import { useGetCategory } from '../hooks/useGetCategory';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { api } from '../utils/api';

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18nConfig, ['en', 'sr'])),
  },
});

const EditCategory: NextPage = () => {
  const { t } = useTranslation();
  const { data: categories, isLoading } = api.categories.getCategories.useQuery();
  const [categoryId, setCategoryId] = useState(0);
  const [imageFromSearch, setImageFromSearch] = useState('');
  const { category: productCategory } = useGetCategory(categoryId);
  const updateCategory = api.categories.updateCategory.useMutation();
  const deleteSingleCategory = api.categories.deleteCategory.useMutation();

  const isAdmin = useIsAdmin();

  const hasSearchedImage = imageFromSearch !== '';

  const defaultCategories = categories?.filter(category => category.isDefault);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Category>({
    defaultValues: productCategory,
  });

  const utils = api.useContext();
  const toast = useToast();

  useEffect(() => {
    reset(productCategory);
  }, [productCategory, reset]);

  const handleCategoryUpdate = async (category: Category) => {
    try {
      await updateCategory.mutateAsync(
        {
          id: categoryId,
          data: {
            categoryName: category.categoryName,
            url: hasSearchedImage ? imageFromSearch : category.url,
            addDescription: category.addDescription,
            addTypes: category.addTypes,
            isDefault: category.isDefault,
          },
        },
        {
          onSuccess: () => {
            void utils.categories.getCategories.invalidate();
            void utils.drinks.getAllDrinks.invalidate();
            toast({
              title: `Category updated`,
              description: `${category.categoryName ?? ''} was successfully updated!`,
              status: 'success',
              isClosable: true,
              position: 'top',
            });
          },
        }
      );
      setImageFromSearch('');
    } catch (error) {
      if (typeof error === 'string') {
        console.log(error);
      } else {
        console.log((error as Error).message);
      }
    }
  };

  const deleteCategoryHandler = async (id: number) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteSingleCategory.mutateAsync({ id });
        toast({
          title: `Deleted category #${id}`,
          status: 'success',
          isClosable: true,
          position: 'top',
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSelectedImage = (image: string) => {
    setImageFromSearch(image);
  };

  if (isLoading) {
    return <PageSpinner />;
  }

  if (!isAdmin) {
    return <AccessDenied />;
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(parseInt(e.target.value));
  };

  return (
    <>
      <Head>
        <title>{t('edit_category')} | Fika </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container as="main" maxW="4xl">
        <Heading mt="3" textAlign="center">
          {t('edit_category')}
        </Heading>
        <Grid templateColumns="repeat(6, 1fr)" gap="5">
          <GridItem colSpan={{ base: 6, md: 3 }} as="aside" mr={{ base: '0', md: '3' }} mb={{ base: '3', md: '0' }}>
            <VStack spacing="5" mt="10">
              <Stack w="full">
                <FormLabel htmlFor="select-category">{t('elements.placeholder.category')}</FormLabel>
                <Select variant="filled" onChange={handleCategoryChange} id="select-category">
                  <option value={0}>{t('elements.placeholder.category')}</option>
                  {(categories || []).map(category => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </Select>
              </Stack>

              {!productCategory ||
                (categoryId !== 0 && (
                  <>
                    <Form onSubmit={handleSubmit(handleCategoryUpdate)}>
                      <FormControl isInvalid={!!errors.categoryName}>
                        <FormLabel htmlFor="categoryName">{t('elements.label.title')}</FormLabel>
                        <Input
                          id="categoryName"
                          placeholder={t('elements.placeholder.category_title') ?? 'Name'}
                          {...register('categoryName', {
                            required: true,
                            minLength: {
                              value: 3,
                              message: 'Product should have minimum 3 letters',
                            },
                          })}
                        />
                        <FormErrorMessage>{errors.categoryName && errors.categoryName.message}</FormErrorMessage>
                      </FormControl>
                      <FormControl w="full">
                        <FormLabel htmlFor="url">{t('elements.label.image')}</FormLabel>
                        <ImageSearch handleSelectedImage={handleSelectedImage} />
                        <Input id="url" placeholder="Image url" {...register('url')} hidden />
                      </FormControl>
                      <Flex>
                        <FormControl>
                          <FormLabel htmlFor="addDescription">
                            {t('elements.additional_field.allow_description')}
                          </FormLabel>
                          <Controller
                            control={control}
                            name="addDescription"
                            key="addDescription"
                            defaultValue={false}
                            render={({ field: { onChange, value, ref } }) => (
                              <Switch onChange={onChange} ref={ref} isChecked={value} size="lg" />
                            )}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel htmlFor="addTypes">{t('elements.additional_field.allow_type')}</FormLabel>
                          <Controller
                            control={control}
                            name="addTypes"
                            key="addTypes"
                            defaultValue={false}
                            render={({ field: { onChange, value, ref } }) => (
                              <Switch onChange={onChange} ref={ref} isChecked={value} size="lg" />
                            )}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel htmlFor="isDefault">Make this category default?</FormLabel>
                          <Controller
                            control={control}
                            name="isDefault"
                            key="isDefault"
                            defaultValue={false}
                            render={({ field: { onChange, value, ref } }) => (
                              <Switch onChange={onChange} ref={ref} isChecked={value} size="lg" />
                            )}
                          />
                        </FormControl>
                      </Flex>

                      {defaultCategories && defaultCategories?.length > 1 && (
                        <Alert status="warning" rounded="md">
                          <AlertIcon />
                          <AlertTitle>Default categories</AlertTitle>
                          <AlertDescription>
                            You have multiple default categories:&nbsp;
                            {defaultCategories?.map((cat, index) => [
                              index > 0 && ', ',
                              <Text display="inline" key={cat.id}>
                                {cat.categoryName}
                              </Text>,
                              index === defaultCategories.length - 1 && '.',
                            ])}
                          </AlertDescription>
                        </Alert>
                      )}

                      {defaultCategories && defaultCategories.length === 1 && (
                        <Alert status="info" rounded="md">
                          <AlertIcon />
                          <AlertTitle>Default category</AlertTitle>
                          <AlertDescription>
                            Current default category is&nbsp;
                            {defaultCategories?.map(cat => (
                              <Text display="inline" key={cat.id}>
                                {cat.categoryName}
                              </Text>
                            ))}
                          </AlertDescription>
                        </Alert>
                      )}

                      <Button isLoading={isSubmitting} type="submit" colorScheme="primary">
                        {t('elements.button.save')}
                      </Button>
                    </Form>
                    <HStack p="5" rounded="lg" border="1px solid" borderColor="offRed.500">
                      <Text color="offRed.500">{t('elements.additional_field.delete_category')}</Text>
                      <Button
                        onClick={() => deleteCategoryHandler(categoryId)}
                        disabled={updateCategory.isLoading || !productCategory}
                        colorScheme="red"
                        size="md"
                        variant="ghost"
                      >
                        {t('elements.button.delete')}
                      </Button>
                    </HStack>
                  </>
                ))}
            </VStack>
          </GridItem>
          <GridItem colSpan={{ base: 6, md: 3 }} as="main" mt={{ base: '5', md: '1' }} mb={{ base: '100', md: '0' }}>
            {/* Image */}
            <VStack mt="10">
              {!productCategory?.url ||
                (categoryId !== 0 && (
                  <>
                    <Text zIndex={1} fontWeight="bold">
                      {t('elements.label.image')}
                    </Text>
                    <Box position="relative">
                      <Image
                        alt="category"
                        src={hasSearchedImage ? imageFromSearch : productCategory?.url}
                        objectFit="cover"
                        rounded="lg"
                        boxSize="sm"
                        position="absolute"
                        inset={0}
                        filter="blur(15px)"
                        zIndex={0}
                        transform="scale(1)"
                      />
                      <Image
                        src={hasSearchedImage ? imageFromSearch : productCategory?.url}
                        alt="category"
                        zIndex={1}
                        boxSize="sm"
                        rounded="lg"
                        position="relative"
                        objectFit="cover"
                      />
                    </Box>
                  </>
                ))}
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default EditCategory;

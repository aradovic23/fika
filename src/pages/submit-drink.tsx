import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Select,
  Switch,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import type { Drink } from '@prisma/client';
import { type NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import nextI18nConfig from '../../next-i18next.config.mjs';
import AccessDenied from '../components/AccessDenied';
import CreateNewCategory from '../components/CreateNewCategory';
import CreateVolumeOption from '../components/CreateVolumeOption';
import { Form } from '../components/Form';
import ImageSearch from '../components/ImageSearch';
import { useGetCategory } from '../hooks/useGetCategory';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { api } from '../utils/api';
import { PlusCircle } from 'lucide-react';

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18nConfig, ['en', 'sr'])),
  },
});

const SubmitDrink: NextPage = () => {
  const createDrinkMutation = api.drinks.createDrink.useMutation();
  const categories = api.categories.getCategories.useQuery();

  const [isTagChecked, setIsTagChecked] = useState(false);
  const [isVolumeChecked, setIsVolumeCheked] = useState(false);
  const [addImage, setAddImage] = useState(false);
  const [productImage, setProductImage] = useState('');
  const [blurHash, setBlurHash] = useState('');
  const [isCreateNewCategoryChecked, setIsCreateNewCategoryChecked] = useState(false);
  const [createNewUnit, setCreateNewUnit] = useState(false);
  const toast = useToast();

  const { t } = useTranslation('common');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<Drink>();

  const watchCategoryId = watch('categoryId');
  const { category: currentCategory } = useGetCategory(Number(watchCategoryId));
  const { data: unitOptions } = api.volume.getVolumeOptions.useQuery();

  const addDescription = currentCategory?.addDescription;
  const addTypes = currentCategory?.addTypes;

  const isAdmin = useIsAdmin();

  if (!isAdmin) {
    return <AccessDenied />;
  }

  const handleSubmitDrink = async (data: Drink) => {
    try {
      await createDrinkMutation.mutateAsync({
        title: data.title,
        price: data.price,
        tag: data.tag,
        volume: data.volume,
        type: data.type,
        description: data.description,
        categoryId: Number(data.categoryId),
        image: productImage,
        blurHash: blurHash,
        unitId: data.unitId != '0' ? data.unitId : null,
      });
      toast({
        title: `${data.title ?? 'Product'} created!`,
        status: 'success',
        isClosable: true,
        position: 'top',
      });
      reset();
      setProductImage('');
      setBlurHash('');
      setAddImage(false);
      setIsTagChecked(false);
      setIsVolumeCheked(false);
    } catch (error) {
      if (typeof error === 'string') {
        console.log(error);
      } else {
        console.log((error as Error).message);
      }
    }
  };

  const handleIsActive = (state: boolean) => {
    setIsCreateNewCategoryChecked(state);
  };

  const handleNewUnit = (state: boolean) => {
    setCreateNewUnit(state);
  };

  const handleSelectedImage = (image: string, hash: string) => {
    setProductImage(image);
    setBlurHash(hash);
    console.log(hash, 'hash');
  };

  return (
    <>
      <Head>
        <title>{t('create_new_product')}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container as="main" bg="whiteAlpha.500" p="5" rounded="lg" maxW="3xl">
        <Heading my="10" textAlign="center" size="lg">
          {t('create_new_product')}
        </Heading>

        <Form onSubmit={handleSubmit(handleSubmitDrink)}>
          <HStack gap="1">
            <Box flex="1">
              <Select
                {...register('categoryId', {
                  required: true,
                  validate: {
                    notZero: v => Number(v) > 0,
                  },
                })}
              >
                <option value={0}>{t('elements.placeholder.category')}</option>
                {(categories.data || []).map(category => (
                  <option value={category.id} key={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </Select>
            </Box>

            <Button
              rightIcon={<PlusCircle size={16} />}
              onClick={() => setIsCreateNewCategoryChecked(!isCreateNewCategoryChecked)}
            >
              {t('elements.button.create_new')}
            </Button>
          </HStack>

          {isCreateNewCategoryChecked && <CreateNewCategory handleIsActive={handleIsActive} />}

          <FormControl>
            <FormLabel>{t('elements.label.title')}</FormLabel>
            <Input
              placeholder={t('elements.placeholder.title') ?? 'Title'}
              {...register('title', {
                required: true,
                minLength: {
                  value: 3,
                  message: 'Product should have minimum 3 letters',
                },
              })}
            />
          </FormControl>

          <FormControl>
            <FormLabel>{t('elements.label.price')}</FormLabel>
            <Input
              id="price"
              placeholder={t('elements.placeholder.price') ?? 'Price'}
              inputMode="numeric"
              {...register('price', {
                required: 'Req and must be a number',
                minLength: 2,
                pattern: /^[0-9]*$/,
              })}
            />
          </FormControl>
          <Divider />
          <VStack w="full">
            <VStack rounded="lg" p="3" w="full" bg="whiteAlpha.500">
              <Flex w="full" justify="space-between" align="center">
                <FormLabel>{t('elements.additional_field.add_volume')}</FormLabel>
                <Switch isChecked={isVolumeChecked} onChange={() => setIsVolumeCheked(!isVolumeChecked)} size="lg" />
              </Flex>
              {isVolumeChecked && (
                <HStack w="full" gap="1">
                  <Box flex="1">
                    <Select
                      {...register('unitId', {
                        validate: {
                          notZero: v => Number(v) != 0,
                        },
                      })}
                    >
                      <option value={0}>Select volume</option>
                      {unitOptions?.map(unit => (
                        <option value={unit.id} key={unit.id}>
                          {unit.amount}
                        </option>
                      ))}
                    </Select>
                  </Box>
                  <Button rightIcon={<PlusCircle size={16} />} onClick={() => setCreateNewUnit(!createNewUnit)}>
                    Create new
                  </Button>
                </HStack>
              )}
              {createNewUnit && <CreateVolumeOption handleNewUnit={handleNewUnit} />}
            </VStack>

            <VStack rounded="lg" p="3" w="full" bg="whiteAlpha.500">
              <Flex w="full" justify="space-between" align="center">
                <FormLabel>{t('elements.additional_field.add_tag')}</FormLabel>
                <Switch isChecked={isTagChecked} onChange={() => setIsTagChecked(!isTagChecked)} size="lg" />
              </Flex>
              {isTagChecked && (
                <Input
                  placeholder={t('elements.placeholder.tag') ?? 'Tag'}
                  {...register('tag')}
                  colorScheme="blackAlpha"
                />
              )}
            </VStack>
            {addDescription && (
              <>
                <VStack rounded="lg" p="3" w="full" bg="whiteAlpha.500">
                  <Flex w="full" justify="space-between" align="center">
                    <FormLabel>{t('elements.additional_field.add_image')}</FormLabel>
                    <Switch onChange={() => setAddImage(!addImage)} size="lg" />
                  </Flex>
                  {addImage && <ImageSearch handleSelectedImage={handleSelectedImage} />}
                  {productImage && (
                    <VStack>
                      <Text>{t('elements.label.image')}</Text>
                      <Image alt="product-image" boxSize="md" objectFit="cover" src={productImage} rounded="md" />
                    </VStack>
                  )}
                </VStack>
                <FormControl p="3">
                  <FormLabel>{t('elements.label.description')}</FormLabel>
                  <Textarea placeholder="Description" {...register('description')} />
                </FormControl>
              </>
            )}
            {addTypes && (
              <FormControl p="3">
                <FormLabel>Type</FormLabel>
                <Input placeholder="Add custom types, such as 'Green, Black'" {...register('type')} />
              </FormControl>
            )}
          </VStack>

          <Button type="submit" colorScheme="primary" isLoading={isSubmitting}>
            {t('elements.button.submit')}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default SubmitDrink;

import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Switch,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import type { Category } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { api } from '../utils/api';
import ImageSearch from './ImageSearch';

interface Props {
  handleIsActive: (state: boolean) => void;
}

const CreateNewCategory = ({ handleIsActive }: Props) => {
  const { t } = useTranslation();
  const createCategoryMutation = api.categories.createCategory.useMutation();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Category>();
  const utils = api.useContext();
  const toast = useToast();
  const [imageFromSearch, setImageFromSearch] = useState('');

  const handleCreateNewCategory = async (data: Category) => {
    try {
      await createCategoryMutation.mutateAsync({
        categoryName: data.categoryName ?? '',
        url: imageFromSearch ?? data.url,
        addTypes: data.addTypes,
        addDescription: data.addDescription,
        isDefault: data.isDefault,
      });
      toast({
        title: `Created ${data.categoryName ?? ''}`,
        status: 'success',
        isClosable: true,
        position: 'top',
      });
      setImageFromSearch('');
      handleIsActive(false);
      await utils.categories.getCategories.invalidate();
    } catch (error) {
      if (typeof error === 'string') {
        toast({
          title: `${error}`,
          status: 'error',
          isClosable: true,
          position: 'top',
        });
      } else {
        toast({
          title: `${(error as Error).message}`,
          status: 'error',
          isClosable: true,
          position: 'top',
        });
      }
    }
  };

  const handleSelectedImage = (image: string) => {
    setImageFromSearch(image);
  };

  return (
    <VStack spacing="5" w="full" bg="whiteAlpha.900" p="5" rounded="md" shadow="sm">
      <Heading size="md">{t('create_new_category')}</Heading>
      <FormControl>
        <Input
          placeholder={t('elements.placeholder.category_title') ?? 'Category Name'}
          {...register('categoryName', {
            required: true,
            minLength: {
              value: 3,
              message: 'Category should have at least 3 letters',
            },
          })}
        />
      </FormControl>

      <ImageSearch handleSelectedImage={handleSelectedImage} />

      <Input hidden placeholder="Image url" {...register('url')} />
      <Divider />
      <VStack spacing="5" w="full">
        <Text>Additional Category Options</Text>
        <HStack w="full" justify="space-between">
          <FormLabel htmlFor="addTypes">{t('elements.additional_field.allow_type')}</FormLabel>
          <Switch id="addTypes" {...register('addTypes')} size="lg" />
        </HStack>
        <HStack w="full" justify="space-between">
          <FormLabel htmlFor="addDescription">{t('elements.additional_field.allow_description')}</FormLabel>
          <Switch id="addDescription" {...register('addDescription')} size="lg" />
        </HStack>
      </VStack>
      <Switch id="isDefault" {...register('isDefault')} hidden />

      {imageFromSearch && <Image boxSize="sm" alt="image" src={imageFromSearch} rounded="lg" objectFit="cover" />}

      <Button
        variant="outline"
        onClick={handleSubmit(handleCreateNewCategory)}
        colorScheme="primary"
        isLoading={isSubmitting}
        w="full"
      >
        {t('elements.button.submit_category')}
      </Button>
    </VStack>
  );
};

export default CreateNewCategory;

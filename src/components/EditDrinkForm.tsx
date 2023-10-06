import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  HStack,
  Image,
  Input,
  Select,
  SimpleGrid,
  Switch,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import type { Picture, Drink, Unit } from '@prisma/client';
import type { FC } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { api } from '../utils/api';
import { Form } from './Form';
import ImageSearch from './ImageSearch';
import UploadImageButton from './UploadImageButton';

interface EditFormProps {
  drink: Drink & { picture: Picture[] };
  onSubmit: (data: Drink) => void;
  addDescription: boolean;
  addTypes: boolean;
  units?: Unit[];
}

const EditDrinkForm: FC<EditFormProps> = ({ drink, onSubmit, addDescription, addTypes, units }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: drink,
  });
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState('');
  const utils = api.useContext();
  const toast = useToast();

  const handleSelectedImage = (image: string) => {
    setSelectedImage(image);
    setValue('image', image);
  };

  const updateSingleDrink = api.drinks.removeProductImage.useMutation();

  const removeProductImage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete the image?')) {
      return;
    }
    await updateSingleDrink.mutateAsync(
      {
        id,
        data: {
          image: null,
        },
      },
      {
        onSuccess: () => {
          void utils.drinks.getDrinkById.invalidate({ id });
          toast({
            title: `Image removed!`,
            description: `Product image was successfully updated!`,
            status: 'success',
            isClosable: true,
            position: 'top',
          });
        },
        onError: error => {
          toast({
            title: `An error occurred`,
            description: `${error.message}`,
            status: 'success',
            isClosable: true,
            position: 'top',
          });
        },
      },
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="title">{t('elements.label.title')}</FormLabel>
        <Input placeholder="Type here" id="title" {...register('title')} />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="price">{t('elements.label.price')}</FormLabel>
        <Input placeholder="Type here" id="title" {...register('price')} inputMode="numeric" />
      </FormControl>

      <Select {...register('unitId')} placeholder={!drink.unitId ? 'Select a volume' : undefined}>
        {units?.map(unit => (
          <option value={unit.id} key={unit.id}>
            {unit.amount}
          </option>
        ))}
      </Select>

      <Flex bg="blackAlpha.100" p={3} rounded="md" justifyContent="space-between">
        <FormLabel>{t('elements.additional_field.hide_product')}</FormLabel>
        <Switch {...register('isHidden')} size="lg" colorScheme="green" />
      </Flex>
      <Flex bg="blackAlpha.100" p={3} rounded="md" justifyContent="space-between">
        <FormLabel>Set this product to recommended</FormLabel>
        <Switch {...register('isRecommended')} size="lg" colorScheme="green" />
      </Flex>

      {addTypes && (
        <FormControl>
          <FormLabel htmlFor="type">{t('elements.label.type')}</FormLabel>
          <Input placeholder="Type here" id="type" {...register('type')} />
        </FormControl>
      )}
      {addDescription && (
        <VStack>
          <FormControl>
            <FormLabel htmlFor="description">{t('elements.label.description')}</FormLabel>
            <Textarea placeholder="Description here" id="description" {...register('description')} />
          </FormControl>
          <FormControl>
            <FormLabel>{t('elements.label.image')}</FormLabel>
            <ImageSearch handleSelectedImage={handleSelectedImage} />
            <Input {...register('image')} hidden />
          </FormControl>
        </VStack>
      )}
      {(selectedImage || drink.image) && (
        <VStack>
          <Image
            src={selectedImage ? selectedImage : drink.image ?? ''}
            alt="bla"
            boxSize="md"
            objectFit="cover"
            rounded="md"
          />
          <Button colorScheme="red" variant="ghost" onClick={() => removeProductImage(drink.id)} size="sm">
            Remove photo
          </Button>
        </VStack>
      )}

      <UploadImageButton productId={drink.id} />

      <SimpleGrid columns={2} spacing={5}>
        {drink.picture.map(img => (
          <GridItem key={img.id}>
            <HStack
              align="center"
              justify="center"
              overflow="hidden"
              bg="gray.200"
              shadow="md"
              h="full"
              p="2"
              rounded="md"
              maxW="lg"
            >
              <Image height={100} w={100} alt="no" src={img.url} rounded="md" />
              <Flex overflow="hidden" maxW="lg" align="flex-start" px={3} py={2}>
                <Text isTruncated fontSize="sm" h="full">
                  {img.name}
                </Text>
              </Flex>
            </HStack>
          </GridItem>
        ))}
      </SimpleGrid>

      <Button colorScheme="primary" type="submit" mb="10" isLoading={isSubmitting}>
        {t('elements.button.save')}
      </Button>
    </Form>
  );
};

export default EditDrinkForm;

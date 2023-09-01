import { Button, Input, useToast, FormLabel, FormControl, Box, VStack, Image, Text } from '@chakra-ui/react';
import type { Store } from '@prisma/client';
import { UploadButton } from '@uploadthing/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { OurFileRouter } from '../server/uploadthing';
import { api } from '../utils/api';
import { Form } from './Form';

interface File {
  fileKey: string;
  fileUrl: string;
}

const CreateStoreForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Store>();

  const createStore = api.settings.createStore.useMutation();

  const [file, setFile] = useState<File | null>();

  const utils = api.useContext();

  const toast = useToast();

  const { t } = useTranslation('common');

  const handleCreateNewStore = async (data: Store) => {
    try {
      await createStore.mutateAsync({
        name: data.name,
        fileKey: file?.fileKey,
        fileUrl: file?.fileUrl,
      });
      toast({
        title: `Created store`,
        status: 'success',
        isClosable: true,
        position: 'top',
      });
      reset();
      await utils.settings.getStore.invalidate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleCreateNewStore)}>
      <FormControl>
        <FormLabel>{t('settings.name')}</FormLabel>
        <Input {...register('name')} placeholder={t('settings.name') ?? 'Enter store name'} />
      </FormControl>
      {!file && (
        <FormControl>
          <FormLabel>{t('settings.upload_logo')}</FormLabel>
          <Box border="1px" borderColor="chakra-placeholder-color" rounded="lg" p="5">
            <UploadButton<OurFileRouter>
              endpoint="imageUploader"
              onClientUploadComplete={res => {
                if (Array.isArray(res) && res.length > 0) {
                  setFile(res[0]);
                }
              }}
            />
          </Box>
        </FormControl>
      )}
      {file && (
        <VStack bg="green.300" p="1" rounded="lg">
          <Image alt="logo" src={file.fileUrl} boxSize="200px" rounded="lg" objectFit="cover" />
          <Text color="black">{t('settings.image_ready')}</Text>
        </VStack>
      )}
      <Button isLoading={isSubmitting} type="submit" colorScheme="primary">
        {t('settings.create_store')}
      </Button>
    </Form>
  );
};

export default CreateStoreForm;

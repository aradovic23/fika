import { Box, Button, FormControl, FormLabel, HStack, Image, Input, Text, useToast, VStack } from '@chakra-ui/react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import type { Store } from '@prisma/client';
import { UploadButton } from '@uploadthing/react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { OurFileRouter } from '../server/uploadthing';
import { api } from '../utils/api';
import { Form } from './Form';

interface File {
  fileKey: string;
  fileUrl: string;
}

const EditStoreForm: FC<Store> = store => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues: store });

  const updateStore = api.settings.updateStore.useMutation();

  const utils = api.useContext();

  const toast = useToast();

  const [file, setFile] = useState<File | null>();

  useEffect(() => {
    reset(store);
  }, [store, reset]);

  const handleStoreUpdate = async (store: Store) => {
    try {
      await updateStore.mutateAsync({
        id: store.id ?? 0,
        data: {
          name: store.name,
          fileKey: file?.fileKey,
          fileUrl: file?.fileUrl,
        },
      });
      await utils.settings.getStore.invalidate();
      setFile(null);
      toast({
        title: `Update successful`,
        description: `${store.name ?? ''} was successfully updated!`,
        status: 'success',
        isClosable: true,
        position: 'top',
      });
    } catch (err) {
      console.warn(err);
    }
  };

  const { t } = useTranslation('common');

  return (
    <Form onSubmit={handleSubmit(handleStoreUpdate)}>
      <FormControl>
        <FormLabel htmlFor="name">{t('settings.name')}</FormLabel>
        <Input placeholder="name" id="name" {...register('name')} />
      </FormControl>
      {!file && (
        <FormControl>
          <FormLabel>{t('settings.upload_logo')}</FormLabel>
          <Box p="5" border="1px" borderColor="chakra-placeholder-color" rounded="lg">
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
        <VStack bg="green.300" p="10" rounded="lg" gap="5">
          <Image alt="logo" src={file.fileUrl} rounded="lg" />
          <HStack>
            <Text color="green.900" fontWeight="bold">
              {t('settings.image_ready')}
            </Text>
            <CheckBadgeIcon className="h-6 w-6 text-green-900" />
          </HStack>
        </VStack>
      )}

      <Button colorScheme="primary" type="submit" mb="4" isLoading={isSubmitting}>
        {t('settings.update')}
      </Button>
    </Form>
  );
};

export default EditStoreForm;

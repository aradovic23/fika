import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import type { Store } from '@prisma/client';
import { UploadButton } from '@uploadthing/react';
import Image from 'next/image';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { OurFileRouter } from '../server/uploadthing';
import { api } from '../utils/api';
import { Form } from './Form';
import { BadgeCheck, Edit2 } from 'lucide-react';

interface File {
  fileKey: string;
  fileUrl: string;
}

const EditStoreForm: FC<Store> = store => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, dirtyFields },
  } = useForm({ defaultValues: store });

  const { mutateAsync: updateStore, isLoading } = api.settings.updateStore.useMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const utils = api.useContext();

  const toast = useToast();

  const [file, setFile] = useState<File | null>();

  useEffect(() => {
    reset(store);
  }, [store, reset]);

  const handleStoreUpdate = async (store: Store) => {
    try {
      await updateStore({
        id: store.id ?? 0,
        data: {
          name: store.name,
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

  const handleImageUpdate = async () => {
    await updateStore({
      id: store.id ?? 0,
      data: {
        fileKey: file?.fileKey,
        fileUrl: file?.fileUrl,
      },
    });
    await utils.settings.getStore.invalidate();
    setFile(null);
    toast({
      title: `Image updated successfully`,
      description: `Image was successfully updated!`,
      status: 'success',
      isClosable: true,
      position: 'top',
    });
    onClose();
  };

  const { t } = useTranslation('common');

  return (
    <Stack direction={['column', 'column', 'row', 'row']} spacing={20}>
      <HStack flex={1}>
        <Form onSubmit={handleSubmit(handleStoreUpdate)}>
          <FormControl>
            <FormLabel htmlFor="name">{t('settings.name')}</FormLabel>
            <Input placeholder="name" id="name" {...register('name')} />
          </FormControl>
          <Button colorScheme="primary" type="submit" mb="4" isLoading={isSubmitting} isDisabled={!dirtyFields.name}>
            {t('settings.update')}
          </Button>
        </Form>
      </HStack>

      <Box
        boxSize="250px"
        p="5"
        border="1px solid"
        borderColor="primary.200"
        borderRadius="full"
        justifyContent="center"
        alignItems="center"
        display="flex"
        pos="relative"
        shadow="lg"
      >
        <Image width={500} height={500} src={store.fileUrl ?? ''} alt="image" />
        <Button
          aria-label="upload-image"
          pos="absolute"
          bottom={10}
          right={0}
          variant="solid"
          colorScheme="primary"
          onClick={onOpen}
          leftIcon={<Edit2 />}
        >
          Edit
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                <Image alt="logo" src={file.fileUrl} width={500} height={500} />
                <HStack>
                  <Text color="green.900" fontWeight="bold">
                    {t('settings.image_ready')}
                  </Text>
                  <BadgeCheck />
                </HStack>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="primary" onClick={handleImageUpdate} isDisabled={!file} isLoading={isLoading}>
              Update image
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default EditStoreForm;

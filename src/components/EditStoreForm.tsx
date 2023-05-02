import { Button, Divider, FormLabel, Heading, Image, Input, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { Form } from "./Form";
import { api } from "../utils/api";
import { MultiUploader } from "./MultiUploader";

interface Props {
  name?: string;
  logo?: string;
  id?: number;
}

const EditStoreForm: FC<Props> = (store) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues: store });

  const [uploadedImage, setUploadedImage] = useState<string | undefined>('');
  const [isImageUploading, setIsImageUploading] = useState(false);

  const updateStore = api.settings.updateStore.useMutation();

  const utils = api.useContext();

  const toast = useToast();

  useEffect(() => {
    reset(store);
  }, [store, reset]);

  const handleStoreUpdate = async (store: Props) => {
    try {
      await updateStore.mutateAsync({
        id: store.id ?? 0,
        data: {
          name: store.name,
          logo: uploadedImage ? uploadedImage : store.logo,
        },
      });
      await utils.settings.getStore.invalidate();
      setUploadedImage('');
      toast({
        title: `Update successful`,
        description: `${store.name ?? ""} was successfully updated!`,
        status: "success",
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUploadedImage = (image: string | undefined) => {
    setUploadedImage(image);
  }

  const handleImageIsUploading = (state: boolean) => {
    setIsImageUploading(state)
  }

  return (
    <Form onSubmit={handleSubmit(handleStoreUpdate)}>
      <Heading size="md">Edit store info</Heading>
      <FormLabel htmlFor="name">Store name</FormLabel>
      <Input placeholder="name" id="name" {...register("name")} />
      <FormLabel htmlFor="logo">Logo Image</FormLabel>
      <Input placeholder="logo" id="logo" {...register("logo")} />
      <Divider />
      <Text textAlign="center">OR</Text>
      <Divider />
      {uploadedImage ? (
        <>
          <Text opacity={0.5}>Preview of new image</Text>
          <Image alt='test' src={uploadedImage} />
        </>
      ) : <MultiUploader handleUploadedImage={handleUploadedImage} handleLoadingState={handleImageIsUploading} />}

      {isImageUploading && 'uploading...'}

      <Button
        colorScheme="primary"
        type="submit"
        mb="4"
        isLoading={isSubmitting}
        isDisabled={isImageUploading}
      >
        Update
      </Button>
    </Form>
  );
};

export default EditStoreForm;

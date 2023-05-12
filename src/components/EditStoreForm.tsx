import { Button, Divider, FormLabel, Heading, Input, Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { Form } from "./Form";
import { api } from "../utils/api";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "../server/uploadthing";

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
          logo: store.logo,
        },
      });
      await utils.settings.getStore.invalidate();
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


  return (
    <Form onSubmit={handleSubmit(handleStoreUpdate)}>
      <Heading size="md">Edit store info</Heading>
      <FormLabel htmlFor="name">Store name</FormLabel>
      <Input placeholder="name" id="name" {...register("name")} />
      <FormLabel htmlFor="logo">Paste Image URL</FormLabel>
      <Input placeholder="logo" id="logo" {...register("logo")} />
      <Divider />
      <Text textAlign="center">OR</Text>
      <Divider />

      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={() => {
          alert("Upload Completed");
        }}
      />

      <Button
        colorScheme="primary"
        type="submit"
        mb="4"
        isLoading={isSubmitting}
      >
        Update
      </Button>
    </Form>
  );
};

export default EditStoreForm;

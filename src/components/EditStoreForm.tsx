import { Button, FormLabel, Heading, Input, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { Form } from "./Form";
import { api } from "../utils/api";

interface Props {
  name?: string;
  logo?: string;
  id?: number;
}

const EditStoreForm: FC<Props> = (store) => {
  const { register, reset, handleSubmit } = useForm({ defaultValues: store });

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
      <FormLabel htmlFor="logo">Logo Image URL</FormLabel>
      <Input placeholder="logo" id="logo" {...register("logo")} />
      <Button colorScheme="primary" type="submit" mb="4">
        Update
      </Button>
    </Form>
  );
};

export default EditStoreForm;

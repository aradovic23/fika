import { Button, Heading, Input, Text, useToast } from "@chakra-ui/react";
import type { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { api } from "../utils/api";
import { Form } from "./Form";

const CreateStoreForm = () => {
  const { register, handleSubmit, reset } = useForm<Store>();

  const createStore = api.settings.createStore.useMutation();

  const utils = api.useContext();

  const toast = useToast();

  const handleCreateNewStore = async (data: Store) => {
    try {
      await createStore.mutateAsync({
        name: data.name,
        logo: data.logo,
      });
      toast({
        title: `Created store`,
        status: "success",
        isClosable: true,
        position: "top",
      });
      reset();
      await utils.settings.getStore.invalidate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleCreateNewStore)}>
      <Input {...register("name")} placeholder="Enter store name" />
      <Input {...register("logo")} placeholder="Paste logo URL" />
      <Button type="submit"> Save </Button>
    </Form>
  );
};

export default CreateStoreForm;

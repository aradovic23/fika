import { useForm } from "react-hook-form";
import { Form } from "./Form";
import type { FC } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import type { TDrink } from "../../typings";
import type { Drink } from "@prisma/client";

interface EditFormProps {
  drink: Drink;
  onSubmit: (data: TDrink) => void;
  addDescription: boolean;
  addTypes: boolean;
}

const EditDrinkForm: FC<EditFormProps> = ({
  drink,
  onSubmit,
  addDescription,
  addTypes,
}) => {
  const { register, handleSubmit } = useForm({ defaultValues: drink });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input placeholder="Type here" id="title" {...register("title")} />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="price">Price</FormLabel>
        <Input
          placeholder="Type here"
          id="title"
          {...register("price")}
          inputMode="numeric"
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="volume">Volume</FormLabel>
        <Input placeholder="Type here" id="volume" {...register("volume")} />
      </FormControl>

      {addTypes && (
        <FormControl>
          <FormLabel htmlFor="type">Type</FormLabel>
          <Input placeholder="Type here" id="type" {...register("type")} />
        </FormControl>
      )}
      {addDescription && (
        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            placeholder="Description here"
            id="description"
            {...register("description")}
          />
        </FormControl>
      )}

      <Button mt={4} colorScheme="primary" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default EditDrinkForm;

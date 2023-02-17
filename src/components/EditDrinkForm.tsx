import { useForm } from "react-hook-form";
import { Form } from "./Form";
import type { TDrink } from "../pages/drink/[id]";
import type { FC } from "react";
import InputField from "./InputField";
import type { Drink } from "@prisma/client";
import Button from "./Button";

interface EditFormProps {
  drink: Drink;
  onSubmit: (drink: TDrink) => void;
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
      <InputField
        register={register}
        name="title"
        label="Title"
        placeholder="Enter product title"
      />
      <InputField
        register={register}
        name="price"
        label="Price"
        placeholder="Enter product price"
      />
      <InputField
        register={register}
        name="volume"
        label="Volume"
        placeholder="Enter product volume"
      />
      {addTypes && (
        <InputField
          register={register}
          name="type"
          label="Type"
          placeholder="Enter product type"
        />
      )}
      {addDescription && (
        <InputField
          register={register}
          name="description"
          label="Description"
          placeholder="Enter product description"
        />
      )}

      <InputField
        register={register}
        name="tag"
        label="Tag"
        placeholder="Enter product tag..."
      />
      <Button>Update</Button>
    </Form>
  );
};

export default EditDrinkForm;

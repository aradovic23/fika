import { useForm } from "react-hook-form";
import { Form } from "./Form";
import type { FC } from "react";
import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import type { Drink } from "@prisma/client";
import { useTranslation } from "react-i18next";
import ImageSearch from "./ImageSearch";

interface EditFormProps {
  drink: Drink;
  onSubmit: (data: Drink) => void;
  addDescription: boolean;
  addTypes: boolean;
}

const EditDrinkForm: FC<EditFormProps> = ({
  drink,
  onSubmit,
  addDescription,
  addTypes,
}) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: drink,
  });
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState("");

  const handleSelectedImage = (image: string) => {
    setSelectedImage(image);
    setValue("image", image);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="title">{t("elements.label.title")}</FormLabel>
        <Input placeholder="Type here" id="title" {...register("title")} />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="price">{t("elements.label.price")}</FormLabel>
        <Input
          placeholder="Type here"
          id="title"
          {...register("price")}
          inputMode="numeric"
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="volume">{t("elements.label.volume")}</FormLabel>
        <Input placeholder="Type here" id="volume" {...register("volume")} />
      </FormControl>

      {addTypes && (
        <FormControl>
          <FormLabel htmlFor="type">{t("elements.label.type")}</FormLabel>
          <Input placeholder="Type here" id="type" {...register("type")} />
        </FormControl>
      )}
      {addDescription && (
        <VStack>
          <FormControl>
            <FormLabel htmlFor="description">
              {t("elements.label.description")}
            </FormLabel>
            <Textarea
              placeholder="Description here"
              id="description"
              {...register("description")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>{t("elements.label.image")}</FormLabel>
            <ImageSearch handleSelectedImage={handleSelectedImage} />
            <Input {...register("image")} hidden />
          </FormControl>
          <Image
            src={selectedImage ? selectedImage : drink.image ?? ""}
            alt="bla"
            boxSize="md"
            objectFit="cover"
            rounded="md"
          />
        </VStack>
      )}

      <Button colorScheme="primary" type="submit">
        {t("elements.button.save")}
      </Button>
    </Form>
  );
};

export default EditDrinkForm;

import { useForm } from "react-hook-form";
import { Form } from "./Form";
import type { FC } from "react";
import { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Switch,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import type { Drink } from "@prisma/client";
import { useTranslation } from "react-i18next";
import ImageSearch from "./ImageSearch";
import { api } from "../utils/api";

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
  const utils = api.useContext();
  const toast = useToast();

  const handleSelectedImage = (image: string) => {
    setSelectedImage(image);
    setValue("image", image);
  };

  const updateSingleDrink = api.drinks.removeProductImage.useMutation();

  const removeProductImage = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }
    await updateSingleDrink.mutateAsync(
      {
        id,
        data: {
          image: null,
        },
      },
      {
        onSuccess: () => {
          void utils.drinks.getDrinkById.invalidate({ id });
          toast({
            title: `Image removed!`,
            description: `Product image was successfully updated!`,
            status: "success",
            isClosable: true,
            position: "top",
          });
        },
        onError: (error) => {
          toast({
            title: `An error occurred`,
            description: `${error.message}`,
            status: "success",
            isClosable: true,
            position: "top",
          });
        },
      }
    );
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

      <Flex
        bg="blackAlpha.100"
        p={3}
        rounded="md"
        justifyContent="space-between"
      >
        <FormLabel>{t("elements.additional_field.hide_product")}</FormLabel>
        <Switch {...register("isHidden")} size="lg" colorScheme="green" />
      </Flex>

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
        </VStack>
      )}
      {(selectedImage || drink.image) && (
        <VStack>
          <Image
            src={selectedImage ? selectedImage : drink.image ?? ""}
            alt="bla"
            boxSize="md"
            objectFit="cover"
            rounded="md"
          />
          <Button
            colorScheme="red"
            variant="ghost"
            onClick={() => removeProductImage(drink.id)}
            size="sm"
          >
            Remove photo
          </Button>
        </VStack>
      )}

      <Button colorScheme="primary" type="submit" mb="4">
        {t("elements.button.save")}
      </Button>
    </Form>
  );
};

export default EditDrinkForm;

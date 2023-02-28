import { useState } from "react";
import { api } from "../utils/api";
import ImageSearch from "./ImageSearch";
import { useForm } from "react-hook-form";
import type { Category } from "@prisma/client";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Switch,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface Props {
  handleIsActive: (state: boolean) => void;
}

const CreateNewCategory = ({ handleIsActive }: Props) => {
  const { t } = useTranslation();
  const createCategoryMutation = api.categories.createCategory.useMutation();
  const { register, handleSubmit } = useForm<Category>();
  const utils = api.useContext();
  const toast = useToast();
  const [imageFromSearch, setImageFromSearch] = useState("");

  const handleCreateNewCategory = async (data: Category) => {
    try {
      await createCategoryMutation.mutateAsync({
        categoryName: data.categoryName ?? "",
        url: imageFromSearch ?? data.url,
        addTypes: data.addTypes,
        addDescription: data.addDescription,
        isDefault: data.isDefault,
      });
      toast({
        title: `Created ${data.categoryName ?? ""}`,
        status: "success",
        isClosable: true,
        position: "top",
      });
      setImageFromSearch("");
      handleIsActive(false);
      await utils.categories.getCategories.invalidate();
    } catch (error) {
      if (typeof error === "string") {
        toast({
          title: `${error}`,
          status: "error",
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: `${(error as Error).message}`,
          status: "error",
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const handleSelectedImage = (image: string) => {
    setImageFromSearch(image);
  };

  return (
    <Container bg="blackAlpha.300" p="5" rounded="lg">
      <VStack spacing="5">
        <Heading size="md">{t("create_new_category")}</Heading>
        <FormControl>
          <Input
            placeholder={
              t("elements.placeholder.category_title") ?? "Category Name"
            }
            {...register("categoryName", {
              required: true,
              minLength: {
                value: 3,
                message: "Category should have at least 3 letters",
              },
            })}
          />
        </FormControl>

        <ImageSearch handleSelectedImage={handleSelectedImage} />

        <Input hidden placeholder="Image url" {...register("url")} />
        <VStack spacing="5">
          <Flex w="full" justify="space-between" align="center">
            <FormLabel htmlFor="addTypes">
              {t("elements.additional_field.allow_type")}
            </FormLabel>
            <Switch id="addTypes" {...register("addTypes")} size="lg" />
          </Flex>
          <Flex w="full" justify="space-between" align="center">
            <FormLabel htmlFor="addDescription">
              {t("elements.additional_field.allow_description")}
            </FormLabel>
            <Switch
              id="addDescription"
              {...register("addDescription")}
              size="lg"
            />
          </Flex>
        </VStack>
        <Switch id="isDefault" {...register("isDefault")} hidden />

        {imageFromSearch && (
          <Image
            boxSize="sm"
            alt="image"
            src={imageFromSearch}
            rounded="lg"
            objectFit="cover"
          />
        )}

        <Button
          variant="solid"
          onClick={handleSubmit(handleCreateNewCategory)}
          colorScheme="primary"
        >
          {t("elements.button.submit_category")}
        </Button>
      </VStack>
    </Container>
  );
};

export default CreateNewCategory;

import { useState } from "react";
import { api } from "../utils/api";
import ImageSearch from "./ImageSearch";
import { useForm } from "react-hook-form";
import type { Category } from "@prisma/client";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Switch,
  useToast,
  VStack,
} from "@chakra-ui/react";

interface Props {
  handleIsActive: (state: boolean) => void;
}

const CreateNewCategory = ({ handleIsActive }: Props) => {
  const createCategoryMutation = api.categories.createCategory.useMutation();
  const { register, handleSubmit } = useForm<Category>();
  const utils = api.useContext();
  const toast = useToast();
  const [imageFromSearch, setimageFromSearch] = useState("");

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
      setimageFromSearch("");
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
    setimageFromSearch(image);
  };

  return (
    <Container bg="blackAlpha.300" p="5" rounded="lg">
      <VStack spacing="5">
        <Heading size="md">Create new category</Heading>
        <FormControl>
          <Input
            variant="filled"
            placeholder="Enter category name"
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
        <HStack>
          <VStack>
            <FormLabel htmlFor="addTypes">Allow adding a type?</FormLabel>
            <Switch id="addTypes" {...register("addTypes")} />
          </VStack>
          <VStack>
            <FormLabel htmlFor="addDescription">
              Allow adding a description?
            </FormLabel>
            <Switch id="addDescription" {...register("addDescription")} />
          </VStack>
          <Switch id="isDefault" {...register("isDefault")} hidden />
        </HStack>

        {imageFromSearch && (
          <Image boxSize="sm" alt="bla" src={imageFromSearch} rounded="lg" />
        )}

        <Button variant="solid" onClick={handleSubmit(handleCreateNewCategory)}>
          Create new category
        </Button>
      </VStack>
    </Container>
  );
};

export default CreateNewCategory;

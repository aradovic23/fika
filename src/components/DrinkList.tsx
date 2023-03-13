import type { FC } from "react";
import Link from "next/link";
import { api } from "../utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { useGetCategory } from "../hooks/useGetCategory";
import { useSession } from "next-auth/react";
import {
  InformationCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";

import { EyeSlashIcon, RectangleGroupIcon } from "@heroicons/react/24/solid";
import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ScaleFade,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import type { Drink } from "@prisma/client";
import { useTranslation } from "react-i18next";

export const DrinkList: FC<Drink> = ({
  title,
  price,
  id,
  volume,
  type,
  categoryId,
  tag,
  description,
  image,
  isHidden,
}) => {
  const queryClient = useQueryClient();
  const drinks = api.drinks.getDrinks.useQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { t } = useTranslation();

  const { mutate: deleteDrink } = api.drinks.deleteDrink.useMutation({
    async onSuccess() {
      void queryClient.invalidateQueries({ queryKey: ["drink"] });
      await drinks.refetch();
    },
    onError(error) {
      console.log(error);
    },
  });

  const onDeleteHandler = (id: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteDrink({ id });
    }
  };

  const { category } = useGetCategory(categoryId ?? 1) ?? "";
  const { data: sessionData } = useSession();
  const hasDescription = category?.addDescription;
  const hasTypes = category?.addTypes;

  const bg = useColorModeValue("whiteAlpha.800", "blackAlpha.400");
  const color = useColorModeValue("gray.900", "gray.100");

  const typeBadgeBackgroundColor: { [key: string]: string } = {
    Green: "green",
    Black: "gray",
    Fruit: "red",
    Herb: "yellow",
  };
  const badgeColor = type ? typeBadgeBackgroundColor[type] || "gray" : "gray";

  const showHiddenProduct = isHidden && sessionData?.user?.role === "admin";

  return (
    <>
      <ScaleFade initialScale={0.8} in unmountOnExit>
        <HStack
          shadow="md"
          maxH="13rem"
          rounded="md"
          bg={showHiddenProduct ? "blackAlpha.50" : bg}
          color={color}
          position="relative"
        >
          <Box w="10rem">
            <Image
              boxSize="10rem"
              alt="image"
              src={(image || category?.url) ?? ""}
              objectFit="cover"
              rounded="md"
              borderRightRadius="0"
              filter={showHiddenProduct ? "grayscale(100%)" : ""}
              onClick={onOpen}
            />
          </Box>
          {showHiddenProduct && (
            <HStack position="absolute" top="2" right="2">
              <Tag colorScheme="red" variant="solid">
                <TagLeftIcon boxSize="12px" as={EyeSlashIcon} />
                <TagLabel>{t("elements.label.hidden")}</TagLabel>
              </Tag>
            </HStack>
          )}
          {tag && !showHiddenProduct && (
            <Box position="absolute" top="2" right="2">
              <Badge variant="solid" colorScheme="primary">
                {tag}
              </Badge>
            </Box>
          )}

          {hasDescription && (
            <IconButton
              icon={<InformationCircleIcon className="h-4 w-4" />}
              aria-label="info"
              onClick={onOpen}
              size="sm"
              position="absolute"
              left="0"
              top="2"
              colorScheme={showHiddenProduct ? "red" : "primary"}
            />
          )}

          <VStack p="2" alignItems="flex-start" spacing={2} w="full">
            <Text fontSize="2xl" fontWeight="bold" noOfLines={1}>
              {title}
            </Text>
            <Text fontSize="xl">{price} RSD</Text>
            <HStack alignItems="flex-start" spacing={3}>
              <Tag variant="outline">
                <TagLeftIcon boxSize="12px" as={RectangleGroupIcon} />
                <TagLabel>{category?.categoryName}</TagLabel>
              </Tag>
              {volume && (
                <Tag variant="outline">
                  <TagLeftIcon boxSize="12px" as={BeakerIcon} />
                  <TagLabel>{volume}</TagLabel>
                </Tag>
              )}
            </HStack>
            <HStack spacing={3} w="full">
              {sessionData?.user?.role === "admin" && (
                <>
                  <Button
                    leftIcon={<PencilSquareIcon className="h-4 w-4" />}
                    size="sm"
                    aria-label="edit"
                    as={Link}
                    href={`/drink/${id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    leftIcon={<TrashIcon className="h-4 w-4" />}
                    colorScheme="red"
                    variant="ghost"
                    size="sm"
                    aria-label="delete"
                    onClick={() => {
                      onDeleteHandler(id);
                    }}
                  >
                    Delete
                  </Button>
                </>
              )}
            </HStack>
          </VStack>
        </HStack>
      </ScaleFade>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5}>
              <Text>{description}</Text>
              {image && (
                <Image
                  alt="product-image"
                  src={image}
                  boxSize="sm"
                  objectFit="cover"
                  rounded="md"
                />
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="primary" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

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
} from "@heroicons/react/24/outline";
import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Flex,
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
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import type { Drink } from "@prisma/client";

export const DrinkList: FC<Drink> = ({
  title,
  price,
  id,
  volume,
  type,
  categoryId,
  tag,
  description,
}) => {
  const queryClient = useQueryClient();
  const drinks = api.drinks.getDrinks.useQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    if (window.confirm("Are you sure you want to delelte?")) {
      deleteDrink({ id });
    }
  };

  const { category } = useGetCategory(categoryId ?? 1) ?? "";
  const { data: sessionData } = useSession();
  const hasDescription = category?.addDescription;

  const bg = useColorModeValue("whiteAlpha.800", "blackAlpha.400");
  const color = useColorModeValue("gray.900", "gray.100");

  const typeBadgeBackgroundColor: { [key: string]: string } = {
    none: "teal",
    Green: "green",
    Black: "gray",
    Fruit: "red",
    Herb: "yellow",
  };
  const badgeColor = type ? typeBadgeBackgroundColor[type] || "gray" : "gray";

  return (
    <>
      <ScaleFade initialScale={0.8} in unmountOnExit>
        <Box shadow="md" p="3" maxH="13rem" rounded="lg" bg={bg} color={color}>
          <Box position="relative">
            <AspectRatio ratio={4 / 3} maxH="5rem">
              <Image
                alt="error"
                src={category?.url ?? ""}
                objectFit="cover"
                rounded="lg"
              />
            </AspectRatio>
            {tag && (
              <Box position="absolute" top="2" right="2">
                <Badge variant="solid" colorScheme="yellow">
                  {tag}
                </Badge>
              </Box>
            )}
          </Box>
          <Flex justify="space-between" mt="1">
            <Text fontSize="xl" noOfLines={1} maxWidth="250px">
              {title}
            </Text>
            <Text fontSize="lg">{price} RSD</Text>
          </Flex>

          <Flex justify="space-between" align="center" mt="1">
            <Flex gap="3">
              <Box>
                <Flex gap="2">
                  <Text casing="uppercase" as="b" fontSize="sm">
                    {category?.categoryName}
                  </Text>
                  {volume && (
                    <Text casing="uppercase" fontSize="sm">
                      {volume}
                    </Text>
                  )}
                  {type && (
                    <Tag ml="1" colorScheme={badgeColor}>
                      {type}
                    </Tag>
                  )}
                  <Text>{description}</Text>
                </Flex>
              </Box>
            </Flex>
            <Flex justifyContent="flex-end" gap="2">
              {sessionData?.user?.role === "admin" && (
                <>
                  <IconButton
                    aria-label="edit"
                    as={Link}
                    href={`/drink/${id}`}
                    icon={<PencilSquareIcon className="h-6 w-6" />}
                  />
                  <IconButton
                    aria-label="delete"
                    icon={<TrashIcon className="h-6 w-6" />}
                    onClick={() => {
                      onDeleteHandler(id);
                    }}
                  />
                </>
              )}
              {hasDescription && (
                <IconButton
                  aria-label="delete"
                  icon={<InformationCircleIcon className="h-6 w-6" />}
                  onClick={onOpen}
                />
              )}
            </Flex>
          </Flex>
        </Box>
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
            <Text>{description}</Text>
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

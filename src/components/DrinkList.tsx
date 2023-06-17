import Link from "next/link";
import { api } from "../utils/api";
import { useGetCategory } from "../hooks/useGetCategory";
import { useSession } from "next-auth/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { Prisma } from "@prisma/client";

import {
  EyeIcon,
  EyeSlashIcon,
  Squares2X2Icon,
  BeakerIcon,
  StarIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import type { ImageProps } from "@chakra-ui/react";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Blurhash } from "react-blurhash";
import Dialog from "./Dialog";

type DrinkWithUnits = Prisma.DrinkGetPayload<{ include: { unit: true } }>

export const DrinkList = (drink: DrinkWithUnits) => {
  const utils = api.useContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { t } = useTranslation();

  const { mutate: deleteDrink } = api.drinks.deleteDrink.useMutation({
    async onSuccess() {
      await utils.drinks.getDrinks.invalidate();
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

  const { category } = useGetCategory(drink.categoryId ?? 1) ?? "";
  const { data: sessionData } = useSession();
  const hasDescription = category?.addDescription;
  const hasTypes = category?.addTypes;

  const bg = useColorModeValue("whiteAlpha.800", "blackAlpha.400");
  const color = useColorModeValue("gray.900", "gray.100");

  const showHiddenProduct =
    drink.isHidden && sessionData?.user?.role === "ADMIN";

  const titleOverflow = drink.title.length >= 13;

  interface ImageWithBlurHashProps extends ImageProps {
    blurHash?: string | null;
  }

  const ImageWithBlurhash = ({
    src,
    blurHash,
    ...rest
  }: ImageWithBlurHashProps) => {
    if (blurHash) {
      return (
        <>
          <Image
            src={src}
            alt="image"
            {...rest}
            fallback={
              <Blurhash
                hash={blurHash}
                width="100%"
                height="100%"
                resolutionX={32}
                resolutionY={32}
              />
            }
          />
        </>
      );
    } else {
      return <Image src={src} {...rest} alt="image" />;
    }
  };

  return (
    <>
      <HStack
        shadow="md"
        maxH="13rem"
        rounded="md"
        bg={bg}
        filter={showHiddenProduct ? "grayscale(100%)" : ""}
        opacity={showHiddenProduct ? "0.5" : "1"}
        color={color}
        position="relative"
      >
        <Box w="10rem">
          <ImageWithBlurhash
            boxSize="10rem"
            alt="image"
            src={((hasDescription && drink.image) || category?.url) ?? ""}
            objectFit="cover"
            rounded="md"
            borderRightRadius="0"
            blurHash={drink.blurHash}
            onClick={onOpen}
          />
        </Box>

        <VStack
          p="2"
          alignItems="flex-start"
          spacing={2}
          w="full"
          overflow="auto"
        >
          <Text fontSize="xl" fontWeight="bold" noOfLines={1}>
            {drink.title}
          </Text>
          {showHiddenProduct && (
            <HStack
              position="absolute"
              top={!titleOverflow ? "2" : "10"}
              right="2"
            >
              <Tag colorScheme="red" variant="solid">
                <TagLeftIcon boxSize="12px" as={EyeSlashIcon} />
                <TagLabel>{t("elements.label.hidden")}</TagLabel>
              </Tag>
            </HStack>
          )}
          {drink.tag && !showHiddenProduct && (
            <Box
              position="absolute"
              top={!titleOverflow ? "2" : "10"}
              right="2"
            >
              <Tag variant="subtle" colorScheme="primary">
                <TagLeftIcon boxSize="12px" as={StarIcon} />
                <TagLabel>{drink.tag.toUpperCase()}</TagLabel>
              </Tag>
            </Box>
          )}
          <Text fontSize="lg">{drink.price} RSD</Text>
          <HStack alignItems="flex-start" spacing={3}>
            <Tag variant="subtle">
              <TagLeftIcon boxSize="12px" as={Squares2X2Icon} />
              <TagLabel>{category?.categoryName}</TagLabel>
            </Tag>
            {drink.unitId && drink.unit && (
              <Tag variant="subtle">
                <TagLeftIcon boxSize="12px" as={BeakerIcon} />
                <TagLabel>{drink.unit.amount}</TagLabel>
              </Tag>
            )}
            {hasTypes && drink.type && (
              <Tag variant="subtle">
                <TagLeftIcon boxSize="12px" as={TagIcon} />
                <TagLabel>{drink.type}</TagLabel>
              </Tag>
            )}
          </HStack>
          <HStack spacing={3} w="full" position="relative">
            {sessionData?.user?.role === "ADMIN" && (
              <>
                <Button
                  leftIcon={<PencilSquareIcon className="h-4 w-4" />}
                  size="sm"
                  aria-label="edit"
                  as={Link}
                  href={`/drink/${drink.id}`}
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
                    onDeleteHandler(drink.id);
                  }}
                >
                  Delete
                </Button>
              </>
            )}
          </HStack>
        </VStack>
      </HStack>

      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        title={drink.title}
        description={drink.description}
        image={drink.image} />
    </>
  );
};

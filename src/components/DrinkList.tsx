import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Prisma } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useGetCategory } from '../hooks/useGetCategory';
import { api } from '../utils/api';
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { BeakerIcon, EyeSlashIcon, Squares2X2Icon, TagIcon } from '@heroicons/react/24/solid';
import Dialog from './Dialog';

type DrinkWithUnits = Prisma.DrinkGetPayload<{ include: { unit: true } }>;

export const DrinkList = (drink: DrinkWithUnits) => {
  const utils = api.useContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate: deleteDrink } = api.drinks.deleteDrink.useMutation({
    async onSuccess() {
      await utils.drinks.getDrinks.invalidate();
    },
    onError(error) {
      console.warn(error);
    },
  });

  const onDeleteHandler = (id: string) => {
    if (window.confirm('Are you sure you want to delete?')) {
      deleteDrink({ id });
    }
  };

  const { category } = useGetCategory(drink.categoryId ?? 1) ?? '';
  const { data: sessionData } = useSession();
  const hasDescription = category?.addDescription;
  const hasTypes = category?.addTypes;
  const isAdmin = sessionData?.user?.role === 'ADMIN';

  const bg = useColorModeValue('mantle.100', 'mantle.200');

  const showHiddenProduct = drink.isHidden && sessionData?.user?.role === 'ADMIN';

  return (
    <>
      <VStack gap={3} shadow="sm" rounded="lg" bg={bg} p={2}>
        <Flex w="full" gap="3">
          <Box boxSize="5rem" position="relative" minW="5rem">
            <Image
              onClick={onOpen}
              boxSize="5rem"
              rounded="md"
              alt="product"
              objectFit="cover"
              src={((hasDescription && drink.image) || category?.url) ?? ''}
              filter={showHiddenProduct ? 'grayscale(100%)' : undefined}
            />
            {showHiddenProduct && (
              <Tag pos="absolute" inset={0} m="auto" colorScheme="red" w="50%" h="50%" variant="solid">
                <EyeSlashIcon className="absolute inset-0 m-auto h-4 w-4" />
              </Tag>
            )}
          </Box>
          <VStack w="full" overflow="hidden">
            <HStack justify="space-between" w="full" align="baseline">
              <Box>
                <Text lineHeight={1} fontWeight="bold" fontSize="xl">
                  {drink.title}
                </Text>
              </Box>
              <Box>
                <Text fontSize="xl">
                  {drink.price}
                  <Text ml="1" as="span" fontSize="sm">
                    RSD
                  </Text>
                </Text>
              </Box>
            </HStack>
            <HStack w="full" opacity={0.5} overflow="hidden">
              {drink.unitId && drink.unit && (
                <Tag variant="subtle">
                  <TagLeftIcon boxSize="12px" as={BeakerIcon} />
                  <TagLabel>{drink.unit.amount}</TagLabel>
                </Tag>
              )}
              <Tag variant="subtle">
                <TagLeftIcon boxSize="12px" as={Squares2X2Icon} />
                <TagLabel>{category?.categoryName}</TagLabel>
              </Tag>
              {hasTypes && drink.type && (
                <Tag variant="subtle">
                  <TagLeftIcon boxSize="12px" as={TagIcon} />
                  <TagLabel>{drink.type}</TagLabel>
                </Tag>
              )}
            </HStack>
          </VStack>
        </Flex>
        {isAdmin && (
          <>
            <Divider variant="brand" />
            <HStack w="full" p="2" rounded="lg" justify="space-between">
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
            </HStack>
          </>
        )}
      </VStack>

      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        title={drink.title}
        description={drink.description}
        image={drink.image}
      />
    </>
  );
};

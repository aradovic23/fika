import {
  Box,
  Flex,
  Hide,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Show,
  Skeleton,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useDisclosure,
  VStack,
  chakra,
} from '@chakra-ui/react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { BeakerIcon, EllipsisVerticalIcon, EyeSlashIcon, Squares2X2Icon, TagIcon } from '@heroicons/react/24/solid';
import type { Prisma } from '@prisma/client';
import { usePalette } from 'color-thief-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useGetCategory } from '../hooks/useGetCategory';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { api } from '../utils/api';
import Dialog from './Dialog';
import { AlertDialogModal } from './ui/AlertDialog';
import { SlideInModal } from './ui/SlideInModal';
import Image from 'next/image';

export type DrinkWithUnits = Prisma.DrinkGetPayload<{ include: { unit: true; category: true } }>;

export const DrinkList = (drink: DrinkWithUnits) => {
  const utils = api.useContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();

  const { mutate: deleteDrink, isLoading } = api.drinks.deleteDrink.useMutation({
    async onSuccess() {
      await utils.drinks.getDrinks.invalidate();
    },
  });

  const onDeleteHandler = (id: string) => {
    deleteDrink({ id });
  };

  const { category } = useGetCategory(drink.categoryId ?? 1) ?? '';
  const isAdmin = useIsAdmin();
  const hasDescription = category?.addDescription;
  const hasTypes = category?.addTypes;
  const { t } = useTranslation('common');

  const { data: dominantColor, loading } = usePalette(drink.category?.url ?? '', 2, 'hex', {
    crossOrigin: 'Anonymous',
    quality: 100,
  });

  const showHiddenProduct = drink.isHidden && isAdmin;

  const NextImage = chakra(Image, {
    shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop),
  });

  if (loading) {
    return <Skeleton rounded="lg" />;
  }

  return (
    <>
      <VStack
        gap={3}
        shadow="sm"
        rounded="lg"
        bg={dominantColor ? dominantColor[0] : 'mantle.100'}
        p={2}
        color={dominantColor ? dominantColor[1] : 'mantle.200'}
      >
        <Flex w="full" gap="3">
          <Box boxSize="5rem" position="relative" minW="5rem">
            <NextImage
              height="200"
              width="200"
              onClick={onOpen}
              boxSize="5rem"
              rounded="md"
              alt="product"
              objectFit="cover"
              src={((hasDescription && drink.image) || category?.url) ?? ''}
              filter={showHiddenProduct ? 'grayscale(100%)' : undefined}
            />
            <Hide above="md">
              {drink.description?.length !== 0 && !showHiddenProduct && (
                <SlideInModal title={drink.title} description={drink.description} image={drink.image} />
              )}
            </Hide>
            {showHiddenProduct && (
              <Tag pos="absolute" inset={0} m="auto" colorScheme="red" w="50%" h="50%" variant="solid">
                <EyeSlashIcon className="absolute inset-0 m-auto h-4 w-4" />
              </Tag>
            )}
          </Box>
          <VStack w="full" overflow="hidden" position="relative">
            <HStack justify="space-between" w="full" align="baseline">
              <Box maxW="150px">
                <Text lineHeight={1} fontWeight="bold" fontSize="xl" isTruncated>
                  {drink.title}
                </Text>
              </Box>
              <HStack>
                <Text fontSize="xl">
                  {drink.price}
                  <Text ml="1" as="span" fontSize="sm">
                    {t('drink.currency')}
                  </Text>
                </Text>
                {isAdmin && (
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      variant="ghost"
                      aria-label="Admin options"
                      color="magenta.100"
                      icon={<EllipsisVerticalIcon className="h-5 w-5" />}
                    />
                    <Portal>
                      <MenuList>
                        <MenuItem icon={<PencilSquareIcon className="h-4 w-4" />} as={Link} href={`/drink/${drink.id}`}>
                          {t('drink.edit')}
                        </MenuItem>
                        <MenuItem icon={<TrashIcon className="h-4 w-4" />} color="red" onClick={onAlertOpen}>
                          {t('drink.delete')}
                        </MenuItem>
                      </MenuList>
                    </Portal>
                  </Menu>
                )}
              </HStack>
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
      </VStack>
      <Show above="md">
        {drink.description?.length !== 0 && (
          <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title={drink.title}
            description={drink.description}
            image={drink.image}
          />
        )}
      </Show>
      <AlertDialogModal
        title={t('drink.delete_title')}
        message={t('drink.delete_message')}
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        onDialogDelete={() => onDeleteHandler(drink.id)}
        isLoading={isLoading}
      />
    </>
  );
};

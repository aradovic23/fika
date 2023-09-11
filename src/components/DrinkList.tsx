import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  Hide,
  HStack,
  Show,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { PencilSquareIcon, TrashIcon, StarIcon, EyeIcon } from '@heroicons/react/24/outline';
import {
  BeakerIcon,
  EyeSlashIcon,
  Squares2X2Icon,
  TagIcon,
  StarIcon as SolidStarIcon,
} from '@heroicons/react/24/solid';
import type { Prisma } from '@prisma/client';
import { usePalette } from 'color-thief-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useGetCategory } from '../hooks/useGetCategory';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { api } from '../utils/api';
import Dialog from './Dialog';
import { AlertDialogModal } from './ui/AlertDialog';
import { SlideInModal } from './ui/SlideInModal';
import { iconSize } from '../constants';

export type DrinkWithUnits = Prisma.DrinkGetPayload<{ include: { unit: true; category: true } }>;

export const DrinkList = (drink: DrinkWithUnits) => {
  const toast = useToast();

  const utils = api.useContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const { isOpen: isStarAlertOpen, onOpen: onStarAlertOpen, onClose: onStarAlertClose } = useDisclosure();
  const { isOpen: isHideAlertOpen, onOpen: onHideAlertOpen, onClose: onHideAlertClose } = useDisclosure();

  const { mutate: deleteDrink, isLoading } = api.drinks.deleteDrink.useMutation({
    async onSuccess() {
      await utils.drinks.getDrinks.invalidate();
      onAlertClose();
      toast({
        title: `${drink.title ?? 'Product'} ${t('toast.delete_title')}!`,
        status: 'success',
        isClosable: true,
        position: 'top',
      });
    },
  });

  const { mutate: recommendedProductMutation, isLoading: isRecommendedProductLoading } =
    api.drinks.addProductToRecommended.useMutation({
      async onSuccess() {
        await utils.drinks.getDrinks.invalidate();
        onStarAlertClose();
        toast({
          title: `${drink.title ?? 'Product'} ${t('toast.star_title')}`,
          status: 'success',
          isClosable: true,
          position: 'top',
        });
      },
      onError(error) {
        onStarAlertClose();
        toast({
          title: error.message,
          status: 'error',
          isClosable: true,
          position: 'top',
        });
      },
    });

  const { mutate: hideProductMutation, isLoading: isHiddenProductLoading } = api.drinks.hideProduct.useMutation({
    async onSuccess() {
      await utils.drinks.getDrinks.invalidate();
      onHideAlertClose();
      toast({
        title: `${drink.title ?? 'Product'} ${t('toast.hide_title')}!`,
        status: 'success',
        isClosable: true,
        position: 'top',
      });
    },
    onError(error) {
      onHideAlertClose();
      toast({
        title: error.message,
        status: 'error',
        isClosable: true,
        position: 'top',
      });
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

  const { data: dominantColor } = usePalette(drink.category?.url ?? '', 2, 'hex', {
    crossOrigin: 'Anonymous',
    quality: 100,
  });

  const showHiddenProduct = drink.isHidden && isAdmin;

  const router = useRouter();

  const NextImage = chakra(Image, {
    shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop),
  });

  const adminOnlyButtons = [
    {
      label: t('drink.edit'),
      icon: <PencilSquareIcon className={iconSize} />,
      action: () => router.push(`/drink/${drink.id}`),
    },
    {
      label: drink.isHidden ? t('dialog.hidden') : t('dialog.hide'),
      icon: drink.isHidden ? <EyeIcon className={iconSize} /> : <EyeSlashIcon className={iconSize} />,
      action: onHideAlertOpen,
      isDisabled: drink.isHidden,
    },
    {
      label: drink.isRecommended ? t('dialog.starred') : t('dialog.star'),
      icon: drink.isRecommended ? <SolidStarIcon className={iconSize} /> : <StarIcon className={iconSize} />,
      action: onStarAlertOpen,
      isDisabled: drink.isRecommended,
    },
    {
      label: t('drink.delete'),
      icon: <TrashIcon className={iconSize} />,
      action: onAlertOpen,
      destructive: true,
    },
  ];

  const dialogData = [
    {
      title: t('drink.delete_title'),
      message: t('drink.delete_message'),
      isOpen: isAlertOpen,
      onClose: onAlertClose,
      onAction: () => onDeleteHandler(drink.id),
      isLoading: isLoading,
      isDestructive: true,
      actionBtnText: t('dialog.delete'),
    },
    {
      title: t('dialog.star_title'),
      message: `${drink.title} ${t('dialog.star_message')}`,
      isOpen: isStarAlertOpen,
      onClose: onStarAlertClose,
      onAction: () => recommendedProductMutation({ id: drink.id }),
      isLoading: isRecommendedProductLoading,
      actionBtnText: t('dialog.yes'),
    },
    {
      title: t('dialog.hide_title'),
      message: `${drink.title} ${t('dialog.hide_message')}`,
      isOpen: isHideAlertOpen,
      onClose: onHideAlertClose,
      onAction: () => hideProductMutation({ id: drink.id }),
      isLoading: isHiddenProductLoading,
      actionBtnText: t('dialog.yes'),
    },
  ];

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
            {showHiddenProduct && (
              <Tag pos="absolute" inset={0} m="auto" colorScheme="red" w="50%" h="50%" variant="solid">
                <EyeSlashIcon className="absolute inset-0 m-auto h-4 w-4" />
              </Tag>
            )}
          </Box>
          <VStack w="full" overflow="hidden" position="relative">
            <Hide above="md">
              {drink.description?.length !== 0 && !showHiddenProduct && (
                <SlideInModal title={drink.title} description={drink.description} image={drink.image} />
              )}
            </Hide>
            <HStack justify="space-between" w="full" align="baseline" userSelect="none">
              <Text fontWeight="bold" fontSize="xl">
                {drink.title}
              </Text>
              <HStack>
                <Text fontSize="xl">
                  {drink.price}
                  <Text ml="1" as="span" fontSize="sm">
                    {t('drink.currency')}
                  </Text>
                </Text>
              </HStack>
            </HStack>
            <HStack w="full" opacity={0.5} overflow="hidden" userSelect="none">
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
            <Divider borderColor="magenta.100" />
            <VStack spacing={2} w="full">
              <Text fontSize="sm" fontWeight="bold" color="magenta.100">
                {t('all_drinks.admin_options')}
              </Text>
              <HStack justify="space-between" w="full">
                {adminOnlyButtons.map(btn => (
                  <Button
                    key={btn.label}
                    leftIcon={btn.icon}
                    onClick={btn.action}
                    size="sm"
                    iconSpacing="1"
                    bg={btn.destructive ? 'offRed.500' : undefined}
                    color={btn.destructive ? 'white' : undefined}
                    isDisabled={btn.isDisabled}
                  >
                    {btn.label}
                  </Button>
                ))}
              </HStack>
            </VStack>
          </>
        )}
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
      {dialogData.map((dialog, idx) => (
        <AlertDialogModal key={idx} {...dialog} />
      ))}
    </>
  );
};

import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Hide,
  Show,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
  chakra,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { usePalette } from 'color-thief-react';
import { Edit, Eye, EyeOff, LayoutGrid, Milk, Star, StarOff, Tag as TagIcon, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { LegacyRef } from 'react';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsAdmin } from '../../hooks/useIsAdmin';
import { api } from '../../utils/api';
import Dialog from '../Dialog';
import type { DrinkWithUnits } from '../DrinkList';
import { AlertDialogModal } from '../ui/AlertDialog';
import { SlideInModal } from '../ui/SlideInModal';
import { iconSize } from '../../constants';
import { AnimatePresence, motion } from 'framer-motion';
import ProductsSkeleton from '../ProductsSkeleton';

const Product = forwardRef(function Product(
  {
    drink,
    showAdminOptions,
  }: {
    drink: DrinkWithUnits;
    showAdminOptions: boolean;
  },
  ref: LegacyRef<HTMLDivElement> | undefined,
) {
  const toast = useToast();
  const utils = api.useContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const { isOpen: isStarAlertOpen, onOpen: onStarAlertOpen, onClose: onStarAlertClose } = useDisclosure();
  const { isOpen: isHideAlertOpen, onOpen: onHideAlertOpen, onClose: onHideAlertClose } = useDisclosure();
  const isAdmin = useIsAdmin();
  const hasTypes = drink.category?.addTypes;
  const { t } = useTranslation('common');

  const bgImage = drink.image ? drink.image : drink.category?.url ?? '';

  const { data: dominantColor, loading } = usePalette(bgImage, 2, 'hex', {
    crossOrigin: 'Anonymous',
    quality: 100,
  });
  const showHiddenProduct = drink.isHidden && isAdmin;
  const router = useRouter();

  const { mutate: deleteDrink, isLoading } = api.drinks.deleteDrink.useMutation({
    async onSuccess() {
      await utils.drinks.getPaginatedDrinks.invalidate();
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
    api.recommendations.addProductToRecommended.useMutation({
      async onSuccess() {
        await utils.drinks.getPaginatedDrinks.invalidate();
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
      await utils.drinks.getPaginatedDrinks.invalidate();
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

  const NextImage = chakra(Image, {
    shouldForwardProp: prop => ['width', 'height', 'src', 'alt', 'blurDataURL'].includes(prop),
  });

  const adminOnlyButtons = [
    {
      label: t('drink.edit'),
      icon: <Edit size={iconSize} />,
      action: () => router.push(`/drink/${drink.id}`),
    },
    {
      label: drink.isHidden ? t('dialog.hidden') : t('dialog.hide'),
      icon: drink.isHidden ? <Eye size={iconSize} /> : <EyeOff size={iconSize} />,
      action: onHideAlertOpen,
      isDisabled: drink.isHidden,
    },
    {
      label: drink.isRecommended ? t('dialog.starred') : t('dialog.star'),
      icon: drink.isRecommended ? <StarOff size={iconSize} /> : <Star size={iconSize} />,
      action: onStarAlertOpen,
      isDisabled: drink.isRecommended,
    },
    {
      label: t('drink.delete'),
      icon: <Trash2 size={iconSize} />,
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

  if (loading) {
    return <ProductsSkeleton />;
  }

  return (
    <>
      <VStack
        w="full"
        ref={ref}
        gap={3}
        shadow="sm"
        rounded="lg"
        bg={dominantColor ? dominantColor[0] : 'mantle.100'}
        p={2}
        color={dominantColor ? dominantColor[1] : 'mantle.200'}
      >
        <Flex w="full" gap="3">
          <Box boxSize="5rem" position="relative" minW="5rem">
            {drink.category?.url && (
              <NextImage
                height="100"
                width="100"
                onClick={onOpen}
                boxSize="5rem"
                rounded="md"
                alt={drink.title ?? 'Product'}
                objectFit="cover"
                src={((drink.image && drink.image) || drink.category?.url) ?? ''}
                filter={showHiddenProduct ? 'grayscale(100%)' : undefined}
                blurDataURL={drink.blurHash ? drink.blurHash : ''}
              />
            )}
            {showHiddenProduct && (
              <Tag
                pos="absolute"
                inset={0}
                m="auto"
                colorScheme="offRed"
                rounded="full"
                w="50%"
                h="50%"
                variant="solid"
              >
                <EyeOff />
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
                  <TagLeftIcon boxSize="12px" as={Milk} />
                  <TagLabel>{drink.unit.amount}</TagLabel>
                </Tag>
              )}
              <Tag variant="subtle">
                <TagLeftIcon boxSize="12px" as={LayoutGrid} />
                <TagLabel>{drink.category?.categoryName}</TagLabel>
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
        <AnimatePresence>
          {isAdmin && showAdminOptions && (
            <VStack
              spacing={2}
              w="full"
              as={motion.div}
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: 'auto',
                opacity: 1,
                transition: {
                  height: {
                    duration: 0.4,
                  },
                  opacity: {
                    duration: 0.25,
                    delay: 0.15,
                  },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: {
                    duration: 0.4,
                  },
                  opacity: {
                    duration: 0.25,
                  },
                },
              }}
            >
              <Divider borderColor="magenta.100" />

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
          )}
        </AnimatePresence>
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
});

export default Product;

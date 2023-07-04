import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { PencilIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Drink } from '@prisma/client';
import NextLink from 'next/link';
import { api } from '../utils/api';
import SkeletonLoader from './SkeletonLoader';
import { TruncatedText } from './TruncatedText';

type Props = {
  drink: Drink;
  isAdmin: boolean;
};

const RecommendedProduct = ({ drink, isAdmin }: Props) => {
  const toast = useToast();

  const { mutate: removeRecommendedProduct, isLoading } = api.drinks.removeRecommendedProduct.useMutation({
    async onSuccess() {
      await utils.drinks.getDrinks.invalidate();
      await utils.drinks.getDrinkById.invalidate();
    },
  });
  const utils = api.useContext();
  const bgColor = useColorModeValue('gray.50', 'whiteAlpha.100');

  const handleRemoveFromRecommended = (id: string) => {
    removeRecommendedProduct({ id });
    toast({
      title: `Removed from recommended`,
      status: 'success',
      isClosable: true,
      position: 'bottom',
    });
  };

  return (
    <>
      {isLoading ? (
        <SkeletonLoader width={150} height="full" rounded="md" count={1} />
      ) : (
        <VStack bg={bgColor} minW={150} rounded="md" p={2} spacing={0} shadow="md">
          <TruncatedText>{drink.title}</TruncatedText>
          <Text fontSize="2xl" fontWeight="bold">
            {drink.price}
          </Text>

          {isAdmin && (
            <Menu>
              <MenuButton
                color="primary.100"
                variant="ghost"
                as={IconButton}
                icon={<PencilSquareIcon className="h-4 w-4" />}
              >
                Admin
              </MenuButton>
              <MenuList>
                <MenuItem as={NextLink} href={`/drink/${drink.id}`} icon={<PencilIcon className="h-4 w-4" />}>
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => handleRemoveFromRecommended(drink.id)}
                  color="red.500"
                  icon={<TrashIcon className="h-4 w-4" />}
                >
                  Remove
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </VStack>
      )}
    </>
  );
};

export default RecommendedProduct;

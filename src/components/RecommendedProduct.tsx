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
  const bgColor = useColorModeValue('crust.100', 'crust.200');

  const handleRemoveFromRecommended = (id: string) => {
    removeRecommendedProduct({ id });
    toast({
      title: `Removed from recommended`,
      status: 'success',
      isClosable: true,
      position: 'bottom',
    });
  };

  const bg = useColorModeValue('lavander.100', 'lavander.200');

  return (
    <>
      {isLoading ? (
        <SkeletonLoader width={150} height="full" rounded="md" count={1} />
      ) : (
        <VStack
          bg={bgColor}
          minW={150}
          minH={150}
          align="center"
          justify="center"
          rounded="md"
          p={3}
          spacing={0}
          shadow="md"
          border="1px"
          borderColor={bg}
        >
          <TruncatedText>{drink.title}</TruncatedText>
          <Text fontSize="2xl" fontWeight="bold">
            {drink.price} RSD
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

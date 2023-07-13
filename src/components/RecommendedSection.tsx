import { Button, Heading, HStack, useToast, VStack } from '@chakra-ui/react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import type { Drink } from '@prisma/client';
import { api } from '../utils/api';
import RecommendedProduct from './RecommendedProduct';
import SkeletonLoader from './SkeletonLoader';

type Props = {
  drinks: Drink[];
  isAdmin: boolean;
};

const RecommendedSection = ({ drinks, isAdmin }: Props) => {
  const { mutateAsync, isLoading } = api.drinks.clearRecommendedProducts.useMutation();
  const utils = api.useContext();
  const toast = useToast();

  const handleClearRecommended = async () => {
    await mutateAsync();
    await utils.drinks.getAllDrinks.invalidate();
    await utils.drinks.getDrinks.invalidate();
    toast({
      title: `All products cleared`,
      status: 'success',
      isClosable: true,
      position: 'bottom',
    });
  };

  return (
    <>
      {isLoading ? (
        <SkeletonLoader width={300} height={40} count={1} rounded="md" />
      ) : (
        <>
          <VStack h="full" mb={3}>
            <HStack w="full" justify="space-between">
              <Heading size="md">We recommend</Heading>
              {isAdmin && (
                <Button
                  aria-label="clear products"
                  size="xs"
                  onClick={handleClearRecommended}
                  leftIcon={<XCircleIcon className="h-4 w-4" />}
                >
                  Clear all
                </Button>
              )}
            </HStack>
          </VStack>
          <HStack
            spacing="3"
            overflowX="auto"
            style={{
              scrollSnapAlign: 'start',
            }}
          >
            {drinks.map(drink => (
              <RecommendedProduct key={drink.id} drink={drink} isAdmin={isAdmin} />
            ))}
          </HStack>
        </>
      )}
    </>
  );
};

export default RecommendedSection;

import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import type { Drink } from "@prisma/client";
import { api } from "../utils/api";
import { LoaderSpinner } from "./LoaderSpinner";
import RecommendedProduct from "./RecommendedProduct";
import SkeletonLoader from "./SkeletonLoader";

type Props = {
    drinks: Drink[];
    isAdmin: boolean;
};

const RecommendedSection = ({ drinks, isAdmin }: Props) => {
    const { mutateAsync, isLoading } =
        api.drinks.clearRecommendedProducts.useMutation();
    const utils = api.useContext();

    const handleClearRecommended = async () => {
        await mutateAsync();
        await utils.drinks.getAllDrinks.invalidate();
        await utils.drinks.getDrinks.invalidate();
    };

    return (
        <>
            <VStack h="full">
                <HStack justifyContent="space-between" w="full">
                    <Heading size="md">Recommendations</Heading>
                    {isAdmin && (
                        <Button aria-label="clear"
                            colorScheme="primary"
                            size="xs"
                            onClick={handleClearRecommended}
                            leftIcon={<XCircleIcon className="h-4 w-4" />}
                        >Clear all</Button>
                    )}
                </HStack>
            </VStack>

            {isLoading ? (
                <Box w="full" justifyContent="center">
                    <LoaderSpinner />
                </Box>
            ) : (
                <HStack mt="2" spacing="3" overflowX="auto">
                    {drinks.map((drink) => (
                        <RecommendedProduct
                            key={drink.id}
                            drink={drink}
                            isAdmin={isAdmin}
                        />
                    ))}
                </HStack>
            )}
        </>
    );
};

export default RecommendedSection;

import { Button, Heading, HStack, VStack } from "@chakra-ui/react"
import type { Drink } from "@prisma/client"
import { api } from "../utils/api";
import { LoaderSpinner } from "./LoaderSpinner";
import RecommendedProduct from "./RecommendedProduct";

type Props = {
    drinks: Drink[];
    isAdmin: boolean;
}

const RecommendedSection = ({ drinks, isAdmin }: Props) => {

    const { mutateAsync, isLoading } = api.drinks.clearRecommendedProducts.useMutation();
    const utils = api.useContext();

    const handleClearRecommended = async () => {
        await mutateAsync();
        await utils.drinks.getAllDrinks.invalidate();
        await utils.drinks.getDrinks.invalidate();
    }

    return (
        <>
            <VStack>
                <HStack justifyContent="space-between" w="full">
                    <Heading size="md">We recommend</Heading>
                    {isAdmin && (
                        <Button onClick={handleClearRecommended} size="xs">Clear all</Button>
                    )}
                </HStack>
            </VStack>

            {isLoading ? (
                <LoaderSpinner />
            ) :
                <HStack mt="2" spacing="3" overflowX="auto">
                    {drinks.map(drink =>
                        <RecommendedProduct
                            key={drink.id}
                            drink={drink}
                            isAdmin={isAdmin}
                        />
                    )}
                </HStack>
            }

        </>
    )
}

export default RecommendedSection

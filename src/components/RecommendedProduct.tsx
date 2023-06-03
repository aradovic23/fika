import { Button, Link, Text, VStack } from "@chakra-ui/react"
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { Drink } from "@prisma/client"
import NextLink from "next/link";
import { api } from "../utils/api";

type Props = {
    drink: Drink,
    isAdmin: boolean
}

const RecommendedProduct = ({ drink, isAdmin }: Props) => {

    const removeRecommendedProductMutation = api.drinks.removeRecommendedProduct.useMutation()
    const utils = api.useContext();

    const handleRemoveFromRecommended = async (id: string) => {
        await removeRecommendedProductMutation.mutateAsync({
            id
        })
        await utils.drinks.getDrinks.invalidate();
    }

    return (
        <VStack position="relative" p="3" background="blackAlpha.300" minW="6rem" minH="6rem" rounded="lg" alignItems="center" justify="center" spacing="1">
            {isAdmin && (
                <Button
                    position="absolute"
                    top={0}
                    right={0}
                    size="xs"
                    onClick={() => handleRemoveFromRecommended(drink.id)}
                >
                    <XMarkIcon />
                </Button>
            )}

            <Text isTruncated>{drink.title}</Text>
            <Text fontSize="2xl" fontWeight="semibold">{drink.price}</Text>
            {isAdmin &&
                <Link color="magenta" as={NextLink} href={`/drink/${drink.id}`}>
                    Edit
                </Link>
            }
        </VStack>
    )
}

export default RecommendedProduct

import {
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    VStack,
} from "@chakra-ui/react";
import {
    PencilIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import type { Drink } from "@prisma/client";
import NextLink from "next/link";
import { api } from "../utils/api";

type Props = {
    drink: Drink;
    isAdmin: boolean;
};

const RecommendedProduct = ({ drink, isAdmin }: Props) => {
    const removeRecommendedProductMutation =
        api.drinks.removeRecommendedProduct.useMutation();
    const utils = api.useContext();

    const handleRemoveFromRecommended = async (id: string) => {
        await removeRecommendedProductMutation.mutateAsync({
            id,
        });
        await utils.drinks.getDrinks.invalidate();
    };

    return (
        <VStack
            p="3"
            minW="6rem"
            minH="6rem"
            rounded="lg"
            alignItems="center"
            justify="center"
            spacing="1"
            border="1px"
            borderColor="primary.100"
        >
            <Text isTruncated>{drink.title}</Text>
            <Text fontSize="2xl" fontWeight="semibold">
                {drink.price}
            </Text>

            {isAdmin && (
                <Menu>
                    <MenuButton
                        as={IconButton}
                        icon={<PencilSquareIcon className="h-4 w-4" />}
                    >
                        Admin
                    </MenuButton>
                    <MenuList>
                        <MenuItem
                            as={NextLink}
                            href={`/drink/${drink.id}`}
                            icon={<PencilIcon className="h-4 w-4" />}
                        >
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
    );
};

export default RecommendedProduct;

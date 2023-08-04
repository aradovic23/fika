import { Badge, Box, Heading, Text, VStack } from '@chakra-ui/react';
import type { Category, Drink } from '@prisma/client';
import ChakraImage from './ui/ChakraImage';

export type DrinkWithCategory = Drink & {
  category: Category;
};

type Props = {
  type: 'drinks' | 'categories';
  data: DrinkWithCategory | Category;
};

export const ImageCard = ({ type, data }: Props) => {
  const isDrink = (data: Drink | Category): data is Drink => {
    return type === 'drinks';
  };

  const drinkImage = isDrink(data) ? ((data.category?.addDescription && data.image) || data.category?.url) ?? '' : '';

  return (
    <VStack rounded="md" shadow="md" userSelect="none" scrollSnapAlign="start">
      <Box
        pos="relative"
        boxSize="sm"
        width="300px"
        height="150px"
        rounded="md"
        overflow="hidden"
        userSelect="none"
        draggable="false"
      >
        <ChakraImage
          src={type === 'drinks' ? drinkImage ?? '' : (data as Category).url ?? ''}
          alt="image"
          objectFit="cover"
          sizes="100vw"
          width={300}
          height={300}
        />
        <Box
          pos="absolute"
          inset={0}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          color="white"
          p="4"
          textAlign="center"
          bgGradient="linear(to-t, crust.200 0%, transparent 60%)"
        >
          {type === 'drinks' && (
            <Badge variant="subtle" rounded="md" pos="absolute" top={5} right={5}>
              {(data as DrinkWithCategory).category.categoryName}
            </Badge>
          )}
          <VStack pos="absolute" bottom={5}>
            {type === 'drinks' && <Text>{(data as Drink).price} RSD</Text>}
            <Heading fontSize="2xl" fontWeight="bold" mt="0 !important" noOfLines={[1, 2]}>
              {type === 'drinks' ? (data as Drink).title : (data as Category).categoryName}
            </Heading>
          </VStack>
        </Box>
      </Box>
    </VStack>
  );
};
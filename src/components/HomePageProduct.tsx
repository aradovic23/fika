import { Badge, Box, Heading, Text, VStack } from '@chakra-ui/react';
import type { Drink } from '@prisma/client';
import { useGetCategory } from '../hooks/useGetCategory';
import ChakraImage from './ui/ChakraImage';

export const HomePageProduct = ({ product }: { product: Drink }) => {
  const { category } = useGetCategory(product.categoryId ?? 1) ?? '';
  const hasDescription = category?.addDescription;
  return (
    <VStack rounded="md" shadow="md" userSelect="none">
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
          src={((hasDescription && product.image) || category?.url) ?? ''}
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
          <Badge variant="subtle" rounded="md" pos="absolute" top={5} right={5}>
            {category?.categoryName}
          </Badge>
          <VStack pos="absolute" bottom={5}>
            <Text>{product.price} RSD</Text>
            <Heading fontSize="2xl" fontWeight="bold" mt="0 !important" noOfLines={[1, 2]}>
              {product.title}
            </Heading>
          </VStack>
        </Box>
      </Box>
    </VStack>
  );
};

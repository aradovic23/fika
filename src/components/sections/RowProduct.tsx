import { Badge, Box, Heading, Hide, Text, VStack } from '@chakra-ui/react';
import type { Category, Drink } from '@prisma/client';
import Link from 'next/link';
import ChakraImage from '../ui/ChakraImage';
import { SlideInModal } from '../ui/SlideInModal';

export type DrinkWithCategory = Drink & {
  category: Category;
};

export function RowProduct<T>({ type, data, showModal }: { type: string; data: T; showModal?: boolean }) {
  return (
    <VStack rounded="md" shadow="md" scrollSnapAlign="start">
      <Box
        pos="relative"
        boxSize="sm"
        width="300px"
        height="150px"
        rounded="md"
        overflow="hidden"
        draggable="false"
        userSelect="none"
      >
        {showModal && (
          <Hide above="md">
            <Box zIndex={10} position="absolute" w="full" h="full">
              <SlideInModal
                title={(data as Drink).title || (data as Category).categoryName}
                description={(data as Drink).description}
                image={(data as Drink).image}
              />
            </Box>
          </Hide>
        )}
        {type === 'categories' && (
          <Link
            href={`/drinks?category=${(data as Category).id}`}
            className="h-150px w-150px absolute inset-0 z-50"
          ></Link>
        )}
        <ChakraImage
          src={
            type === 'categories'
              ? (data as Category).url ?? ''
              : ((data as Drink).image || (data as DrinkWithCategory).category.url) ?? ''
          }
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
}

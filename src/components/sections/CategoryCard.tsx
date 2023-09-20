import { HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

interface Props {
  selectedCategoryId: number;
  onSelect: (categoryId: number) => void;
  count: number;
  categoryId: number;
  categoryName: string;
}

function CategoryCard({ selectedCategoryId, onSelect, count, categoryName, categoryId }: Props) {
  return (
    <Stack
      direction={'column'}
      bg={selectedCategoryId === categoryId ? 'orange' : 'gray.300'}
      cursor="pointer"
      p="3"
      maxH="10rem"
      rounded="md"
      userSelect="none"
      onClick={() => onSelect(categoryId)}
      justifyContent="space-between"
    >
      <Text fontWeight="semibold">{categoryName}</Text>
      <HStack justify="space-between">
        <Text fontSize="sm">{count} items</Text>
        {selectedCategoryId === categoryId && (
          <Icon fontWeight="bold">
            <ChevronRightIcon />
          </Icon>
        )}
      </HStack>
    </Stack>
  );
}

export default CategoryCard;

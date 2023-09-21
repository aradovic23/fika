import { HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  selectedCategoryId: number;
  onSelect: (categoryId: number) => void;
  count: number;
  categoryId: number;
  categoryName: string;
}

function CategoryCard({ selectedCategoryId, onSelect, count, categoryName, categoryId }: Props) {

  const { t } = useTranslation('common');

  return (
    <Stack
      direction={'column'}
      bg={selectedCategoryId === categoryId ? 'primary.500' : 'gray.300'}
      color={selectedCategoryId === categoryId ? 'white' : undefined}
      cursor="pointer"
      p="3"
      minH="7rem"
      rounded="md"
      userSelect="none"
      onClick={() => onSelect(categoryId)}
      justifyContent="space-between"
      _hover={{
        bg: selectedCategoryId === categoryId ? 'primary.600' : 'gray.400',
      }}
    >
      <Text fontWeight="semibold">{categoryName}</Text>
      <HStack justify="space-between">
        <Text fontSize="sm">
          {count} {t('products.card_item')}
        </Text>
        {selectedCategoryId === categoryId && (
          <Icon fontWeight="bold">
            <ChevronRight strokeWidth={3} />
          </Icon>
        )}
      </HStack>
    </Stack>
  );
}

export default CategoryCard;

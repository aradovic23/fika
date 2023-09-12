import { Divider, VStack } from '@chakra-ui/react';
import { BulkUpdateRecomendations } from '../bulk';

export default function ProductSettings() {
  return (
    <VStack bg="whiteAlpha.500" p="5" alignItems="flex-start" divider={<Divider />} spacing={5}>
      <BulkUpdateRecomendations addToRecommended={true} title="Add multiple products to recommendations" />
      <BulkUpdateRecomendations addToRecommended={false} title="Remove multiple products from recommendations" />
    </VStack>
  );
}

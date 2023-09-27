import { Heading, Stack, Text } from '@chakra-ui/react';
import { AlertTriangle } from 'lucide-react';

export const NoResults = () => {
  return (
    <Stack alignItems="center" mt="5">
      <AlertTriangle size={32} />
      <Heading size="lg">No results found 🥺</Heading>
      <Stack alignItems="center">
        <Text>We couldn&apos;t find what you searched for.</Text>
        <Text>Try searching again.</Text>
      </Stack>
    </Stack>
  );
};

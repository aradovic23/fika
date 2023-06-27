import { Center, Spinner } from '@chakra-ui/react';

export const LoaderSpinner = () => {
  return <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="lg" />;
};

export const PageSpinner = () => {
  return (
    <Center h="calc(100vh)">
      <Spinner size="xl" thickness="4px" color="primary.500" emptyColor="gray.200" />
    </Center>
  );
};

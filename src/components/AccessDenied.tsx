import { Center, Heading, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';

const AccessDenied = () => {
  return (
    <>
      <Head>
        <title>Access Denied | Fika</title>
      </Head>
      <Center h="calc(100vh)">
        <VStack spacing="3">
          <Heading>Access denied</Heading>
          <Text>You are not signed in or you don&apos;t have admin permissions</Text>
        </VStack>
      </Center>
    </>
  );
};

export default AccessDenied;

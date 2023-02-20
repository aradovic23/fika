import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Heading, Stack, Text } from "@chakra-ui/react";

export const NoResults = () => {
  return (
    <Stack alignItems="center" mt="5">
      <ExclamationTriangleIcon className="h-8 w-8" />
      <Heading size="lg">No results found</Heading>
      <Stack alignItems="center">
        <Text>We couldn&apos;t find what you searched for.</Text>
        <Text>Try searching again.</Text>
      </Stack>
    </Stack>
  );
};

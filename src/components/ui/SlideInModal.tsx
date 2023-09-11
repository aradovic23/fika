import { Box, Button, Container, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { Drawer } from 'vaul';

type Props = {
  title?: string | null;
  description?: string | null;
  image?: string | null;
};

export const SlideInModal = ({ title, description, image }: Props) => {
  if (description?.length === 0 || !description) {
    return null;
  }

  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <Button
          type="button"
          variant="ghost"
          pos="absolute"
          h="full"
          inset={0}
          zIndex={99}
          _hover={{
            backgroundColor: 'transparent',
          }}
          _active={{
            backgroundColor: 'transparent',
          }}
        ></Button>
      </Drawer.Trigger>
      <Drawer.Overlay className="fixed inset-0 bg-martinique-900/50 " />
      <Drawer.Portal>
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-20 mt-24 flex h-full max-h-[96%] flex-col rounded-t-[10px] bg-martinique-300">
          <Container bg="white" flex={1} roundedTop="10px" p="4">
            <Box bg="gray.300" mx="auto" mb="8" h="1.5" w="12" flexShrink={0} rounded="full" />
            <VStack mx="auto" maxW="2xl" alignItems="center" w="full" h="full">
              <Drawer.Title className="mb-4 text-xl font-medium">{title}</Drawer.Title>
              {description.length > 0 && description && (
                <Text color="gray.700" mb="2" noOfLines={5}>
                  {description}
                </Text>
              )}
              {image && <Image src={image ?? ''} alt="image" height={300} width={300} className="rounded-lg" />}
            </VStack>
          </Container>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

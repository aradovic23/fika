import { Button, IconButton, Text } from '@chakra-ui/react';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Drawer } from 'vaul';

type Props = {
  title?: string | null;
  description?: string | null;
  image?: string | null;
};

export const SlideInModal = ({ title, description, image }: Props) => {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <Button
          as={IconButton}
          icon={<ArrowsPointingOutIcon className="h-5 w-5" />}
          type="button"
          variant="ghost"
          bg="whiteAlpha.100"
          color="whiteAlpha.900"
          pos="absolute"
          h="full"
          inset={0}
          _hover={{
            backgroundColor: 'transparent',
          }}
        ></Button>
      </Drawer.Trigger>
      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      <Drawer.Portal>
        <Drawer.Content className=" fixed bottom-0 left-0 right-0 z-20 mt-24 flex h-full max-h-[96%] flex-col rounded-t-[10px] bg-gray-100">
          <div className="flex-1 rounded-t-[10px] bg-white p-4">
            <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
            <div className="mx-auto flex max-w-md flex-col items-center">
              <Drawer.Title className="mb-4 text-xl font-medium">{title}</Drawer.Title>
              {description && (
                <Text color="gray.700" mb="2" noOfLines={5}>
                  {description}
                </Text>
              )}
              {image && <Image src={image ?? ''} alt="image" height={300} width={300} className="rounded-lg" />}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
import { Box, Button, Progress, Text, VStack, useToast, Container, HStack, Flex } from '@chakra-ui/react';
import { Check, Cloud, ImageIcon } from 'lucide-react';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Drawer } from 'vaul';
import { useUploadThing } from '../lib/uploadthing';
import { api } from '../utils/api';

function UploadDropzone({ productId, closeDrawer }: { productId: string; closeDrawer: () => void }) {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const toast = useToast();
  const utils = api.useContext();

  const { startUpload } = useUploadThing('productImageUploader');

  const { mutate: startPolling } = api.drinks.getFile.useMutation({
    onSuccess: async () => {
      await utils.drinks.getDrinkById.invalidate();
    },
    retry: true,
    retryDelay: 500,
  });

  const startSimulatedProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 500);
    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async acceptedFile => {
        setIsUploading(true);
        const progressInterval = startSimulatedProgress();
        const res = await startUpload(acceptedFile, { productId });
        if (!res) {
          return toast({
            title: 'Something went wrong',
            description: 'Please try again later',
            status: 'error',
          });
        }

        const [fileResponse] = res;

        const key = fileResponse?.key;

        if (!key) {
          return toast({
            title: 'Something went wrong',
            description: 'Please try again later',
            status: 'error',
          });
        }

        clearInterval(progressInterval);
        setUploadProgress(100);

        startPolling({ key, productId });
        await utils.drinks.getDrinkById.invalidate();
        await utils.drinks.getPaginatedDrinks.invalidate();
        closeDrawer();
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <Box {...getRootProps()} w="lg">
          <VStack h="full" w="full" justify="center" align="center">
            <label
              htmlFor="dropzone-file"
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg p-4 outline outline-2 outline-blue-300 hover:bg-blue-50"
            >
              <VStack align="center" pb="6" pt="5" spacing={0}>
                <Cloud className="mb-2 text-zinc-500" />
                <Text mb="2" fontSize="sm">
                  Click to upload{' '}
                  <Text as="span" fontWeight="semibold">
                    or drag and drop
                  </Text>
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Image (up to 4MB)
                </Text>
              </VStack>

              {acceptedFiles && acceptedFiles[0] ? (
                <HStack
                  spacing={0}
                  maxW="md"
                  overflow="hidden"
                  rounded="md"
                  outline="1px solid"
                  outlineColor="gray.200"
                >
                  <Flex
                    h="full"
                    align="center"
                    justify="center"
                    px={2}
                    py={1}
                    borderRight="1px solid"
                    borderColor="gray.200"
                  >
                    <ImageIcon size={16} className="text-blue-500" />
                  </Flex>
                  <Text isTruncated fontSize="sm" h="full" px={3} py={2}>
                    {acceptedFiles[0].name}
                  </Text>
                </HStack>
              ) : null}

              {isUploading ? (
                <Container w="md" mt="4">
                  <Progress
                    h={2}
                    w="full"
                    bg="gray.200"
                    rounded="md"
                    colorScheme={uploadProgress === 100 ? 'green' : 'blue'}
                    value={uploadProgress}
                  />
                  {uploadProgress === 100 ? (
                    <HStack justify="center" mt="2" spacing={1}>
                      <Check className="text-green-500" size={16} />
                      <Text fontSize="sm">Success!</Text>
                    </HStack>
                  ) : null}
                </Container>
              ) : null}

              <input {...getInputProps()} type="file" id="dropzone-file" className="hidden" />
            </label>
          </VStack>
        </Box>
      )}
    </Dropzone>
  );
}

function UploadImageButton({ productId }: { productId: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Drawer.Root
      shouldScaleBackground
      open={isOpen}
      onOpenChange={v => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <Drawer.Trigger asChild onClick={() => setIsOpen(true)}>
        <Button>Upload Image</Button>
      </Drawer.Trigger>
      <Drawer.Overlay className="fixed inset-0 bg-martinique-900/50 " />
      <Drawer.Portal>
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-20 mt-24 flex h-full max-h-[96%] w-full flex-col rounded-t-[10px] bg-martinique-300">
          <VStack bg="white" flex={1} roundedTop="10px" p="4">
            <Box bg="gray.300" mx="auto" mb="8" h="1.5" w="12" flexShrink={0} rounded="full" />
            <VStack mx="auto" alignItems="center" w="full" h="full" spacing={5}>
              <Drawer.Title className="mb-4 text-xl font-medium">Image Selector</Drawer.Title>
              <UploadDropzone productId={productId} closeDrawer={() => setIsOpen(false)} />
              <Drawer.Close asChild>
                <Button colorScheme="offRed" variant="ghost">
                  Cancel
                </Button>
              </Drawer.Close>
            </VStack>
          </VStack>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
export default UploadImageButton;

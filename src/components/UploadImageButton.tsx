import { Box, Button, Progress, VStack, useToast } from '@chakra-ui/react';
import { Check, Cloud, File } from 'lucide-react';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Drawer } from 'vaul';
import { useUploadThing } from '../lib/uploadthing';
import { api } from '../utils/api';

function UploadDropzone({ productId }: { productId: string }) {
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
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div {...getRootProps()}>
          <div className="flex h-full w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg  hover:bg-gray-50"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5 ">
                <Cloud className="mb-2 h-6 w-6 text-zinc-500" />
                <p className="mb-2 text-sm text-zinc-700">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-zinc-500">Image (up to 4MB)</p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="flex max-w-md items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-[1px] outline-zinc-200">
                  <div className="grid h-full place-items-center px-3 py-2">
                    <File className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="h-full truncate px-3 py-2 text-sm">{acceptedFiles[0].name}</div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="mx-auto mt-4 w-full max-w-md">
                  <Progress
                    colorScheme={uploadProgress === 100 ? 'green' : 'blue'}
                    value={uploadProgress}
                    className="h-1 w-full bg-zinc-200"
                  />
                  {uploadProgress === 100 ? (
                    <div className="flex items-center justify-center gap-1 pt-2 text-center text-sm text-zinc-700">
                      <Check className="h-4 w-4 text-green-500" />
                      Success!
                    </div>
                  ) : null}
                </div>
              ) : null}

              <input {...getInputProps()} type="file" id="dropzone-file" className="hidden" />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
}

function UploadImageButton({ productId }: { productId: string }) {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <Button>Upload Image</Button>
      </Drawer.Trigger>
      <Drawer.Overlay className="fixed inset-0 bg-martinique-900/50 " />
      <Drawer.Portal>
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-20 mt-24 flex h-full max-h-[96%] w-full flex-col rounded-t-[10px] bg-martinique-300">
          <VStack bg="white" flex={1} roundedTop="10px" p="4">
            <Box bg="gray.300" mx="auto" mb="8" h="1.5" w="12" flexShrink={0} rounded="full" />
            <VStack mx="auto" alignItems="center" w="full" h="full">
              <Drawer.Title className="mb-4 text-xl font-medium">Title</Drawer.Title>
              <UploadDropzone productId={productId} />
              <Drawer.Close asChild>
                <Button>Close</Button>
              </Drawer.Close>
            </VStack>
          </VStack>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
export default UploadImageButton;

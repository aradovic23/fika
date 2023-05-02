import { Box, Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { generateReactHelpers } from "@uploadthing/react";
import { useState } from "react";
import type { OurFileRouter } from "../server/uploadthing";
import { LoaderSpinner } from "./LoaderSpinner";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

interface Props {
    handleUploadedImage: (image: string) => void;
    handleLoadingState: (state: boolean) => void;
}

export function MultiUploader({ handleUploadedImage, handleLoadingState }: Props) {

    const { getRootProps, getInputProps, files, startUpload, isDragActive } =
        useUploadThing("imageUploader");
    const [isLoading, setIsLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleFileUpload = async (): Promise<void> => {
        setIsLoading(true)
        handleLoadingState(true)
        const res = await startUpload();
        const fileUrls: string[] = res.map((item: { fileUrl: string }) => item.fileUrl);
        const singleImage = fileUrls[0];
        handleUploadedImage(singleImage ?? '');
        handleLoadingState(false);
        setIsLoading(false)
    };

    return (
        <>

            <Button onClick={onOpen}>Upload Image</Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center {...getRootProps()} p="5" shadow="outline" rounded="md">
                            <input {...getInputProps()} />
                            <Box>
                                {isLoading ? (
                                    <LoaderSpinner />
                                ) : files.length > 0 ? (
                                    <Button onClick={handleFileUpload} type="button" variant="ghost" colorScheme="purple">
                                        Upload {files.length} image
                                    </Button>
                                ) : isDragActive ? (
                                    'Drop here'
                                ) : (
                                    'Drop files here...'
                                )}
                            </Box>
                        </Center>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

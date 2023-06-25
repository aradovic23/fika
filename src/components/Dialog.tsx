import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react"


interface Props {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string | null;
    image?: string | null;
}

const Dialog = ({ isOpen, onClose, title, description, image }: Props) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={5}>
                        <Text noOfLines={5}>{description}</Text>
                        {image && (
                            <Image
                                alt="product-image"
                                src={image}
                                boxSize="sm"
                                objectFit="cover"
                                rounded="md"
                            />
                        )}
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="primary" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default Dialog

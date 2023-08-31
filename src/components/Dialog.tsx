import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string | null;
  image?: string | null;
}

const Dialog = ({ isOpen, onClose, title, description, image }: Props) => {
  const { t } = useTranslation('common');

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={5}>
            <Text noOfLines={5}>{description}</Text>
            {image && <Image alt="product-image" src={image} boxSize="sm" objectFit="cover" rounded="md" />}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="primary" onClick={onClose}>
            {t('dialog.close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Dialog;

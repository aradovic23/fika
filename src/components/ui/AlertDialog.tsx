import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onAction: () => void;
  isLoading?: boolean;
}

export const AlertDialogModal = ({ isOpen, onClose, title, message, onAction, isLoading }: Props) => {
  const cancelRef = useRef(null);
  const { t } = useTranslation('common');

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} isLoading={isLoading}>
              {t('dialog.cancel')}
            </Button>
            <Button isLoading={isLoading} colorScheme="red" onClick={onAction} ml={3}>
              {t('dialog.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

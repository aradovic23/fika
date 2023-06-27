import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';

interface Props {
  status?: 'loading' | 'error' | 'info' | 'warning' | 'success' | undefined;
  title?: string;
  description?: string;
}

const Notice = ({ status = 'info', title = 'Title', description }: Props) => {
  return (
    <Alert status={status} rounded="md">
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
};

export default Notice;

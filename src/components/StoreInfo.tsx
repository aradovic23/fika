import { Image, VStack } from '@chakra-ui/react';
import type { FC } from 'react';

interface Props {
  name?: string;
  fileUrl: string | null;
  id?: number;
}

const StoreInfo: FC<Props> = ({ fileUrl }) => {
  return <VStack>{fileUrl && <Image src={fileUrl} alt="logo" objectFit="cover" boxSize="sm" rounded="md" />}</VStack>;
};

export default StoreInfo;

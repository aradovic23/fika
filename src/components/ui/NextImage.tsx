import Image from 'next/image';
import { chakra } from '@chakra-ui/react';

export const NextImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt', 'fill'].includes(prop),
});

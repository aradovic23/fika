import type { TextProps } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

export function TruncatedText(props: TextProps) {
  return <Text {...props} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" />;
}

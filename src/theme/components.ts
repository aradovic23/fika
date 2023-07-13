import type { StyleFunctionProps } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { dividerTheme } from './components/divider';

export const components = {
  Button: {
    variants: {
      user: (props: StyleFunctionProps) => ({
        bg: mode('maroon.100', 'maroon.200')(props),
        color: mode('text.100', 'text.200')(props),
        _hover: {
          bg: mode('maroon.300', 'maroon.400')(props),
        },
      }),
      solid: (props: StyleFunctionProps) => ({
        bg: mode('mauve.100', 'mauve.200')(props),
        color: mode('text.200', 'text.100')(props),
        _hover: {
          bg: mode('mauve.300', 'mauve.400')(props),
        },
      }),
    },
  },
  Divider: dividerTheme,
};

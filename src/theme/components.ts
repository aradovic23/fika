import { mode } from '@chakra-ui/theme-tools';
import type { StyleFunctionProps } from '@chakra-ui/react';
import { dividerTheme } from './components/divider';
import { switchTheme } from './components/switch';

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
    },
  },
  Divider: dividerTheme,
  Switch: switchTheme,
};

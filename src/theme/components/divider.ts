import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const brandPrimary = defineStyle({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'mauve.400',

  _dark: {
    borderColor: 'mauve.300',
  },
});

export const dividerTheme = defineStyleConfig({
  variants: {
    brand: brandPrimary,
  },
});

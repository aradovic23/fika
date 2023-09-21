import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const switchConfig = createMultiStyleConfigHelpers(switchAnatomy.keys);

const admin = switchConfig.definePartsStyle({
  track: {
    bg: 'gray.300',
    _checked: {
      bg: 'magenta.100',
    },
  },
});

export const switchTheme = switchConfig.defineMultiStyleConfig({ variants: { admin } });

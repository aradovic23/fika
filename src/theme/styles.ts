import { mode } from '@chakra-ui/theme-tools';
import type { Styles } from '@chakra-ui/theme-tools';

export const styles: Styles = {
  global: props => ({
    body: {
      bg: mode('#eff1f5', '#1e1e2e')(props),
      color: mode('crust.200', 'crust.100')(props),
    },
  }),
};

import { components } from './components';
import { colors } from './colors';
import { styles } from './styles';
import { extendTheme, type ThemeConfig, theme as base } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  cssVarPrefix: 'drinksapp',
};

const theme = extendTheme({
  fonts: {
    heading: `Montserrat, ${base.fonts?.heading}`,
    body: `Inter, ${base.fonts?.body}`,
  },
  config,
  styles,
  colors,
  components,
});

export default theme;

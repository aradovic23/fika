import { extendTheme, type ThemeConfig, theme as base } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  cssVarPrefix: 'drinksapp',
};

const theme = extendTheme({
  fonts: {
    heading: `Montserrat, ${base.fonts?.heading}`,
    body: `Inter, ${base.fonts?.body}`,
  },
  config,
  colors: {
    primary: {
      50: '#dff4fe',
      100: '#afe3fc',
      200: '#78d1fb',
      300: '#38bef8',
      400: '#00b1f8',
      500: '#00a3f5',
      600: '#0095e6',
      700: '#0082d2',
      800: '#0071bd',
      900: '#00519b',
    },
  },
});

export default theme;

// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  cssVarPrefix: "drinksapp",
};

// 3. extend the theme
const theme = extendTheme({
  config,
  colors: {
    primary: {
      50: "#dff4fe",
      100: "#afe3fc",
      200: "#78d1fb",
      300: "#38bef8",
      400: "#00b1f8",
      500: "#00a3f5",
      600: "#0095e6",
      700: "#0082d2",
      800: "#0071bd",
      900: "#00519b",
    },
  },
});

export default theme;

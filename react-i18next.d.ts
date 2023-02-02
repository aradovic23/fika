// import the original type declarations
import "react-i18next";
// import all namespaces (for the default language, only)
import type { Resources as MyResources } from "./types";

declare module "react-i18next" {
  // and extend them!
  type Resources = MyResources;
}

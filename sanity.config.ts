import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";

// import { env } from "./src/env/server.mjs";

// const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
// const dataset = env.NEXT_PUBLIC_SANITY_DATASET;

export default defineConfig({
  basePath: "/studio",
  name: "DrinksApp_Studio",
  title: "DrinksApp Studio",
  projectId: "w3km9bxh",
  dataset: "production",
  plugins: [deskTool(), visionTool(), unsplashImageAsset()],
  schema: {
    types: schemaTypes,
  },
});

// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));
import configI18 from "./next-i18next.config.mjs";

/** @type {import("next").NextConfig} */

const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: configI18.i18n,
  images: {
    domains: [
      "placeimg.com",
      "images.unsplash.com",
      "lh3.googleusercontent.com",
    ],
  },
  experimental: {
    esmExternals: false,
  },
};

export default config;

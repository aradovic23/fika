module.exports = {
  debug: false,
  saveMissing: true,
  saveMissingTo: "all",
  i18n: {
    defaultLocale: "en",
    locales: ["sv", "en"],
    localeDetection: true,
    fallbackLng: ["en"],
  },
  react: { useSuspence: false },
  lookupCookie: "NEXT_LOCALE",
  backend: {
    loadPath: process.cwd() + "/public/locales/{{lng}}/{{ns}}.json",
    addPath: process.cwd() + "/public/locales/{{lng}}/{{ns}}.json",
  },
};

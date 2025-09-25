import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru", "az", "tr"],
  defaultLocale: "ru",
  localePrefix: "as-needed",
});

// i18n/request.ts
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
const locale = (await requestLocale) ?? "ru";
  const messages = (await import(`../../messages/${locale}.json`)).default;
  return { locale, messages };
});
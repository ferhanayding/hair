import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "ru", "az"],
  defaultLocale: "ru",
  localePrefix: "always"
});



export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
};
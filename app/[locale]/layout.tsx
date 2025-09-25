// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import "../globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

// export type Locale = "en" | "ru" | "az" | "tr";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
// export async function generateMetadata(
//   props: Omit<LayoutProps<"/[locale]">, "children">
// ) {
//   const { locale } = await props.params;

//   const t = await getTranslations({
//     locale: locale as Locale,
//     namespace: "RootLayout",
//   });

//   return {
//     title: t("title"),
//   };
// }
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params:Promise<{locale:string}>
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className="min-h-dvh bg-white text-neutral-900 antialiased">
        <NextIntlClientProvider
         
        >
          <Header locale={locale} />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

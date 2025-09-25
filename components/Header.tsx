"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LangSwitcher from "./LangSwitcher";

export default function Header({ locale }: { locale: "az" | "ru" | "en" }) {
  const t = useTranslations("nav");
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-bold">Atria</span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          <Link href="#treatments" className="hover:opacity-80">
            {t("treatments")}
          </Link>
          <Link href="#results" className="hover:opacity-80">
            {t("results")}
          </Link>
          <Link href="#contact" className="hover:opacity-80">
            {t("contact")}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitcher current={locale}/>
          <a href="#contact" className="btn btn-primary text-sm">{t("book")}</a>
        </div>
      </div>
    </header>
  );
}

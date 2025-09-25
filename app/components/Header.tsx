"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LangSwitcher from "./lang-switcher";

export default function Header({ locale }: { locale: "az" | "ru" | "en" |"tr" }) {
  const t = useTranslations("nav");
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[hsl(var(--color-forest))]/95 text-[hsl(var(--color-contrast))] shadow-sm backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--color-forest))]/80">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 md:flex-nowrap">
        <Link href="/" className="flex items-center gap-2 text-[hsl(var(--color-contrast))]">
          <Image src="/logo.svg" alt="Atria logo" width={32} height={32} className="h-8 w-8" priority />
          <span className="text-lg font-semibold tracking-tight">Atria</span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          <Link href="#about" className="text-white/80 transition hover:text-white">
            {t("about")}
          </Link>
          <Link href="#treatments" className="text-white/80 transition hover:text-white">
            {t("treatments")}
          </Link>
          <Link href="#results" className="text-white/80 transition hover:text-white">
            {t("results")}
          </Link>
          <Link href="#contact" className="text-white/80 transition hover:text-white">
            {t("contact")}
          </Link>
        </nav>
        <div className="flex flex-wrap items-center gap-3">
          <LangSwitcher current={locale} />
          <a href="#contact" className="btn btn-primary text-sm shadow-[0_10px_30px_-12px_rgba(244,162,97,0.9)] hover:shadow-[0_12px_34px_-10px_rgba(244,162,97,0.95)]">
            {t("book")}
          </a>
        </div>
      </div>
    </header>
  );
}

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="space-y-6">
          <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium">
            {t("badge")}
          </span>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {t("title")}<span className="text-[hsl(var(--brand))]"> Atria</span>
          </h1>
          <p className="text-neutral-600 text-lg">{t("subtitle")}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="#contact" className="btn btn-primary">{t("cta")}</a>
            <a href="#results" className="btn btn-ghost">{t("cta2")}</a>
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-neutral-600 md:max-w-md">
            <li>✓ FUE / DHI / Sapphire</li>
            <li>✓ PRP & post‑op care</li>
            <li>✓ Sterile ORs</li>
            <li>✓ Bilingual staff</li>
          </ul>
        </div>
        <div className="relative">
          <Image
            src="/founder.jpg"
            alt="Founder photo"
            width={640}
            height={640}
            priority
            className="h-auto w-full max-w-lg mx-auto drop-shadow-2xl"
          />
          <p className="mt-3 text-center text-sm text-neutral-500">{t("founderCaption")}</p>
        </div>
      </div>
    </section>
  );
}

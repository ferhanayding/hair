import Image from "next/image";
import { useTranslations } from "next-intl";

type AboutContent = {
  body: string[];
  highlights: string[];
};

export default function AboutSection() {
  const t = useTranslations("about");
  const content = t.raw("content") as AboutContent | undefined;
  const body = content?.body ?? [];
  const highlights = content?.highlights ?? [];

  return (
    <section id="about" className="scroll-mt-24 bg-neutral-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-6">
          <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-600">
            {t("eyebrow")}
          </span>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="text-lg text-neutral-600">{t("subtitle")}</p>
          <div className="space-y-4 text-neutral-600">
            {body.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
          <ul className="grid gap-2 text-sm text-neutral-700 md:grid-cols-2">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-[hsl(var(--brand))]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative isolate overflow-hidden rounded-3xl bg-white p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)]">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[hsl(var(--brand))]/10 via-transparent to-[hsl(var(--brand))]/20" />
          <Image
            src="/founder.jpg"
            alt={t("imageAlt")}
            width={520}
            height={640}
            className="mx-auto w-full max-w-sm rounded-2xl object-cover"
          />
          <div className="mt-6 space-y-3 text-sm text-neutral-700">
            <p className="font-semibold text-neutral-900">{t("experience")}</p>
            <p>{t("care")}</p>
            <p className="text-neutral-500">{t("note")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

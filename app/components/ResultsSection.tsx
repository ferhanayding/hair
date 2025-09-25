import { useTranslations } from "next-intl";

type CaseStudy = {
  name: string;
  summary: string;
  metrics: string[];
};

export default function ResultsSection() {
  const t = useTranslations("results");
  const cases = (t.raw("cases") as CaseStudy[]) ?? [];

  return (
    <section id="results" className="scroll-mt-24 bg-neutral-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
              {t("eyebrow")}
            </span>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {t("title")}
            </h2>
            <p className="text-lg text-white/80">{t("description")}</p>
          </div>
          <p className="text-sm text-white/60 md:max-w-xs">{t("note")}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cases.map((item, idx) => (
            <article
              key={`${item.name}-${idx}`}
              className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                <p className="text-sm text-white/70">{item.summary}</p>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-white/80">
                {item.metrics.map((metric, metricIdx) => (
                  <li key={metricIdx} className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 px-4 py-2">
                    <span>{metric}</span>
                    <span aria-hidden className="h-2 w-2 rounded-full bg-[hsl(var(--brand))]" />
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

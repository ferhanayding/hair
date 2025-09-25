import { useTranslations } from "next-intl";

type TreatmentItem = {
  name: string;
  summary: string;
  points: string[];
};

export default function TreatmentsSection() {
  const t = useTranslations("treatments");
  const items = (t.raw("items") as TreatmentItem[]) ?? [];

  return (
    <section id="treatments" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
            {t("eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-neutral-600">{t("description")}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item, idx) => (
            <article
              key={`${item.name}-${idx}`}
              className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 text-left shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)]"
            >
              <h3 className="text-xl font-semibold text-neutral-900">{item.name}</h3>
              <p className="mt-2 text-sm text-neutral-600">{item.summary}</p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-700">
                {item.points.map((point, pointIdx) => (
                  <li key={pointIdx} className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-[hsl(var(--brand))]" />
                    <span>{point}</span>
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

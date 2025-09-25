import { useTranslations } from "next-intl";

type StatItem = {
  value: string;
  label: string;
};

export default function StatsStrip() {
  const t = useTranslations("stats");
  const items = (t.raw("items") as StatItem[]) ?? [];

  return (
    <section
      className="bg-[hsl(var(--color-forest))] text-[hsl(var(--color-contrast))]"
      aria-label={t("ariaLabel")}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        {items.map((item, idx) => (
          <div key={idx} className="text-center md:text-left">
            <p className="text-3xl font-semibold tracking-tight md:text-4xl">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-white/75 md:text-base">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import { useTranslations } from "next-intl";

type FormContent = {
  title: string;
  fields: {
    name: string;
    email: string;
    country: string;
    message: string;
  };
  submit: string;
  privacy: string;
};

export default function ContactSection() {
  const t = useTranslations("contact");
  const form = t.raw("form") as FormContent | undefined;
  const phone = t("phone");
  const phoneHref = phone.replace(/\s+/g, "");
  const whatsappNumber = t("whatsapp");
  const whatsappHref = whatsappNumber.replace(/\D+/g, "");

  return (
    <section id="contact" className="scroll-mt-24 bg-[hsl(var(--color-forest-soft))]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div className="space-y-6">
          <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-[hsl(var(--color-muted))]">
            {t("eyebrow")}
          </span>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="text-lg text-[hsl(var(--color-muted))]">{t("description")}</p>
          <div className="space-y-4 rounded-3xl border border-white/40 bg-white/90 p-6 text-[hsl(var(--color-forest))] shadow-[0_18px_50px_-32px_rgba(35,64,62,0.65)]">
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-400">
                {t("phoneLabel")}
              </p>
              <a href={`tel:${phoneHref}`} className="mt-1 inline-flex text-lg font-semibold text-neutral-900">
                {phone}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-400">
                {t("whatsappLabel")}
              </p>
              <a
                href={`https://wa.me/${whatsappHref}`}
                className="mt-1 inline-flex text-lg font-semibold text-[hsl(var(--brand))]"
              >
                {t("whatsappDisplay")}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-400">
                {t("addressLabel")}
              </p>
              <p className="mt-1 text-sm text-neutral-600">{t("address")}</p>
            </div>
          </div>
        </div>
        <form
          className="space-y-5 rounded-3xl border border-white/40 bg-white/95 p-6 shadow-[0_32px_90px_-45px_rgba(35,64,62,0.5)]"
          aria-label={form?.title}
        >
          <h3 className="text-xl font-semibold text-[hsl(var(--color-forest))]">{form?.title}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col text-sm text-[hsl(var(--color-muted))]">
              {form?.fields.name}
              <input
                type="text"
                name="name"
                className="mt-2 rounded-2xl border border-white/60 px-4 py-3 text-neutral-900 focus:border-[hsl(var(--brand))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]/40"
                placeholder={form?.fields.name}
                required
              />
            </label>
            <label className="flex flex-col text-sm text-[hsl(var(--color-muted))]">
              {form?.fields.email}
              <input
                type="email"
                name="email"
                className="mt-2 rounded-2xl border border-white/60 px-4 py-3 text-neutral-900 focus:border-[hsl(var(--brand))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]/40"
                placeholder={form?.fields.email}
                required
              />
            </label>
            <label className="flex flex-col text-sm text-[hsl(var(--color-muted))] md:col-span-2">
              {form?.fields.country}
              <input
                type="text"
                name="country"
                className="mt-2 rounded-2xl border border-white/60 px-4 py-3 text-neutral-900 focus:border-[hsl(var(--brand))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]/40"
                placeholder={form?.fields.country}
              />
            </label>
            <label className="flex flex-col text-sm text-[hsl(var(--color-muted))] md:col-span-2">
              {form?.fields.message}
              <textarea
                name="message"
                rows={4}
                className="mt-2 rounded-2xl border border-white/60 px-4 py-3 text-neutral-900 focus:border-[hsl(var(--brand))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]/40"
                placeholder={form?.fields.message}
                required
              />
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-full md:w-auto">
            {form?.submit}
          </button>
          <p className="text-xs text-neutral-500">{form?.privacy}</p>
        </form>
      </div>
    </section>
  );
}

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-600">
        <p>
          © {new Date().getFullYear()} Atria Hair Clinic · {t("rights")}
        </p>
      </div>
    </footer>
  );
}

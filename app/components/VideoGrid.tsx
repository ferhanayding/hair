import { useTranslations } from "next-intl";

type VideoItem = {
  title: string;
  src: string;
};

export default function VideoGrid() {
  const t = useTranslations("videos");
  const videos = (t.raw("items") as VideoItem[]) ?? [];
  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-[hsl(var(--color-forest))]">{t("title")}</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {videos.map((v, idx) => (
          <figure
            key={idx}
            className="overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-[0_20px_60px_-45px_rgba(35,64,62,0.55)]"
          >
            <iframe
              className="aspect-video w-full"
              src={v.src}
              title={v.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <figcaption className="px-4 py-3 text-sm text-[hsl(var(--color-muted))]">{v.title}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

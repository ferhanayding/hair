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
      <h2 className="mb-6 text-2xl font-semibold">{t("title")}</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {videos.map((v, idx) => (
          <figure key={idx} className="overflow-hidden rounded-2xl border">
            <iframe
              className="aspect-video w-full"
              src={v.src}
              title={v.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <figcaption className="px-4 py-2 text-sm text-neutral-600">{v.title}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

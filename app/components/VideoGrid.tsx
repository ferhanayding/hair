import { useTranslations } from "next-intl";

const VIDEOS = [
  { title: "FUE Procedure – Overview", src: "https://www.youtube.com/embed/5MgBikgcWnY" },
  { title: "Patient Testimonial #1", src: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { title: "DHI Technique Explained", src: "https://www.youtube.com/embed/aqz-KE-bpKQ" },
  { title: "After‑care & PRP", src: "https://www.youtube.com/embed/oHg5SJYRHA0" }
];

export default function VideoGrid() {
  const t = useTranslations("videos");
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">{t("title")}</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {VIDEOS.map((v) => (
          <figure key={v.title} className="rounded-2xl border overflow-hidden">
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

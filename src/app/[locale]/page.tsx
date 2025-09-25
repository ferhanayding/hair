import Hero from "@/components/Hero";
import VideoGrid from "@/components/VideoGrid";

export default function Page() {
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <VideoGrid />
      </section>
    </>
  );
}

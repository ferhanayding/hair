import Hero from "@/app/components/Hero";
import VideoGrid from "@/app/components/VideoGrid";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function Page({
  params
}: {
  params:Promise<{locale:string}>
}) {
  const {locale } = use(params)
    setRequestLocale(locale);

   return (
    <>
      <Hero />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <VideoGrid />
      </section>
    </>
  );
}

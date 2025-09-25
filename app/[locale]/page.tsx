import Hero from "@/app/components/Hero";
import VideoGrid from "@/app/components/VideoGrid";
import StatsStrip from "@/app/components/StatsStrip";
import AboutSection from "@/app/components/AboutSection";
import TreatmentsSection from "@/app/components/TreatmentsSection";
import ResultsSection from "@/app/components/ResultsSection";
import ContactSection from "@/app/components/ContactSection";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function Page({
  params
}: {
  params:Promise<{locale:string}>
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <StatsStrip />
      <AboutSection />
      <TreatmentsSection />
      <ResultsSection />
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <VideoGrid />
        </div>
      </section>
      <ContactSection />
    </>
  );
}

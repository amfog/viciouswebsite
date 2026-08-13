import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { WhatWeDo } from "@/components/WhatWeDo";
import { Ecosystem } from "@/components/Ecosystem";
import { AchievementsStrip } from "@/components/AchievementsStrip";
import { TeamsPreview } from "@/components/TeamsPreview";
import { NewsGrid } from "@/components/NewsGrid";
import { PartnersMarquee } from "@/components/PartnersMarquee";
import { CTASection } from "@/components/CTASection";
import { getAllTeams } from "@/services/roster";

export default async function HomePage() {
  const teams = await getAllTeams();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhatWeDo />
        <Ecosystem />
        <AchievementsStrip />
        <TeamsPreview teams={teams} />
        <NewsGrid />
        <PartnersMarquee />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

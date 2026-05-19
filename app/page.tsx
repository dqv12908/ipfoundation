import Navigation from "@/components/sections/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import MissionSection from "@/components/sections/MissionSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import TokenWorksSection from "@/components/sections/TokenWorksSection";
import StakeholdersSection from "@/components/sections/StakeholdersSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import PartnershipSection from "@/components/sections/PartnershipSection";
import RoadmapSection from "@/components/sections/RoadmapSection";
import LegalBanner from "@/components/sections/LegalBanner";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <>
      <Navigation />
      <ScrollProgress />
      <main>
        <HeroSection />
        <MissionSection />
        <ProblemSection />
        <SolutionSection />
        <TokenWorksSection />
        <StakeholdersSection />
        <BenefitsSection />
        <PartnershipSection />
        <RoadmapSection />
        <LegalBanner />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

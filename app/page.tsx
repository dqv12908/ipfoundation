import Navigation from "@/components/sections/Navigation";
import {
  LuxuryGallerySection,
  LuxuryHeroSection,
  LuxuryLaunchpadSection,
  LuxuryMissionSection,
} from "@/components/sections/LuxuryLandingSections";
import Footer from "@/components/sections/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <>
      <Navigation />
      <ScrollProgress />
      <main>
        <LuxuryHeroSection />
        <LuxuryMissionSection />
        <LuxuryGallerySection />
        <LuxuryLaunchpadSection />
      </main>
      <Footer />
    </>
  );
}

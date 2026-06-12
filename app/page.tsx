import { BackgroundEffects } from "@/components/landing/BackgroundEffects";
import { CTASection } from "@/components/landing/CTASection";
import { FeaturesSection } from "@/components/landing/FeatureSection";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { Navbar } from "@/components/landing/Navbar";
import { StatsSection } from "@/components/landing/StatsSection";
import { WhyChooseUs } from "@/components/landing/WhyChooseUs";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-white">
      <BackgroundEffects />

      <Navbar />
      <HeroSection/>
      <StatsSection />
      <FeaturesSection/>
      <WhyChooseUs />
      <CTASection/>
      <Footer/>
      
    </main>
  );
}
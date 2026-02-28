import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero";
import { StatsSection } from "@/components/sections/stats";
import { ProblemSection } from "@/components/sections/problem";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { DemoSection } from "@/components/sections/demo";
import { FeaturesSection } from "@/components/sections/features";
import { ArchitectureSection } from "@/components/sections/architecture";
import { AssumptionsSection } from "@/components/sections/assumptions";
import { TeamSection } from "@/components/sections/team";
import { TechStackSection } from "@/components/sections/tech-stack";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ProblemSection />
        <HowItWorksSection />
        <DemoSection />
        <FeaturesSection />
        <ArchitectureSection />
        <AssumptionsSection />
        <TeamSection />
        <TechStackSection />
      </main>
      <Footer />
    </div>
  );
}

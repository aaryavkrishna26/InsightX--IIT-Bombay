import { Navbar } from "@/components/navbar";
import { IntroSection } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problem";
import { SolutionSection } from "@/components/sections/how-it-works";
import { ArchitectureSection } from "@/components/sections/architecture";
import { FeaturesSection } from "@/components/sections/features";
import { DemoSection } from "@/components/sections/demo";
import { LimitationsSection } from "@/components/sections/assumptions";
import { TeamSection } from "@/components/sections/team";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6">
        <IntroSection />
        <ProblemSection />
        <SolutionSection />
        <ArchitectureSection />
        <FeaturesSection />
        <DemoSection />
        <LimitationsSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}

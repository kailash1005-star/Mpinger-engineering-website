import CncScrollytelling from "@/components/CncScrollytelling";
import SiteHeader from "@/components/SiteHeader";
import AboutSection from "@/components/AboutSection";
import PartsSection from "@/components/PartsSection";
import MachinesSection from "@/components/MachinesSection";
import ShopfloorSection from "@/components/ShopfloorSection";
import QualitySection from "@/components/QualitySection";
import GlobalSection from "@/components/GlobalSection";
import ContactFooter from "@/components/ContactFooter";

export const metadata = {
  title: "Mpinger Engineering // Precision CNC Manufacturing",
  description:
    "Mpinger Engineering — ISO 9001:2015 certified manufacturer of high-precision 5-axis CNC-milled and turned components. German coordination, Indian manufacturing strength.",
};

export default function Home() {
  return (
    <main
      id="top"
      className="relative min-h-screen bg-[#050505] selection:bg-[#1d6fb5] selection:text-white"
    >
      {/* Premium Minimal Header Overlay */}
      <SiteHeader />

      {/* Scrollytelling Canvas Section */}
      <CncScrollytelling />

      {/* Company narrative sections */}
      <AboutSection />
      <PartsSection />
      <MachinesSection />
      <ShopfloorSection />
      <QualitySection />
      <GlobalSection />
      <ContactFooter />

      {/* Decorative Technical Border Details */}
      <div className="fixed top-0 bottom-0 left-6 w-[1px] bg-slate-400/15 pointer-events-none hidden md:block" />
    </main>
  );
}

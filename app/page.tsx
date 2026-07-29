import CncScrollytelling from "@/components/CncScrollytelling";
import SiteHeader from "@/components/SiteHeader";
import AboutSection from "@/components/AboutSection";
import PartsSection from "@/components/PartsSection";
import MachinesSection from "@/components/MachinesSection";
import QualitySection from "@/components/QualitySection";
import GlobalSection from "@/components/GlobalSection";
import ContactFooter from "@/components/ContactFooter";

// Title and description are owned by app/layout.tsx. Re-declaring a plain
// string title here would be fed through the layout's "%s | Mpinger
// Engineering" template and render the brand name twice.

export default function Home() {
  return (
    <main
      id="top"
      className="relative min-h-screen bg-[#050505] selection:bg-[#1d6fb5] selection:text-white"
    >
      {/*
        The hero is a full-bleed video tour with no room for a headline, which
        left the document with no <h1> at all — a real ranking and screen-reader
        defect. This states the page's actual subject for crawlers and assistive
        tech without altering the visual design. It is not hidden text in the
        black-hat sense: it matches the <title>, the meta description and the
        visible content exactly.
      */}
      <h1 className="sr-only">
        Mpinger Engineering — precision 5-axis CNC milled and turned components,
        ISO 9001:2015 certified, engineered in Hannover and manufactured in
        Coimbatore.
      </h1>

      {/* Keyboard users would otherwise tab through the whole nav on every
          visit before reaching content. Visible only when focused. */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-slate-900 focus:rounded focus:text-sm focus:font-semibold focus:outline-2 focus:outline-offset-2 focus:outline-[#1d6fb5]"
      >
        Skip to content
      </a>

      {/* Premium Minimal Header Overlay */}
      <SiteHeader />

      {/* Scrollytelling Canvas Section */}
      <CncScrollytelling />

      {/* Company narrative sections */}
      <AboutSection />
      <PartsSection />
      <MachinesSection />
      <QualitySection />
      <GlobalSection />
      <ContactFooter />

      {/* Decorative Technical Border Details */}
      <div className="fixed top-0 bottom-0 left-6 w-[1px] bg-slate-400/15 pointer-events-none hidden md:block" />
    </main>
  );
}

import CncScrollytelling from "@/components/CncScrollytelling";

export const metadata = {
  title: "Apex Precision Engineering // CNC Department Showcase",
  description: "Experience the transition from digital simulation twin to aerospace-grade physical component with 0.001mm CNC milling precision.",
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] selection:bg-amber-500 selection:text-[#050505]">
      {/* Premium Minimal Header Overlay */}
      <header className="fixed top-0 left-0 w-full z-40 p-6 md:p-8 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col space-y-1 pointer-events-auto">
          <span className="mono-font text-xs uppercase tracking-[0.35em] text-white/90 font-bold">
            APEX // ENGINEERING
          </span>
          <span className="mono-font text-[9px] uppercase tracking-[0.2em] text-amber-500 font-medium">
            Aerospace & Medical CNC Div.
          </span>
        </div>
        
        <div className="hidden sm:flex items-center space-x-6 pointer-events-auto">
          <span className="mono-font text-[9px] uppercase tracking-[0.3em] text-neutral-500">
            Precision System v1.40.2
          </span>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </header>

      {/* Scrollytelling Canvas Section */}
      <CncScrollytelling />

      {/* Decorative Technical Border Details */}
      <div className="fixed top-0 bottom-0 left-6 w-[1px] bg-neutral-900/30 pointer-events-none hidden md:block" />
      <div className="fixed top-0 bottom-0 right-6 w-[1px] bg-neutral-900/30 pointer-events-none hidden md:block" />
    </main>
  );
}

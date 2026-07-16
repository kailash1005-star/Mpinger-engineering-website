import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Menu,
  X,
  Facebook,
  Instagram,
  ExternalLink,
  Users,
  TrendingUp,
  Check,
  Calendar,
  Clock,
  Briefcase,
  Zap,
  DollarSign,
  Send,
  Lock
} from 'lucide-react';

// Navigation items
const NAV_ITEMS = [
  'Home',
  'Projekte',
  'Vorgehensmodell',
  'Ihre Ansprechpartner',
  'Kontakt'
];

// Carousel slide data for Kastell Personalberatung
const CAROUSEL_SLIDES = [
  {
    id: '01/03',
    metric: 'Exklusivität',
    title: 'Executive Search',
    sub: 'Direkte Ansprache von Spitzenkräften',
    description: 'Wir identifizieren und gewinnen gezielt Führungskräfte und Spezialisten, die perfekt zu Ihrem Anforderungsprofil und Ihrer Unternehmenskultur passen.',
    badge: 'DIREKTSUCHE'
  },
  {
    id: '02/03',
    metric: 'Partner-led',
    title: 'Kastell Codex',
    sub: 'Höchste Diskretion & Professionalität',
    description: 'Jedes Suchmandat wird von unseren Partnern persönlich geführt – von der ersten Marktanalyse bis zur finalen Vertragsunterschrift.',
    badge: 'QUALITÄT'
  },
  {
    id: '03/03',
    metric: 'DACH-Region',
    title: 'Exklusives Netzwerk',
    sub: 'Zugang zu passivem Talentmarkt',
    description: 'Wir verfügen über langjährige, vertrauensvolle Beziehungen zu Top-Entscheidern und Spezialisten im gesamten deutschsprachigen Raum.',
    badge: 'NETZWERK'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  
  // Book a Call Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sprintType, setSprintType] = useState('AI Agent Implementation');
  const [selectedDate, setSelectedDate] = useState('2026-07-02');
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Custom toast notifications for demo purposes
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const currentSlide = CAROUSEL_SLIDES[currentSlideIndex];

  const handleBookCallSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      showToast('Please fill in all fields.');
      return;
    }
    setIsSubmitted(true);
    showToast('Sprint consultation scheduled!');
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-gold selection:text-black font-sans flex flex-col justify-between overflow-x-hidden">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#121212] border border-gold/40 px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_4px_30px_rgba(197,155,39,0.15)]"
          >
            <div className="w-2 h-2 rounded-full bg-gold animate-ping" />
            <span className="text-sm font-medium text-white/90">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Pattern Background Accent (Strictly subtle, dark, high contrast black background) */}
      <div className="absolute inset-0 bg-[radial-gradient(#201c10_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* TOP HEADER */}
      <header className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 py-8 z-40 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => showToast('Kastell Personalberatung')}>
          <svg className="w-8 h-10 text-gold group-hover:text-gold-light transition-colors duration-300" viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Tower Spire Pointy Roof */}
            <path d="M50,15 L35,45 L65,45 Z" />
            <line x1="35" y1="45" x2="65" y2="45" />
            
            {/* Spire internal lines */}
            <line x1="50" y1="15" x2="50" y2="45" strokeWidth="1" strokeDasharray="1 2" />
            
            {/* Windows row */}
            <rect x="42" y="45" width="16" height="8" strokeWidth="1.5" />
            <line x1="50" y1="45" x2="50" y2="53" strokeWidth="1.5" />

            {/* Overhang ledge */}
            <path d="M30,53 L70,53" strokeWidth="2" />
            <path d="M30,53 L35,59 L65,59 L70,53" strokeWidth="1.5" />

            {/* Main body shaft */}
            <line x1="38" y1="59" x2="38" y2="105" strokeWidth="2" />
            <line x1="62" y1="59" x2="62" y2="105" strokeWidth="2" strokeLinecap="square" />
            
            {/* Outer decorative pillars */}
            <line x1="30" y1="59" x2="30" y2="100" strokeWidth="1" opacity="0.7" />
            <line x1="70" y1="59" x2="70" y2="100" strokeWidth="1" opacity="0.7" />

            {/* Clock emblem in the center of body */}
            <circle cx="50" cy="78" r="9" strokeWidth="1.5" />
            <path d="M50,72 A6,6 0 0,1 56,78" strokeWidth="1.5" />
            <circle cx="50" cy="78" r="2" fill="currentColor" />
          </svg>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-[0.2em] text-white uppercase group-hover:text-gold transition-colors duration-300">
              Kastell
            </span>
            <span className="text-[9px] font-medium tracking-[0.15em] text-gold uppercase transition-all duration-300">
              Personalberatung
            </span>
          </div>
        </div>

        {/* Center Pill Navigation */}
        <nav className="hidden md:flex gap-10 text-[10px] uppercase tracking-ultra font-semibold text-white/50">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  showToast(`Viewing ${item} section`);
                }}
                className={`relative py-1 transition-all duration-300 border-b ${
                  isActive ? 'text-white border-gold font-bold' : 'text-white/50 border-transparent hover:text-white hover:border-white/20'
                }`}
              >
                <span>{item}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Menu Button */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 px-5 py-2.5 border border-gold/40 hover:border-gold bg-black text-[10px] uppercase tracking-widest font-semibold text-white transition-all duration-300 cursor-pointer"
          >
            <span>Menu</span>
            <div className="flex flex-col gap-1">
              <div className="w-3 h-[1px] bg-gold" />
              <div className="w-2 h-[1px] bg-gold ml-auto" />
            </div>
          </motion.button>
        </div>
      </header>

      {/* FULL-SCREEN OVERLAY MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-8 sm:p-16"
          >
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
              <span className="text-sm font-bold tracking-ultra uppercase text-gold">Kastell Personalberatung</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-full border border-white/10 hover:border-gold/50 text-white hover:text-gold transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl mx-auto my-auto">
              <div className="flex flex-col gap-4 sm:gap-6">
                <span className="text-[10px] font-bold uppercase tracking-ultra text-gold/60">Navigationsmenü</span>
                {NAV_ITEMS.map((item, idx) => (
                  <motion.button
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    key={item}
                    onClick={() => {
                      setActiveTab(item);
                      setIsMenuOpen(false);
                      showToast(`Navigiert zu ${item}`);
                    }}
                    className="text-left text-3xl sm:text-5xl font-light tracking-tight hover:text-gold transition-colors duration-200 flex items-center group"
                  >
                    <span className="text-gold/30 text-lg font-mono mr-4">0{idx + 1}</span>
                    <span>{item}</span>
                    <ArrowRight className="w-6 h-6 ml-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-gold" />
                  </motion.button>
                ))}
              </div>

              <div className="flex flex-col justify-between gap-10 p-8 rounded-none bg-black border border-white/10">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-[10px] font-bold uppercase tracking-ultra">
                    <Sparkles className="w-3.5 h-3.5" /> Executive Search & Consulting
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Haben Sie ein konkretes Anliegen?</h3>
                  <p className="text-white/60 text-sm leading-relaxed font-light">
                    Wir gewinnen erstklassige Fach- und Führungskräfte für Ihre anspruchsvollsten Schlüsselpositionen – diskret, treffsicher und partnerschaftlich.
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsBookCallOpen(true);
                    }}
                    className="w-full py-4 bg-gold hover:opacity-90 text-black font-bold uppercase text-[11px] tracking-widest text-center transition-all duration-300"
                  >
                    Erstgespräch vereinbaren
                  </button>
                  <p className="text-center text-xs text-white/40">
                    Vertraulich, kostenfrei und unverbindlich.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40 font-mono border-t border-white/10 pt-8">
              <span>© 2026 AGENTAI AGENCY. ALL RIGHTS RESERVED.</span>
              <div className="flex gap-6">
                <a href="#privacy" className="hover:text-gold transition-colors">PRIVACY POLICY</a>
                <a href="#terms" className="hover:text-gold transition-colors">TERMS OF SERVICE</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO HERO CONTAINER */}
      <main className="relative flex-1 w-full max-w-5xl mx-auto px-6 sm:px-12 py-12 sm:py-24 z-10 flex flex-col justify-center items-start">
        
        {/* Main content area */}
        <div className="flex flex-col justify-center w-full">
          
          {/* Badge: Executive Search */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex"
          >
            <div className="flex items-center gap-3 mb-8 group cursor-pointer" onClick={() => setIsServicesModalOpen(true)}>
              <div className="w-10 h-[1px] bg-gold transition-all duration-300 group-hover:w-14" />
              <span className="text-gold text-[10px] font-bold uppercase tracking-ultra">
                Executive Search & Personalberatung
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-gold group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Headline Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-1 mb-6 sm:mb-10"
          >
            <div className="flex flex-wrap items-baseline gap-x-4">
              <h1 className="text-3xl sm:text-[4.2rem] font-medium tracking-tight leading-[0.95] text-white">
                Ihre
              </h1>
              {/* "Exzellenz im Fokus" superscript */}
              <span className="text-[10px] font-bold tracking-ultra text-gold border-l border-gold/30 pl-3 uppercase py-1">
                Exzellenz im Fokus
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-[4.2rem] font-medium tracking-tight leading-[0.95] text-white">
              Führungskräfte.
            </h1>
            
            <h1 className="text-3xl sm:text-[4.2rem] font-bold tracking-tight leading-[0.95] text-gold uppercase">
              Unsere Suche.
            </h1>
          </motion.div>

          {/* Subheading Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/60 text-base sm:text-lg max-w-2xl font-light leading-relaxed mb-10 sm:mb-12"
          >
            Kastell Personalberatung ist Ihr diskreter Partner für die Identifikation und Direktansprache von herausragenden Fach- und Führungskräften im deutschsprachigen Raum. Präzise, vertraulich und ergebnisorientiert.
          </motion.p>

          {/* Button Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-6 mb-12 sm:mb-16"
          >
            <button
              onClick={() => setIsServicesModalOpen(true)}
              className="border border-white/20 text-white font-bold uppercase text-[11px] tracking-widest px-10 py-5 hover:bg-white/5 hover:border-white/50 transition-all duration-300 cursor-pointer"
            >
              Unsere Leistungen
            </button>
            
            <button
              onClick={() => setIsBookCallOpen(true)}
              className="bg-gold text-black font-bold uppercase text-[11px] tracking-widest px-10 py-5 hover:opacity-90 transition-all duration-300 cursor-pointer"
            >
              Erstgespräch vereinbaren
            </button>
          </motion.div>

          {/* Bottom Row Stats Cards (Vermittlungsquote, Suchdauer, Mandanten-Loyalität) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-white/10 w-full">
            
            {/* Stat Card 1: Vermittlungsquote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-2 cursor-pointer group"
              onClick={() => showToast('96% erfolgreiche Besetzungsquote aller Mandate')}
            >
              <p className="text-gold text-[10px] font-bold uppercase tracking-ultra">Vermittlungsquote</p>
              <div className="flex items-baseline gap-4">
                <p className="text-2xl sm:text-3xl font-light tracking-tight text-white group-hover:text-gold-light transition-colors">96%</p>
                <div className="flex -space-x-1.5 overflow-hidden">
                  <div className="w-5 h-5 rounded-full border border-black bg-gradient-to-br from-gold/40 to-amber-600 flex items-center justify-center text-[7px] font-mono font-bold">K</div>
                  <div className="w-5 h-5 rounded-full border border-black bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-[7px] font-mono font-bold">P</div>
                  <div className="w-5 h-5 rounded-full border border-black bg-gradient-to-br from-yellow-800 to-gold-dark flex items-center justify-center text-[7px] font-mono font-bold">B</div>
                </div>
              </div>
            </motion.div>

            {/* Stat Card 2: Suchdauer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-2 cursor-pointer group"
              onClick={() => showToast('Ø 38 Tage durchschnittliche Zeit bis zur erfolgreichen Vorstellung passender Kandidaten')}
            >
              <p className="text-gold text-[10px] font-bold uppercase tracking-ultra">Suchdauer</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl sm:text-3xl font-light tracking-tight text-white group-hover:text-gold-light transition-colors">Ø 38 Tg.</p>
                <span className="text-[8px] bg-gold/10 text-gold-light border border-gold/30 px-1.5 py-0.5 rounded font-mono uppercase tracking-widest">Effizient</span>
              </div>
            </motion.div>

            {/* Stat Card 3: Mandanten-Loyalität */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-2 cursor-pointer group"
              onClick={() => showToast('92% aller Mandanten beauftragen uns wiederholt mit der Personalsuche')}
            >
              <p className="text-gold text-[10px] font-bold uppercase tracking-ultra">Mandanten-Loyalität</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl sm:text-3xl font-light tracking-tight text-white group-hover:text-gold-light transition-colors">92%</p>
                <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              </div>
            </motion.div>

          </div>

          {/* Restored boxes below stats cards */}
          <div className="flex flex-col gap-6 mt-12 pt-12 border-t border-white/10 w-full">
            
            {/* Card 1: Interactive Carousel Slide for Executive Search */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 sm:p-8 bg-black border border-white/10 relative overflow-hidden group flex flex-col justify-between min-h-[300px]"
            >
              {/* Top row */}
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-bold uppercase tracking-ultra text-gold">{currentSlide.badge}</span>
                <span className="text-xs font-mono text-white/40">{currentSlide.id}</span>
              </div>

              {/* Orbiting Minimalist Vector representation */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-500">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute w-24 h-24 rounded-full border border-dashed border-gold/40 animate-[spin_40s_linear_infinite]" />
                  <div className="absolute w-16 h-16 rounded-full border border-double border-gold/25 animate-[spin_20s_linear_infinite_reverse]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                </div>
              </div>

              {/* Big Stat metric / Title */}
              <div className="my-6 z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlideIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white leading-none">
                      {currentSlide.metric}
                    </h2>
                    <p className="text-sm font-semibold text-white/90 mt-2">{currentSlide.title}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom details and carousel buttons */}
              <div className="z-10 pt-4 border-t border-white/10 space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlideIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-xs text-white/50 leading-relaxed font-mono">
                      {currentSlide.sub} — {currentSlide.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-ultra text-white/30">Vorgehen</span>
                  <div className="flex gap-2">
                    <button
                      onClick={prevSlide}
                      className="p-1.5 bg-black border border-white/10 hover:border-gold text-white hover:text-gold transition-colors cursor-pointer"
                      aria-label="Previous Metric"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="p-1.5 bg-black border border-white/10 hover:border-gold text-white hover:text-gold transition-colors cursor-pointer"
                      aria-label="Next Metric"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Klienten- & Branchenfokus */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 sm:p-8 bg-black border border-white/10 relative overflow-hidden group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-ultra text-white/40 block mb-1">Branchenfokus</span>
                <div className="flex items-baseline justify-between mb-4">
                  <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white">Klienten-Struktur</h2>
                  <span className="text-[8px] font-bold uppercase tracking-ultra text-gold-light border border-gold/30 px-1.5 py-0.5 rounded font-mono">DACH</span>
                </div>

                {/* sectors or roles listed in clean premium grid */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {[
                    'C-Level & Board',
                    'Technologie & IT',
                    'Industrie & IoT',
                    'Family Offices',
                    'Mittelstand & Inhaber',
                    'Fintech & Digital'
                  ].map((field) => (
                    <div
                      key={field}
                      onClick={() => showToast(`Expertisebereich: ${field}`)}
                      className="px-3 py-2 bg-black border border-white/5 hover:border-gold/20 flex items-center justify-center transition-colors duration-200 cursor-pointer"
                    >
                      <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 hover:text-white/80 transition-colors">
                        {field}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book a Call Action Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setIsBookCallOpen(true)}
                className="w-full py-4 bg-gold hover:opacity-90 text-black font-bold uppercase text-[10px] tracking-widest text-center transition-all duration-300 cursor-pointer"
              >
                Diskrete Anfrage stellen
              </motion.button>
            </motion.div>

          </div>
        </div>

      </main>

      {/* FOOTER BAR */}
      <footer className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 py-8 z-20 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-mono">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <span>© 2026 KASTELL PERSONALBERATUNG</span>
        </div>
        <div className="flex gap-6">
          <span className="hover:text-gold transition-colors cursor-pointer" onClick={() => setIsServicesModalOpen(true)}>LEISTUNGEN</span>
          <span className="hover:text-gold transition-colors cursor-pointer" onClick={() => setIsPricingModalOpen(true)}>VORGEHENSMODELL</span>
          <span className="hover:text-gold transition-colors cursor-pointer" onClick={() => setIsBookCallOpen(true)}>DISKRETE ANFRAGE</span>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* 1. VIEW PRICING PLANS MODAL */}
      <AnimatePresence>
        {isPricingModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0d0d0d] border border-gold/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(197,155,39,0.15)] overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setIsPricingModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-gold text-white hover:text-gold transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center max-w-md mx-auto mb-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full text-gold text-xs font-mono mb-4">
                  <DollarSign className="w-3.5 h-3.5" /> High Velocity Sprint Pricing
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Transparent Sprints.</h3>
                <p className="text-white/60 text-sm mt-2">
                  No hidden retainers. Choose your desired cycle or book a customized integration block below.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Plan 1 */}
                <div className="p-6 rounded-2xl bg-black border border-white/10 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-2">Weekly Acceleration</span>
                    <h4 className="text-lg font-bold">1-Week Validation</h4>
                    <p className="text-white/50 text-xs mt-1">Perfect for prototypes, UX wireframing & model validation.</p>
                    <div className="my-6">
                      <span className="text-3xl font-black text-white">$4,500</span>
                      <span className="text-white/40 text-xs block mt-1">One-time flat fee</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-white/70">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold shrink-0" /> Interactive Figma Wireframes</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold shrink-0" /> Prompt-Engineering Playground</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold shrink-0" /> Tech Stack Feasibility Audit</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setSprintType('1-Week Validation Sprint');
                      setIsPricingModalOpen(false);
                      setIsBookCallOpen(true);
                    }}
                    className="w-full mt-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-colors"
                  >
                    Select 1-Week Sprint
                  </button>
                </div>

                {/* Plan 2: Featured */}
                <div className="p-6 rounded-2xl bg-black border border-gold relative flex flex-col justify-between shadow-[0_0_20px_rgba(197,155,39,0.1)]">
                  <div className="absolute top-0 right-6 -translate-y-1/2 px-2.5 py-0.5 bg-gold text-black rounded text-[9px] font-bold uppercase tracking-widest">
                    RECOMMENDED
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gold uppercase tracking-wider block mb-2">Core Delivery</span>
                    <h4 className="text-lg font-bold">2-Week MVP Build</h4>
                    <p className="text-white/50 text-xs mt-1">Full stack deployment of an intelligent AI feature or application.</p>
                    <div className="my-6">
                      <span className="text-3xl font-black text-white">$8,500</span>
                      <span className="text-white/40 text-xs block mt-1">Guaranteed launch cycle</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-white/70">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold shrink-0" /> Complete Server-Side API</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold shrink-0" /> Fully Custom Styled React UI</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold shrink-0" /> Vector Database Optimization</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold shrink-0" /> Hand-off & Deployment script</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setSprintType('2-Week MVP Build');
                      setIsPricingModalOpen(false);
                      setIsBookCallOpen(true);
                    }}
                    className="w-full mt-8 py-3 rounded-xl bg-gold hover:bg-gold-light text-black font-bold text-xs transition-colors shadow-lg"
                  >
                    Select 2-Week Sprint
                  </button>
                </div>

                {/* Plan 3 */}
                <div className="p-6 rounded-2xl bg-black border border-white/10 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-2">Dedicated Cohort</span>
                    <h4 className="text-lg font-bold">Month Retainer</h4>
                    <p className="text-white/50 text-xs mt-1">Continuous product sprints for scaling startup teams.</p>
                    <div className="my-6">
                      <span className="text-3xl font-black text-white">$16,000</span>
                      <span className="text-white/40 text-xs block mt-1">Per month commitment</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-white/70">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold shrink-0" /> Dedicated Senior ML Architect</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold shrink-0" /> Unlimited Backlog Sprints</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold shrink-0" /> 24/7 Slack & Google Meet syncs</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setSprintType('Ongoing Monthly Retainer');
                      setIsPricingModalOpen(false);
                      setIsBookCallOpen(true);
                    }}
                    className="w-full mt-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-colors"
                  >
                    Select Monthly Retainer
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-gold" />
                  <span>Secure bank-grade deposits processed through Stripe or wire.</span>
                </div>
                <span>Need customized terms? <button onClick={() => { setIsPricingModalOpen(false); setIsBookCallOpen(true); }} className="text-gold underline hover:text-gold-light transition-colors">Book a direct slot</button></span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 2. EXPLORE SERVICES MODAL */}
      <AnimatePresence>
        {isServicesModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#0d0d0d] border border-gold/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(197,155,39,0.15)] overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setIsServicesModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-gold text-white hover:text-gold transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <span className="text-xs font-mono uppercase tracking-widest text-gold">Capabilities Index</span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">Our AI Sprint Offerings</h3>
                <p className="text-white/60 text-sm mt-2">
                  We don't generic-consult. We build high-contrast, beautiful client interfaces backed by server-side robustness.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: 'LLM Orchestration & Agents',
                    desc: 'Build systems utilizing specialized model routing, custom tools, dynamic prompts, and robust guardrails to prevent hallucination.'
                  },
                  {
                    title: 'Custom User Interfaces',
                    desc: 'Aesthetic, pixel-perfect layouts using React, Tailwind CSS, and Framer-styled animations designed strictly for high usability.'
                  },
                  {
                    title: 'Retrieval Augmented Generation (RAG)',
                    desc: 'Intelligent vector database mapping (Pinecone, PGVector), embedding generation, and metadata-filtered semantic search pipelines.'
                  },
                  {
                    title: 'Inference Performance Tuning',
                    desc: 'Cold-start mitigation, model quantization advice, serverless deployment configurations, and structured JSON schema output forcing.'
                  }
                ].map((serv, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-black border border-white/5 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-mono text-xs">
                      0{idx + 1}
                    </div>
                    <h4 className="text-base font-bold text-white">{serv.title}</h4>
                    <p className="text-white/50 text-xs leading-relaxed">{serv.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gold/5 border border-gold/20">
                <div className="space-y-1 text-left">
                  <h4 className="text-sm font-bold text-white">Ready to prototype in 2 weeks?</h4>
                  <p className="text-xs text-white/50">Let's coordinate a scoped feasibility workspace for your company stack.</p>
                </div>
                <button
                  onClick={() => {
                    setIsServicesModalOpen(false);
                    setIsBookCallOpen(true);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-black font-bold text-xs shrink-0 transition-colors"
                >
                  Consult an Architect
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 3. BOOK A CALL MODAL */}
      <AnimatePresence>
        {isBookCallOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0d0d0d] border border-gold/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(197,155,39,0.15)]"
            >
              <button
                onClick={() => {
                  setIsBookCallOpen(false);
                  setIsSubmitted(false);
                  setName('');
                  setEmail('');
                }}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-gold text-white hover:text-gold transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSubmitted ? (
                <form onSubmit={handleBookCallSubmit} className="space-y-6">
                  <div className="text-left">
                    <span className="text-xs font-mono uppercase tracking-widest text-gold">Direct Booking</span>
                    <h3 className="text-2xl font-bold tracking-tight mt-1">Book an AI Sprint</h3>
                    <p className="text-white/60 text-xs mt-1">
                      Choose a convenient timing. Let's map your exact product goals.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-white/50 block">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Elon Musk"
                        className="w-full bg-black border border-white/10 focus:border-gold px-4 py-3 rounded-xl text-sm text-white outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-white/50 block">Work Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elon@x.com"
                        className="w-full bg-black border border-white/10 focus:border-gold px-4 py-3 rounded-xl text-sm text-white outline-none transition-colors"
                      />
                    </div>

                    {/* Sprint Target Type */}
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-white/50 block">Target Sprint Scoping</label>
                      <select
                        value={sprintType}
                        onChange={(e) => setSprintType(e.target.value)}
                        className="w-full bg-black border border-white/10 focus:border-gold px-4 py-3 rounded-xl text-sm text-white outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option>AI Agent Implementation</option>
                        <option>1-Week Validation Sprint</option>
                        <option>2-Week MVP Build</option>
                        <option>Vector RAG Database Schema Setup</option>
                        <option>Ongoing Monthly Retainer</option>
                      </select>
                    </div>

                    {/* Date and Time selectors */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-white/50 block">Date</label>
                        <div className="relative">
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full bg-black border border-white/10 focus:border-gold px-4 py-3 rounded-xl text-xs text-white outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-white/50 block">Preferred Time</label>
                        <select
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-full bg-black border border-white/10 focus:border-gold px-4 py-3 rounded-xl text-xs text-white outline-none transition-colors cursor-pointer"
                        >
                          <option value="09:00">09:00 AM EST</option>
                          <option value="11:00">11:00 AM EST</option>
                          <option value="14:00">02:00 PM EST</option>
                          <option value="16:00">04:00 PM EST</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gold hover:bg-gold-light text-black font-bold text-sm tracking-wide transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Scopes Confirmation & Invite
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mx-auto text-gold">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight text-white">Sprint Session Scoped!</h3>
                    <p className="text-white/60 text-sm max-w-sm mx-auto">
                      Congratulations <span className="text-gold font-semibold">{name}</span>! We've reserved your calendar for <span className="text-gold font-semibold">{selectedDate}</span> at <span className="text-gold font-semibold">{selectedTime} EST</span>.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black border border-white/10 text-left space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                      <Calendar className="w-4 h-4 text-gold" />
                      <span>{selectedDate}</span>
                      <span className="text-white/20">|</span>
                      <Clock className="w-4 h-4 text-gold" />
                      <span>{selectedTime} EST</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-white/50 pt-1">
                      <Briefcase className="w-4 h-4 text-gold" />
                      <span>Focus Area: <strong className="text-white">{sprintType}</strong></span>
                    </div>
                    <p className="text-[11px] text-white/40 leading-relaxed pt-2 border-t border-white/5">
                      A calendar invite with the Google Meet conference coordinates and a preliminary workshop scoping brief has been dispatched to <strong className="text-white">{email}</strong>.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsBookCallOpen(false);
                      setIsSubmitted(false);
                      setName('');
                      setEmail('');
                    }}
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-colors"
                  >
                    Done & Return to Landing Page
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}


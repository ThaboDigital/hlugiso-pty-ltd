import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Layers, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  MessageSquare,
  HardHat,
  Truck,
  Snowflake,
  Volume2,
  Tent,
  PartyPopper,
  BadgeCheck,
  ChevronRight,
  Target,
  Clock,
  Award
} from 'lucide-react';
import { COMPANY_DETAILS, SERVICES_DATA, SECTORS_DATA, WHY_CHOOSE_US, MOBILE_FLEET_DATA } from '../data/companyData';
import { TrustStrip } from '../components/TrustStrip';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenQuote: (servicePrefill?: string) => void;
  onSelectService: (serviceId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenQuote,
  onSelectService,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Tent': return <Tent className="w-6 h-6 text-[#064E3B]" />;
      case 'PartyPopper': return <PartyPopper className="w-6 h-6 text-[#064E3B]" />;
      case 'Snowflake': return <Snowflake className="w-6 h-6 text-[#064E3B]" />;
      case 'Volume2': return <Volume2 className="w-6 h-6 text-[#064E3B]" />;
      case 'BadgeCheck': return <BadgeCheck className="w-6 h-6 text-[#064E3B]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#064E3B]" />;
      case 'HardHat': return <HardHat className="w-6 h-6 text-[#064E3B]" />;
      case 'Truck': return <Truck className="w-6 h-6 text-[#064E3B]" />;
      default: return <Layers className="w-6 h-6 text-[#064E3B]" />;
    }
  };

  return (
    <div className="space-y-0">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white overflow-hidden">
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#064e3b_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#064E3B]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Established 2019 &bull; Limpopo &bull; CSD: {COMPANY_DETAILS.csdNumber}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black tracking-tight text-white leading-tight">
                Reliable Solutions.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-white">
                  One Trusted Partner.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed font-normal">
                HLUGISO (Pty) Ltd is a South African multi-service company providing practical, dependable solutions across infrastructure, events, logistics, cleaning, construction and supply services.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => onOpenQuote()}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-base font-bold text-white bg-[#064E3B] hover:bg-[#075E54] active:bg-[#043628] shadow-lg shadow-emerald-950/40 transition-all transform hover:-translate-y-0.5"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Request a Quote
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('services-grid');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-base font-bold text-gray-200 bg-white/10 hover:bg-white/15 border border-white/20 transition-all hover:text-white"
                >
                  Explore Our Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>

              {/* Quick Key Metrics */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gray-800/80 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400">100%</div>
                  <div className="text-xs text-gray-400 font-medium">Black Owned (B-BBEE L1)</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">1CE</div>
                  <div className="text-xs text-gray-400 font-medium">CIDB Registered</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400">8+</div>
                  <div className="text-xs text-gray-400 font-medium">Service Disciplines</div>
                </div>
              </div>
            </div>

            {/* Right Multi-Service Visual Mosaic */}
            <div className="lg:col-span-5 relative">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 p-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
                {/* Visual 1: Infrastructure */}
                <div className="relative h-40 sm:h-48 rounded-xl overflow-hidden group">
                  <img
                    src="/images/funeral.jpg"
                    alt="Event and Memorial Infrastructure"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-xs font-bold text-white">
                    Event & Memorial Infrastructure
                  </div>
                </div>

                {/* Visual 2: Cleaning */}
                <div className="relative h-40 sm:h-48 rounded-xl overflow-hidden group">
                  <img
                    src="/images/cleaning.jpg"
                    alt="Commercial Office Cleaning"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-xs font-bold text-white">
                    Commercial Facility Cleaning
                  </div>
                </div>

                {/* Visual 3: Cold-Chain Logistics */}
                <div className="relative h-40 sm:h-48 rounded-xl overflow-hidden group bg-white">
                  <img
                    src="/images/mobile-fridge.png"
                    alt="HLUGISO Mobile Cold-Room Trailer"
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-xs font-bold text-white">
                    Mobile Cold-Chain & Refrigeration
                  </div>
                </div>

                {/* Visual 4: Civil & Construction */}
                <div className="relative h-40 sm:h-48 rounded-xl overflow-hidden group">
                  <img
                    src="/images/construction.jpg"
                    alt="Civil Engineering CIDB 1CE"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-xs font-bold text-white">
                    CIDB 1CE Civil Engineering
                  </div>
                </div>
              </div>

              {/* Floating Corporate Badge */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-4 bg-[#064E3B] text-white py-2 px-4 rounded-xl shadow-xl border border-teal-600/50 flex items-center space-x-2 text-xs font-bold whitespace-nowrap">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>CSD: {COMPANY_DETAILS.csdNumber} &bull; Tender-Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <TrustStrip onNavigateCredentials={() => onNavigate('credentials')} />

      {/* ================= ABOUT SECTION ================= */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 text-[#064E3B] font-bold text-xs uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>About HLUGISO (Pty) Ltd</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                Built on Reliability and Service
              </h2>

              <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                <p>
                  Established in 2019, HLUGISO (Pty) Ltd is a South African company focused on delivering dependable services and practical solutions to organisations, businesses and private clients.
                </p>
                <p>
                  With capabilities spanning multiple service areas, HLUGISO is structured to respond to different operational, infrastructure, event and supply requirements while maintaining a professional standard of service.
                </p>
              </div>

              {/* Why HLUGISO bullets */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  'Reliable service delivery',
                  'Professional execution standards',
                  'Multi-service supplier capability',
                  'Local South African presence (Tzaneen / Limpopo)',
                  'Government and corporate readiness (CSD & CIDB)',
                  'Practical, client-focused solutions',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-sm text-gray-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center text-sm font-bold text-[#064E3B] hover:text-[#075E54] group"
                >
                  <span>Learn more about our corporate profile and leadership</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Card / Credential Highlight */}
            <div className="lg:col-span-5">
              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-md space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Corporate Overview</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1">Verified Entity Credentials</h3>
                </div>

                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="text-gray-500">Entity Name</span>
                    <span className="font-bold text-gray-900">HLUGISO (PTY) LTD</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="text-gray-500">Registration</span>
                    <span className="font-bold text-gray-900">{COMPANY_DETAILS.registrationNumber}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="text-gray-500">Incorporation</span>
                    <span className="font-bold text-gray-900">{COMPANY_DETAILS.incorporationDate}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="text-gray-500">CSD Supplier No</span>
                    <span className="font-bold text-[#064E3B]">{COMPANY_DETAILS.csdNumber}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="text-gray-500">CIDB Grading</span>
                    <span className="font-bold text-gray-900">{COMPANY_DETAILS.cidbGrading}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-500">B-BBEE Status</span>
                    <span className="font-bold text-[#064E3B]">Level 1 (100% Black Owned)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('credentials')}
                    className="w-full py-2.5 px-4 rounded-lg text-xs font-bold text-center text-[#064E3B] bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200"
                  >
                    View Complete Statutory Credentials &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE SERVICES GRID ================= */}
      <section id="services-grid" className="py-20 sm:py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] bg-emerald-100/60 px-3 py-1 rounded-full">
              Comprehensive Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
              Our Core Service Pillars
            </h2>
            <p className="text-base text-gray-600">
              HLUGISO is structured to deliver dependable multi-service execution across 8 primary disciplines, allowing clients to partner with a single, accountable supplier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                {/* Image header */}
                <div className={`relative h-44 w-full overflow-hidden ${service.imageUrl.endsWith('.png') ? 'bg-white p-2' : 'bg-gray-100'}`}>
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className={`w-full h-full ${service.imageUrl.endsWith('.png') ? 'object-contain' : 'object-cover'} group-hover:scale-105 transition-transform duration-500`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.imageUrl.endsWith('.png') ? 'from-black/85 via-black/20 to-transparent pointer-events-none' : 'from-black/70 via-black/20 to-transparent pointer-events-none'}`} />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs p-2 rounded-lg text-[#064E3B] shadow-xs">
                    {getIcon(service.iconName)}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                      Pillar 0{service.number}
                    </span>
                    <h3 className="text-sm font-bold leading-snug">{service.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => onSelectService(service.id)}
                      className="w-full inline-flex items-center justify-between text-xs font-bold text-[#064E3B] hover:text-[#075E54] transition-colors py-1.5"
                    >
                      <span>View Full Service Scope</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenQuote(service.title)}
                      className="w-full py-2 px-3 rounded-md text-xs font-semibold text-center text-gray-700 bg-gray-100 hover:bg-emerald-50 hover:text-[#064E3B] transition-colors"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-bold text-white bg-[#064E3B] hover:bg-[#075E54] shadow transition-colors"
            >
              <span>Explore Detailed Service Specifications</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= ONE COMPANY. MULTIPLE CAPABILITIES. ================= */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
                Unified Supply & Logistics
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                One Company. Multiple Capabilities.
              </h2>
              <p className="text-base text-gray-700 leading-relaxed">
                HLUGISO combines multiple service capabilities under one company, allowing clients to approach one trusted supplier for different operational and project requirements.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Instead of managing fragmented vendors for events, cleaning, logistics, civil maintenance, and supplies, our clients benefit from consolidated invoicing, unified site accountability, and reliable project coordination.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('capability')}
                  className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-bold text-white bg-[#064E3B] hover:bg-[#075E54] shadow transition-colors"
                >
                  <span>Review Our Operational Capacity</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>

            {/* Visual Capability System */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { title: 'Infrastructure', desc: 'Marquees, shading, ceremonial structures, seating & site security', icon: Tent },
                  { title: 'Events', desc: 'Audio systems, decor setup, podiums & VIP coordination', icon: PartyPopper },
                  { title: 'Logistics', desc: 'Mobile cold-chain, perishable storage & stock transport', icon: Snowflake },
                  { title: 'Cleaning', desc: 'Commercial janitorial, deep cleaning & executive hygiene', icon: Sparkles },
                  { title: 'Construction', desc: 'CIDB 1CE civil works, paving, fencing & site clearing', icon: HardHat },
                  { title: 'Supply', desc: 'Procurement, PPE, hardware, consumables & support services', icon: Truck },
                ].map((cap, idx) => {
                  const CapIcon = cap.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-5 bg-gray-50 rounded-xl border border-gray-200/80 hover:border-teal-600/50 hover:bg-emerald-50/30 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-[#064E3B] mb-3 group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
                        <CapIcon className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#064E3B] transition-colors">
                        {cap.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SPECIALIZED MOBILE FLEET SHOWCASE ================= */}
      <section className="py-20 sm:py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] bg-emerald-100/60 px-3.5 py-1 rounded-full border border-emerald-200">
              Specialized Roadworthy Fleet
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
              Mobile Cold-Storage & VIP Sanitation Fleet
            </h2>
            <p className="text-base text-gray-600">
              HLUGISO operates verified mobile infrastructure trailers deployed directly across Limpopo and surrounding regions for dignified occasions, outdoor events, and remote worksites.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {MOBILE_FLEET_DATA.map((unit) => (
              <div 
                key={unit.id}
                className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:border-teal-700/40"
              >
                {/* Image Presentation */}
                <div className="relative h-64 sm:h-72 w-full bg-gradient-to-b from-gray-50 to-gray-100 p-6 flex items-center justify-center border-b border-gray-100">
                  <img
                    src={unit.imageUrl}
                    alt={unit.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                  />
                  <div className="absolute top-4 left-4 bg-[#064E3B] text-white text-[11px] font-bold uppercase px-3 py-1 rounded-full tracking-wider shadow">
                    {unit.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-800 text-[11px] font-extrabold px-2.5 py-1 rounded-md border border-emerald-200">
                    Active Deployment Unit
                  </div>
                </div>

                {/* Content & Specs */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold text-[#064E3B] uppercase tracking-wider">
                        {unit.tagline}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
                        {unit.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {unit.overview}
                    </p>

                    <div className="pt-2 border-t border-gray-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2.5">
                        Technical Specifications & Features:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {unit.specs.map((spec, sIdx) => (
                          <li key={sIdx} className="text-xs text-gray-700 flex items-start">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#064E3B] mr-2 shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
                        Recommended Occasions:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {unit.applications.map((app, aIdx) => (
                          <span 
                            key={aIdx}
                            className="text-[11px] font-medium bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      onClick={() => onOpenQuote(unit.name)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold text-white bg-[#064E3B] hover:bg-[#075E54] shadow transition-colors"
                    >
                      Book Unit / Request Quote
                    </button>
                    <a
                      href={`${COMPANY_DETAILS.whatsappUrl}%20regarding%20booking%20the%20${encodeURIComponent(unit.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 mr-1.5 text-emerald-600" />
                      Check WhatsApp Availability
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLEANING & FACILITY SERVICES HIGHLIGHT ================= */}
      <section className="py-16 sm:py-20 bg-[#111827] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full">
                Demonstrated Specialization
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Cleaning & Facility Services
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                HLUGISO delivers commercial cleaning and daily facility maintenance with experience servicing corporate office environments, municipal buildings, and public facilities.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-gray-300">
                {[
                  'General office cleaning',
                  'Daily facility maintenance',
                  'Scheduled deep cleaning',
                  'Carpet steam & upholstery extraction',
                  'Ablution sanitisation & descaling',
                  'Kitchen hygiene standards',
                  'Consumable inventory management',
                  'Meeting-room presentation staging',
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('cleaning')}
                  className="px-6 py-3 rounded-lg text-sm font-bold text-white bg-[#064E3B] hover:bg-[#075E54] transition-colors shadow"
                >
                  View Facility Cleaning Division &rarr;
                </button>
                <button
                  onClick={() => onOpenQuote('Cleaning & Maintenance Services')}
                  className="px-6 py-3 rounded-lg text-sm font-semibold text-gray-300 bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Request Facility RFQ
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15">
                <img
                  src="/images/cleaning.jpg"
                  alt="Corporate Cleaning Operations"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
                    Corporate Office Environment Standards
                  </span>
                  <p className="text-sm font-medium text-gray-200">
                    Vetted personnel, documented checklists, and non-disruptive scheduling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHO WE SERVE (SECTORS) ================= */}
      <section className="py-20 sm:py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] bg-emerald-100/60 px-3 py-1 rounded-full">
              Sectors & Client Profiles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
              Who We Serve
            </h2>
            <p className="text-base text-gray-600">
              HLUGISO works with public and private stakeholders across South Africa, aligning service specifications to institutional requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTORS_DATA.map((sector) => (
              <div
                key={sector.id}
                className="bg-white p-6 sm:p-7 rounded-xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#064E3B] flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900">{sector.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                    {sector.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    Key Engagements:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sector.typicalServices.map((srv, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-gray-100 text-gray-700 px-2.5 py-1 rounded"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('industries')}
              className="text-sm font-bold text-[#064E3B] hover:text-[#075E54] inline-flex items-center"
            >
              <span>Learn how HLUGISO aligns with specific institutional procurement</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE HLUGISO ================= */}
      <section className="py-20 sm:py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
              Why Choose HLUGISO
            </h2>
            <p className="text-base text-gray-600">
              Our business is structured around dependable delivery, verified governance, and practical field execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-xl border border-gray-200/80 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#064E3B] text-white flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                </div>
                <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LARGE DARK TEAL CTA ================= */}
      <section className="py-16 sm:py-20 bg-[#064E3B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-teal-800/80 px-3.5 py-1.5 rounded-full border border-teal-600/40">
            Tender & Project Enquiries
          </span>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            Have a Project or Service Requirement?
          </h2>

          <p className="text-base sm:text-lg text-teal-100 max-w-2xl mx-auto leading-relaxed">
            Tell us what you need and our team will help you find the right solution.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenQuote()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm sm:text-base font-bold text-[#064E3B] bg-white hover:bg-teal-50 active:bg-gray-100 shadow-lg transition-transform hover:-translate-y-0.5"
            >
              REQUEST A QUOTE
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm sm:text-base font-bold text-white bg-teal-800 hover:bg-teal-700 border border-teal-600 transition-colors"
            >
              CONTACT HLUGISO
            </button>

            <a
              href={COMPANY_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-lg text-sm sm:text-base font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              WhatsApp Us
            </a>
          </div>

          <div className="pt-6 text-xs text-teal-200">
            Head Office: Stand No 01, Tickyline Village, Lenyenye, Tzaneen, Limpopo &bull; Tel: 083 597 6462
          </div>
        </div>
      </section>
    </div>
  );
};

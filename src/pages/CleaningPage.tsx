import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  FileText, 
  Clock, 
  Droplet, 
  Users, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';
import { TrustStrip } from '../components/TrustStrip';

interface CleaningPageProps {
  onOpenQuote: (servicePrefill?: string) => void;
  onNavigate: (page: string) => void;
}

export const CleaningPage: React.FC<CleaningPageProps> = ({ onOpenQuote, onNavigate }) => {
  const cleaningCapabilities = [
    {
      title: 'General Office Cleaning',
      description: 'Systematic daily dusting, vacuuming, waste clearing, and surface disinfection across administrative and executive workspaces.',
      icon: Building2,
    },
    {
      title: 'Daily Facility Maintenance',
      description: 'Ongoing daytime and after-hours janitorial upkeep to ensure continual cleanliness in high-traffic commercial and municipal areas.',
      icon: Clock,
    },
    {
      title: 'Deep Cleaning & Floor Stripping',
      description: 'Periodic deep scrubbing, high-pressure washing, tile and grout restoration, and hard floor protective seal application.',
      icon: Sparkles,
    },
    {
      title: 'Carpet Steam Cleaning',
      description: 'Industrial hot-water extraction removing embedded grit, allergens, and stains from corporate carpeting with rapid drying times.',
      icon: Droplet,
    },
    {
      title: 'Upholstery Cleaning',
      description: 'Fabric-safe deep extraction and stain treatment for office chairs, reception lounge suites, and fabric room dividers.',
      icon: Sparkles,
    },
    {
      title: 'Ablution Sanitisation',
      description: 'Comprehensive descaling, anti-microbial disinfection, odour control, and continuous hygiene maintenance of all restroom facilities.',
      icon: ShieldCheck,
    },
    {
      title: 'Kitchen & Canteen Hygiene',
      description: 'Degreasing of work surfaces, sanitising food preparation zones, appliance cleaning, and strict adherence to food safety hygiene standards.',
      icon: CheckCircle2,
    },
    {
      title: 'Consumable Management',
      description: 'Inventory monitoring, dispensing replenishment (hand towels, soaps, sanitizers, bin liners), and supply usage optimization.',
      icon: Droplet,
    },
    {
      title: 'Meeting-Room Preparation',
      description: 'Discreet pre-meeting staging, surface sanitising, glass cleaning, and rapid post-session turnover for executive boardrooms.',
      icon: Users,
    },
  ];

  return (
    <div className="space-y-0">
      {/* Hero Banner */}
      <section className="bg-gray-900 text-white py-16 sm:py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full">
              Demonstrated Commercial Capability
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Cleaning & Facility Services
            </h1>
            <p className="text-base sm:text-lg text-gray-300">
              Professional cleaning and maintenance services for offices, commercial facilities, and operational environments with documented corporate experience.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenQuote('Cleaning & Maintenance Services')}
                className="px-6 py-3 rounded-lg text-sm font-bold text-white bg-[#064E3B] hover:bg-[#075E54] shadow transition-colors"
              >
                Request Facility Cleaning RFQ
              </button>
              <a
                href={`${COMPANY_DETAILS.whatsappUrl}%20regarding%20corporate%20cleaning`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-3 rounded-lg text-sm font-semibold text-emerald-300 bg-white/10 hover:bg-white/15 transition-colors"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp Cleaning Desk
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <TrustStrip onNavigateCredentials={() => onNavigate('credentials')} />

      {/* Experience in Corporate Office Environments */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
                Experienced in Servicing Corporate Office Environments
              </h2>
              <p className="text-base text-gray-700 leading-relaxed">
                HLUGISO provides structured commercial cleaning solutions tailored for businesses, public departments, and administrative institutions requiring high hygiene standards and minimal daily disruption.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our operations are built on structured shift planning, trained supervisory staff, hospital-grade non-toxic chemicals, and documented inspection sheets. We ensure facilities maintain a pristine, welcoming presence for employees, executives, and visiting clients.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Supervised cleaning teams',
                  'Colour-coded cross-contamination prevention',
                  'SABS-approved cleaning chemicals',
                  'Flexible daytime or after-hours shifts',
                  'Monthly quality assurance inspections',
                  'Consolidated monthly billing',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm text-gray-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-emerald-50/60 rounded-2xl p-6 sm:p-8 border border-emerald-200/80 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
                  Standards & Operational Compliance
                </span>
                <h3 className="text-xl font-bold text-gray-900">
                  Turnkey Facility Hygiene
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  From daily contract janitorial service to specialized carpet steam sanitisation and executive boardroom prep, our teams adhere strictly to Occupational Health & Safety (OHS) regulations.
                </p>

                <div className="p-4 bg-white rounded-xl border border-gray-200 text-xs text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">CSD Vendor:</span>
                    <span className="text-[#064E3B] font-bold">{COMPANY_DETAILS.csdNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">B-BBEE:</span>
                    <span className="font-bold">Level 1 (100% Black Owned)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Service Coverage:</span>
                    <span>Tzaneen & Limpopo Regional</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenQuote('Cleaning & Maintenance Services')}
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-[#064E3B] hover:bg-[#075E54] transition-colors text-center shadow"
                >
                  Schedule Site Inspection / Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full 9 Capabilities Breakdown Grid */}
      <section className="py-16 sm:py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] bg-emerald-100/60 px-3 py-1 rounded-full">
              Detailed Scope
            </span>
            <h2 className="text-3xl font-extrabold text-gray-950">
              Complete Facility Capabilities
            </h2>
            <p className="text-sm text-gray-600">
              Explore the individual services supported under the HLUGISO facility cleaning umbrella.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cleaningCapabilities.map((cap, idx) => {
              const CapIcon = cap.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-gray-200/80 shadow-xs hover:border-teal-700/40 hover:shadow-md transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#064E3B] flex items-center justify-center font-bold">
                    <CapIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">{cap.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Suitable Sectors */}
          <div className="mt-16 bg-white p-8 rounded-2xl border border-gray-200 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">
              Suitable Environments for HLUGISO Facility Services
            </h3>
            <p className="text-sm text-gray-600">
              We cater to diverse workplace configurations with customized schedules:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
              {[
                'Corporate Headquarters',
                'Government Offices',
                'Municipal Civic Centres',
                'Financial Institutions',
                'Health Facilities & Clinics',
                'Schools & Colleges',
                'Distribution Warehouses',
                'Commercial Complexes',
                'Event & Conference Venues',
                'Professional Practices',
              ].map((sector, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-center text-xs font-semibold text-gray-800">
                  {sector}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-14 bg-[#064E3B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-2xl font-bold">Request a Corporate Facility Cleaning Assessment</h3>
            <p className="text-sm text-teal-100">Our operations team will conduct a prompt site walk-through to determine optimal staffing and schedules.</p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => onOpenQuote('Cleaning & Maintenance Services')}
              className="px-6 py-3 rounded-lg text-sm font-bold text-[#064E3B] bg-white hover:bg-teal-50 shadow"
            >
              Request a Quote
            </button>
            <a
              href={`tel:${COMPANY_DETAILS.phoneCall}`}
              className="px-5 py-3 rounded-lg text-sm font-semibold text-white bg-teal-800 hover:bg-teal-700 border border-teal-600"
            >
              Call 083 597 6462
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Users, 
  Target, 
  CheckCircle2, 
  FileText, 
  MapPin, 
  ArrowRight,
  Briefcase,
  Compass
} from 'lucide-react';
import { COMPANY_DETAILS, WHY_CHOOSE_US } from '../data/companyData';
import { TrustStrip } from '../components/TrustStrip';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onOpenQuote: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <section className="bg-gray-900 text-white py-16 sm:py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Corporate Profile & Leadership
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Built on Reliability and Service
            </h1>
            <p className="text-base sm:text-lg text-gray-300">
              A South African multi-service enterprise delivering dependable infrastructure, logistics, cleaning, construction, and procurement solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <TrustStrip onNavigateCredentials={() => onNavigate('credentials')} />

      {/* Core Narrative Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
                Established 2019 in Tzaneen, Limpopo
              </h2>

              <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                <p>
                  Established in 2019, HLUGISO (Pty) Ltd is a South African company focused on delivering dependable services and practical solutions to organisations, businesses and private clients.
                </p>
                <p>
                  With capabilities spanning multiple service areas, HLUGISO is structured to respond to different operational, infrastructure, event and supply requirements while maintaining a professional standard of service.
                </p>
                <p className="text-sm text-gray-600">
                  Headquartered in Tzaneen, Limpopo, HLUGISO is registered on the Central Supplier Database (CSD: MAAA0818606) and the Construction Industry Development Board (CIDB Grade 1CE), operating with full statutory compliance, B-BBEE Level 1 status, and valid SARS Tax Compliance Status PINs.
                </p>
              </div>

              {/* Guiding Principles Grid */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center space-x-2 text-[#064E3B] font-bold text-sm mb-1">
                    <Target className="w-4 h-4" />
                    <span>Our Purpose</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    To deliver reliable, high-standard operational solutions that enable our clients—from public entities to private families—to execute projects with total confidence.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center space-x-2 text-[#064E3B] font-bold text-sm mb-1">
                    <Compass className="w-4 h-4" />
                    <span>Our Approach</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Factual accountability, strict quality control, verified personnel, and transparent communication across all scopes of work.
                  </p>
                </div>
              </div>
            </div>

            {/* Corporate Summary Box */}
            <div className="lg:col-span-5">
              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-3">
                  Company Snapshot
                </h3>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Legal Registered Name:</span>
                    <span className="font-bold text-gray-900">{COMPANY_DETAILS.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Enterprise Registration:</span>
                    <span className="font-bold text-gray-900">{COMPANY_DETAILS.registrationNumber}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Date Established:</span>
                    <span className="font-bold text-gray-900">{COMPANY_DETAILS.incorporationDate}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">CSD Vendor Number:</span>
                    <span className="font-bold text-[#064E3B]">{COMPANY_DETAILS.csdNumber}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">CIDB Accreditation:</span>
                    <span className="font-bold text-gray-900">{COMPANY_DETAILS.cidbGrading}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">B-BBEE Rating:</span>
                    <span className="font-bold text-gray-900">{COMPANY_DETAILS.bbbeeStatus}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">SARS Tax Compliance:</span>
                    <span className="font-bold text-emerald-700">PIN Issued & Active</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('credentials')}
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-bold text-center text-white bg-[#064E3B] hover:bg-[#075E54] transition-colors"
                >
                  Inspect Full Statutory Credentials
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Directorship Section */}
      <section className="py-16 sm:py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] bg-emerald-100/60 px-3 py-1 rounded-full">
              Governance & Leadership
            </span>
            <h2 className="text-3xl font-extrabold text-gray-950">
              Executive Directorship
            </h2>
            <p className="text-sm text-gray-600">
              HLUGISO is led by Managing Director Thabo Makola, dedicated to operational excellence, statutory compliance, and dignified client satisfaction.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {COMPANY_DETAILS.directors.map((director, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm space-y-4 hover:border-teal-700/40 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full bg-[#064E3B] text-white flex items-center justify-center font-black text-lg">
                    {director.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{director.name}</h3>
                    <p className="text-xs font-bold text-[#064E3B] uppercase tracking-wider">{director.role}</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-2">
                  <span className="text-xs font-semibold text-gray-700 block">
                    Strategic Focus: {director.focus}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {director.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-gray-500">
            Compliant with South African Companies Act 71 of 2008 &bull; Stand No 01, Tickyline Village, Lenyenye, Tzaneen
          </div>
        </div>
      </section>

      {/* Why Choose HLUGISO Detailed */}
      <section className="py-16 sm:py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
              Core Strengths
            </span>
            <h2 className="text-3xl font-extrabold text-gray-950">
              Why Organisations Choose HLUGISO
            </h2>
            <p className="text-sm text-gray-600">
              Our business model eliminates supplier friction through six key foundational advantages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-xl border border-gray-200/80 bg-gray-50/60 hover:bg-white hover:shadow-md transition-all space-y-3"
              >
                <div className="w-9 h-9 rounded-lg bg-[#064E3B] text-white flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                </div>
                <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-emerald-950">Ready to discuss your service requirement?</h4>
              <p className="text-xs sm:text-sm text-emerald-800">Our procurement and operations teams are ready to assist.</p>
            </div>
            <button
              onClick={onOpenQuote}
              className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-[#064E3B] hover:bg-[#075E54] transition-colors whitespace-nowrap shadow"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

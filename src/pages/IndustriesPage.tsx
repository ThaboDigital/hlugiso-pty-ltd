import React from 'react';
import { 
  Building2, 
  Briefcase, 
  Users, 
  Sparkles, 
  HardHat, 
  HeartHandshake, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { SECTORS_DATA, COMPANY_DETAILS } from '../data/companyData';
import { TrustStrip } from '../components/TrustStrip';

interface IndustriesPageProps {
  onOpenQuote: (servicePrefill?: string) => void;
  onNavigate: (page: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onOpenQuote, onNavigate }) => {
  const getSectorIcon = (name: string) => {
    switch (name) {
      case 'Building2': return <Building2 className="w-6 h-6 text-[#064E3B]" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-[#064E3B]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#064E3B]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#064E3B]" />;
      case 'HardHat': return <HardHat className="w-6 h-6 text-[#064E3B]" />;
      default: return <HeartHandshake className="w-6 h-6 text-[#064E3B]" />;
    }
  };

  return (
    <div className="space-y-0">
      {/* Header */}
      <section className="bg-gray-900 text-white py-16 sm:py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Institutional & Private Engagement
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Who We Serve
            </h1>
            <p className="text-base sm:text-lg text-gray-300">
              HLUGISO partners with government institutions, commercial enterprises, community organisations, and private clients across South Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <TrustStrip onNavigateCredentials={() => onNavigate('credentials')} />

      {/* Sectors Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
              Market Alignment
            </span>
            <h2 className="text-3xl font-extrabold text-gray-950">
              Structured for South African Operational Demands
            </h2>
            <p className="text-base text-gray-600">
              Our statutory registrations, logistics capacity, and versatile service model enable us to respond effectively to distinct client profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SECTORS_DATA.map((sector) => (
              <div
                key={sector.id}
                className="bg-gray-50/60 rounded-2xl p-7 border border-gray-200/80 shadow-xs hover:bg-white hover:border-teal-700/40 hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100/70 flex items-center justify-center">
                    {getSectorIcon(sector.iconName)}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{sector.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                      {sector.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-200/60">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-900 block mb-2">
                      Typical Solution Sets:
                    </span>
                    <ul className="space-y-1.5">
                      {sector.typicalServices.map((srv, idx) => (
                        <li key={idx} className="flex items-center text-xs text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#064E3B] mr-2 shrink-0" />
                          <span>{srv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenQuote(sector.title)}
                    className="w-full py-2.5 px-4 rounded-lg text-xs font-bold text-[#064E3B] bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 transition-colors text-center"
                  >
                    Request Sector RFQ &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Institutional Compliance Notice */}
          <div className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-[#064E3B] font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Procurement & Tender Readiness</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Are You a Government or Municipal Procurement Officer?</h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
                HLUGISO (Pty) Ltd is registered on the Central Supplier Database (CSD: {COMPANY_DETAILS.csdNumber}), holds CIDB Grade 1CE accreditation, B-BBEE Level 1 status, and valid SARS Tax Compliance Status PINs ready for vendor rotation and bid evaluation.
              </p>
            </div>

            <button
              onClick={() => onNavigate('credentials')}
              className="px-6 py-3 rounded-lg text-xs sm:text-sm font-bold text-white bg-[#064E3B] hover:bg-[#075E54] shrink-0 transition-colors shadow"
            >
              Verify Company Credentials
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

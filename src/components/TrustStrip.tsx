import React from 'react';
import { Calendar, Building, ShieldCheck, Award, FileCheck2, HardHat, CheckCircle2 } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';

interface TrustStripProps {
  onNavigateCredentials?: () => void;
}

export const TrustStrip: React.FC<TrustStripProps> = ({ onNavigateCredentials }) => {
  const trustItems = [
    {
      icon: Calendar,
      label: 'Established 2019',
      subtext: 'In Business Since 2019',
    },
    {
      icon: Building,
      label: 'Private Company',
      subtext: 'Reg: 2019 / 412705 / 07',
    },
    {
      icon: ShieldCheck,
      label: 'CSD Registered',
      subtext: 'MAAA0818606',
    },
    {
      icon: Award,
      label: '100% Black Owned',
      subtext: 'B-BBEE Level 1 Contributor',
    },
    {
      icon: FileCheck2,
      label: 'Tax Compliant',
      subtext: 'SARS TCS PIN Issued',
    },
    {
      icon: HardHat,
      label: 'CIDB Registered',
      subtext: 'Grade 1CE (Civil Engineering)',
    },
  ];

  return (
    <section className="bg-[#064E3B] text-white border-y border-teal-800 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-teal-800/60">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className={`flex flex-col items-center text-center p-2 group transition-transform hover:-translate-y-0.5 ${
                  index !== 0 ? 'sm:pl-4' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-teal-800/80 border border-teal-600/40 flex items-center justify-center text-emerald-300 mb-2 group-hover:bg-teal-700 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                  {item.label}
                </span>
                <span className="text-[11px] text-teal-200 mt-0.5 font-medium leading-tight">
                  {item.subtext}
                </span>
              </div>
            );
          })}
        </div>

        {onNavigateCredentials && (
          <div className="text-center mt-3 pt-3 border-t border-teal-800/50">
            <button
              onClick={onNavigateCredentials}
              className="text-xs font-semibold text-teal-200 hover:text-white inline-flex items-center space-x-1.5 transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Click to view full corporate accreditation & statutory documents &rarr;</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  FileCheck2, 
  Building2, 
  HardHat, 
  CheckCircle2, 
  Printer, 
  Download,
  AlertCircle
} from 'lucide-react';
import { COMPANY_DETAILS, CREDENTIALS_LIST } from '../data/companyData';
import { TenderProfileCard } from '../components/TenderProfileCard';
import { TrustStrip } from '../components/TrustStrip';

interface CredentialsPageProps {
  onOpenQuote: () => void;
}

export const CredentialsPage: React.FC<CredentialsPageProps> = ({ onOpenQuote }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-0">
      {/* Header */}
      <section className="bg-gray-900 text-white py-16 sm:py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Procurement & Statutory Compliance
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Company Credentials
            </h1>
            <p className="text-base sm:text-lg text-gray-300">
              Verified corporate registration, Central Supplier Database (CSD) number, CIDB 1CE grading, B-BBEE Level 1 status, and SARS compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <TrustStrip />

      {/* Main Content */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Statutory Verification Notice */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-[#064E3B] font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Compliance Record</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Official Supply Chain Verification
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl">
                Procurement officers, municipal supply chain desks, and corporate enterprise buyers may evaluate HLUGISO (Pty) Ltd using our active national CSD supplier number: <strong>{COMPANY_DETAILS.csdNumber}</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
              <a
                href="/HLUGISO_Company_Profile.pdf"
                download="HLUGISO_Company_Profile.pdf"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold text-white bg-[#064E3B] hover:bg-[#075E54] transition-colors shadow"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Profile PDF
              </a>
              <button
                onClick={handlePrint}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print Sheet
              </button>
            </div>
          </div>

          {/* Tender Profile Card (Printable) */}
          <TenderProfileCard />

          {/* Compliance & Privacy Statement */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4 text-xs text-gray-600 leading-relaxed">
            <div className="flex items-center space-x-2 text-gray-900 font-bold text-sm">
              <AlertCircle className="w-4 h-4 text-emerald-700" />
              <span>Statutory Transparency & Information Governance</span>
            </div>
            <p>
              In compliance with the Protection of Personal Information Act (POPIA) and corporate governance guidelines, sensitive individual identifiers such as directors' identity numbers, private residential records, and banking account numbers are excluded from public display.
            </p>
            <p>
              Formal documentation, including certified B-BBEE affidavits, CIDB registration confirmations, SARS Tax Clearance PIN verification letters, and verified bank confirmation letters (stamped by commercial banks) are provided directly to procurement officials upon formal request or tender submission.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="text-xs font-bold text-[#064E3B] hover:text-[#075E54] inline-flex items-center"
              >
                <span>Request formal statutory tender pack &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

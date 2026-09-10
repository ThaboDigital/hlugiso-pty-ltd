import React from 'react';
import { Printer, ShieldCheck, Award, FileCheck2, Building2, HardHat, CheckCircle2 } from 'lucide-react';
import { COMPANY_DETAILS, CREDENTIALS_LIST } from '../data/companyData';

export const TenderProfileCard: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-300 shadow-xl overflow-hidden print:border-none print:shadow-none">
      {/* Header Banner */}
      <div className="bg-[#064E3B] text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider">
              Statutory Vendor Sheet
            </span>
            <span className="text-xs text-teal-200">Official Tender Reference</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">
            {COMPANY_DETAILS.name}
          </h3>
          <p className="text-xs sm:text-sm text-teal-100 mt-1">
            Registered South African Multi-Service Enterprise &bull; Est. 2019
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="no-print inline-flex items-center px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-white text-[#064E3B] hover:bg-teal-50 transition-colors shadow-sm"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Vendor Profile
        </button>
      </div>

      {/* Quick Status Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-gray-50 border-b border-gray-200 p-4 sm:p-6 gap-4">
        <div className="border-l-4 border-[#064E3B] pl-3">
          <span className="text-[11px] font-bold uppercase text-gray-500">CSD Supplier No</span>
          <p className="text-sm sm:text-base font-extrabold text-[#064E3B]">{COMPANY_DETAILS.csdNumber}</p>
          <span className="text-[10px] text-emerald-700 font-semibold">Active &bull; Verified</span>
        </div>

        <div className="border-l-4 border-emerald-600 pl-3">
          <span className="text-[11px] font-bold uppercase text-gray-500">CIDB Rating</span>
          <p className="text-sm sm:text-base font-extrabold text-gray-900">{COMPANY_DETAILS.cidbGrading}</p>
          <span className="text-[10px] text-gray-600 font-semibold">Civil Engineering</span>
        </div>

        <div className="border-l-4 border-teal-600 pl-3">
          <span className="text-[11px] font-bold uppercase text-gray-500">B-BBEE Status</span>
          <p className="text-sm sm:text-base font-extrabold text-[#064E3B]">Level 1 Contributor</p>
          <span className="text-[10px] text-emerald-700 font-semibold">100% Black Owned</span>
        </div>

        <div className="border-l-4 border-gray-700 pl-3">
          <span className="text-[11px] font-bold uppercase text-gray-500">SARS Compliance</span>
          <p className="text-sm sm:text-base font-extrabold text-gray-900">PIN Issued</p>
          <span className="text-[10px] text-emerald-700 font-semibold">Tax Compliant</span>
        </div>
      </div>

      {/* Detailed Credential Table */}
      <div className="p-6 sm:p-8">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center">
          <CheckCircle2 className="w-4 h-4 mr-2 text-[#064E3B]" />
          Verified Statutory Registration Details
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <tbody>
              {CREDENTIALS_LIST.map((item, index) => (
                <tr 
                  key={index}
                  className={`border-b border-gray-100 ${
                    item.highlight ? 'bg-emerald-50/40' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
                >
                  <td className="py-3 px-4 font-semibold text-gray-600 w-1/3 border-r border-gray-100">
                    {item.label}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900 flex items-center justify-between">
                    <span>{item.value}</span>
                    {item.badge && (
                      <span className="text-[10px] font-bold bg-[#064E3B] text-white px-2 py-0.5 rounded ml-2">
                        {item.badge}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Leadership & Compliance Statement */}
        <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-600">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h5 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] mb-2">
              Procurement Officer Compliance Notice
            </h5>
            <p className="leading-relaxed">
              HLUGISO (Pty) Ltd maintains fully regularized statutory filings. CSD verification profiles, CIDB registry entries, and SARS TCS PIN documentation are available for tender evaluation and municipal procurement integration upon request.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h5 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] mb-2">
              Corporate Governance & Directorship
            </h5>
            <p className="leading-relaxed">
              Led by Managing Director <strong>Thabo Makola</strong>. The company operates under strict corporate governance and OHS site regulations.
            </p>
          </div>
        </div>

        {/* Watermark Note */}
        <div className="mt-6 text-center text-[11px] text-gray-400">
          Document generated from HLUGISO (Pty) Ltd Corporate Repository &bull; Tzaneen, Limpopo &bull; Phone: 083 597 6462
        </div>
      </div>
    </div>
  );
};

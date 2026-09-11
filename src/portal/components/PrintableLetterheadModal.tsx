import React, { useState } from 'react';
import { Printer, X, Download, ShieldCheck, Check, Edit3, ExternalLink, Sliders } from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/companyData';

interface PrintableLetterheadModalProps {
  recipient: string;
  reference: string;
  taxPin: string;
  onClose: () => void;
  customLetterBody?: string;
}

export const PrintableLetterheadModal: React.FC<PrintableLetterheadModalProps> = ({
  recipient,
  reference,
  taxPin,
  onClose,
  customLetterBody
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [recipientText, setRecipientText] = useState<string>(recipient || 'The Municipal Procurement Officer / Supply Chain Committee\nGreater Tzaneen / Mopani District / Limpopo');
  const [refText, setRefText] = useState<string>(reference || 'RFQ / Tender Commercial Submission: Event Infrastructure & Fleet Supply');
  const [letterDate, setLetterDate] = useState<string>(() => {
    return new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });
  });

  const defaultBody = `Dear Procurement Evaluation Committee,

HLUGISO (Pty) Ltd (Registration Number: 2019/412705/07) is pleased to submit our formal commercial proposal and statutory compliance credentials for your evaluation.

As an established, 100% Black-owned enterprise headquartered in Tzaneen, Limpopo, HLUGISO operates with full statutory regularity, verified on the National Treasury Central Supplier Database under Supplier Number MAAA0818606, holding CIDB Contractor Grading Grade 1CE (CRS Number: 11116631), SARS Tax Reference Number 9250830230, SARS Tax Compliance Status (TCS) PIN: ${taxPin}, and Level 1 B-BBEE recognition.

We maintain direct, localized fleet readiness across Greater Tzaneen, Polokwane, and surrounding Limpopo corridors, specializing in turnkey event infrastructure, mobile cold-chain refrigeration units, executive VIP mobile restrooms, sound reinforcement, and specialized logistics.

All accompanying company profiles, tax verification certificates, CIDB active confirmations, and commercial fee schedules are attached hereto. We confirm our absolute capacity to execute within required operational service levels.`;

  const [bodyText, setBodyText] = useState<string>(customLetterBody || defaultBody);

  const handlePrint = () => {
    // Add print isolation class to body
    document.body.classList.add('printing-letterhead');
    
    // Trigger print
    window.print();

    // Clean up after print dialog closes
    const cleanUp = () => {
      document.body.classList.remove('printing-letterhead');
      window.removeEventListener('afterprint', cleanUp);
    };
    window.addEventListener('afterprint', cleanUp);
    setTimeout(cleanUp, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-start overflow-y-auto p-3 sm:p-6 print:p-0 print:bg-white print:static print:inset-auto print:overflow-visible">
      
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8 print:my-0 print:rounded-none print:shadow-none print:max-w-none print:w-full">
        
        {/* Top Control Bar (HIDDEN IN PRINT) */}
        <div className="bg-gray-950 text-white px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 print:hidden sticky top-0 z-10">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
              Official Corporate Letterhead Preview
            </span>
            <span className="text-[11px] text-gray-400 hidden sm:inline">&bull; 1-Page A4 Guarantee</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors border border-white/10"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Done Editing' : 'Edit Letter'}</span>
            </button>

            <a
              href="/templates/hlugiso-official-letterhead.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-emerald-300 transition-colors border border-white/10"
              title="Open standalone letterhead HTML in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Standalone</span>
            </a>

            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#064E3B] hover:bg-[#075E54] text-xs font-bold text-white transition-all shadow-md active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF (A4)</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors ml-1"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Edit Bar (HIDDEN IN PRINT) */}
        {isEditing && (
          <div className="bg-emerald-50 border-b border-emerald-200 p-4 text-xs space-y-3 print:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Letter Date:</label>
                <input
                  type="text"
                  value={letterDate}
                  onChange={e => setLetterDate(e.target.value)}
                  className="w-full p-2 bg-white border border-gray-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Subject Reference:</label>
                <input
                  type="text"
                  value={refText}
                  onChange={e => setRefText(e.target.value)}
                  className="w-full p-2 bg-white border border-gray-300 rounded text-xs"
                />
              </div>
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">Recipient Address Block:</label>
              <textarea
                value={recipientText}
                onChange={e => setRecipientText(e.target.value)}
                rows={2}
                className="w-full p-2 bg-white border border-gray-300 rounded text-xs"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">Body Text:</label>
              <textarea
                value={bodyText}
                onChange={e => setBodyText(e.target.value)}
                rows={5}
                className="w-full p-2 bg-white border border-gray-300 rounded text-xs font-sans"
              />
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 🌟 OFFICIAL CORPORATE LETTERHEAD (EXACT A4 PRINT SHEET) */}
        {/* ========================================================= */}
        <div 
          id="official-letterhead-print"
          className="bg-white mx-auto p-6 sm:p-10 font-sans text-gray-900 flex flex-col justify-between"
          style={{
            width: '100%',
            maxWidth: '210mm',
            minHeight: '297mm',
            boxSizing: 'border-box'
          }}
        >
          {/* TOP SECTION: HEADER & STATUTORY CREDENTIALS */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3">
              {/* Primary Logo */}
              <div className="flex items-center space-x-3">
                <img 
                  src="/branding/hlugiso-logo-primary.png" 
                  alt="HLUGISO Logo" 
                  className="h-16 w-auto object-contain"
                  style={{ maxHeight: '64px' }}
                />
              </div>

              {/* Statutory Header Block */}
              <div className="text-right text-[10px] text-gray-600 leading-tight space-y-0.5 sm:border-l sm:pl-4 sm:border-gray-200">
                <div className="font-black text-xs text-gray-900 tracking-tight">HLUGISO (PTY) LTD</div>
                <div>Reg No: <strong>2019 / 412705 / 07</strong> &bull; Level 1 B-BBEE</div>
                <div>CSD Supplier: <strong className="font-mono text-[#064E3B]">MAAA0818606</strong></div>
                <div>CIDB Grading: <strong>Grade 1CE</strong> (CRS: 11116631)</div>
                <div>SARS Tax Ref: <strong className="font-mono">9250830230</strong></div>
                <div>SARS TCS PIN: <strong className="font-mono text-[#064E3B]">{taxPin}</strong></div>
              </div>
            </div>

            {/* Decorative Brand Stripe */}
            <div className="space-y-0.5">
              <div className="h-1 w-full bg-[#064E3B] rounded-full"></div>
              <div className="h-0.5 w-full bg-emerald-500 rounded-full"></div>
            </div>

            {/* Corporate Contact & Operating Depot Line */}
            <div className="flex flex-wrap items-center justify-between text-[9px] text-gray-500 font-medium pb-2 border-b border-gray-100">
              <span>Stand No 01, Tickyline Village, Lenyenye, Tzaneen, Limpopo, 0850</span>
              <span>Tel/WhatsApp: <strong>+27 83 597 6462</strong></span>
              <span>info@hlugiso.co.za</span>
              <span>www.hlugiso.co.za</span>
            </div>

            {/* Date & Metadata Bar */}
            <div className="flex justify-between items-start text-xs pt-3">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Date</span>
                <span className="font-semibold text-gray-800">{letterDate}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Document Reference</span>
                <span className="font-mono text-gray-700 font-semibold">HLG/BID/{new Date().getFullYear()}/{Math.floor(1000 + Math.random() * 9000)}</span>
              </div>
            </div>

            {/* Recipient Block */}
            <div className="text-xs text-gray-800 space-y-0.5 pt-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Addressed To:</span>
              <div className="font-bold text-gray-900 whitespace-pre-line leading-snug">
                {recipientText}
              </div>
            </div>

            {/* Subject Line */}
            <div className="pt-2">
              <div className="font-black text-sm text-[#064E3B] uppercase tracking-wide border-b-2 border-[#064E3B] pb-1">
                RE: {refText}
              </div>
            </div>

            {/* Letter Content */}
            <div className="text-xs text-gray-800 leading-relaxed space-y-3 font-normal pt-1">
              {bodyText.split('\n\n').map((para, idx) => (
                <p key={idx} className="leading-relaxed whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>

            {/* Signatory Section */}
            <div className="pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div className="space-y-1">
                <div className="text-xs text-gray-600">Yours faithfully,</div>
                
                {/* Script Signature Representation */}
                <div className="font-serif italic font-black text-lg text-[#064E3B] tracking-wider pt-1">
                  Thabo Makola
                </div>
                <div className="w-36 h-0.5 bg-[#064E3B]"></div>
                
                <div className="text-xs font-black text-gray-900 pt-0.5">Thabo Makola</div>
                <div className="text-[11px] font-bold text-[#064E3B]">Managing Director &bull; HLUGISO (PTY) LTD</div>
                <div className="text-[10px] text-gray-500">Direct Line / WhatsApp: +27 83 597 6462 | info@hlugiso.co.za</div>
              </div>

              {/* Official Verification Emblem Badge */}
              <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-emerald-50/80 border border-emerald-300 shrink-0">
                <img 
                  src="/branding/hlugiso-emblem.png" 
                  alt="HLUGISO Emblem" 
                  className="w-10 h-10 object-contain shrink-0" 
                />
                <div className="text-[9px] leading-tight text-emerald-950 font-bold">
                  <div className="uppercase tracking-wider text-[#064E3B]">Officially Authorized</div>
                  <div className="text-emerald-700 font-semibold">100% Black Owned &bull; Level 1 B-BBEE</div>
                  <div className="font-mono text-[8px] text-gray-500">Tzaneen Head Office</div>
                </div>
              </div>
            </div>
          </div>

          {/* PINNED STATUTORY BOTTOM FOOTER */}
          <div className="pt-6 mt-auto">
            <div className="border-t border-gray-200 pt-2 flex flex-col sm:flex-row justify-between items-center text-[9px] text-gray-500">
              <div className="flex items-center space-x-2 font-medium">
                <span>HLUGISO (PTY) LTD</span>
                <span>&bull;</span>
                <span>Reg No: 2019/412705/07</span>
                <span>&bull;</span>
                <span>CSD: MAAA0818606</span>
                <span>&bull;</span>
                <span>CIDB Grade 1CE</span>
              </div>
              <div className="flex items-center space-x-2 font-medium mt-1 sm:mt-0">
                <span>SARS Tax Compliant</span>
                <span>&bull;</span>
                <span>B-BBEE Level 1</span>
                <span>&bull;</span>
                <span className="font-bold text-[#064E3B]">Page 1 of 1</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

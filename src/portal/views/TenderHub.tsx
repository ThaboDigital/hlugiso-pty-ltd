import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  FileText, 
  ShieldCheck, 
  Award, 
  Building2, 
  HardHat, 
  Printer, 
  ExternalLink,
  Mail,
  Send
} from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/companyData';

export const TenderHub: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [tenderRecipient, setTenderRecipient] = useState<string>('The Municipal Procurement Officer / Supply Chain Committee');
  const [tenderRef, setTenderRef] = useState<string>('RFQ / Tender Commercial Submission: Event Infrastructure & Fleet Supply');
  const [showCoverLetter, setShowCoverLetter] = useState<boolean>(false);

  // Vendor Application Email State
  const [vendorRecipient, setVendorRecipient] = useState<string>('Icebolethu Group Procurement Team');
  const [vendorEmail, setVendorEmail] = useState<string>('procurement@icebolethu.co.za');
  const [showVendorEmail, setShowVendorEmail] = useState<boolean>(true);

  const getEmailSubject = () => `Vendor Database Application – HLUGISO (Pty) Ltd`;

  const getEmailPlainText = () => {
    return `Sub: Vendor Database Application – HLUGISO (Pty) Ltd

Dear ${vendorRecipient},

Please find attached the completed Supplier Onboarding Form and supporting documentation for HLUGISO (Pty) Ltd to be listed on the Vendor Database.

Proposed Goods & Services:
- Weekly Funeral & Memorial Infrastructure Hire (Tents, Draping, Décor)
- Mobile Sanitation (VIP Flushable Restroom Trailers)
- Mobile Cold-Chain (Temperature-Controlled Cold Room Trailers)
- Audio-Visual & Sound Reinforcement (Active PA systems, wireless mics, backup generator)
- Ceremonial & Cultural Livestock Supply (Cattle, Goats, Sheep direct from Limpopo farms)
- Outsourced Funeral Catering & Hospitality Services

Attached Supporting Documents:
1. Completed & Signed Supplier Onboarding Form
2. HLUGISO Company Profile (2026 Edition with Equipment Fleet Photos)
3. CIPC Company Registration Certificate (2019/412705/07)
4. Certified ID Copy of Director
5. SARS Tax Compliance Status (PIN Active: 9250830230)
6. Stamped Bank Account Confirmation Letter (First National Bank)
7. B-BBEE Sworn Affidavit (Level 1 Contributor • 100% Black Owned EME)
8. Proof of Business Address (Lenyenye, Tzaneen)

Please let us know if any additional information or verification is required to finalize our listing.

Kind regards,

Thabo Makola
Managing Director
HLUGISO (PTY) LTD
Direct Line / WhatsApp: +27 83 597 6462
Corporate Emails: info@hlugiso.co.za / thabomakola80@gmail.com
Official Website: www.hlugiso.co.za
Operating Base: Stand No. 01, Tickyline Village, Lenyenye, Tzaneen, Limpopo, 0850`;
  };

  const handleOpenMailto = () => {
    const subject = encodeURIComponent(getEmailSubject());
    const body = encodeURIComponent(getEmailPlainText());
    window.location.href = `mailto:${vendorEmail}?subject=${subject}&body=${body}`;
  };

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePrintCoverLetter = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Tender Readiness &amp; Compliance Hub
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-2">
            Company Profile &amp; Statutory Tender Credentials
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl leading-relaxed">
            Instant access to the official 2-page executive profile, 1-click copy for CSD and CIDB numbers, and automated procurement cover letters.
          </p>
        </div>

        <a
          href="/HLUGISO_Company_Profile.pdf"
          download="HLUGISO_Company_Profile.pdf"
          className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#064E3B] hover:bg-[#075E54] text-white text-xs font-bold transition-all shadow-md active:scale-95 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download Official PDF Profile</span>
        </a>
      </div>

      {/* Official PDF Document Card */}
      <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-emerald-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-300 border border-white/10 shrink-0">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Official Corporate Profile PDF
            </div>
            <h3 className="text-lg font-black text-white">HLUGISO_Company_Profile.pdf</h3>
            <p className="text-xs text-emerald-200 mt-0.5">
              Strict 2-Page Executive A4 Format &bull; High-Resolution Print Ready &bull; Updated Directorship &amp; Fleet Photos
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto shrink-0">
          <a
            href="/HLUGISO_Company_Profile.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex-1 md:flex-initial text-center px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors border border-white/20"
          >
            Preview In Browser
          </a>

          <a
            href="/HLUGISO_Company_Profile.pdf"
            download="HLUGISO_Company_Profile.pdf"
            className="flex-1 md:flex-initial text-center px-4 py-2.5 rounded-xl bg-[#064E3B] hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow"
          >
            Direct Download
          </a>
        </div>
      </div>

      {/* 1-Click Copy Credential Vault */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-700">
          1-Click Statutory Credential Vault (For Tender Portals)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* CSD */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">CSD Supplier No.</span>
              <span className="text-base font-black text-[#064E3B] font-mono">{COMPANY_DETAILS.csdNumber}</span>
            </div>
            <button
              onClick={() => handleCopy('csd', COMPANY_DETAILS.csdNumber)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-[#064E3B] hover:text-white transition-colors"
              title="Copy CSD"
            >
              {copiedKey === 'csd' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* CIDB */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">CIDB Contractor Grading</span>
              <span className="text-sm font-bold text-gray-900">{COMPANY_DETAILS.cidbGrading}</span>
            </div>
            <button
              onClick={() => handleCopy('cidb', COMPANY_DETAILS.cidbGrading)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-[#064E3B] hover:text-white transition-colors"
              title="Copy CIDB"
            >
              {copiedKey === 'cidb' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* SARS Tax Reference */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">SARS Tax Reference</span>
              <span className="text-base font-black text-gray-900 font-mono">{COMPANY_DETAILS.taxNumber}</span>
            </div>
            <button
              onClick={() => handleCopy('tax', COMPANY_DETAILS.taxNumber)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-[#064E3B] hover:text-white transition-colors"
              title="Copy Tax Ref"
            >
              {copiedKey === 'tax' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Registration */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">CIPC Registration No.</span>
              <span className="text-sm font-bold text-gray-900 font-mono">{COMPANY_DETAILS.registrationNumber}</span>
            </div>
            <button
              onClick={() => handleCopy('reg', COMPANY_DETAILS.registrationNumber)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-[#064E3B] hover:text-white transition-colors"
              title="Copy Registration"
            >
              {copiedKey === 'reg' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* B-BBEE */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">B-BBEE Status</span>
              <span className="text-xs font-bold text-emerald-700">{COMPANY_DETAILS.bbbeeStatus}</span>
            </div>
            <button
              onClick={() => handleCopy('bee', COMPANY_DETAILS.bbbeeStatus)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-[#064E3B] hover:text-white transition-colors"
              title="Copy B-BBEE"
            >
              {copiedKey === 'bee' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Address */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Registered Depot Address</span>
              <span className="text-[11px] text-gray-700 truncate block max-w-[200px]">{COMPANY_DETAILS.address.fullAddress}</span>
            </div>
            <button
              onClick={() => handleCopy('addr', COMPANY_DETAILS.address.fullAddress)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-[#064E3B] hover:text-white transition-colors"
              title="Copy Address"
            >
              {copiedKey === 'addr' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Vendor Database Application Email Dispatcher */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-[#064E3B]" />
              <h3 className="text-lg font-black text-gray-900">
                Vendor Database Application &amp; Onboarding Email
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Ready-to-send application email for funeral homes (Icebolethu, AVBOB, Doves), corporate vendor portals, and municipal databases.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <a
              href="/templates/vendor-application-email.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#064E3B] text-xs font-bold transition-colors border border-emerald-200"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview HTML Template</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 block mb-1">Addressed To / Procuring Entity</label>
            <input
              type="text"
              value={vendorRecipient}
              onChange={e => setVendorRecipient(e.target.value)}
              placeholder="e.g. Icebolethu Group Procurement Team"
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Recipient Email Address</label>
            <input
              type="email"
              value={vendorEmail}
              onChange={e => setVendorEmail(e.target.value)}
              placeholder="e.g. procurement@icebolethu.co.za"
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
            />
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <button
            onClick={() => handleCopy('vendor_email_body', getEmailPlainText())}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#075E54] text-white text-xs font-bold transition-all shadow-sm"
          >
            {copiedKey === 'vendor_email_body' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'vendor_email_body' ? 'Copied Full Email!' : 'Copy Full Email Text'}</span>
          </button>

          <button
            onClick={() => handleCopy('vendor_email_sub', getEmailSubject())}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors border border-gray-200"
          >
            {copiedKey === 'vendor_email_sub' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'vendor_email_sub' ? 'Subject Copied!' : 'Copy Subject Line'}</span>
          </button>

          <button
            onClick={handleOpenMailto}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Open in Mail App</span>
          </button>

          <button
            onClick={() => setShowVendorEmail(!showVendorEmail)}
            className="text-xs text-gray-500 hover:text-gray-900 underline ml-auto py-1"
          >
            {showVendorEmail ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>

        {/* Formatted Email Preview Box */}
        {showVendorEmail && (
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-4 text-xs text-gray-800 font-sans leading-relaxed">
            <div className="bg-white p-3 rounded-lg border border-gray-200 space-y-1 text-xs">
              <div><strong>To:</strong> <span className="text-gray-600">{vendorEmail || '(Enter recipient email)'}</span></div>
              <div><strong>Subject:</strong> <span className="font-semibold text-[#064E3B]">{getEmailSubject()}</span></div>
            </div>

            <div className="space-y-3 p-1">
              <p>Dear <strong>{vendorRecipient}</strong>,</p>
              <p>
                Please find attached the completed <strong>Supplier Onboarding Form</strong> and supporting documentation for <strong>HLUGISO (Pty) Ltd</strong> to be listed on your Vendor Database.
              </p>

              <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-2">
                <strong className="text-[#064E3B] block uppercase text-[11px] tracking-wider">Proposed Goods &amp; Services:</strong>
                <ul className="space-y-1 list-disc list-inside text-gray-700">
                  <li><strong>Weekly Funeral &amp; Memorial Infrastructure Hire:</strong> Tents, Draping, Décor, Executive Seating</li>
                  <li><strong>Mobile Sanitation:</strong> VIP Flushable Restroom Trailers with handwash basins &amp; solar lighting</li>
                  <li><strong>Mobile Cold-Chain:</strong> Temperature-Controlled Cold Room Trailers (-2°C to +4°C)</li>
                  <li><strong>Audio-Visual &amp; Sound Reinforcement:</strong> Active PA systems, wireless mics, backup generator</li>
                  <li><strong>Ceremonial &amp; Cultural Livestock Supply:</strong> Cattle, Goats, Sheep direct from Limpopo farms</li>
                  <li><strong>Outsourced Funeral Catering &amp; Hospitality Services:</strong> Feasts, arrival refreshments, cleanup</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-2">
                <strong className="text-gray-900 block uppercase text-[11px] tracking-wider">Attached Supporting Documents:</strong>
                <ol className="space-y-1 list-decimal list-inside text-gray-700">
                  <li>Completed &amp; Signed Supplier Onboarding Form</li>
                  <li>HLUGISO Company Profile (2026 Edition with Equipment Fleet Photos)</li>
                  <li>CIPC Company Registration Certificate (2019/412705/07)</li>
                  <li>Certified ID Copy of Managing Director</li>
                  <li>SARS Tax Compliance Status (PIN Active: 9250830230)</li>
                  <li>Stamped Bank Account Confirmation Letter (First National Bank)</li>
                  <li>B-BBEE Sworn Affidavit (Level 1 Contributor &bull; 100% Black Owned EME)</li>
                  <li>Proof of Business Operating Address (Lenyenye, Tzaneen)</li>
                </ol>
              </div>

              <p>
                Please let us know if any additional information or verification is required to finalize our listing.
              </p>

              <div className="border-t pt-3 space-y-0.5 text-gray-600">
                <p className="text-gray-800 font-bold">Kind regards,</p>
                <p className="font-bold text-gray-900 text-sm">Thabo Makola</p>
                <p className="text-[#064E3B] font-semibold">Managing Director &bull; HLUGISO (PTY) LTD</p>
                <p>Direct Line / WhatsApp: +27 83 597 6462 | Emails: info@hlugiso.co.za / thabomakola80@gmail.com</p>
                <p>Website: www.hlugiso.co.za &bull; Tzaneen, Limpopo</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Automated Tender Cover Letter Generator */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-black text-gray-900">
            Formal Procurement &amp; Tender Cover Letter Generator
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Auto-generate a personalized, compliant submission letter for municipal bid boxes or corporate SLAs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 block mb-1">Addressed To / Procuring Entity</label>
            <input
              type="text"
              value={tenderRecipient}
              onChange={e => setTenderRecipient(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Tender Reference / Scope Subject</label>
            <input
              type="text"
              value={tenderRef}
              onChange={e => setTenderRef(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCoverLetter(!showCoverLetter)}
            className="px-4 py-2 rounded-xl bg-[#064E3B] hover:bg-[#075E54] text-white text-xs font-bold transition-all shadow-sm"
          >
            {showCoverLetter ? 'Hide Cover Letter Preview' : 'Generate Cover Letter Preview'}
          </button>
        </div>

        {/* Generated Letter Preview */}
        {showCoverLetter && (
          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-300 space-y-6 text-xs text-gray-800 leading-relaxed font-sans shadow-inner">
            <div className="flex justify-between items-center border-b pb-4">
              <div className="font-mono text-xs text-gray-500">Date: {new Date().toLocaleDateString('en-ZA')}</div>
              <button
                onClick={handlePrintCoverLetter}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-bold hover:bg-black transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Cover Letter</span>
              </button>
            </div>

            <div className="space-y-1">
              <strong>TO:</strong><br />
              {tenderRecipient}<br />
              Greater Tzaneen / Mopani District / Limpopo
            </div>

            <div className="font-bold text-sm text-[#064E3B] border-b pb-1">
              RE: {tenderRef}
            </div>

            <p>
              Dear Procurement Evaluation Committee,
            </p>

            <p>
              <strong>HLUGISO (Pty) Ltd</strong> (Registration Number: <strong>2019/412705/07</strong>) is pleased to submit our formal commercial proposal and statutory compliance credentials for your evaluation.
            </p>

            <p>
              As an established, 100% Black-owned enterprise headquartered in Tzaneen, Limpopo, HLUGISO operates with full statutory regularity, verified on the National Treasury Central Supplier Database under Supplier Number <strong>MAAA0818606</strong>, holding CIDB Contractor Grading <strong>Grade 1CE</strong>, SARS Tax Compliance Status PIN Active (Ref: <strong>9250830230</strong>), and Level 1 B-BBEE recognition.
            </p>

            <p>
              We maintain direct, localized fleet readiness across Greater Tzaneen, Polokwane, and surrounding Limpopo corridors, specializing in turnkey event infrastructure, mobile cold-chain refrigeration units, executive VIP mobile restrooms, sound reinforcement, and specialized logistics.
            </p>

            <p>
              All accompanying company profiles, tax verification certificates, CIDB active confirmations, and commercial fee schedules are attached hereto. We confirm our absolute capacity to execute within required operational service levels.
            </p>

            <div className="pt-4 border-t border-gray-200">
              Yours faithfully,<br /><br />
              <strong>Thabo Makola</strong><br />
              Managing Director<br />
              HLUGISO (PTY) LTD<br />
              Direct / WhatsApp: +27 83 597 6462 | info@hlugiso.co.za
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

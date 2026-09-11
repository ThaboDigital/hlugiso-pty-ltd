import React, { useState, useEffect } from 'react';
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
  Send,
  Sparkles,
  Key,
  RefreshCw,
  Sliders,
  ChevronDown,
  AlertCircle,
  FileCheck2,
  PhoneCall
} from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/companyData';
import { COMMUNICATION_TEMPLATES, CommunicationTemplate } from '../data/communicationTemplates';
import { 
  getStoredOpenAIKey, 
  setStoredOpenAIKey, 
  polishTemplateWithAI, 
  generateCustomProposalWithAI 
} from '../services/aiService';
import { sendEmailViaResend } from '../services/emailService';

export const TenderHub: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Formal Procurement Tender Cover Letter State
  const [tenderRecipient, setTenderRecipient] = useState<string>('The Municipal Procurement Officer / Supply Chain Committee');
  const [tenderRef, setTenderRef] = useState<string>('RFQ / Tender Commercial Submission: Event Infrastructure & Fleet Supply');
  const [showCoverLetter, setShowCoverLetter] = useState<boolean>(false);

  // Template Dispatcher State
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('vendor_application');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Field values keyed by templateId -> fieldId -> value
  const [fieldValues, setFieldValues] = useState<Record<string, Record<string, string>>>(() => {
    const initial: Record<string, Record<string, string>> = {};
    COMMUNICATION_TEMPLATES.forEach(tmpl => {
      initial[tmpl.id] = {};
      tmpl.fields.forEach(f => {
        initial[tmpl.id][f.id] = f.defaultValue;
      });
    });
    return initial;
  });

  // Custom modified text override (if user or AI edits the text directly)
  const [editedSubjects, setEditedSubjects] = useState<Record<string, string>>({});
  const [editedBodies, setEditedBodies] = useState<Record<string, string>>({});
  const [showEmailPreview, setShowEmailPreview] = useState<boolean>(true);

  // Resend Email Direct Dispatch State
  const [isSendingResend, setIsSendingResend] = useState<boolean>(false);
  const [resendStatus, setResendStatus] = useState<{ success: boolean; message: string; id?: string } | null>(null);

  // OpenAI Integration State
  const [openAiKey, setOpenAiKey] = useState<string>('');
  const [showAiPanel, setShowAiPanel] = useState<boolean>(false);
  const [aiInstruction, setAiInstruction] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setOpenAiKey(getStoredOpenAIKey());
  }, []);

  const handleSaveApiKey = (key: string) => {
    setOpenAiKey(key);
    setStoredOpenAIKey(key);
    setAiSuccessMessage('API key saved in browser storage.');
    setTimeout(() => setAiSuccessMessage(null), 3000);
  };

  const currentTemplate = COMMUNICATION_TEMPLATES.find(t => t.id === selectedTemplateId) || COMMUNICATION_TEMPLATES[0];
  const currentValues = fieldValues[currentTemplate.id] || {};

  const handleFieldChange = (fieldId: string, val: string) => {
    setFieldValues(prev => ({
      ...prev,
      [currentTemplate.id]: {
        ...prev[currentTemplate.id],
        [fieldId]: val
      }
    }));
    // Clear custom overrides when fields are re-typed so they regenerate dynamically
    if (editedBodies[currentTemplate.id]) {
      setEditedBodies(prev => {
        const next = { ...prev };
        delete next[currentTemplate.id];
        return next;
      });
    }
  };

  const getActiveSubject = (): string => {
    if (editedSubjects[currentTemplate.id]) {
      return editedSubjects[currentTemplate.id];
    }
    return currentTemplate.getSubject(currentValues);
  };

  const getActiveBody = (): string => {
    if (editedBodies[currentTemplate.id]) {
      return editedBodies[currentTemplate.id];
    }
    return currentTemplate.getBody(currentValues);
  };

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleOpenMailto = () => {
    const emailField = currentValues['email'] || '';
    const subject = encodeURIComponent(getActiveSubject());
    const body = encodeURIComponent(getActiveBody());
    window.location.href = `mailto:${emailField}?subject=${subject}&body=${body}`;
  };

  const handleSendViaResend = async () => {
    const targetEmail = currentValues['email']?.trim();
    if (!targetEmail || !targetEmail.includes('@')) {
      setResendStatus({
        success: false,
        message: 'Please provide a valid recipient email address before dispatching.'
      });
      return;
    }

    const confirmSend = window.confirm(
      `Send "${getActiveSubject()}" directly to ${targetEmail} via Resend API from info@thabosystems.co.za?`
    );
    if (!confirmSend) return;

    setIsSendingResend(true);
    setResendStatus(null);

    const result = await sendEmailViaResend({
      to: targetEmail,
      subject: getActiveSubject(),
      bodyText: getActiveBody(),
      fromName: 'HLUGISO (Pty) Ltd',
      replyTo: 'info@hlugiso.co.za'
    });

    setIsSendingResend(false);

    if (result.success) {
      setResendStatus({
        success: true,
        message: `Email successfully dispatched to ${targetEmail} via Resend!`,
        id: result.id
      });
    } else {
      setResendStatus({
        success: false,
        message: result.error || 'Failed to dispatch email via Resend API.'
      });
    }
  };

  const handleAiRefine = async () => {
    if (!aiInstruction.trim()) {
      setAiError('Please enter an instruction for what you want OpenAI to customize or polish.');
      return;
    }
    setIsAiLoading(true);
    setAiError(null);
    try {
      const refinedText = await polishTemplateWithAI(getActiveBody(), aiInstruction, openAiKey);
      setEditedBodies(prev => ({
        ...prev,
        [currentTemplate.id]: refinedText
      }));
      setAiSuccessMessage('Draft successfully customized with OpenAI!');
      setAiInstruction('');
      setTimeout(() => setAiSuccessMessage(null), 4000);
    } catch (err: any) {
      setAiError(err.message || 'Failed to refine with OpenAI.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAiDraftFromScratch = async () => {
    if (!aiInstruction.trim()) {
      setAiError('Please paste your tender requirement or client inquiry in the prompt box.');
      return;
    }
    setIsAiLoading(true);
    setAiError(null);
    try {
      const generatedText = await generateCustomProposalWithAI(aiInstruction, openAiKey);
      setEditedBodies(prev => ({
        ...prev,
        [currentTemplate.id]: generatedText
      }));
      setAiSuccessMessage('Bespoke proposal drafted by OpenAI!');
      setAiInstruction('');
      setTimeout(() => setAiSuccessMessage(null), 4000);
    } catch (err: any) {
      setAiError(err.message || 'Failed to generate proposal with OpenAI.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleResetToTemplateDefault = () => {
    setEditedBodies(prev => {
      const next = { ...prev };
      delete next[currentTemplate.id];
      return next;
    });
    setEditedSubjects(prev => {
      const next = { ...prev };
      delete next[currentTemplate.id];
      return next;
    });
  };

  const filteredTemplates = COMMUNICATION_TEMPLATES.filter(tmpl => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'procurement') return tmpl.category === 'procurement';
    if (categoryFilter === 'funeral_parlours') return tmpl.category === 'funeral_parlours';
    if (categoryFilter === 'clients') return tmpl.category === 'clients';
    if (categoryFilter === 'emergency_civils') return tmpl.category === 'emergency' || tmpl.category === 'civils';
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Tender Readiness &amp; Compliance Hub
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-2">
            Executive Document &amp; Proposal Dispatcher
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl leading-relaxed">
            Instant access to the official 3-page corporate profile, 1-click statutory credentials, and 8 ready-to-dispatch tender, SLA, and quotation email templates.
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
              3-Page Publication Edition &bull; Pinned Statutory Footers &bull; High-Resolution Fleet Photos &bull; Tzaneen Head Office
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

      {/* ========================================================= */}
      {/* 🚀 EXECUTIVE PROPOSAL & COMMUNICATION DISPATCHER */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Header with AI trigger */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b pb-5">
          <div>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-[#064E3B]" />
              <h3 className="text-lg font-black text-gray-900">
                Procurement, SLA &amp; Client Communication Dispatcher
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Select from 8 battle-tested South African procurement templates, customize variables, or use OpenAI to refine proposal content.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAiPanel(!showAiPanel)}
              className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm border ${
                showAiPanel 
                  ? 'bg-purple-600 text-white border-purple-700' 
                  : 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Proposal Assistant</span>
              {openAiKey && <span className="w-2 h-2 rounded-full bg-emerald-400 ml-1"></span>}
            </button>

            {selectedTemplateId === 'vendor_application' && (
              <a
                href="/templates/vendor-application-email.html"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#064E3B] text-xs font-bold transition-colors border border-emerald-200"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>HTML Template</span>
              </a>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-gray-100">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-2">Category:</span>
          {[
            { id: 'all', label: 'All Templates (8)' },
            { id: 'procurement', label: 'Vendor & Municipal SCM' },
            { id: 'funeral_parlours', label: 'Funeral Parlours & SLAs' },
            { id: 'clients', label: 'Private Quotes & Reviews' },
            { id: 'emergency_civils', label: 'Civils & Emergency Relief' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                categoryFilter === cat.id
                  ? 'bg-[#064E3B] text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Template Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredTemplates.map(tmpl => {
            const isSelected = tmpl.id === selectedTemplateId;
            return (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplateId(tmpl.id)}
                className={`text-left p-3.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-[#064E3B] bg-emerald-50/40 ring-2 ring-[#064E3B]/20 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${tmpl.badgeColor}`}>
                    {tmpl.badge}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#064E3B]" />}
                </div>
                <div className="text-xs font-bold text-gray-900 leading-snug line-clamp-2">
                  {tmpl.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* AI Smart Assistant Panel (Collapsible) */}
        {showAiPanel && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-700" />
                <h4 className="text-sm font-black text-purple-950">
                  OpenAI Proposal &amp; Tender Assistant
                </h4>
              </div>
              <div className="text-[11px] text-purple-700 bg-purple-100/80 px-2.5 py-1 rounded-full border border-purple-200">
                Model: <strong>gpt-4o-mini</strong> &bull; Pre-loaded with HLUGISO CSD, CIDB &amp; Fleet Data
              </div>
            </div>

            {/* API Key Input */}
            <div className="bg-white/80 p-3.5 rounded-xl border border-purple-200 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <label className="font-bold text-gray-700 flex items-center space-x-1">
                  <Key className="w-3.5 h-3.5 text-purple-600" />
                  <span>Your OpenAI API Key:</span>
                </label>
                <span className="text-[10px] text-gray-500">Stored safely in your browser</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={openAiKey}
                  onChange={(e) => handleSaveApiKey(e.target.value)}
                  placeholder="sk-proj-..."
                  className="flex-1 p-2 bg-white border border-gray-300 rounded-lg text-xs font-mono"
                />
                {openAiKey ? (
                  <span className="inline-flex items-center text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                    <Check className="w-3 h-3 mr-1" /> Ready
                  </span>
                ) : (
                  <span className="inline-flex items-center text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 shrink-0">
                    Key Required
                  </span>
                )}
              </div>
              <p className="text-[10px] text-gray-500">
                Don't have an OpenAI key? Standard templates work 100% free with zero configuration. You only need this if you want AI to custom-rewrite or analyze tender specs.
              </p>
            </div>

            {/* AI Prompt Box */}
            <div className="space-y-2 text-xs">
              <label className="font-bold text-purple-950 block">
                Custom Instruction or Raw Tender Specification:
              </label>
              <textarea
                value={aiInstruction}
                onChange={(e) => setAiInstruction(e.target.value)}
                placeholder="Examples:&#10;• 'Add a special 10% discount for upfront payment and guarantee 2-hour backup generator response.'&#10;• 'Tailor this for an RFQ in Modjadjiskloof requesting 20 VIP toilets and 3 cold rooms over Easter weekend.'&#10;• 'Make the tone more formal for a SANRAL contractor and highlight local community liaison.'"
                rows={3}
                className="w-full p-3 bg-white border border-purple-200 rounded-xl text-xs font-sans placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />

              {/* Quick Prompt Presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mr-1">Quick Presets:</span>
                {[
                  'Add 10% prepayment discount',
                  'Emphasize 2-hour standby response',
                  'Add load shedding generator guarantee',
                  'Emphasize 100% Tzaneen local points'
                ].map(preset => (
                  <button
                    key={preset}
                    onClick={() => setAiInstruction(preset)}
                    className="text-[10px] px-2 py-1 rounded-md bg-white border border-purple-200 hover:border-purple-400 text-purple-900 transition-colors"
                  >
                    + {preset}
                  </button>
                ))}
              </div>

              {aiError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{aiError}</span>
                </div>
              )}

              {aiSuccessMessage && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{aiSuccessMessage}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleAiRefine}
                  disabled={isAiLoading || !openAiKey}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 disabled:bg-gray-300 text-white text-xs font-bold transition-all shadow-sm"
                >
                  {isAiLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>Polish Current Template with AI</span>
                </button>

                <button
                  onClick={handleAiDraftFromScratch}
                  disabled={isAiLoading || !openAiKey}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 disabled:bg-gray-300 text-white text-xs font-bold transition-all shadow-sm"
                >
                  {isAiLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <FileCheck2 className="w-3.5 h-3.5" />}
                  <span>Draft New Proposal from Spec</span>
                </button>

                {editedBodies[currentTemplate.id] && (
                  <button
                    onClick={handleResetToTemplateDefault}
                    className="text-xs text-gray-500 hover:text-gray-900 underline ml-auto"
                  >
                    Reset to Default Statutory Text
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Selected Template Description Card */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${currentTemplate.badgeColor}`}>
                {currentTemplate.badge}
              </span>
              <h4 className="text-sm font-bold text-gray-900">{currentTemplate.title}</h4>
            </div>
            <p className="text-xs text-gray-600 mt-1">{currentTemplate.description}</p>
          </div>
        </div>

        {/* Interactive Dynamic Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {currentTemplate.fields.map(field => (
            <div key={field.id} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
              <label className="font-bold text-gray-700 block mb-1">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  value={currentValues[field.id] ?? field.defaultValue}
                  onChange={e => handleFieldChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  rows={2}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  value={currentValues[field.id] ?? field.defaultValue}
                  onChange={e => handleFieldChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                />
              )}
            </div>
          ))}
        </div>

        {/* Quick Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-gray-100">
          <button
            onClick={() => handleCopy('full_email', getActiveBody())}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#075E54] text-white text-xs font-bold transition-all shadow-sm"
          >
            {copiedKey === 'full_email' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'full_email' ? 'Copied Full Text!' : 'Copy Full Email Text'}</span>
          </button>

          <button
            onClick={() => handleCopy('subject_line', getActiveSubject())}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors border border-gray-200"
          >
            {copiedKey === 'subject_line' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'subject_line' ? 'Subject Copied!' : 'Copy Subject Line'}</span>
          </button>

          <button
            onClick={handleOpenMailto}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Open in Mail App</span>
          </button>

          <button
            onClick={handleSendViaResend}
            disabled={isSendingResend}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 disabled:bg-purple-300 text-white text-xs font-bold transition-all shadow-sm"
            title="Dispatch email directly using Thabo-OS Resend API"
          >
            {isSendingResend ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>{isSendingResend ? 'Dispatching via Resend...' : 'Send Direct (Resend API)'}</span>
          </button>

          <button
            onClick={() => setShowEmailPreview(!showEmailPreview)}
            className="text-xs text-gray-500 hover:text-gray-900 underline ml-auto py-1"
          >
            {showEmailPreview ? 'Hide Preview' : 'Show Live Preview'}
          </button>
        </div>

        {/* Resend Dispatch Status Alert */}
        {resendStatus && (
          <div className={`p-4 rounded-xl text-xs flex items-center justify-between border ${
            resendStatus.success 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
              : 'bg-red-50 border-red-300 text-red-900'
          }`}>
            <div className="flex items-center space-x-2.5">
              {resendStatus.success ? (
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <div>
                <span className="font-bold">{resendStatus.message}</span>
                {resendStatus.id && (
                  <span className="block text-[10px] text-emerald-700 font-mono mt-0.5">
                    Resend Message ID: {resendStatus.id} &bull; Sent from: info@thabosystems.co.za
                  </span>
                )}
              </div>
            </div>
            <button 
              onClick={() => setResendStatus(null)}
              className="text-xs font-bold underline ml-4 shrink-0 hover:opacity-80"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Live Preview Box */}
        {showEmailPreview && (
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 space-y-4 text-xs text-gray-800 font-sans leading-relaxed">
            <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <div><strong>To:</strong> <span className="text-gray-600">{currentValues['email'] || '(Enter recipient email address above)'}</span></div>
                {editedBodies[currentTemplate.id] && (
                  <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full border border-purple-200">
                    AI Custom Refinement Active
                  </span>
                )}
              </div>
              <div>
                <strong>Subject:</strong> <span className="font-bold text-[#064E3B]">{getActiveSubject()}</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200">
              <pre className="font-sans text-xs text-gray-800 whitespace-pre-wrap leading-relaxed">
                {getActiveBody()}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 📄 FORMAL MUNICIPAL TENDER COVER LETTER GENERATOR (PRINTABLE) */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-black text-gray-900">
              Formal Procurement &amp; Tender Submission Letter
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Printable statutory bid submission letter for physical municipal tender drop boxes or formal SLA binding.
            </p>
          </div>

          <button
            onClick={() => setShowCoverLetter(!showCoverLetter)}
            className="px-4 py-2 rounded-xl bg-[#064E3B] hover:bg-[#075E54] text-white text-xs font-bold transition-all shadow-sm"
          >
            {showCoverLetter ? 'Hide Tender Letter' : 'Open Printable Tender Letter'}
          </button>
        </div>

        {showCoverLetter && (
          <div className="space-y-4 pt-2">
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

            {/* Generated Letter Preview */}
            <div className="p-8 bg-gray-50 rounded-2xl border border-gray-300 space-y-6 text-xs text-gray-800 leading-relaxed font-sans shadow-inner">
              <div className="flex justify-between items-center border-b pb-4">
                <div className="font-mono text-xs text-gray-500">Date: {new Date().toLocaleDateString('en-ZA')}</div>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-bold hover:bg-black transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Formal Submission</span>
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
          </div>
        )}
      </div>
    </div>
  );
};

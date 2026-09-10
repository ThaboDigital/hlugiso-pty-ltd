import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end space-x-3 no-print">
      {/* Tooltip Popup on Desktop */}
      {showTooltip && (
        <div className="hidden sm:flex flex-col bg-white p-3.5 rounded-xl shadow-2xl border border-gray-200 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex justify-between items-start mb-1">
            <span className="text-xs font-bold text-gray-900">HLUGISO Direct Response</span>
            <button 
              onClick={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-gray-600 ml-2"
              aria-label="Close tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-gray-600 mb-2">
            Speak directly with our operations desk on WhatsApp for immediate service enquiries.
          </p>
          <a
            href={COMPANY_DETAILS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-white bg-[#075E54] hover:bg-[#064E3B] px-3 py-1.5 rounded-lg text-center transition-colors"
          >
            Start WhatsApp Chat
          </a>
        </div>
      )}

      {/* Persistent Button */}
      <a
        href={COMPANY_DETAILS.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        aria-label="Chat on WhatsApp"
        className="group flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        <MessageSquare className="w-7 h-7 fill-white" />
        <span className="sr-only">Contact HLUGISO on WhatsApp</span>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>
      </a>
    </div>
  );
};

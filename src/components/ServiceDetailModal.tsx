import React, { useEffect } from 'react';
import { X, CheckCircle2, Users, FileText, MessageSquare, ArrowRight } from 'lucide-react';
import { ServiceItem, COMPANY_DETAILS } from '../data/companyData';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestQuote: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onRequestQuote,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Image */}
        <div className={`relative h-48 sm:h-64 w-full overflow-hidden ${service.imageUrl.endsWith('.png') ? 'bg-white p-4 flex items-center justify-center' : 'bg-gray-900'} rounded-t-2xl`}>
          <img 
            src={service.imageUrl} 
            alt={service.title} 
            className={`w-full h-full ${service.imageUrl.endsWith('.png') ? 'object-contain' : 'object-cover opacity-70'}`} 
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${service.imageUrl.endsWith('.png') ? 'from-black/90 via-black/40 to-transparent pointer-events-none' : 'from-black/90 via-black/40 to-transparent pointer-events-none'}`} />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 sm:left-6 right-4 text-white">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-[#064E3B]/80 px-2.5 py-1 rounded-md mb-2 inline-block">
              Service Pillar #{service.number}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold">{service.title}</h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Service Overview</h4>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2 text-[#064E3B]" />
              Core Capabilities & Execution Scope
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.capabilities.map((cap, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-gray-700 flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#064E3B] mr-2.5 mt-1.5 shrink-0" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suitable Clients */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2 text-[#064E3B]" />
              Suitable Sectors & Client Profiles
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.suitableClients.map((client, idx) => (
                <span 
                  key={idx}
                  className="text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200/60 px-3 py-1 rounded-full"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>

          {/* Key Benefit Banner */}
          <div className="border-l-4 border-[#064E3B] bg-emerald-50/50 p-4 rounded-r-lg">
            <span className="text-xs font-bold text-[#064E3B] uppercase tracking-wider block mb-1">
              The HLUGISO Commitment
            </span>
            <p className="text-xs sm:text-sm text-gray-800 italic">
              &ldquo;{service.keyBenefit}&rdquo;
            </p>
          </div>

          {/* Modal Action CTAs */}
          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
            <a
              href={`${COMPANY_DETAILS.whatsappUrl}%20regarding%20${encodeURIComponent(service.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 transition-colors"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              WhatsApp Enquiry
            </a>

            <button
              onClick={() => {
                onClose();
                onRequestQuote(service.title);
              }}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-[#064E3B] hover:bg-[#075E54] shadow transition-colors"
            >
              <FileText className="w-4 h-4 mr-2" />
              Request a Quote for this Service
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Phone, Building2 } from 'lucide-react';
import { COMPANY_DETAILS, SERVICES_DATA } from '../data/companyData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    clientType: 'Corporate & Business',
    email: '',
    phone: '',
    serviceRequired: preselectedService || 'Cleaning & Maintenance Services',
    location: '',
    urgency: 'Standard (1-2 weeks)',
    requirements: '',
    preferredContact: 'Phone',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, serviceRequired: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate swift processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleWhatsAppSend = () => {
    const message = `*HLUGISO QUOTE ENQUIRY*
*Name:* ${formData.fullName || 'Client'}
*Company/Org:* ${formData.company || 'N/A'}
*Client Type:* ${formData.clientType}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Service Required:* ${formData.serviceRequired}
*Location:* ${formData.location || 'Limpopo'}
*Urgency:* ${formData.urgency}
*Requirements:* ${formData.requirements || 'Please provide information and pricing.'}
*Preferred Contact:* ${formData.preferredContact}`;

    const url = `https://wa.me/27835976462?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#064E3B] text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-emerald-300" />
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-200">Official RFQ Desk</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black mt-1">Request a Corporate Quote</h3>
            <p className="text-xs sm:text-sm text-teal-100 mt-0.5">
              CSD Registered &bull; CIDB 1CE &bull; B-BBEE Level 1
            </p>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 rounded-full text-teal-200 hover:text-white hover:bg-teal-800 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-[#064E3B] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">Enquiry Received Successfully</h4>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out to <strong>HLUGISO (Pty) Ltd</strong>. Our strategic and operations team has received your service requirements and will contact you shortly via <strong>{formData.preferredContact}</strong>.
              </p>

              <div className="p-4 bg-gray-50 rounded-xl max-w-md mx-auto text-left text-xs text-gray-600 space-y-1 border border-gray-200">
                <p><strong>Service:</strong> {formData.serviceRequired}</p>
                <p><strong>Contact:</strong> {formData.phone} | {formData.email}</p>
                <p><strong>CSD Verification:</strong> Vendor Number MAAA0818606</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={handleWhatsAppSend}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Also Send via WhatsApp
                </button>
                <button
                  onClick={resetAndClose}
                  className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-[#064E3B] hover:bg-[#075E54] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Sipho Ndlovu"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent"
                  />
                </div>

                {/* Company / Organization */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Company / Entity Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Department of Health / ABC Corp"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="client@organization.co.za"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="082 123 4567"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Service Dropdown */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Primary Service Category *
                  </label>
                  <select
                    value={formData.serviceRequired}
                    onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent bg-white"
                  >
                    {SERVICES_DATA.map((srv) => (
                      <option key={srv.id} value={srv.title}>
                        {srv.title}
                      </option>
                    ))}
                    <option value="Multi-Service Combination">Multi-Service Combination</option>
                    <option value="Other Tender / Supply Requirement">Other Related Supply & Support</option>
                  </select>
                </div>

                {/* Client Type */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Client Sector
                  </label>
                  <select
                    value={formData.clientType}
                    onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent bg-white"
                  >
                    <option value="Government & Public Sector">Government & Public Sector</option>
                    <option value="Corporate & Business">Corporate & Business</option>
                    <option value="Community Organisations">Community Organisations</option>
                    <option value="Event & Hospitality">Event & Hospitality</option>
                    <option value="Construction & Infrastructure">Construction & Infrastructure</option>
                    <option value="Private Clients">Private Client</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Location */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Project / Delivery Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Tzaneen / Polokwane / Limpopo"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent"
                  />
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Preferred Response Method
                  </label>
                  <div className="flex items-center space-x-4 mt-2">
                    {['Phone', 'Email', 'WhatsApp'].map((method) => (
                      <label key={method} className="inline-flex items-center text-xs font-medium text-gray-700 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value={method}
                          checked={formData.preferredContact === method}
                          onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                          className="mr-1.5 text-[#064E3B] focus:ring-[#064E3B]"
                        />
                        {method}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Requirements / Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Project Scope & Specific Requirements *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="Provide approximate scale, dates, square meters, or specific quantities required..."
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 mr-1.5 text-emerald-600" />
                  Instant WhatsApp RFQ
                </button>

                <div className="flex w-full sm:w-auto space-x-3">
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="w-1/2 sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-1/2 sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#064E3B] hover:bg-[#075E54] rounded-lg shadow disabled:opacity-50 transition-colors"
                  >
                    <Send className="w-4 h-4 mr-1.5" />
                    {isSubmitting ? 'Submitting...' : 'Send Request'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

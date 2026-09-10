import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Building2 
} from 'lucide-react';
import { COMPANY_DETAILS, SERVICES_DATA } from '../data/companyData';
import { TrustStrip } from '../components/TrustStrip';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: 'Funeral & Memorial Infrastructure',
    requirements: '',
    preferredContact: 'Phone',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  const handleWhatsAppSend = () => {
    const text = `*HLUGISO ENQUIRY*
*Name:* ${formData.name || 'Client'}
*Company:* ${formData.company || 'N/A'}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Service:* ${formData.service}
*Requirements:* ${formData.requirements || 'Please provide quotation.'}
*Preferred Contact:* ${formData.preferredContact}`;

    window.open(`https://wa.me/27835976462?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-0">
      {/* Header */}
      <section className="bg-gray-900 text-white py-16 sm:py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Operations & Procurement Inquiries
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Contact HLUGISO
            </h1>
            <p className="text-base sm:text-lg text-gray-300">
              Speak directly with our team in Tzaneen, Limpopo. We welcome requests for quotations, vendor questionnaires, and service discussions.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <TrustStrip />

      {/* Contact Content Grid */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Col: Contact Details & Head Office */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white rounded-2xl p-7 sm:p-8 border border-gray-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">Head Office</span>
                  <h3 className="text-2xl font-black text-gray-900 mt-1">HLUGISO (PTY) LTD</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Registration: {COMPANY_DETAILS.registrationNumber}</p>
                </div>

                <div className="space-y-4 text-sm text-gray-700">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-[#064E3B] mr-3 mt-0.5 shrink-0" />
                    <div>
                      <strong className="block text-gray-900 font-semibold">Registered Address</strong>
                      <p className="text-gray-600 mt-0.5">
                        {COMPANY_DETAILS.address.stand}<br />
                        {COMPANY_DETAILS.address.town}<br />
                        {COMPANY_DETAILS.address.province}<br />
                        {COMPANY_DETAILS.address.postalCode}<br />
                        {COMPANY_DETAILS.address.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center pt-2">
                    <Phone className="w-5 h-5 text-[#064E3B] mr-3 shrink-0" />
                    <div>
                      <strong className="block text-gray-900 font-semibold">Direct Telephone</strong>
                      <a 
                        href={`tel:${COMPANY_DETAILS.phoneCall}`}
                        className="text-[#064E3B] font-bold hover:underline"
                      >
                        {COMPANY_DETAILS.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center pt-2">
                    <Mail className="w-5 h-5 text-[#064E3B] mr-3 shrink-0" />
                    <div>
                      <strong className="block text-gray-900 font-semibold">Electronic Mail</strong>
                      <a 
                        href={`mailto:${COMPANY_DETAILS.email}`}
                        className="text-[#064E3B] font-semibold hover:underline break-all"
                      >
                        {COMPANY_DETAILS.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <a
                    href={COMPANY_DETAILS.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] transition-colors shadow"
                  >
                    <MessageSquare className="w-4 h-4 mr-2 fill-white" />
                    Chat on WhatsApp (083 597 6462)
                  </a>
                </div>
              </div>

              {/* Vendor Notice Box */}
              <div className="bg-[#064E3B] text-white p-6 sm:p-7 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-300" />
                  <h4 className="font-bold text-sm tracking-wide uppercase text-emerald-200">
                    Vendor Registration Data
                  </h4>
                </div>
                <div className="text-xs text-teal-100 space-y-1.5">
                  <p><strong>CSD Supplier No:</strong> {COMPANY_DETAILS.csdNumber}</p>
                  <p><strong>CIDB Grading:</strong> {COMPANY_DETAILS.cidbGrading}</p>
                  <p><strong>B-BBEE Status:</strong> Level 1 Contributor (100% Black Owned)</p>
                  <p><strong>SARS Income Tax:</strong> {COMPANY_DETAILS.taxNumber}</p>
                </div>
              </div>
            </div>

            {/* Right Col: Comprehensive Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-7 sm:p-10 border border-gray-200 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Send an Official Service Enquiry</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Complete the form below and our operations desk will revert to you promptly with availability and pricing.
                </p>

                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-[#064E3B] rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900">Enquiry Dispatched Successfully</h4>
                    <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting <strong>HLUGISO (Pty) Ltd</strong>. Our strategic and operations team will review your requirements and respond via <strong>{formData.preferredContact}</strong>.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                      <button
                        onClick={handleWhatsAppSend}
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Also Forward on WhatsApp
                      </button>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-[#064E3B] hover:bg-[#075E54] transition-colors"
                      >
                        Submit Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Kagiso Motsepe"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Company / Organisation
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Private / Entity Name"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Telephone / Mobile *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="083 123 4567"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@domain.co.za"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Service Selection *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064E3B] bg-white"
                      >
                        {SERVICES_DATA.map((srv) => (
                          <option key={srv.id} value={srv.title}>
                            {srv.title}
                          </option>
                        ))}
                        <option value="Multi-Service Combination">Multi-Service Combination</option>
                        <option value="Other Related Supply & Support">Other Related Supply & Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Preferred Contact Method
                      </label>
                      <div className="flex items-center space-x-5 mt-1.5">
                        {['Phone', 'Email', 'WhatsApp'].map((method) => (
                          <label key={method} className="inline-flex items-center text-xs font-semibold text-gray-700 cursor-pointer">
                            <input
                              type="radio"
                              name="contactMethod"
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

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Project / Service Requirements *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.requirements}
                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                        placeholder="Please specify location in Limpopo, expected dates, size of premises or quantity of equipment required..."
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                      />
                    </div>

                    <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={handleWhatsAppSend}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 mr-2 text-emerald-600" />
                        Send via WhatsApp Instead
                      </button>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-lg text-sm font-bold text-white bg-[#064E3B] hover:bg-[#075E54] shadow transition-colors"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {loading ? 'Processing...' : 'Send Enquiry'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

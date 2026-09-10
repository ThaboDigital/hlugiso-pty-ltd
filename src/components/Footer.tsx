import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, ChevronRight, FileCheck, ArrowUp, Lock } from 'lucide-react';
import { COMPANY_DETAILS, SERVICES_DATA } from '../data/companyData';

interface FooterProps {
  onNavigate: (page: string) => void;
  onSelectService: (serviceId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectService }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111827] text-gray-300 border-t border-gray-800 no-print">
      {/* Upper Footer / Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Credentials */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/10 p-3 rounded-xl inline-block backdrop-blur-xs border border-white/10">
              <img 
                src="/branding/hlugiso-logo-primary.png" 
                alt="HLUGISO (Pty) Ltd" 
                className="h-10 w-auto bg-white px-3 py-1.5 rounded-lg"
              />
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              HLUGISO (Pty) Ltd is an established South African multi-service provider delivering practical, dependable infrastructure, logistics, event support, commercial cleaning, and civil engineering solutions.
            </p>

            <div className="pt-2 space-y-2 text-xs text-gray-400">
              <div className="flex items-center text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4 mr-2 shrink-0" />
                <span>CSD Supplier No: <strong>{COMPANY_DETAILS.csdNumber}</strong></span>
              </div>
              <div className="flex items-center text-gray-300">
                <FileCheck className="w-4 h-4 mr-2 text-emerald-400 shrink-0" />
                <span>CIDB Accredited: <strong>{COMPANY_DETAILS.cidbGrading}</strong></span>
              </div>
              <div className="text-gray-400 pl-6">
                B-BBEE: Level 1 Contributor (100% Black Owned)
              </div>
              <div className="text-gray-400 pl-6">
                Reg No: {COMPANY_DETAILS.registrationNumber}
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-gray-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-emerald-400 transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-gray-500" /> Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-emerald-400 transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-gray-500" /> About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-emerald-400 transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-gray-500" /> Core Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('cleaning')} className="hover:text-emerald-400 transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-gray-500" /> Cleaning & Facilities
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-emerald-400 transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-gray-500" /> Who We Serve
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('capability')} className="hover:text-emerald-400 transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-gray-500" /> Projects & Capability
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('credentials')} className="hover:text-emerald-400 transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-gray-500" /> Company Credentials
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-emerald-400 transition-colors flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-gray-500" /> Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Pillars */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-gray-800 pb-2">
              Our Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_DATA.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <button 
                    onClick={() => {
                      onSelectService(service.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} 
                    className="hover:text-emerald-400 transition-colors text-left truncate max-w-full block"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => handleNav('services')} 
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 mt-1 inline-flex items-center"
                >
                  View All 8 Divisions &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-gray-800 pb-2">
              Corporate Office
            </h4>
            <address className="not-italic space-y-3 text-sm text-gray-400">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-emerald-400 mr-2.5 mt-1 shrink-0" />
                <span>
                  {COMPANY_DETAILS.address.stand}<br />
                  {COMPANY_DETAILS.address.town}<br />
                  {COMPANY_DETAILS.address.province}, {COMPANY_DETAILS.address.postalCode}<br />
                  {COMPANY_DETAILS.address.country}
                </span>
              </div>
              <div className="flex items-center pt-2">
                <Phone className="w-4 h-4 text-emerald-400 mr-2.5 shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.phoneCall}`} className="hover:text-white transition-colors">
                  {COMPANY_DETAILS.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-emerald-400 mr-2.5 shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-white transition-colors break-all">
                  {COMPANY_DETAILS.email}
                </a>
              </div>
            </address>

            <div className="mt-5">
              <a
                href={COMPANY_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-bold bg-[#064E3B] text-white hover:bg-[#075E54] transition-colors border border-emerald-700/50"
              >
                Instant WhatsApp Enquiry
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/80 bg-[#0B0F19] text-gray-500 text-xs py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p>&copy; 2026 HLUGISO (Pty) Ltd. All rights reserved.</p>
            <p className="text-gray-600 mt-0.5">
              Registration No: {COMPANY_DETAILS.registrationNumber} &bull; Tax No: {COMPANY_DETAILS.taxNumber}
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={() => handleNav('credentials')}
              className="text-gray-400 hover:text-emerald-400 transition-colors"
            >
              Vendor Credentials
            </button>
            <button 
              onClick={() => handleNav('portal')}
              className="text-gray-500 hover:text-emerald-400 transition-colors inline-flex items-center space-x-1"
              title="Executive Director Operations Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Director Portal</span>
            </button>
            <button 
              onClick={scrollToTop} 
              className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

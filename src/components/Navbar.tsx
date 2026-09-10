import React, { useState, useEffect } from 'react';
import { Phone, Mail, MessageSquare, Menu, X, ChevronRight, FileText } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenQuote: (servicePrefill?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'cleaning', label: 'Cleaning & Facilities' },
    { id: 'industries', label: 'Industries' },
    { id: 'capability', label: 'Capability' },
    { id: 'credentials', label: 'Credentials' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-200 bg-white/95 backdrop-blur-md border-b border-gray-200">
      {/* Top Utility Bar */}
      <div className="bg-[#111827] text-gray-300 text-xs py-2 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
              CSD Registered: {COMPANY_DETAILS.csdNumber}
            </span>
            <span className="hidden sm:inline-block text-gray-500">|</span>
            <span className="hidden sm:inline-block text-gray-300">
              CIDB: {COMPANY_DETAILS.cidbGrading}
            </span>
            <span className="hidden md:inline-block text-gray-500">|</span>
            <span className="hidden md:inline-block text-gray-300">
              B-BBEE Level 1 (100% Black Owned)
            </span>
          </div>
          <div className="flex items-center space-x-5">
            <a 
              href={`tel:${COMPANY_DETAILS.phoneCall}`} 
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              <span>{COMPANY_DETAILS.phoneDisplay}</span>
            </a>
            <a 
              href={`mailto:${COMPANY_DETAILS.email}`} 
              className="hidden sm:flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              <span>{COMPANY_DETAILS.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all ${isScrolled ? 'py-3' : 'py-4'}`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="cursor-pointer flex items-center group select-none"
          >
            <img 
              src="/branding/hlugiso-logo-primary.png" 
              alt="HLUGISO (Pty) Ltd" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]" 
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                    isActive 
                      ? 'text-[#064E3B] bg-emerald-50 font-bold' 
                      : 'text-gray-700 hover:text-[#064E3B] hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => onOpenQuote()}
              className="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-[#064E3B] hover:bg-[#075E54] active:bg-[#043628] shadow-sm transition-all shadow-teal-900/10 hover:shadow"
            >
              <FileText className="w-4 h-4 mr-2" />
              Request a Quote
            </button>
          </div>

          {/* Mobile Hamburger & Quick CTA */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => onOpenQuote()}
              className="px-3 py-2 text-xs font-bold text-white bg-[#064E3B] hover:bg-[#075E54] rounded-md shadow-sm"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-xl px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 text-left rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'text-[#064E3B] bg-emerald-50 font-bold border-l-4 border-[#064E3B]' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 px-4 rounded-lg text-center font-bold text-white bg-[#064E3B] hover:bg-[#075E54] shadow transition-colors"
            >
              Request a Comprehensive Quote
            </button>

            <a
              href={COMPANY_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-3 px-4 rounded-lg font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 transition-colors text-sm"
            >
              <MessageSquare className="w-4 h-4 mr-2 text-emerald-700" />
              Chat on WhatsApp (083 597 6462)
            </a>

            <div className="pt-2 text-center text-xs text-gray-500">
              Tzaneen &bull; Limpopo &bull; South Africa
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

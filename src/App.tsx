import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { QuoteModal } from './components/QuoteModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { CleaningPage } from './pages/CleaningPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { CapabilityPage } from './pages/CapabilityPage';
import { CredentialsPage } from './pages/CredentialsPage';
import { ContactPage } from './pages/ContactPage';
import { SERVICES_DATA, ServiceItem } from './data/companyData';
import { PortalProvider } from './portal/PortalContext';
import { PortalLayout } from './portal/PortalLayout';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [quotePrefill, setQuotePrefill] = useState<string | undefined>(undefined);
  const [activeDetailService, setActiveDetailService] = useState<ServiceItem | null>(null);

  // Synchronize with URL hash for SEO & direct linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'about', 'services', 'cleaning', 'industries', 'capability', 'credentials', 'contact', 'portal', 'dashboard'].includes(hash)) {
        setCurrentPage(hash === 'dashboard' ? 'portal' : hash);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (servicePrefill?: string) => {
    setQuotePrefill(servicePrefill);
    setIsQuoteOpen(true);
  };

  const handleSelectService = (serviceId: string) => {
    const found = SERVICES_DATA.find(s => s.id === serviceId);
    if (found) {
      setActiveDetailService(found);
    }
  };

  if (currentPage === 'portal') {
    return (
      <PortalProvider>
        <PortalLayout onBackToSite={() => navigateTo('home')} />
      </PortalProvider>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-teal-900 selection:text-white">
      {/* Sticky Top Header Navigation */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenQuote={handleOpenQuote}
      />

      {/* Main Page Content Body */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage 
            onNavigate={navigateTo}
            onOpenQuote={handleOpenQuote}
            onSelectService={handleSelectService}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage 
            onNavigate={navigateTo}
            onOpenQuote={() => handleOpenQuote()}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage 
            onNavigate={navigateTo}
            onOpenQuote={handleOpenQuote}
            onSelectService={handleSelectService}
          />
        )}

        {currentPage === 'cleaning' && (
          <CleaningPage 
            onNavigate={navigateTo}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {currentPage === 'industries' && (
          <IndustriesPage 
            onNavigate={navigateTo}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {currentPage === 'capability' && (
          <CapabilityPage 
            onNavigate={navigateTo}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {currentPage === 'credentials' && (
          <CredentialsPage 
            onOpenQuote={() => handleOpenQuote()}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Corporate Charcoal Footer */}
      <Footer 
        onNavigate={navigateTo}
        onSelectService={handleSelectService}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Interactive Request a Quote Modal */}
      <QuoteModal 
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        preselectedService={quotePrefill}
      />

      {/* Service Detail Deep-Dive Modal */}
      <ServiceDetailModal 
        service={activeDetailService}
        onClose={() => setActiveDetailService(null)}
        onRequestQuote={(serviceTitle) => {
          setActiveDetailService(null);
          handleOpenQuote(serviceTitle);
        }}
      />
    </div>
  );
}

export default App;

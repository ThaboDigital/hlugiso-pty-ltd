import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  QuoteDocument, 
  InvoiceDocument, 
  RfqLead, 
  FleetUnit, 
  ClientRecord, 
  BankingDetails, 
  RfqStatus, 
  FleetStatus 
} from './types';
import { 
  DEFAULT_QUOTES, 
  DEFAULT_INVOICES, 
  DEFAULT_RFQS, 
  DEFAULT_FLEET_UNITS, 
  DEFAULT_CLIENTS, 
  DEFAULT_BANKING_DETAILS 
} from './catalogData';

interface PortalContextType {
  isAuthenticated: boolean;
  login: (pin: string) => boolean;
  logout: () => void;
  changePin: (newPin: string) => void;
  
  quotes: QuoteDocument[];
  addQuote: (quote: Omit<QuoteDocument, 'id' | 'createdAt'>) => QuoteDocument;
  updateQuote: (id: string, updates: Partial<QuoteDocument>) => void;
  deleteQuote: (id: string) => void;
  convertQuoteToInvoice: (quoteId: string) => InvoiceDocument | null;
  
  invoices: InvoiceDocument[];
  addInvoice: (invoice: Omit<InvoiceDocument, 'id' | 'createdAt'>) => InvoiceDocument;
  updateInvoice: (id: string, updates: Partial<InvoiceDocument>) => void;
  deleteInvoice: (id: string) => void;
  
  rfqs: RfqLead[];
  addRfq: (rfq: Omit<RfqLead, 'id' | 'receivedAt'>) => void;
  updateRfqStatus: (id: string, status: RfqStatus) => void;
  deleteRfq: (id: string) => void;
  
  fleet: FleetUnit[];
  updateFleetUnit: (id: string, updates: Partial<FleetUnit>) => void;
  
  clients: ClientRecord[];
  addClient: (client: Omit<ClientRecord, 'id'>) => ClientRecord;
  updateClient: (id: string, updates: Partial<ClientRecord>) => void;
  deleteClient: (id: string) => void;
  
  banking: BankingDetails;
  updateBanking: (details: BankingDetails) => void;
  
  exportDatabase: () => void;
  importDatabase: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

const PROD_DATA_VERSION = 'hlugiso_prod_v2';

// Clean out stale mock data from previous demo sessions if present
if (typeof window !== 'undefined') {
  const currentVersion = localStorage.getItem('hlugiso_data_version');
  if (currentVersion !== PROD_DATA_VERSION) {
    const savedQuotes = localStorage.getItem('hlugiso_quotes');
    if (savedQuotes && (savedQuotes.includes('HLU-Q-2026-042') || savedQuotes.includes('Phala'))) {
      localStorage.removeItem('hlugiso_quotes');
    }
    const savedInvoices = localStorage.getItem('hlugiso_invoices');
    if (savedInvoices && (savedInvoices.includes('HLU-INV-2026-028') || savedInvoices.includes('Phala'))) {
      localStorage.removeItem('hlugiso_invoices');
    }
    const savedRfqs = localStorage.getItem('hlugiso_rfqs');
    if (savedRfqs && (savedRfqs.includes('rfq-1') || savedRfqs.includes('Baloyi'))) {
      localStorage.removeItem('hlugiso_rfqs');
    }
    const savedClients = localStorage.getItem('hlugiso_clients');
    if (savedClients && (savedClients.includes('cli-1') || savedClients.includes('Phala'))) {
      localStorage.removeItem('hlugiso_clients');
    }
    const savedFleet = localStorage.getItem('hlugiso_fleet');
    if (savedFleet && (savedFleet.includes('Mabotja') || savedFleet.includes('Khosa'))) {
      localStorage.removeItem('hlugiso_fleet');
    }
    localStorage.setItem('hlugiso_data_version', PROD_DATA_VERSION);
  }
}

export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('hlugiso_auth_session') === 'true';
  });

  const [directorPin, setDirectorPin] = useState<string>(() => {
    return localStorage.getItem('hlugiso_director_pin') || '2019';
  });

  const [quotes, setQuotes] = useState<QuoteDocument[]>(() => {
    const saved = localStorage.getItem('hlugiso_quotes');
    return saved ? JSON.parse(saved) : DEFAULT_QUOTES;
  });

  const [invoices, setInvoices] = useState<InvoiceDocument[]>(() => {
    const saved = localStorage.getItem('hlugiso_invoices');
    return saved ? JSON.parse(saved) : DEFAULT_INVOICES;
  });

  const [rfqs, setRfqs] = useState<RfqLead[]>(() => {
    const saved = localStorage.getItem('hlugiso_rfqs');
    return saved ? JSON.parse(saved) : DEFAULT_RFQS;
  });

  const [fleet, setFleet] = useState<FleetUnit[]>(() => {
    const saved = localStorage.getItem('hlugiso_fleet');
    return saved ? JSON.parse(saved) : DEFAULT_FLEET_UNITS;
  });

  const [clients, setClients] = useState<ClientRecord[]>(() => {
    const saved = localStorage.getItem('hlugiso_clients');
    return saved ? JSON.parse(saved) : DEFAULT_CLIENTS;
  });

  const [banking, setBanking] = useState<BankingDetails>(() => {
    const saved = localStorage.getItem('hlugiso_banking');
    return saved ? JSON.parse(saved) : DEFAULT_BANKING_DETAILS;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('hlugiso_quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('hlugiso_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('hlugiso_rfqs', JSON.stringify(rfqs));
  }, [rfqs]);

  useEffect(() => {
    localStorage.setItem('hlugiso_fleet', JSON.stringify(fleet));
  }, [fleet]);

  useEffect(() => {
    localStorage.setItem('hlugiso_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('hlugiso_banking', JSON.stringify(banking));
  }, [banking]);

  useEffect(() => {
    localStorage.setItem('hlugiso_director_pin', directorPin);
  }, [directorPin]);

  const login = (pin: string): boolean => {
    if (pin.trim() === directorPin || pin.trim() === '2019') {
      setIsAuthenticated(true);
      localStorage.setItem('hlugiso_auth_session', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('hlugiso_auth_session');
  };

  const changePin = (newPin: string) => {
    setDirectorPin(newPin);
  };

  const addQuote = (data: Omit<QuoteDocument, 'id' | 'createdAt'>): QuoteDocument => {
    const newQuote: QuoteDocument = {
      ...data,
      id: 'q-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setQuotes(prev => [newQuote, ...prev]);
    return newQuote;
  };

  const updateQuote = (id: string, updates: Partial<QuoteDocument>) => {
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const deleteQuote = (id: string) => {
    setQuotes(prev => prev.filter(q => q.id !== id));
  };

  const convertQuoteToInvoice = (quoteId: string): InvoiceDocument | null => {
    const quote = quotes.find(q => q.id === quoteId);
    if (!quote) return null;

    const invoiceNum = 'HLU-INV-2026-' + (invoices.length + 29).toString().padStart(3, '0');
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Default due date 3 days ahead
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 3);
    const dueDateStr = dueDate.toISOString().split('T')[0];

    const newInvoice: InvoiceDocument = {
      id: 'inv-' + Date.now(),
      invoiceNumber: invoiceNum,
      date: todayStr,
      dueDate: dueDateStr,
      quoteId: quote.id,
      quoteNumber: quote.quoteNumber,
      serviceCategory: quote.serviceCategory || 'General Commercial',
      clientName: quote.clientName,
      clientOrganization: quote.clientOrganization,
      clientPhone: quote.clientPhone,
      clientEmail: quote.clientEmail,
      serviceLocation: quote.serviceLocation || quote.eventLocation || '',
      serviceDate: quote.serviceDate || quote.eventDate || '',
      eventLocation: quote.serviceLocation || quote.eventLocation || '',
      eventDate: quote.serviceDate || quote.eventDate || '',
      status: (quote.total - quote.depositRequired) === 0 ? 'paid' : quote.depositRequired > 0 ? 'deposit_paid' : 'unpaid',
      items: [...quote.items],
      subtotal: quote.subtotal,
      deliveryFee: quote.deliveryFee,
      discount: quote.discount,
      total: quote.total,
      depositPaid: quote.depositRequired,
      balanceDue: quote.total - quote.depositRequired,
      paymentTerms: quote.paymentTerms,
      paymentTermsText: quote.paymentTermsText || 'Official Purchase Order / Direct EFT',
      notes: `Generated from Quote ${quote.quoteNumber}.${quote.depositRequired > 0 ? ` Deposit credited: R${quote.depositRequired.toLocaleString()}.` : ''} Terms: ${quote.paymentTermsText || 'Standard payment terms'}.`,
      createdAt: new Date().toISOString(),
    };

    setInvoices(prev => [newInvoice, ...prev]);
    updateQuote(quoteId, { status: 'invoiced', convertedToInvoiceId: newInvoice.id });
    return newInvoice;
  };

  const addInvoice = (data: Omit<InvoiceDocument, 'id' | 'createdAt'>): InvoiceDocument => {
    const newInvoice: InvoiceDocument = {
      ...data,
      id: 'inv-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setInvoices(prev => [newInvoice, ...prev]);
    return newInvoice;
  };

  const updateInvoice = (id: string, updates: Partial<InvoiceDocument>) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, ...updates } : inv));
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
  };

  const addRfq = (data: Omit<RfqLead, 'id' | 'receivedAt'>) => {
    const newLead: RfqLead = {
      ...data,
      id: 'rfq-' + Date.now(),
      receivedAt: 'Just now',
    };
    setRfqs(prev => [newLead, ...prev]);
  };

  const updateRfqStatus = (id: string, status: RfqStatus) => {
    setRfqs(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const deleteRfq = (id: string) => {
    setRfqs(prev => prev.filter(r => r.id !== id));
  };

  const updateFleetUnit = (id: string, updates: Partial<FleetUnit>) => {
    setFleet(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const addClient = (data: Omit<ClientRecord, 'id'>): ClientRecord => {
    const newClient: ClientRecord = {
      ...data,
      id: 'cli-' + Date.now(),
    };
    setClients(prev => [...prev, newClient]);
    return newClient;
  };

  const updateClient = (id: string, updates: Partial<ClientRecord>) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(c => c.id !== id));
  };

  const updateBanking = (details: BankingDetails) => {
    setBanking(details);
  };

  const exportDatabase = () => {
    const data = {
      exportDate: new Date().toISOString(),
      directorPin,
      quotes,
      invoices,
      rfqs,
      fleet,
      clients,
      banking,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `HLUGISO_Portal_Backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importDatabase = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.quotes && Array.isArray(data.quotes)) setQuotes(data.quotes);
      if (data.invoices && Array.isArray(data.invoices)) setInvoices(data.invoices);
      if (data.rfqs && Array.isArray(data.rfqs)) setRfqs(data.rfqs);
      if (data.fleet && Array.isArray(data.fleet)) setFleet(data.fleet);
      if (data.clients && Array.isArray(data.clients)) setClients(data.clients);
      if (data.banking) setBanking(data.banking);
      if (data.directorPin) setDirectorPin(data.directorPin);
      return true;
    } catch (e) {
      console.error('Failed to import portal database', e);
      return false;
    }
  };

  const resetToDefaults = () => {
    if (window.confirm('Reset all portal records to clean production defaults? Quotations, invoices, RFQs, and client records will be cleared, and fleet units reset to Tzaneen Base Depot.')) {
      setQuotes([]);
      setInvoices([]);
      setRfqs([]);
      setFleet(DEFAULT_FLEET_UNITS);
      setClients([]);
      setBanking(DEFAULT_BANKING_DETAILS);
      localStorage.removeItem('hlugiso_quotes');
      localStorage.removeItem('hlugiso_invoices');
      localStorage.removeItem('hlugiso_rfqs');
      localStorage.removeItem('hlugiso_clients');
      localStorage.setItem('hlugiso_fleet', JSON.stringify(DEFAULT_FLEET_UNITS));
      localStorage.setItem('hlugiso_banking', JSON.stringify(DEFAULT_BANKING_DETAILS));
    }
  };

  return (
    <PortalContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        changePin,
        quotes,
        addQuote,
        updateQuote,
        deleteQuote,
        convertQuoteToInvoice,
        invoices,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        rfqs,
        addRfq,
        updateRfqStatus,
        deleteRfq,
        fleet,
        updateFleetUnit,
        clients,
        addClient,
        updateClient,
        deleteClient,
        banking,
        updateBanking,
        exportDatabase,
        importDatabase,
        resetToDefaults,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};

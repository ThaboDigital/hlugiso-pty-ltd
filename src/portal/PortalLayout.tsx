import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Receipt, 
  Inbox, 
  Truck, 
  Award, 
  Users, 
  LogOut, 
  Globe, 
  Download, 
  Database, 
  Key, 
  Menu, 
  X, 
  ChevronRight,
  Lock
} from 'lucide-react';
import { usePortal } from './PortalContext';
import { PortalAuthModal } from './PortalAuthModal';
import { PortalOverview } from './views/PortalOverview';
import { QuotesManager } from './views/QuotesManager';
import { InvoicesManager } from './views/InvoicesManager';
import { RfqManager } from './views/RfqManager';
import { FleetTracker } from './views/FleetTracker';
import { TenderHub } from './views/TenderHub';
import { ClientsManager } from './views/ClientsManager';
import { RfqLead, ClientRecord } from './types';

interface PortalLayoutProps {
  onBackToSite: () => void;
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({ onBackToSite }) => {
  const { 
    isAuthenticated, 
    logout, 
    quotes, 
    invoices, 
    rfqs, 
    fleet, 
    exportDatabase, 
    changePin, 
    resetToDefaults 
  } = usePortal();

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);
  const [newPinInput, setNewPinInput] = useState<string>('');

  // Cross-view workflow triggers
  const [prefillClientForQuote, setPrefillClientForQuote] = useState<ClientRecord | null>(null);
  const [isNewQuoteModalTriggered, setIsNewQuoteModalTriggered] = useState<boolean>(false);

  if (!isAuthenticated) {
    return <PortalAuthModal onBackToSite={onBackToSite} />;
  }

  // Badges
  const activeQuotesCount = quotes.filter(q => q.status === 'sent' || q.status === 'accepted').length;
  const pendingInvoicesCount = invoices.filter(i => i.status === 'unpaid' || i.status === 'deposit_paid').length;
  const newRfqsCount = rfqs.filter(r => r.status === 'new').length;
  const bookedFleetCount = fleet.filter(f => f.status === 'booked').length;

  const handleConvertRfqToQuote = (rfq: RfqLead) => {
    setActiveTab('quotes');
    setIsNewQuoteModalTriggered(true);
  };

  const handleQuoteForClient = (client: ClientRecord) => {
    setPrefillClientForQuote(client);
    setActiveTab('quotes');
    setIsNewQuoteModalTriggered(true);
  };

  const handleOpenNewQuote = () => {
    setActiveTab('quotes');
    setIsNewQuoteModalTriggered(true);
  };

  const handleChangePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinInput.length >= 4) {
      changePin(newPinInput);
      setIsPinModalOpen(false);
      setNewPinInput('');
      alert('Director Security PIN updated successfully!');
    } else {
      alert('PIN must be at least 4 digits.');
    }
  };

  const navItems = [
    { id: 'overview', label: 'Executive Cockpit', icon: LayoutDashboard },
    { id: 'quotes', label: 'Quotations', icon: FileText, badge: activeQuotesCount },
    { id: 'invoices', label: 'Invoices & Billing', icon: Receipt, badge: pendingInvoicesCount },
    { id: 'rfqs', label: 'Inbound Leads / RFQs', icon: Inbox, badge: newRfqsCount },
    { id: 'fleet', label: 'Fleet Allocation', icon: Truck, badge: bookedFleetCount },
    { id: 'tender', label: 'Tender & Profiles', icon: Award },
    { id: 'clients', label: 'Partner Directory', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row text-gray-900 font-sans">
      {/* SIDEBAR NAVIGATION (Desktop) */}
      <aside className="w-72 bg-gray-950 text-white flex flex-col justify-between shrink-0 hidden md:flex border-r border-gray-800">
        <div className="p-6 space-y-6">
          {/* Brand Header */}
          <div className="flex items-center space-x-3 pb-6 border-b border-gray-800">
            <div className="w-10 h-10 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
              <img 
                src="/branding/hlugiso-emblem.png" 
                alt="HLUGISO" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-black text-sm tracking-tight text-white leading-tight">HLUGISO (PTY) LTD</div>
              <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Executive Portal</div>
            </div>
          </div>

          {/* Director User Card */}
          <div className="bg-gray-900/90 rounded-2xl p-4 border border-gray-800/80 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#064E3B] text-white flex items-center justify-center font-black text-xs shrink-0 border border-emerald-500/30">
              TM
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-xs text-white truncate">Thabo Makola</div>
              <div className="text-[10px] text-emerald-400 font-semibold truncate">Managing Director</div>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#064E3B] text-white shadow-md'
                      : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white text-[#064E3B]' : 'bg-gray-800 text-emerald-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-6 border-t border-gray-800 space-y-2 text-xs">
          <button
            onClick={exportDatabase}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-gray-400 hover:bg-gray-900 hover:text-white transition-colors"
          >
            <Database className="w-4 h-4 text-emerald-500" />
            <span>Backup Data (.json)</span>
          </button>

          <button
            onClick={() => setIsPinModalOpen(true)}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-gray-400 hover:bg-gray-900 hover:text-white transition-colors"
          >
            <Key className="w-4 h-4 text-amber-500" />
            <span>Change Security PIN</span>
          </button>

          <button
            onClick={onBackToSite}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-gray-400 hover:bg-gray-900 hover:text-white transition-colors"
          >
            <Globe className="w-4 h-4 text-blue-400" />
            <span>View Public Website</span>
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Lock &amp; Logout</span>
          </button>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="md:hidden bg-gray-950 text-white px-4 py-3 flex items-center justify-between border-b border-gray-800 sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <img src="/branding/hlugiso-emblem.png" alt="HLUGISO" className="w-7 h-7 object-contain bg-white rounded-lg p-0.5" />
          <span className="font-bold text-xs tracking-tight">HLUGISO Executive Portal</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onBackToSite}
            className="text-[11px] px-2.5 py-1 rounded bg-gray-800 text-gray-300"
          >
            Public Site
          </button>
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="p-1.5 rounded-lg bg-gray-800 text-gray-300"
          >
            {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isMobileNavOpen && (
        <div className="md:hidden bg-gray-900 text-white p-4 space-y-2 border-b border-gray-800">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileNavOpen(false);
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-bold ${
                activeTab === item.id ? 'bg-[#064E3B] text-white' : 'text-gray-300'
              }`}
            >
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="bg-emerald-700 text-white px-2 py-0.5 rounded-full text-[10px]">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
          <div className="pt-3 border-t border-gray-800 flex justify-between">
            <button onClick={exportDatabase} className="text-xs text-gray-400">Backup DB</button>
            <button onClick={logout} className="text-xs text-red-400">Lock Portal</button>
          </div>
        </div>
      )}

      {/* MAIN VIEW AREA */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {activeTab === 'overview' && (
          <PortalOverview 
            onNavigateTab={tab => setActiveTab(tab)} 
            onOpenNewQuote={handleOpenNewQuote}
          />
        )}

        {activeTab === 'quotes' && (
          <QuotesManager 
            isCreateOpen={isNewQuoteModalTriggered}
            onCloseCreate={() => setIsNewQuoteModalTriggered(false)}
          />
        )}

        {activeTab === 'invoices' && (
          <InvoicesManager />
        )}

        {activeTab === 'rfqs' && (
          <RfqManager onConvertRfqToQuote={handleConvertRfqToQuote} />
        )}

        {activeTab === 'fleet' && (
          <FleetTracker />
        )}

        {activeTab === 'tender' && (
          <TenderHub />
        )}

        {activeTab === 'clients' && (
          <ClientsManager onQuoteForClient={handleQuoteForClient} />
        )}
      </main>

      {/* CHANGE PIN MODAL */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 space-y-4 border border-gray-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-base text-gray-900">Change Director Security PIN</h3>
              <button onClick={() => setIsPinModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleChangePinSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-600 font-bold block mb-1">New PIN / Passcode</label>
                <input
                  type="text"
                  required
                  value={newPinInput}
                  onChange={e => setNewPinInput(e.target.value)}
                  placeholder="e.g. 2026 or 4-8 digits"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-center tracking-widest"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsPinModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#064E3B] text-white font-bold"
                >
                  Save New PIN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

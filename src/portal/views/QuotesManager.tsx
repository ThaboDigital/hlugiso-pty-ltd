import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Printer, 
  MessageCircle, 
  FileCheck2, 
  Trash2, 
  Edit3, 
  ExternalLink,
  ChevronDown,
  X,
  PlusCircle,
  Truck,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { usePortal } from '../PortalContext';
import { QuoteDocument, LineItem, DocumentStatus } from '../types';
import { DEFAULT_CATALOG_ITEMS } from '../catalogData';
import { PrintableDocument } from '../components/PrintableDocument';

interface QuotesManagerProps {
  isCreateOpen?: boolean;
  onCloseCreate?: () => void;
}

export const QuotesManager: React.FC<QuotesManagerProps> = ({
  isCreateOpen: initialCreateOpen = false,
  onCloseCreate,
}) => {
  const { quotes, addQuote, updateQuote, deleteQuote, convertQuoteToInvoice, clients } = usePortal();
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(initialCreateOpen);
  const [selectedDocForPrint, setSelectedDocForPrint] = useState<QuoteDocument | null>(null);

  // Form State for Creating Quote
  const [serviceCategory, setServiceCategory] = useState<string>('Cleaning & Facility Services');
  const [clientName, setClientName] = useState<string>('');
  const [clientOrganization, setClientOrganization] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [serviceLocation, setServiceLocation] = useState<string>('Tzaneen & Surrounds');
  const [serviceDate, setServiceDate] = useState<string>('');
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [paymentTerms, setPaymentTerms] = useState<string>('30_days');
  const [paymentTermsText, setPaymentTermsText] = useState<string>('30 Days from Tax Invoice (Official Purchase Order)');
  const [customDepositValue, setCustomDepositValue] = useState<number>(0);
  const [notes, setNotes] = useState<string>('Standard 30-day payment terms from tax invoice upon approved completion. Official Purchase Order (PO) required.');
  const [items, setItems] = useState<LineItem[]>([]);

  // Catalog item quick-adder filter
  const [catalogFilter, setCatalogFilter] = useState<string>('All');

  // Custom line item form
  const [isAddingCustom, setIsAddingCustom] = useState<boolean>(false);
  const [customDesc, setCustomDesc] = useState<string>('');
  const [customCategory, setCustomCategory] = useState<LineItem['category']>('Cleaning');
  const [customUnit, setCustomUnit] = useState<string>('Month');
  const [customQty, setCustomQty] = useState<number>(1);
  const [customPrice, setCustomPrice] = useState<number>(0);

  // Catalog item quick-adder
  const handleAddCatalogItem = (catalogIndex: number) => {
    const cat = DEFAULT_CATALOG_ITEMS[catalogIndex];
    if (!cat) return;
    const newItem: LineItem = {
      id: 'item-' + Date.now() + Math.random().toString(36).substr(2, 4),
      description: cat.description,
      category: cat.category,
      quantity: cat.quantity,
      unit: cat.unit,
      unitPrice: cat.unitPrice,
      total: cat.quantity * cat.unitPrice,
    };
    setItems(prev => [...prev, newItem]);
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDesc.trim() || customPrice <= 0) {
      alert('Please enter a description and unit price greater than 0.');
      return;
    }
    const newItem: LineItem = {
      id: 'custom-' + Date.now(),
      description: customDesc.trim(),
      category: customCategory,
      quantity: Number(customQty) || 1,
      unit: customUnit.trim() || 'Unit',
      unitPrice: Number(customPrice),
      total: (Number(customQty) || 1) * Number(customPrice),
    };
    setItems(prev => [...prev, newItem]);
    setCustomDesc('');
    setCustomPrice(0);
    setIsAddingCustom(false);
  };

  const handleUpdateItemQty = (id: string, newQty: number) => {
    if (newQty < 1) return;
    setItems(prev => prev.map(it => {
      if (it.id === id) {
        return { ...it, quantity: newQty, total: newQty * it.unitPrice };
      }
      return it;
    }));
  };

  const handleUpdateItemPrice = (id: string, newPrice: number) => {
    setItems(prev => prev.map(it => {
      if (it.id === id) {
        return { ...it, unitPrice: newPrice, total: it.quantity * newPrice };
      }
      return it;
    }));
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(it => it.id !== id));
  };

  const handleClientSelect = (clientId: string) => {
    const found = clients.find(c => c.id === clientId);
    if (found) {
      setClientName(found.name);
      setClientOrganization(found.organization || '');
      setClientPhone(found.phone);
      setClientEmail(found.email || '');
      if (found.address) setServiceLocation(found.address);
    }
  };

  const handlePaymentTermsChange = (newTerms: string) => {
    setPaymentTerms(newTerms);
    if (newTerms === '30_days') {
      setPaymentTermsText('30 Days from Tax Invoice (Official Purchase Order)');
      setNotes('Official Purchase Orders accepted. Standard 30 days payment terms from tax invoice.');
    } else if (newTerms === 'deposit_50') {
      setPaymentTermsText('50% Upfront Commitment Deposit, Balance on Completion');
      setNotes('50% upfront commitment deposit required to confirm project scheduling. Balance payable upon delivery / sign-off.');
    } else if (newTerms === 'on_delivery') {
      setPaymentTermsText('Strictly Payment on Delivery (COD) / Handover');
      setNotes('Strictly cash on delivery / immediate EFT upon delivery and verification.');
    } else if (newTerms === 'milestone') {
      setPaymentTermsText('Milestone Progress Draw (30% Mobilization, 40% Intermediate, 30% Final)');
      setNotes('Progress draws: 30% mobilization, 40% mid-project milestone, 30% practical completion sign-off.');
    } else if (newTerms === 'full_upfront') {
      setPaymentTermsText('100% Full Payment Upon Order Confirmation');
      setNotes('Full upfront settlement required for materials procurement and dispatch.');
    } else {
      setPaymentTermsText('Custom Commercial Agreement');
    }
  };

  const handleServiceCategoryChange = (cat: string) => {
    setServiceCategory(cat);
    if (cat.includes('Cleaning')) {
      setCatalogFilter('Cleaning');
      setCustomCategory('Cleaning');
      setCustomUnit('Month');
    } else if (cat.includes('Construction') || cat.includes('Civil')) {
      setCatalogFilter('Construction');
      setCustomCategory('Construction');
      setCustomUnit('Per m²');
    } else if (cat.includes('Supply') || cat.includes('Procurement')) {
      setCatalogFilter('Procurement');
      setCustomCategory('Procurement');
      setCustomUnit('Set');
    } else if (cat.includes('Cold-Chain') || cat.includes('Restroom') || cat.includes('Sanitation')) {
      setCatalogFilter('Cold-Chain & VIP');
      setCustomCategory('Cold-Chain');
      setCustomUnit('Weekend Hire');
    } else if (cat.includes('Events') || cat.includes('Funeral')) {
      setCatalogFilter('Tents & Sound');
      setCustomCategory('Tents');
      setCustomUnit('Event Duration');
    } else if (cat.includes('Livestock')) {
      setCatalogFilter('Livestock');
      setCustomCategory('Livestock');
      setCustomUnit('Head');
    } else {
      setCatalogFilter('All');
    }
  };

  // Calculations
  const subtotal = items.reduce((acc, curr) => acc + curr.total, 0);
  const total = Math.max(0, subtotal + Number(deliveryFee) - Number(discount));
  const depositRequired = paymentTerms === 'deposit_50'
    ? Math.round(total * 0.5)
    : paymentTerms === 'full_upfront'
    ? total
    : paymentTerms === 'milestone'
    ? Math.round(total * 0.3)
    : paymentTerms === 'custom'
    ? Number(customDepositValue)
    : 0;

  const catalogWithIndex = DEFAULT_CATALOG_ITEMS.map((item, idx) => ({ ...item, originalIndex: idx }));
  const filteredCatalogItems = catalogWithIndex.filter(item => {
    if (catalogFilter === 'All') return true;
    if (catalogFilter === 'Cold-Chain & VIP') return item.category === 'Cold-Chain' || item.category === 'Sanitation';
    if (catalogFilter === 'Tents & Sound') return item.category === 'Tents' || item.category === 'Sound';
    return item.category === catalogFilter;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      alert('Please enter a client name.');
      return;
    }

    const nextNumber = 'HLU-Q-2026-' + (quotes.length + 45).toString().padStart(3, '0');
    const todayStr = new Date().toISOString().split('T')[0];

    const validUntilDate = new Date();
    validUntilDate.setDate(validUntilDate.getDate() + 14);
    const validUntilStr = validUntilDate.toISOString().split('T')[0];

    const newQuote = addQuote({
      quoteNumber: nextNumber,
      date: todayStr,
      validUntil: validUntilStr,
      serviceCategory,
      clientName,
      clientOrganization,
      clientPhone,
      clientEmail,
      serviceLocation,
      serviceDate,
      eventLocation: serviceLocation,
      eventDate: serviceDate,
      status: 'sent',
      items,
      subtotal,
      deliveryFee: Number(deliveryFee),
      discount: Number(discount),
      total,
      depositRequired,
      paymentTerms,
      paymentTermsText,
      notes,
    });

    setIsModalOpen(false);
    if (onCloseCreate) onCloseCreate();
    setSelectedDocForPrint(newQuote);
  };

  const handleConvert = (quoteId: string) => {
    if (window.confirm('Convert this quotation to an official tax/commercial invoice?')) {
      const inv = convertQuoteToInvoice(quoteId);
      if (inv) {
        alert(`Invoice ${inv.invoiceNumber} generated successfully!`);
      }
    }
  };

  // Filtered quotes
  const filteredQuotes = quotes.filter(q => {
    const matchesSearch = 
      q.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.clientOrganization || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.eventLocation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">Commercial Quotations &amp; BOQ</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Generate, print, and WhatsApp official commercial proposals across Cleaning, Civil Works (CIDB 1CE), Supplies, and Fleet hire.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#075E54] text-white text-xs font-bold transition-all shadow active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ New Quotation</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by quote #, client, site location..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {['all', 'draft', 'sent', 'accepted', 'invoiced'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                statusFilter === st
                  ? 'bg-[#064E3B] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Quote Ref</th>
                <th className="py-3 px-4">Client / Organization</th>
                <th className="py-3 px-4">Service Scope &amp; Site</th>
                <th className="py-3 px-4 text-right">Total (ZAR)</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-gray-400 space-y-3">
                    <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <div className="font-bold text-gray-700 text-sm">No Quotations Found</div>
                    <div className="text-xs text-gray-400 max-w-sm mx-auto">
                      Your quotation ledger is clean. Click &ldquo;+ New Quotation&rdquo; above to generate and print your first commercial quote.
                    </div>
                  </td>
                </tr>
              ) : (
                filteredQuotes.map(q => (
                  <tr key={q.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                      {q.quoteNumber}
                      <span className="block font-sans font-normal text-[11px] text-gray-400">{q.date}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900">{q.clientName}</div>
                      {q.clientOrganization && (
                        <div className="text-[11px] font-medium text-[#064E3B]">{q.clientOrganization}</div>
                      )}
                      <div className="text-[11px] text-gray-500">{q.clientPhone}</div>
                    </td>

                    <td className="py-3.5 px-4 text-gray-600">
                      <div className="flex items-center space-x-1.5 mb-0.5">
                        <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900">
                          {q.serviceCategory || 'General Service'}
                        </span>
                      </div>
                      <div className="font-medium text-gray-800">{q.serviceLocation || q.eventLocation || 'Tzaneen, Limpopo'}</div>
                      <div className="text-[11px] text-gray-500">{q.serviceDate || q.eventDate || 'Scheduled on Agreement'}</div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="font-black text-sm text-gray-900">R {q.total.toLocaleString()}</div>
                      <div className="text-[10px] text-emerald-700 font-semibold">
                        {q.paymentTerms === '30_days' 
                          ? '30 Days PO Terms'
                          : q.depositRequired > 0 
                          ? `Deposit: R ${q.depositRequired.toLocaleString()}`
                          : 'COD / Direct Settlement'}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <select
                        value={q.status}
                        onChange={e => updateQuote(q.id, { status: e.target.value as DocumentStatus })}
                        className={`text-[10px] font-bold uppercase px-2 py-1 rounded border transition-colors cursor-pointer ${
                          q.status === 'accepted'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : q.status === 'invoiced'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : q.status === 'sent'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}
                      >
                        <option value="draft">Draft</option>
                        <option value="sent">Sent</option>
                        <option value="accepted">Accepted</option>
                        <option value="invoiced">Invoiced</option>
                        <option value="declined">Declined</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => setSelectedDocForPrint(q)}
                          title="Print / View / WhatsApp"
                          className="p-1.5 rounded-lg bg-gray-100 hover:bg-[#064E3B] hover:text-white text-gray-700 transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>

                        {q.status !== 'invoiced' && (
                          <button
                            onClick={() => handleConvert(q.id)}
                            title="Convert to Invoice"
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 transition-colors"
                          >
                            <FileCheck2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => {
                            if (window.confirm('Delete this quote?')) deleteQuote(q.id);
                          }}
                          title="Delete Quote"
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE QUOTE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center overflow-y-auto p-3 sm:p-6">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-gray-200">
            {/* Modal Header */}
            <div className="bg-[#064E3B] text-white px-6 py-5 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black tracking-tight">Create Commercial Quotation / BOQ</h3>
                <p className="text-xs text-emerald-200">Cleaning, Civil Works (1CE), Supplies &amp; Fleet Logistics with custom payment terms</p>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  if (onCloseCreate) onCloseCreate();
                }}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-6 text-xs text-gray-800 max-h-[85vh] overflow-y-auto">
              {/* Service Division Selector */}
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/80 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="font-extrabold text-[#064E3B] uppercase text-[11px] tracking-wide">
                    1. Select Service Division
                  </label>
                  <span className="text-[11px] text-gray-500">Auto-configures catalog presets and measurement units</span>
                </div>
                <select
                  value={serviceCategory}
                  onChange={e => handleServiceCategoryChange(e.target.value)}
                  className="w-full p-2.5 bg-white border border-emerald-300 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                >
                  <option value="Corporate Cleaning & Janitorial">Corporate Cleaning &amp; Janitorial Services</option>
                  <option value="Civil Engineering & Construction (CIDB 1CE)">Civil Engineering &amp; Construction (CIDB Grade 1CE)</option>
                  <option value="General Supply & Procurement (PPE / Tools)">General Supply &amp; Procurement (PPE, Chemicals &amp; Hardware)</option>
                  <option value="Mobile Cold-Chain Trailers">Mobile Cold-Chain (Temperature Controlled Trailers)</option>
                  <option value="VIP Mobile Sanitation Trailers">VIP Mobile Sanitation &amp; Hygiene Fleet</option>
                  <option value="Audio-Visual & Sound Reinforcement">Audio-Visual, Public Address &amp; Sound Reinforcement</option>
                  <option value="Tents, Canopies & Event Infrastructure">Tents, Canopies &amp; Event Infrastructure</option>
                  <option value="Ceremonial & Cultural Livestock Supply">Ceremonial &amp; Cultural Livestock Supply (Cattle, Goats)</option>
                  <option value="Outsourced Catering & Hospitality">Outsourced Catering &amp; Hospitality Services</option>
                  <option value="Multi-Service Commercial Contract">Multi-Service Commercial Contract</option>
                </select>
              </div>

              {/* Client Details */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-gray-900 uppercase text-[11px]">2. Client &amp; Recipient Coordinates</label>
                  {clients.length > 0 && (
                    <select
                      onChange={e => handleClientSelect(e.target.value)}
                      className="text-[11px] bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-1 text-gray-700"
                    >
                      <option value="">Quick-select saved client / contractor...</option>
                      {clients.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name} {c.organization ? `(${c.organization})` : ''} [{c.type}]
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-500 mb-1 block">Client Name / Contact Person *</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      placeholder="e.g. Sipho Ndlovu / Jane Smith"
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-500 mb-1 block">Organization / Company / Department</label>
                    <input
                      type="text"
                      value={clientOrganization}
                      onChange={e => setClientOrganization(e.target.value)}
                      placeholder="e.g. Limpopo Dept of Public Works / ABC Mining / Private"
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-500 mb-1 block">Phone / WhatsApp *</label>
                    <input
                      type="text"
                      required
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                      placeholder="e.g. 083 597 6462"
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-500 mb-1 block">Email (Optional)</label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                      placeholder="procurement@client.co.za"
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Site Coordinates & Project Timeline */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <label className="font-bold text-gray-900 uppercase text-[11px] block">3. Project Location &amp; Timeline</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-500 mb-1 block">Site / Project Location *</label>
                    <input
                      type="text"
                      value={serviceLocation}
                      onChange={e => setServiceLocation(e.target.value)}
                      placeholder="e.g. Tzaneen Civic Centre / Nkowankowa Section B / Polokwane"
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-500 mb-1 block">Service Timeline / Scheduled Period</label>
                    <input
                      type="text"
                      value={serviceDate}
                      onChange={e => setServiceDate(e.target.value)}
                      placeholder="e.g. 1-Year Janitorial Contract / Oct 2026 – Nov 2026 / Weekend Hire"
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Commercial Payment Terms */}
              <div className="space-y-3 pt-2 border-t border-gray-100 bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="font-bold text-gray-900 uppercase text-[11px]">
                    4. Commercial Payment Terms &amp; Settlement
                  </label>
                  <span className="text-[11px] text-gray-500">Adapts calculations and contractual printout</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-500 mb-1 block">Payment Term Structure</label>
                    <select
                      value={paymentTerms}
                      onChange={e => handlePaymentTermsChange(e.target.value as any)}
                      className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-900"
                    >
                      <option value="30_days">30 Days from Tax Invoice (Official Purchase Order)</option>
                      <option value="deposit_50">50% Upfront Commitment Deposit, Balance on Completion</option>
                      <option value="on_delivery">Strictly Payment on Delivery (COD) / Practical Completion</option>
                      <option value="milestone">Milestone Progress Draws (30% Mobilization, 40% Intermediate, 30% Final)</option>
                      <option value="full_upfront">100% Full Upfront Settlement</option>
                      <option value="custom">Custom Deposit / Special Commercial Agreement</option>
                    </select>
                  </div>

                  {paymentTerms === 'custom' ? (
                    <div>
                      <label className="text-[11px] text-gray-500 mb-1 block">Custom Deposit Amount (ZAR)</label>
                      <input
                        type="number"
                        value={customDepositValue}
                        onChange={e => setCustomDepositValue(parseFloat(e.target.value) || 0)}
                        placeholder="e.g. 5000"
                        className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-gray-900"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="text-[11px] text-gray-500 mb-1 block">Contractual Terms Display Text</label>
                      <input
                        type="text"
                        value={paymentTermsText}
                        onChange={e => setPaymentTermsText(e.target.value)}
                        className="w-full p-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-700"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Multi-Service Catalog Quick-Adder */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <label className="font-bold text-gray-900 uppercase text-[11px]">
                    5. Add Items from Commercial Master Catalog
                  </label>
                  <div className="flex flex-wrap gap-1">
                    {['All', 'Cleaning', 'Construction', 'Procurement', 'Cold-Chain & VIP', 'Tents & Sound', 'Livestock', 'Catering', 'Transport'].map(tab => (
                      <button
                        type="button"
                        key={tab}
                        onClick={() => setCatalogFilter(tab)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          catalogFilter === tab
                            ? 'bg-[#064E3B] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 bg-gray-50 rounded-xl border border-gray-200">
                  {filteredCatalogItems.map(item => (
                    <button
                      type="button"
                      key={item.originalIndex}
                      onClick={() => handleAddCatalogItem(item.originalIndex)}
                      className="p-2 bg-white rounded-lg border border-gray-200 hover:border-[#064E3B] hover:shadow-xs text-left transition-all group flex flex-col justify-between"
                    >
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 block">
                          {item.category} &bull; {item.unit}
                        </span>
                        <span className="font-bold text-gray-900 text-xs line-clamp-1 group-hover:text-[#064E3B]">
                          {item.description}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[11px]">
                        <span className="font-extrabold text-gray-900">R {item.unitPrice.toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-[#064E3B] group-hover:underline">+ Add</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Line Item Builder */}
              <div className="bg-gray-50/80 p-3.5 rounded-2xl border border-gray-200 space-y-2">
                <span className="font-bold text-gray-900 uppercase text-[11px] block">
                  Or Build Custom BOQ Item / Service
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Item / Service description..."
                      value={customDesc}
                      onChange={e => setCustomDesc(e.target.value)}
                      className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <select
                      value={customCategory}
                      onChange={e => setCustomCategory(e.target.value as any)}
                      className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs"
                    >
                      <option value="Cleaning">Cleaning</option>
                      <option value="Construction">Construction</option>
                      <option value="Procurement">Procurement</option>
                      <option value="Cold-Chain">Cold-Chain</option>
                      <option value="Sanitation">Sanitation</option>
                      <option value="Tents">Tents</option>
                      <option value="Sound">Sound</option>
                      <option value="Livestock">Livestock</option>
                      <option value="Catering">Catering</option>
                      <option value="Transport">Transport</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-1 sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Unit (e.g. m², Month)"
                      value={customUnit}
                      onChange={e => setCustomUnit(e.target.value)}
                      className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs"
                    />
                    <div className="flex space-x-1">
                      <input
                        type="number"
                        placeholder="R Price"
                        value={customPrice || ''}
                        onChange={e => setCustomPrice(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-bold"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomItem}
                        className="px-3 py-2 bg-[#064E3B] hover:bg-[#075E54] text-white rounded-lg text-xs font-bold shrink-0"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-gray-900 uppercase text-[11px] block">
                    6. Active Line Items ({items.length})
                  </label>
                  <span className="text-[11px] text-gray-500">Edit quantities or unit rates directly</span>
                </div>

                <div className="space-y-2">
                  {items.map(item => (
                    <div 
                      key={item.id}
                      className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="flex-1 space-y-0.5">
                        <div className="font-bold text-gray-900">{item.description}</div>
                        <div className="text-[11px] text-gray-500 font-medium">
                          <span className="text-emerald-800 font-bold">{item.category}</span> &bull; {item.unit}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 shrink-0">
                        <div className="flex items-center space-x-1">
                          <span className="text-[11px] text-gray-500">Qty:</span>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={e => handleUpdateItemQty(item.id, parseInt(e.target.value) || 1)}
                            className="w-16 p-1 bg-white border border-gray-300 rounded text-center text-xs font-bold"
                          />
                        </div>

                        <div className="flex items-center space-x-1">
                          <span className="text-[11px] text-gray-500">R</span>
                          <input
                            type="number"
                            value={item.unitPrice}
                            onChange={e => handleUpdateItemPrice(item.id, parseFloat(e.target.value) || 0)}
                            className="w-24 p-1 bg-white border border-gray-300 rounded text-right text-xs font-bold"
                          />
                        </div>

                        <div className="font-black text-sm text-gray-900 w-24 text-right font-mono">
                          R {item.total.toLocaleString()}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Adjustments */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                <div>
                  <label className="text-[11px] text-gray-500 mb-1 block">Site Delivery / Mobilization Surcharge (ZAR)</label>
                  <input
                    type="number"
                    value={deliveryFee}
                    onChange={e => setDeliveryFee(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-gray-500 mb-1 block">Commercial Partner Discount (ZAR)</label>
                  <input
                    type="number"
                    value={discount}
                    onChange={e => setDiscount(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-emerald-800 font-medium"
                  />
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="text-[11px] text-gray-500 mb-1 block">Quotation Notes / Scope Inclusions</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800"
                />
              </div>

              {/* Totals Summary */}
              <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-emerald-900">
                  <span>Subtotal:</span>
                  <span className="font-bold">R {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-900">
                  <span>Delivery &amp; Logistics Mobilization:</span>
                  <span>R {deliveryFee.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount:</span>
                    <span>- R {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-gray-950 border-t border-emerald-200 pt-1.5">
                  <span>Total Quotation (ZAR):</span>
                  <span className="text-[#064E3B]">R {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-[#064E3B] pt-0.5 border-t border-dashed border-emerald-200 mt-1">
                  <span>Contract Terms: {paymentTermsText}</span>
                  {depositRequired > 0 && <span>Deposit: R {depositRequired.toLocaleString()}</span>}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-bold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#075E54] text-white text-xs font-bold shadow-md transition-all active:scale-95"
                >
                  Generate &amp; Preview Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DOCUMENT PREVIEW MODAL */}
      {selectedDocForPrint && (
        <PrintableDocument
          document={selectedDocForPrint}
          type="quote"
          onClose={() => setSelectedDocForPrint(null)}
        />
      )}
    </div>
  );
};

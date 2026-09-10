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
  CheckCircle2
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
  const [clientName, setClientName] = useState<string>('');
  const [clientOrganization, setClientOrganization] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [eventLocation, setEventLocation] = useState<string>('Tzaneen & Surrounds');
  const [eventDate, setEventDate] = useState<string>('');
  const [deliveryFee, setDeliveryFee] = useState<number>(500);
  const [discount, setDiscount] = useState<number>(0);
  const [notes, setNotes] = useState<string>('50% deposit required to secure bookings. Balance payable upon delivery.');
  const [items, setItems] = useState<LineItem[]>([
    {
      id: 'item-init-1',
      description: 'VIP Mobile Restroom Trailer (Dual Private Cubicles, Porcelain Flush, Solar Light)',
      category: 'Sanitation',
      quantity: 1,
      unit: 'Weekend Hire',
      unitPrice: 3800,
      total: 3800,
    }
  ]);

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
      if (found.address) setEventLocation(found.address);
    }
  };

  // Calculations
  const subtotal = items.reduce((acc, curr) => acc + curr.total, 0);
  const total = Math.max(0, subtotal + Number(deliveryFee) - Number(discount));
  const depositRequired = Math.round(total * 0.5);

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
      clientName,
      clientOrganization,
      clientPhone,
      clientEmail,
      eventLocation,
      eventDate,
      status: 'sent',
      items,
      subtotal,
      deliveryFee: Number(deliveryFee),
      discount: Number(discount),
      total,
      depositRequired,
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
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">Quotation Management</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Generate, print, and WhatsApp official commercial proposals with 50% deposit calculations.
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
            placeholder="Search by quote #, client, venue..."
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
                <th className="py-3 px-4">Client / Funeral Group</th>
                <th className="py-3 px-4">Deployment Details</th>
                <th className="py-3 px-4 text-right">Total (ZAR)</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400">
                    No quotations found matching your search criteria.
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
                      <div className="font-medium text-gray-800">{q.eventLocation}</div>
                      <div className="text-[11px] text-gray-500">{q.eventDate || 'Scheduled Weekend'}</div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="font-black text-sm text-gray-900">R {q.total.toLocaleString()}</div>
                      <div className="text-[10px] text-emerald-700 font-semibold">
                        Deposit: R {q.depositRequired.toLocaleString()}
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
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-gray-200">
            {/* Modal Header */}
            <div className="bg-[#064E3B] text-white px-6 py-5 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black tracking-tight">Create Commercial Quotation</h3>
                <p className="text-xs text-emerald-200">Auto-calculated pricing, booking deposit &amp; equipment bundling</p>
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

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-6 text-xs text-gray-800 max-h-[80vh] overflow-y-auto">
              {/* Client Auto-Selector or Manual Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-gray-900 uppercase text-[11px]">Client &amp; Recipient Details</label>
                  {clients.length > 0 && (
                    <select
                      onChange={e => handleClientSelect(e.target.value)}
                      className="text-[11px] bg-gray-50 border border-gray-300 rounded px-2 py-1 text-gray-700"
                    >
                      <option value="">Quick-select saved client...</option>
                      {clients.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name} {c.organization ? `(${c.organization})` : ''}
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
                      placeholder="e.g. Samuel Baloyi"
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-500 mb-1 block">Organization / Funeral Parlour</label>
                    <input
                      type="text"
                      value={clientOrganization}
                      onChange={e => setClientOrganization(e.target.value)}
                      placeholder="e.g. Baloyi Family / Phala Funerals"
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
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
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-500 mb-1 block">Email (Optional)</label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                      placeholder="client@gmail.com"
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Event Coordinates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                <div>
                  <label className="text-[11px] text-gray-500 mb-1 block">Event Location / Venue</label>
                  <input
                    type="text"
                    value={eventLocation}
                    onChange={e => setEventLocation(e.target.value)}
                    placeholder="e.g. Stand 12, Nkowankowa Section B"
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-gray-500 mb-1 block">Scheduled Date / Weekend</label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    placeholder="e.g. Fri 18 Sep – Sun 20 Sep 2026"
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Quick Catalog Adder */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="font-bold text-gray-900 uppercase text-[11px] block">
                  Add From Standard Commercial Catalog
                </label>
                <div className="flex flex-wrap gap-2">
                  {DEFAULT_CATALOG_ITEMS.map((cat, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => handleAddCatalogItem(idx)}
                      className="px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-emerald-100 hover:text-emerald-900 border border-gray-200 text-[11px] font-medium transition-colors text-left"
                    >
                      + {cat.category}: <strong>R{cat.unitPrice.toLocaleString()}</strong>
                    </button>
                  ))}
                </div>
              </div>

              {/* Line Items Table */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="font-bold text-gray-900 uppercase text-[11px] block">
                  Quote Line Items ({items.length})
                </label>

                <div className="space-y-2">
                  {items.map(item => (
                    <div 
                      key={item.id}
                      className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="flex-1 space-y-0.5">
                        <div className="font-bold text-gray-900">{item.description}</div>
                        <div className="text-[11px] text-gray-500">{item.category} &bull; {item.unit}</div>
                      </div>

                      <div className="flex items-center space-x-3 shrink-0">
                        <div className="flex items-center space-x-1">
                          <span className="text-[11px] text-gray-500">Qty:</span>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={e => handleUpdateItemQty(item.id, parseInt(e.target.value) || 1)}
                            className="w-12 p-1 bg-white border border-gray-300 rounded text-center text-xs font-bold"
                          />
                        </div>

                        <div className="flex items-center space-x-1">
                          <span className="text-[11px] text-gray-500">R</span>
                          <input
                            type="number"
                            value={item.unitPrice}
                            onChange={e => handleUpdateItemPrice(item.id, parseFloat(e.target.value) || 0)}
                            className="w-20 p-1 bg-white border border-gray-300 rounded text-right text-xs font-bold"
                          />
                        </div>

                        <div className="font-black text-sm text-gray-900 w-20 text-right">
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
                  <label className="text-[11px] text-gray-500 mb-1 block">Site Delivery / Towing Surcharge (ZAR)</label>
                  <input
                    type="number"
                    value={deliveryFee}
                    onChange={e => setDeliveryFee(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-gray-500 mb-1 block">Commercial Partner Discount (ZAR)</label>
                  <input
                    type="number"
                    value={discount}
                    onChange={e => setDiscount(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-emerald-800"
                  />
                </div>
              </div>

              {/* Totals Summary */}
              <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-emerald-900">
                  <span>Subtotal:</span>
                  <span className="font-bold">R {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-900">
                  <span>Delivery &amp; Logistics:</span>
                  <span>R {deliveryFee.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount:</span>
                    <span>- R {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-gray-950 border-t border-emerald-200 pt-1.5">
                  <span>Total Quotation:</span>
                  <span className="text-[#064E3B]">R {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-[#064E3B] pt-0.5">
                  <span>Booking Deposit (50%):</span>
                  <span>R {depositRequired.toLocaleString()}</span>
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

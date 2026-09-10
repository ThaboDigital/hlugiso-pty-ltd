import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Printer, 
  MessageCircle, 
  CheckCircle2, 
  Trash2, 
  CreditCard, 
  ExternalLink,
  ShieldCheck,
  X
} from 'lucide-react';
import { usePortal } from '../PortalContext';
import { InvoiceDocument, InvoiceStatus, LineItem } from '../types';
import { DEFAULT_CATALOG_ITEMS } from '../catalogData';
import { PrintableDocument } from '../components/PrintableDocument';

export const InvoicesManager: React.FC = () => {
  const { invoices, addInvoice, updateInvoice, deleteInvoice, banking, updateBanking, clients } = usePortal();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isBankingModalOpen, setIsBankingModalOpen] = useState<boolean>(false);
  const [selectedDocForPrint, setSelectedDocForPrint] = useState<InvoiceDocument | null>(null);

  // Form State for Direct Invoice
  const [clientName, setClientName] = useState<string>('');
  const [clientOrganization, setClientOrganization] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [eventLocation, setEventLocation] = useState<string>('Tzaneen, Limpopo');
  const [eventDate, setEventDate] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [depositPaid, setDepositPaid] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(500);
  const [discount, setDiscount] = useState<number>(0);
  const [items, setItems] = useState<LineItem[]>([
    {
      id: 'inv-item-1',
      description: 'Mobile Cold-Room Trailer (Hygienic Chiller -2°C to +4°C, Meat Rail)',
      category: 'Cold-Chain',
      quantity: 1,
      unit: 'Weekend Hire',
      unitPrice: 3500,
      total: 3500,
    }
  ]);

  // Banking details edit form state
  const [bankName, setBankName] = useState(banking.bankName);
  const [accountHolder, setAccountHolder] = useState(banking.accountHolder);
  const [accountNumber, setAccountNumber] = useState(banking.accountNumber);
  const [branchCode, setBranchCode] = useState(banking.branchCode);
  const [accountType, setAccountType] = useState(banking.accountType);

  // Metrics
  const totalInvoiced = invoices.reduce((acc, curr) => acc + curr.total, 0);
  const totalCollected = invoices.reduce((acc, curr) => acc + curr.depositPaid + (curr.status === 'paid' ? curr.balanceDue : 0), 0);
  const totalOutstanding = invoices.filter(i => i.status !== 'paid').reduce((acc, curr) => acc + curr.balanceDue, 0);

  // Filtered
  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = 
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inv.clientOrganization || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id: string, newStatus: InvoiceStatus) => {
    const inv = invoices.find(i => i.id === id);
    if (!inv) return;
    
    if (newStatus === 'paid') {
      updateInvoice(id, { 
        status: 'paid', 
        depositPaid: inv.total, 
        balanceDue: 0 
      });
    } else {
      updateInvoice(id, { status: newStatus });
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      alert('Please enter a client name.');
      return;
    }

    const subtotal = items.reduce((acc, curr) => acc + curr.total, 0);
    const total = Math.max(0, subtotal + Number(deliveryFee) - Number(discount));
    const balanceDue = Math.max(0, total - Number(depositPaid));

    const nextInvoiceNumber = 'HLU-INV-2026-' + (invoices.length + 30).toString().padStart(3, '0');
    const todayStr = new Date().toISOString().split('T')[0];

    const newInv = addInvoice({
      invoiceNumber: nextInvoiceNumber,
      date: todayStr,
      dueDate: dueDate || todayStr,
      clientName,
      clientOrganization,
      clientPhone,
      clientEmail,
      eventLocation,
      eventDate,
      status: balanceDue === 0 ? 'paid' : Number(depositPaid) > 0 ? 'deposit_paid' : 'unpaid',
      items,
      subtotal,
      deliveryFee: Number(deliveryFee),
      discount: Number(discount),
      total,
      depositPaid: Number(depositPaid),
      balanceDue,
      notes: 'Payment via EFT using invoice reference. Banking details as listed.',
    });

    setIsCreateModalOpen(false);
    setSelectedDocForPrint(newInv);
  };

  const handleSaveBanking = (e: React.FormEvent) => {
    e.preventDefault();
    updateBanking({
      bankName,
      accountHolder,
      accountNumber,
      branchCode,
      accountType,
      referenceFormat: 'Invoice Number',
    });
    setIsBankingModalOpen(false);
    alert('Banking credentials updated successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Financial Summary Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Total Billed</span>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
            R {totalInvoiced.toLocaleString()}
          </div>
          <span className="text-[11px] text-gray-400 mt-1 block">{invoices.length} invoices issued</span>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Collected Funds</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-800 mt-1">
            R {totalCollected.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 mt-1 block">Deposits &amp; settlements cleared</span>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">Outstanding Balance</span>
          <div className="text-2xl sm:text-3xl font-black text-red-700 mt-1">
            R {totalOutstanding.toLocaleString()}
          </div>
          <span className="text-[11px] text-amber-700 mt-1 block">Awaiting payment / event handover</span>
        </div>
      </div>

      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">Commercial &amp; Tax Invoices</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            SARS-compliant invoicing with official banking details, deposit crediting, and payment tracking.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setIsBankingModalOpen(true)}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all border border-gray-200"
          >
            <CreditCard className="w-4 h-4 text-emerald-800" />
            <span>Banking Details</span>
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#075E54] text-white text-xs font-bold transition-all shadow active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create Direct Invoice</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by invoice #, client..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {['all', 'unpaid', 'deposit_paid', 'paid', 'overdue'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                statusFilter === st
                  ? 'bg-[#064E3B] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Invoice Ref</th>
                <th className="py-3 px-4">Client / Organization</th>
                <th className="py-3 px-4">Dates</th>
                <th className="py-3 px-4 text-right">Total (ZAR)</th>
                <th className="py-3 px-4 text-right">Balance Due</th>
                <th className="py-3 px-4 text-center">Payment Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    No invoices found matching your search.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                      {inv.invoiceNumber}
                      {inv.quoteNumber && (
                        <span className="block font-sans text-[10px] text-gray-400">From: {inv.quoteNumber}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900">{inv.clientName}</div>
                      {inv.clientOrganization && (
                        <div className="text-[11px] font-medium text-[#064E3B]">{inv.clientOrganization}</div>
                      )}
                      <div className="text-[11px] text-gray-500">{inv.clientPhone}</div>
                    </td>

                    <td className="py-3.5 px-4 text-gray-600">
                      <div>Issued: <strong className="text-gray-800">{inv.date}</strong></div>
                      <div className="text-[11px] text-amber-800 font-semibold">Due: {inv.dueDate}</div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-black text-sm text-gray-900">
                      R {inv.total.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className={`font-black text-sm ${inv.balanceDue === 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                        R {inv.balanceDue.toLocaleString()}
                      </div>
                      {inv.depositPaid > 0 && (
                        <div className="text-[10px] text-gray-500">Paid: R {inv.depositPaid.toLocaleString()}</div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <select
                        value={inv.status}
                        onChange={e => handleUpdateStatus(inv.id, e.target.value as InvoiceStatus)}
                        className={`text-[10px] font-bold uppercase px-2 py-1 rounded border transition-colors cursor-pointer ${
                          inv.status === 'paid'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : inv.status === 'deposit_paid'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="unpaid">Unpaid</option>
                        <option value="deposit_paid">Deposit Paid</option>
                        <option value="paid">Settled / Paid</option>
                        <option value="overdue">Overdue</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => setSelectedDocForPrint(inv)}
                          title="Print / PDF View / WhatsApp"
                          className="p-1.5 rounded-lg bg-gray-100 hover:bg-[#064E3B] hover:text-white text-gray-700 transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm('Delete this invoice?')) deleteInvoice(inv.id);
                          }}
                          title="Delete Invoice"
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

      {/* BANKING DETAILS MODAL */}
      {isBankingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-4 border border-gray-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-2 text-[#064E3B]">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-extrabold text-base text-gray-900">Official Banking Configuration</h3>
              </div>
              <button onClick={() => setIsBankingModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBanking} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-600 font-bold block mb-1">Bank Name</label>
                <input
                  type="text"
                  required
                  value={bankName}
                  onChange={e => setBankName(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                />
              </div>

              <div>
                <label className="text-gray-600 font-bold block mb-1">Account Holder</label>
                <input
                  type="text"
                  required
                  value={accountHolder}
                  onChange={e => setAccountHolder(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                />
              </div>

              <div>
                <label className="text-gray-600 font-bold block mb-1">Account Number</label>
                <input
                  type="text"
                  required
                  value={accountNumber}
                  onChange={e => setAccountNumber(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-600 font-bold block mb-1">Branch Code</label>
                  <input
                    type="text"
                    required
                    value={branchCode}
                    onChange={e => setBranchCode(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="text-gray-600 font-bold block mb-1">Account Type</label>
                  <input
                    type="text"
                    required
                    value={accountType}
                    onChange={e => setAccountType(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsBankingModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#064E3B] hover:bg-[#075E54] text-white font-bold"
                >
                  Save Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE DIRECT INVOICE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center overflow-y-auto p-3 sm:p-6">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-gray-200">
            <div className="bg-[#064E3B] text-white px-6 py-5 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black tracking-tight">Create Commercial Invoice</h3>
                <p className="text-xs text-emerald-200">SARS-compliant invoicing with deposit allocation</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-6 text-xs text-gray-800 max-h-[80vh] overflow-y-auto">
              {/* Client Coordinates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-gray-500 mb-1 block">Client / Company Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder="e.g. Phala Funeral Undertakers"
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-gray-500 mb-1 block">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={clientPhone}
                    onChange={e => setClientPhone(e.target.value)}
                    placeholder="e.g. 072 411 9022"
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-gray-500 mb-1 block">Event / Delivery Location</label>
                  <input
                    type="text"
                    value={eventLocation}
                    onChange={e => setEventLocation(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-gray-500 mb-1 block">Payment Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Deposit already paid */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <label className="font-bold text-emerald-900 block mb-1 text-xs">
                  Initial Deposit Paid (ZAR)
                </label>
                <input
                  type="number"
                  value={depositPaid}
                  onChange={e => setDepositPaid(parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  className="w-full p-2 bg-white border border-emerald-300 rounded-lg text-xs font-bold"
                />
                <span className="text-[10px] text-emerald-700 mt-1 block">
                  Deducted from the total invoice to calculate the outstanding balance due.
                </span>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#064E3B] hover:bg-[#075E54] text-white font-bold"
                >
                  Generate Invoice
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
          type="invoice"
          onClose={() => setSelectedDocForPrint(null)}
        />
      )}
    </div>
  );
};

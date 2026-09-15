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
  X,
  Receipt
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
  const [serviceCategory, setServiceCategory] = useState<string>('Corporate Cleaning & Janitorial');
  const [clientName, setClientName] = useState<string>('');
  const [clientOrganization, setClientOrganization] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [serviceLocation, setServiceLocation] = useState<string>('Tzaneen, Limpopo');
  const [serviceDate, setServiceDate] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [paymentTerms, setPaymentTerms] = useState<string>('30_days');
  const [paymentTermsText, setPaymentTermsText] = useState<string>('30 Days from Tax Invoice (Official PO)');
  const [depositPaid, setDepositPaid] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [notes, setNotes] = useState<string>('Payment via EFT using invoice reference. Banking details as listed.');

  // Catalog picker & custom item builder
  const [catalogFilter, setCatalogFilter] = useState<string>('All');
  const [customDesc, setCustomDesc] = useState<string>('');
  const [customCategory, setCustomCategory] = useState<LineItem['category']>('Cleaning');
  const [customUnit, setCustomUnit] = useState<string>('Month');
  const [customQty, setCustomQty] = useState<number>(1);
  const [customPrice, setCustomPrice] = useState<number>(0);

  const [items, setItems] = useState<LineItem[]>([
    {
      id: 'inv-item-1',
      description: 'Corporate Office Cleaning Contract (Monthly Janitorial, Chemicals, Consumables & Staff)',
      category: 'Cleaning',
      quantity: 1,
      unit: 'Month',
      unitPrice: 18500,
      total: 18500,
    }
  ]);

  // Banking details edit form state
  const [bankName, setBankName] = useState(banking.bankName);
  const [accountHolder, setAccountHolder] = useState(banking.accountHolder);
  const [accountNumber, setAccountNumber] = useState(banking.accountNumber);
  const [branchCode, setBranchCode] = useState(banking.branchCode);
  const [accountType, setAccountType] = useState(banking.accountType);

  // Client Quick Select
  const handleClientSelect = (clientId: string) => {
    const selected = clients.find(c => c.id === clientId);
    if (!selected) return;
    setClientName(selected.name);
    setClientOrganization(selected.organization || '');
    setClientPhone(selected.phone);
    setClientEmail(selected.email || '');
    if (selected.address || selected.location) {
      setServiceLocation(selected.address || selected.location || '');
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
    } else if (cat.includes('Events') || cat.includes('Sound') || cat.includes('Tents')) {
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

  const handlePaymentTermsChange = (newTerms: string) => {
    setPaymentTerms(newTerms);
    if (newTerms === '30_days') {
      setPaymentTermsText('30 Days from Tax Invoice (Official Purchase Order)');
    } else if (newTerms === 'deposit_50') {
      setPaymentTermsText('50% Upfront Commitment Deposit Cleared, Balance Settled on Completion');
    } else if (newTerms === 'on_delivery') {
      setPaymentTermsText('Strictly Payment on Delivery (COD) / Practical Handover');
    } else if (newTerms === 'milestone') {
      setPaymentTermsText('Milestone Progress Draw (30% Mobilization, 40% Intermediate, 30% Final)');
    } else if (newTerms === 'full_upfront') {
      setPaymentTermsText('100% Full Payment Settled Upon Order Confirmation');
    } else {
      setPaymentTermsText('Custom Commercial Agreement');
    }
  };

  const handleAddCatalogItem = (index: number) => {
    const item = DEFAULT_CATALOG_ITEMS[index];
    if (!item) return;
    const newItem: LineItem = {
      id: 'inv-item-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      description: item.description,
      category: item.category,
      quantity: 1,
      unit: item.unit,
      unitPrice: item.unitPrice,
      total: item.unitPrice,
    };
    setItems(prev => [...prev, newItem]);
  };

  const handleAddCustomItem = () => {
    if (!customDesc.trim()) {
      alert('Please enter an item description.');
      return;
    }
    const qty = Math.max(1, customQty);
    const price = Math.max(0, customPrice);
    const newItem: LineItem = {
      id: 'inv-item-custom-' + Date.now(),
      description: customDesc,
      category: customCategory,
      quantity: qty,
      unit: customUnit || 'Unit',
      unitPrice: price,
      total: qty * price,
    };
    setItems(prev => [...prev, newItem]);
    setCustomDesc('');
    setCustomPrice(0);
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleUpdateItemQty = (id: string, qty: number) => {
    setItems(prev => prev.map(i => {
      if (i.id === id) {
        const validQty = Math.max(1, qty);
        return { ...i, quantity: validQty, total: validQty * i.unitPrice };
      }
      return i;
    }));
  };

  const handleUpdateItemPrice = (id: string, price: number) => {
    setItems(prev => prev.map(i => {
      if (i.id === id) {
        const validPrice = Math.max(0, price);
        return { ...i, unitPrice: validPrice, total: i.quantity * validPrice };
      }
      return i;
    }));
  };

  const catalogWithIndex = DEFAULT_CATALOG_ITEMS.map((item, idx) => ({ ...item, originalIndex: idx }));
  const filteredCatalogItems = catalogWithIndex.filter(item => {
    if (catalogFilter === 'All') return true;
    if (catalogFilter === 'Cold-Chain & VIP') return item.category === 'Cold-Chain' || item.category === 'Sanitation';
    if (catalogFilter === 'Tents & Sound') return item.category === 'Tents' || item.category === 'Sound';
    return item.category === catalogFilter;
  });

  // Metrics
  const totalInvoiced = invoices.reduce((acc, curr) => acc + curr.total, 0);
  const totalCollected = invoices.reduce((acc, curr) => acc + curr.depositPaid + (curr.status === 'paid' ? curr.balanceDue : 0), 0);
  const totalOutstanding = invoices.filter(i => i.status !== 'paid').reduce((acc, curr) => acc + curr.balanceDue, 0);

  // Filtered
  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = 
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inv.clientOrganization || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inv.serviceCategory || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inv.serviceLocation || inv.eventLocation || '').toLowerCase().includes(searchTerm.toLowerCase());
    
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

    if (items.length === 0) {
      alert('Please add at least one line item to the invoice.');
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
      serviceCategory,
      clientName,
      clientOrganization,
      clientPhone,
      clientEmail,
      serviceLocation,
      serviceDate,
      eventLocation: serviceLocation,
      eventDate: serviceDate,
      status: balanceDue === 0 ? 'paid' : Number(depositPaid) > 0 ? 'deposit_paid' : 'unpaid',
      items,
      subtotal,
      deliveryFee: Number(deliveryFee),
      discount: Number(discount),
      total,
      depositPaid: Number(depositPaid),
      balanceDue,
      paymentTerms,
      paymentTermsText,
      notes: notes || 'Payment via EFT using invoice reference. Banking details as listed.',
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
                <th className="py-3 px-4">Service Scope &amp; Site</th>
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
                  <td colSpan={8} className="text-center py-16 text-gray-400 space-y-3">
                    <Receipt className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <div className="font-bold text-gray-700 text-sm">No Invoices Found</div>
                    <div className="text-xs text-gray-400 max-w-sm mx-auto">
                      Your billing register is clean. Click &ldquo;+ Create Direct Invoice&rdquo; or convert an accepted quote to issue an official tax invoice.
                    </div>
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
                      <div className="flex items-center space-x-1.5 mb-0.5">
                        <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900">
                          {inv.serviceCategory || 'Commercial Service'}
                        </span>
                      </div>
                      <div className="font-medium text-gray-800">{inv.serviceLocation || inv.eventLocation || 'Tzaneen, Limpopo'}</div>
                      <div className="text-[11px] text-gray-500">{inv.serviceDate || inv.eventDate || 'Completed / Ongoing'}</div>
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
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-gray-200">
            {/* Modal Header */}
            <div className="bg-[#064E3B] text-white px-6 py-5 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black tracking-tight">Create Commercial &amp; Tax Invoice</h3>
                <p className="text-xs text-emerald-200">SARS-compliant invoicing across Cleaning, Civil 1CE, Supplies, and Fleet hire</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
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
                  <span className="text-[11px] text-gray-500">Tailors line items and payment terms</span>
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

              {/* Client Coordinates */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-gray-900 uppercase text-[11px]">2. Client &amp; Billing Coordinates</label>
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
                      placeholder="e.g. Sipho Ndlovu / Phala Undertakers"
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-500 mb-1 block">Company / Organization / Department</label>
                    <input
                      type="text"
                      value={clientOrganization}
                      onChange={e => setClientOrganization(e.target.value)}
                      placeholder="e.g. Limpopo Dept of Health / ABC Mining"
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-500 mb-1 block">Phone / WhatsApp</label>
                    <input
                      type="text"
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                      placeholder="e.g. 072 411 9022"
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-500 mb-1 block">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                      placeholder="finance@client.co.za"
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Project Coordinates & Due Date */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <label className="font-bold text-gray-900 uppercase text-[11px] block">3. Site Coordinates &amp; Dates</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-500 mb-1 block">Site / Delivery Location</label>
                    <input
                      type="text"
                      value={serviceLocation}
                      onChange={e => setServiceLocation(e.target.value)}
                      placeholder="e.g. Tzaneen Civic Centre / Site B"
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-500 mb-1 block">Execution / Service Period</label>
                    <input
                      type="text"
                      value={serviceDate}
                      onChange={e => setServiceDate(e.target.value)}
                      placeholder="e.g. September 2026 Monthly Service"
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-500 mb-1 block">Payment Due Date</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={e => setDueDate(e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Commercial Payment Terms */}
              <div className="space-y-3 pt-2 border-t border-gray-100 bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="font-bold text-gray-900 uppercase text-[11px]">
                    4. Commercial Payment Terms
                  </label>
                  <span className="text-[11px] text-gray-500">Displayed on printed tax invoice</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-500 mb-1 block">Terms Framework</label>
                    <select
                      value={paymentTerms}
                      onChange={e => handlePaymentTermsChange(e.target.value)}
                      className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-900"
                    >
                      <option value="30_days">30 Days from Tax Invoice (Official PO)</option>
                      <option value="deposit_50">50% Deposit Paid, Balance on Handover</option>
                      <option value="on_delivery">Strictly Payment on Delivery (COD) / Practical Handover</option>
                      <option value="milestone">Milestone Progress Draw (30% Mobilization, 40% Mid, 30% Final)</option>
                      <option value="full_upfront">100% Full Payment Settled Upon Order Confirmation</option>
                      <option value="custom">Custom Commercial Terms</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-500 mb-1 block">Contractual Terms Display Text</label>
                    <input
                      type="text"
                      value={paymentTermsText}
                      onChange={e => setPaymentTermsText(e.target.value)}
                      className="w-full p-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-700"
                    />
                  </div>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-44 overflow-y-auto p-2 bg-gray-50 rounded-xl border border-gray-200">
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

              {/* Active Line Items Table */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-gray-900 uppercase text-[11px] block">
                    6. Active Invoice Items ({items.length})
                  </label>
                  <span className="text-[11px] text-gray-500">Edit quantities or unit prices</span>
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-100">
                <div>
                  <label className="text-[11px] text-gray-500 mb-1 block">Delivery / Mobilization Fee (ZAR)</label>
                  <input
                    type="number"
                    value={deliveryFee}
                    onChange={e => setDeliveryFee(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-gray-500 mb-1 block">Discount / Adjustment (ZAR)</label>
                  <input
                    type="number"
                    value={discount}
                    onChange={e => setDiscount(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-emerald-800 font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-gray-500 mb-1 block">Deposit Cleared / Paid (ZAR)</label>
                  <input
                    type="number"
                    value={depositPaid}
                    onChange={e => setDepositPaid(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 bg-white border border-emerald-300 rounded-lg text-xs font-bold text-emerald-900"
                  />
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="text-[11px] text-gray-500 mb-1 block">Invoice Notes &amp; Settlement Instructions</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800"
                />
              </div>

              {/* Totals Summary */}
              {(() => {
                const liveSubtotal = items.reduce((acc, curr) => acc + curr.total, 0);
                const liveTotal = Math.max(0, liveSubtotal + Number(deliveryFee) - Number(discount));
                const liveBalanceDue = Math.max(0, liveTotal - Number(depositPaid));

                return (
                  <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-1.5 text-xs">
                    <div className="flex justify-between text-emerald-900">
                      <span>Subtotal:</span>
                      <span className="font-bold">R {liveSubtotal.toLocaleString()}</span>
                    </div>
                    {deliveryFee > 0 && (
                      <div className="flex justify-between text-emerald-900">
                        <span>Delivery &amp; Mobilization:</span>
                        <span>R {deliveryFee.toLocaleString()}</span>
                      </div>
                    )}
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Discount:</span>
                        <span>- R {discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-black text-gray-950 border-t border-emerald-200 pt-1.5">
                      <span>Total Invoice (ZAR):</span>
                      <span className="text-[#064E3B]">R {liveTotal.toLocaleString()}</span>
                    </div>
                    {depositPaid > 0 && (
                      <div className="flex justify-between text-xs font-semibold text-emerald-800">
                        <span>Less Deposit Cleared:</span>
                        <span>- R {depositPaid.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-black text-red-700 pt-1 border-t border-dashed border-emerald-200">
                      <span>Balance Due:</span>
                      <span>R {liveBalanceDue.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })()}

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#064E3B] hover:bg-[#075E54] text-white text-xs font-bold shadow-md transition-all active:scale-95"
                >
                  Generate &amp; Preview Invoice
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

import React, { useState } from 'react';
import { 
  FileText, 
  Receipt, 
  Inbox, 
  Truck, 
  Plus, 
  ArrowUpRight, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Users, 
  Download,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { usePortal } from '../PortalContext';
import { QuoteDocument, InvoiceDocument } from '../types';
import { PrintableDocument } from '../components/PrintableDocument';

interface PortalOverviewProps {
  onNavigateTab: (tab: string) => void;
  onOpenNewQuote: () => void;
}

export const PortalOverview: React.FC<PortalOverviewProps> = ({ 
  onNavigateTab,
  onOpenNewQuote 
}) => {
  const { quotes, invoices, rfqs, fleet } = usePortal();
  const [selectedDoc, setSelectedDoc] = useState<{ doc: QuoteDocument | InvoiceDocument; type: 'quote' | 'invoice' } | null>(null);

  // Computed Metrics
  const activeQuotesCount = quotes.filter(q => q.status === 'sent' || q.status === 'accepted').length;
  const pendingInvoicesCount = invoices.filter(i => i.status === 'unpaid' || i.status === 'deposit_paid').length;
  const newRfqsCount = rfqs.filter(r => r.status === 'new').length;
  const bookedFleetCount = fleet.filter(f => f.status === 'booked').length;
  
  const totalOutstandingBalance = invoices
    .filter(i => i.status !== 'paid')
    .reduce((acc, curr) => acc + curr.balanceDue, 0);

  const totalRevenueCollected = invoices
    .reduce((acc, curr) => acc + curr.depositPaid + (curr.status === 'paid' ? curr.balanceDue : 0), 0);

  return (
    <div className="space-y-8">
      {/* Top Banner & Managing Director Welcome */}
      <div className="bg-gradient-to-r from-[#064E3B] via-[#075E54] to-gray-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-emerald-950/60 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-700/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Executive Operations Control &bull; Tzaneen Base</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Welcome, Thabo Makola
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
            Manage your weekend funeral logistics, client quotations, tax invoices, and tender documentation under unified HLUGISO governance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={onOpenNewQuote}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-[#064E3B] hover:bg-emerald-50 text-xs font-extrabold transition-all shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Quote</span>
          </button>

          <a
            href="/HLUGISO_Company_Profile.pdf"
            download="HLUGISO_Company_Profile.pdf"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-black/25 hover:bg-black/40 text-white text-xs font-bold transition-all border border-white/20 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Tender Profile PDF</span>
          </a>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Quotes KPI */}
        <div 
          onClick={() => onNavigateTab('quotes')}
          className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-[#064E3B] transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="p-3 rounded-xl bg-emerald-50 text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#064E3B] transition-colors" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900">{activeQuotesCount}</div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Active Quotes</div>
          <div className="text-[11px] text-gray-400 mt-2">{quotes.length} total generated</div>
        </div>

        {/* Invoices KPI */}
        <div 
          onClick={() => onNavigateTab('invoices')}
          className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-[#064E3B] transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Receipt className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-amber-700 transition-colors" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900">
            R {totalOutstandingBalance.toLocaleString()}
          </div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Outstanding Balance</div>
          <div className="text-[11px] text-amber-700 font-medium mt-2">{pendingInvoicesCount} invoices pending payment</div>
        </div>

        {/* Inbound RFQs KPI */}
        <div 
          onClick={() => onNavigateTab('rfqs')}
          className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-[#064E3B] transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Inbox className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-700 transition-colors" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900">{newRfqsCount}</div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">New Inbound Leads</div>
          <div className="text-[11px] text-blue-700 font-medium mt-2">Awaiting quote dispatch</div>
        </div>

        {/* Fleet Deployment KPI */}
        <div 
          onClick={() => onNavigateTab('fleet')}
          className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-[#064E3B] transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="p-3 rounded-xl bg-purple-50 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Truck className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-purple-700 transition-colors" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900">{bookedFleetCount} / {fleet.length}</div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Fleet Occupancy</div>
          <div className="text-[11px] text-purple-700 font-medium mt-2">Units mobilized for weekend</div>
        </div>
      </div>

      {/* Weekend Operations Radar (Thursday - Sunday) */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-[#064E3B]" />
            <h2 className="font-extrabold text-sm sm:text-base text-gray-900">
              Weekend Operations Dispatch Radar (Thursday &ndash; Sunday Cycle)
            </h2>
          </div>

          <button
            onClick={() => onNavigateTab('fleet')}
            className="text-xs font-bold text-[#064E3B] hover:underline flex items-center space-x-1"
          >
            <span>Manage All Fleet Assets &rarr;</span>
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fleet.map(unit => (
            <div 
              key={unit.id}
              className={`p-4 rounded-xl border transition-all ${
                unit.status === 'booked'
                  ? 'border-amber-200 bg-amber-50/40'
                  : 'border-emerald-200 bg-emerald-50/30'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-[11px] font-bold text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                  {unit.registrationOrCode}
                </span>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  unit.status === 'booked'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {unit.status}
                </span>
              </div>

              <h4 className="font-bold text-sm text-gray-900 mb-1">{unit.name}</h4>
              <p className="text-[11px] text-gray-500 leading-tight mb-3">{unit.capacityOrSpecs}</p>

              {unit.status === 'booked' ? (
                <div className="space-y-1 text-xs border-t border-amber-200/60 pt-2 text-amber-900">
                  <div className="flex items-center space-x-1 font-semibold">
                    <Users className="w-3.5 h-3.5 text-amber-700" />
                    <span>{unit.assignedClient}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-[11px] text-amber-800">
                    <MapPin className="w-3 h-3 text-amber-700 shrink-0" />
                    <span>{unit.assignedLocation}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-[10px] text-amber-700 font-mono">
                    <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                    <span>{unit.bookingDates}</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-emerald-800 border-t border-emerald-200/60 pt-2 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Depot ready at Tzaneen Base</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dual Recent Activity Tables: Recent Quotes & Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Quotes */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-bold text-sm text-gray-900 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#064E3B]" />
              <span>Recent Quotations</span>
            </h3>
            <button
              onClick={() => onNavigateTab('quotes')}
              className="text-xs font-bold text-[#064E3B] hover:underline"
            >
              View All ({quotes.length})
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {quotes.slice(0, 4).map(q => (
              <div 
                key={q.id}
                className="p-4 hover:bg-gray-50 flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">{q.quoteNumber}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      q.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {q.status}
                    </span>
                  </div>
                  <div className="text-gray-600 font-medium">{q.clientName}</div>
                  <div className="text-[11px] text-gray-400">{q.eventLocation} &bull; {q.date}</div>
                </div>

                <div className="text-right space-y-1 shrink-0">
                  <div className="font-black text-sm text-gray-900">R {q.total.toLocaleString()}</div>
                  <button
                    onClick={() => setSelectedDoc({ doc: q, type: 'quote' })}
                    className="inline-flex items-center space-x-1 text-[11px] font-bold text-[#064E3B] hover:underline"
                  >
                    <span>View / Print</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-bold text-sm text-gray-900 flex items-center space-x-2">
              <Receipt className="w-4 h-4 text-amber-700" />
              <span>Recent Invoices</span>
            </h3>
            <button
              onClick={() => onNavigateTab('invoices')}
              className="text-xs font-bold text-amber-700 hover:underline"
            >
              View All ({invoices.length})
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {invoices.slice(0, 4).map(inv => (
              <div 
                key={inv.id}
                className="p-4 hover:bg-gray-50 flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">{inv.invoiceNumber}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      inv.status === 'paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : inv.status === 'deposit_paid'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inv.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-gray-600 font-medium">{inv.clientName}</div>
                  <div className="text-[11px] text-gray-400">Due: {inv.dueDate}</div>
                </div>

                <div className="text-right space-y-1 shrink-0">
                  <div className="font-black text-sm text-gray-900">R {inv.total.toLocaleString()}</div>
                  <div className="text-[11px] text-red-600 font-semibold">Bal: R {inv.balanceDue.toLocaleString()}</div>
                  <button
                    onClick={() => setSelectedDoc({ doc: inv, type: 'invoice' })}
                    className="inline-flex items-center space-x-1 text-[11px] font-bold text-[#064E3B] hover:underline"
                  >
                    <span>View / Print</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Document View Modal */}
      {selectedDoc && (
        <PrintableDocument
          document={selectedDoc.doc}
          type={selectedDoc.type}
          onClose={() => setSelectedDoc(null)}
        />
      )}
    </div>
  );
};

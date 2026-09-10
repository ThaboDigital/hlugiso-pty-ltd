import React from 'react';
import { Printer, MessageCircle, X, Download, ShieldCheck, CheckCircle } from 'lucide-react';
import { QuoteDocument, InvoiceDocument } from '../types';
import { usePortal } from '../PortalContext';
import { COMPANY_DETAILS } from '../../data/companyData';

interface PrintableDocumentProps {
  document: QuoteDocument | InvoiceDocument;
  type: 'quote' | 'invoice';
  onClose: () => void;
}

export const PrintableDocument: React.FC<PrintableDocumentProps> = ({
  document: doc,
  type,
  onClose,
}) => {
  const { banking } = usePortal();
  const isQuote = type === 'quote';
  const quote = isQuote ? (doc as QuoteDocument) : null;
  const invoice = !isQuote ? (doc as InvoiceDocument) : null;

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    const clientPhone = (doc.clientPhone || '').replace(/\D/g, '');
    const phoneToUse = clientPhone.startsWith('0') ? '27' + clientPhone.slice(1) : clientPhone;

    let message = `*HLUGISO (PTY) LTD — OFFICIAL ${isQuote ? 'QUOTATION' : 'INVOICE'}*\n\n`;
    message += `*Doc Ref:* ${isQuote ? quote?.quoteNumber : invoice?.invoiceNumber}\n`;
    message += `*Date:* ${doc.date}\n`;
    message += `*Client:* ${doc.clientName} ${doc.clientOrganization ? `(${doc.clientOrganization})` : ''}\n`;
    message += `*Event Location:* ${doc.eventLocation}\n`;
    message += `*Event Date:* ${doc.eventDate}\n\n`;
    message += `*SUMMARY OF ITEMS:*\n`;
    doc.items.forEach((item, idx) => {
      message += `${idx + 1}. ${item.description} (${item.quantity}x @ R${item.unitPrice.toLocaleString()}) = R${item.total.toLocaleString()}\n`;
    });
    message += `\n*Subtotal:* R${doc.subtotal.toLocaleString()}\n`;
    if (doc.deliveryFee > 0) message += `*Transport/Delivery:* R${doc.deliveryFee.toLocaleString()}\n`;
    if (doc.discount > 0) message += `*Discount Applied:* -R${doc.discount.toLocaleString()}\n`;
    message += `*TOTAL:* R${doc.total.toLocaleString()}\n`;

    if (isQuote && quote?.depositRequired) {
      message += `*Required Booking Deposit (50%):* R${quote.depositRequired.toLocaleString()}\n`;
      message += `*Balance on Setup:* R${(doc.total - quote.depositRequired).toLocaleString()}\n\n`;
    } else if (invoice) {
      message += `*Deposit Credited:* R${invoice.depositPaid.toLocaleString()}\n`;
      message += `*BALANCE DUE:* R${invoice.balanceDue.toLocaleString()}\n\n`;
    }

    message += `*BANKING DETAILS FOR EFT:*\n`;
    message += `Bank: ${banking.bankName}\n`;
    message += `Account Holder: ${banking.accountHolder}\n`;
    message += `Account No: ${banking.accountNumber}\n`;
    message += `Branch Code: ${banking.branchCode}\n`;
    message += `Reference: ${isQuote ? quote?.quoteNumber : invoice?.invoiceNumber}\n\n`;
    message += `Official Enquiries: 083 597 6462 | info@hlugiso.co.za\nManaging Director: Thabo Makola`;

    const encoded = encodeURIComponent(message);
    const url = phoneToUse ? `https://wa.me/${phoneToUse}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center overflow-y-auto p-2 sm:p-6 print:p-0 print:bg-white print:static print:inset-auto print:overflow-visible">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto print:m-0 print:shadow-none print:rounded-none print:max-w-none print:w-full">
        {/* Modal Action Bar (Hidden in Print) */}
        <div className="bg-gray-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 print:hidden">
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
              {isQuote ? 'Formal Quotation' : 'Commercial Invoice'}
            </span>
            <span className="font-bold text-sm text-gray-200">
              {isQuote ? quote?.quoteNumber : invoice?.invoiceNumber}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#064E3B] hover:bg-[#075E54] text-xs font-bold text-white transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleSendWhatsApp}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-xs font-bold text-white transition-colors shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Send via WhatsApp</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet */}
        <div className="p-8 sm:p-12 text-gray-800 font-sans space-y-6 print:p-8">
          {/* Header Row */}
          <div className="flex justify-between items-start border-b-2 border-[#064E3B] pb-6">
            <div className="space-y-1">
              <img 
                src="/branding/hlugiso-logo-primary.png" 
                alt="HLUGISO (PTY) LTD" 
                className="h-12 w-auto object-contain mb-2"
              />
              <div className="text-xs text-gray-600 leading-tight">
                <strong>HLUGISO (PTY) LTD</strong> &bull; Reg: <strong>{COMPANY_DETAILS.registrationNumber}</strong><br />
                CSD: <strong>{COMPANY_DETAILS.csdNumber}</strong> &bull; CIDB: <strong>{COMPANY_DETAILS.cidbGrading}</strong><br />
                SARS Tax PIN: <strong>Active Compliance Status</strong> &bull; B-BBEE: <strong>Level 1 (100% Black Owned)</strong><br />
                Stand No 01, Tickyline Village, Lenyenye, Tzaneen, 0850
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="text-2xl font-black tracking-tight text-[#064E3B] uppercase">
                {isQuote ? 'QUOTATION' : 'INVOICE'}
              </div>
              <div className="text-sm font-bold text-gray-900">
                {isQuote ? quote?.quoteNumber : invoice?.invoiceNumber}
              </div>
              <div className="text-xs text-gray-500">
                Date: <strong className="text-gray-700">{doc.date}</strong>
              </div>
              {isQuote && (
                <div className="text-xs text-gray-500">
                  Valid Until: <strong className="text-gray-700">{quote?.validUntil}</strong>
                </div>
              )}
              {invoice && (
                <div className="text-xs text-gray-500">
                  Due Date: <strong className="text-gray-700">{invoice?.dueDate}</strong>
                </div>
              )}
              <div className="pt-1">
                <span className={`inline-block text-[11px] font-bold uppercase px-2.5 py-0.5 rounded ${
                  doc.status === 'paid' || doc.status === 'accepted'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : doc.status === 'deposit_paid'
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  Status: {doc.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Client & Event Coordinates */}
          <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px] block">
                Bill To / Client Details:
              </span>
              <div className="text-sm font-bold text-gray-900">{doc.clientName}</div>
              {doc.clientOrganization && (
                <div className="font-semibold text-[#064E3B]">{doc.clientOrganization}</div>
              )}
              <div className="text-gray-600">Phone / WhatsApp: {doc.clientPhone}</div>
              {doc.clientEmail && (
                <div className="text-gray-600">Email: {doc.clientEmail}</div>
              )}
            </div>

            <div className="space-y-1">
              <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px] block">
                Deployment & Event Logistics:
              </span>
              <div className="font-semibold text-gray-900">
                Site Location: <span className="font-normal">{doc.eventLocation || 'Tzaneen & Surrounds'}</span>
              </div>
              <div className="font-semibold text-gray-900">
                Deployment Date: <span className="font-normal">{doc.eventDate || 'Scheduled Weekend'}</span>
              </div>
              <div className="text-gray-600">
                Direct Line: <strong>+27 83 597 6462</strong> (Managing Director)
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100 border-y border-gray-300 text-gray-700 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3 w-10 text-center">#</th>
                  <th className="py-2.5 px-3">Description & Specification</th>
                  <th className="py-2.5 px-3 w-24">Category</th>
                  <th className="py-2.5 px-3 w-16 text-center">Qty</th>
                  <th className="py-2.5 px-3 w-28 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 w-28 text-right">Total (ZAR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {doc.items.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-gray-50">
                    <td className="py-2.5 px-3 text-center text-gray-400 font-medium">{idx + 1}</td>
                    <td className="py-2.5 px-3 font-medium text-gray-900">
                      {item.description}
                      <span className="block text-[11px] text-gray-500 font-normal">{item.unit}</span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-600">{item.category}</td>
                    <td className="py-2.5 px-3 text-center font-bold text-gray-800">{item.quantity}</td>
                    <td className="py-2.5 px-3 text-right text-gray-700">R {item.unitPrice.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-gray-900">R {item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Financial Breakdown */}
          <div className="flex justify-end">
            <div className="w-full sm:w-80 space-y-2 text-xs border-t border-gray-200 pt-3">
              <div className="flex justify-between text-gray-600">
                <span>Services Subtotal:</span>
                <span className="font-semibold text-gray-900">R {doc.subtotal.toLocaleString()}</span>
              </div>
              {doc.deliveryFee > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Site Delivery & Towing:</span>
                  <span className="font-semibold text-gray-900">R {doc.deliveryFee.toLocaleString()}</span>
                </div>
              )}
              {doc.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Commercial Discount:</span>
                  <span>- R {doc.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black border-y-2 border-gray-900 py-2 text-gray-950">
                <span>TOTAL PAYABLE:</span>
                <span className="text-[#064E3B]">R {doc.total.toLocaleString()}</span>
              </div>

              {/* Deposit / Balance breakdown */}
              {isQuote && quote?.depositRequired ? (
                <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-emerald-900">
                    <span>50% Upfront Booking Deposit:</span>
                    <span>R {quote.depositRequired.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-emerald-700">
                    <span>Balance Due Upon Site Handover:</span>
                    <span>R {(doc.total - quote.depositRequired).toLocaleString()}</span>
                  </div>
                </div>
              ) : null}

              {invoice ? (
                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-xs space-y-1">
                  <div className="flex justify-between text-gray-600">
                    <span>Deposit / Prior Payment Received:</span>
                    <span className="font-bold text-emerald-700">R {invoice.depositPaid.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-gray-900 border-t border-gray-200 pt-1">
                    <span>OUTSTANDING BALANCE:</span>
                    <span className="text-red-700">R {invoice.balanceDue.toLocaleString()}</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Notes & Banking Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Banking Details Box */}
            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 text-xs space-y-2">
              <div className="flex items-center space-x-2 text-[#064E3B] font-bold uppercase text-[11px] tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Official Banking Details (EFT)</span>
              </div>
              <div className="grid grid-cols-2 gap-y-1 text-gray-700 text-[11px]">
                <span className="text-gray-500">Bank Name:</span>
                <strong className="text-gray-900">{banking.bankName}</strong>
                <span className="text-gray-500">Account Holder:</span>
                <strong className="text-gray-900">{banking.accountHolder}</strong>
                <span className="text-gray-500">Account Number:</span>
                <strong className="text-gray-900 font-mono text-xs">{banking.accountNumber}</strong>
                <span className="text-gray-500">Branch Code:</span>
                <strong className="text-gray-900">{banking.branchCode}</strong>
                <span className="text-gray-500">Payment Ref:</span>
                <strong className="text-[#064E3B] font-mono">{isQuote ? quote?.quoteNumber : invoice?.invoiceNumber}</strong>
              </div>
              <p className="text-[10px] text-gray-500 pt-1 border-t border-emerald-100">
                Please email proof of payment to <strong>info@hlugiso.co.za</strong> or WhatsApp to <strong>083 597 6462</strong>.
              </p>
            </div>

            {/* Terms & Notes */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-1.5 text-gray-600">
              <div className="font-bold text-gray-900 uppercase text-[11px] tracking-wider">
                Operational Terms &amp; Conditions
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-gray-600">
                <li>Trailer & equipment bookings are confirmed upon receipt of 50% deposit.</li>
                <li>Hygienic pre-trip inspection and sanitization performed prior to dispatch.</li>
                <li>Client to provide safe and accessible terrain for trailer parking and towing vehicles.</li>
                <li>Standby AVR generator provided with sound packages ensures uninterrupted power.</li>
              </ul>
            </div>
          </div>

          {/* Signoff Footer */}
          <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-end text-xs text-gray-500 gap-4">
            <div className="space-y-0.5">
              <div className="font-bold text-gray-800">HLUGISO (PTY) LTD &bull; Tzaneen, Limpopo</div>
              <div>Tel / WhatsApp: +27 83 597 6462 &bull; Email: info@hlugiso.co.za &bull; Web: www.hlugiso.co.za</div>
            </div>

            <div className="text-right space-y-1 border-t-2 border-gray-900 pt-1 min-w-[200px]">
              <div className="font-bold text-gray-900">Thabo Makola</div>
              <div className="text-[11px] text-[#064E3B] font-semibold">Managing Director &bull; Authorized Signatory</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

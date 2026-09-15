import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
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

  useEffect(() => {
    // Add print isolation class so background portal is 100% hidden during Ctrl+P or print
    document.body.classList.add('printing-document');

    const handleBeforePrint = () => {
      document.body.classList.add('printing-document');
    };

    window.addEventListener('beforeprint', handleBeforePrint);

    return () => {
      document.body.classList.remove('printing-document');
      window.removeEventListener('beforeprint', handleBeforePrint);
    };
  }, []);

  const handlePrint = () => {
    document.body.classList.add('printing-document');
    window.print();
    const cleanUp = () => {
      window.removeEventListener('afterprint', cleanUp);
    };
    window.addEventListener('afterprint', cleanUp);
    setTimeout(cleanUp, 3000);
  };

  const handleSendWhatsApp = () => {
    const clientPhone = (doc.clientPhone || '').replace(/\D/g, '');
    const phoneToUse = clientPhone.startsWith('0') ? '27' + clientPhone.slice(1) : clientPhone;

    const location = doc.serviceLocation || doc.eventLocation || 'Tzaneen & Surrounds';
    const dateTimeline = doc.serviceDate || doc.eventDate || 'Scheduled / As Agreed';
    const category = doc.serviceCategory || 'Commercial Multi-Service';

    let message = `*HLUGISO (PTY) LTD — OFFICIAL ${isQuote ? 'QUOTATION' : 'INVOICE'}*\n\n`;
    message += `*Doc Ref:* ${isQuote ? quote?.quoteNumber : invoice?.invoiceNumber}\n`;
    message += `*Service Division:* ${category}\n`;
    message += `*Date:* ${doc.date}\n`;
    message += `*Client:* ${doc.clientName} ${doc.clientOrganization ? `(${doc.clientOrganization})` : ''}\n`;
    message += `*Project/Site Location:* ${location}\n`;
    message += `*Timeline/Period:* ${dateTimeline}\n\n`;
    message += `*SUMMARY OF ITEMS:*\n`;
    doc.items.forEach((item, idx) => {
      message += `${idx + 1}. ${item.description} (${item.quantity}x @ R${item.unitPrice.toLocaleString()}) = R${item.total.toLocaleString()}\n`;
    });
    message += `\n*Subtotal:* R${doc.subtotal.toLocaleString()}\n`;
    if (doc.deliveryFee > 0) message += `*Transport/Delivery:* R${doc.deliveryFee.toLocaleString()}\n`;
    if (doc.discount > 0) message += `*Discount Applied:* -R${doc.discount.toLocaleString()}\n`;
    message += `*TOTAL:* R${doc.total.toLocaleString()}\n`;

    if (isQuote && quote?.depositRequired && quote.depositRequired > 0 && quote.depositRequired < doc.total) {
      message += `*Required Deposit:* R${quote.depositRequired.toLocaleString()}\n`;
      message += `*Balance on Handover/Completion:* R${(doc.total - quote.depositRequired).toLocaleString()}\n\n`;
    } else if (isQuote && doc.paymentTermsText) {
      message += `*Payment Terms:* ${doc.paymentTermsText}\n\n`;
    } else if (invoice) {
      if (invoice.depositPaid > 0) message += `*Deposit/Prior Payment Credited:* R${invoice.depositPaid.toLocaleString()}\n`;
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

  const modalContent = (
    <div 
      id="printable-document-modal"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center overflow-y-auto p-2 sm:p-6 print:p-0 print:bg-white print:static print:inset-auto print:overflow-visible"
    >
      <div 
        id="printable-document-sheet"
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto print:m-0 print:shadow-none print:rounded-none print:max-w-none print:w-full"
      >
        {/* Modal Action Bar (Hidden in Print) */}
        <div 
          data-print-hide
          className="bg-gray-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 print:hidden"
        >
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
            <div className="space-y-2">
              <img 
                src="/branding/hlugiso-logo-primary.png" 
                alt="HLUGISO (PTY) LTD" 
                className="h-12 w-auto object-contain mb-1"
              />
              <div className="text-xs text-gray-600 leading-relaxed">
                <div className="text-sm font-bold text-gray-900 tracking-tight">HLUGISO (PTY) LTD</div>
                <div className="text-[11px] text-gray-500 font-mono">
                  Reg: <strong>2019/412705/07</strong> &bull; CSD: <strong>{COMPANY_DETAILS.csdNumber}</strong>
                </div>
                <div className="text-xs text-gray-600 mt-1.5 space-y-0.5">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-gray-500 font-medium">Tel / WhatsApp:</span>
                    <strong className="text-gray-900 font-sans">+27 83 597 6462</strong>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-gray-500 font-medium">Email:</span>
                    <strong className="text-gray-900 font-sans">info@hlugiso.co.za</strong>
                    <span className="text-gray-400">&bull;</span>
                    <span className="text-gray-500 font-medium">Web:</span>
                    <strong className="text-gray-900 font-sans">www.hlugiso.co.za</strong>
                  </div>
                  <div className="text-gray-500 text-[11px]">
                    Stand No 01, Tickyline Village, Lenyenye, Tzaneen, 0850
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="text-2xl font-black tracking-tight text-[#064E3B] uppercase">
                {isQuote ? 'QUOTATION' : 'INVOICE'}
              </div>
              <div className="text-sm font-bold text-gray-900 font-mono">
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

          {/* Client & Project / Service Coordinates */}
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
                Project &amp; Service Coordinates:
              </span>
              {doc.serviceCategory && (
                <div className="font-semibold text-[#064E3B]">
                  Division: <span className="font-bold">{doc.serviceCategory}</span>
                </div>
              )}
              <div className="font-semibold text-gray-900">
                Site / Location: <span className="font-normal">{doc.serviceLocation || doc.eventLocation || 'Tzaneen & Surrounds'}</span>
              </div>
              <div className="font-semibold text-gray-900">
                Timeline / Date: <span className="font-normal">{doc.serviceDate || doc.eventDate || 'Scheduled / As Agreed'}</span>
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

              {/* Payment terms and deposit breakdown */}
              {isQuote && quote?.depositRequired && quote.depositRequired > 0 && quote.depositRequired < doc.total ? (
                <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-emerald-900">
                    <span>Required Commitment Deposit:</span>
                    <span>R {quote.depositRequired.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-emerald-700">
                    <span>Balance Payable on Completion / Handover:</span>
                    <span>R {(doc.total - quote.depositRequired).toLocaleString()}</span>
                  </div>
                  {doc.paymentTermsText && (
                    <div className="text-[10px] text-emerald-800 font-medium pt-0.5 border-t border-emerald-200/60">
                      Terms: {doc.paymentTermsText}
                    </div>
                  )}
                </div>
              ) : isQuote ? (
                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-xs space-y-0.5">
                  <div className="flex justify-between font-semibold text-gray-800">
                    <span>Payment Terms:</span>
                    <span className="text-[#064E3B]">{doc.paymentTermsText || '30 Days from Tax Invoice (Official PO)'}</span>
                  </div>
                  <div className="text-[10px] text-gray-500">
                    Full settlement upon approved completion / standard corporate billing cycle.
                  </div>
                </div>
              ) : null}

              {invoice ? (
                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-xs space-y-1">
                  {invoice.depositPaid > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span>Deposit / Prior Payment Credited:</span>
                      <span className="font-bold text-emerald-700">R {invoice.depositPaid.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-sm text-gray-900 border-t border-gray-200 pt-1">
                    <span>OUTSTANDING BALANCE:</span>
                    <span className="text-red-700">R {invoice.balanceDue.toLocaleString()}</span>
                  </div>
                  {invoice.paymentTermsText && (
                    <div className="text-[10px] text-gray-500 pt-0.5">
                      Terms: {invoice.paymentTermsText}
                    </div>
                  )}
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
                Commercial Terms &amp; Conditions
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-gray-600 leading-relaxed">
                <li>Quotations remain valid for 14 calendar days from date of issue unless specified otherwise.</li>
                <li>Official Purchase Orders (PO) accepted for government departments, municipalities, and verified corporate partners.</li>
                <li>Works, services, and deliveries executed in strict compliance with applicable standards (CIDB 1CE / OHS / SABS / Hygiene).</li>
                <li>Mobilization, material delivery, or equipment deployment scheduled upon agreement of project milestones.</li>
                <li>Direct EFT into HLUGISO (Pty) Ltd First National Bank (FNB) corporate cheque account using document reference.</li>
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

  return createPortal(modalContent, document.body);
};

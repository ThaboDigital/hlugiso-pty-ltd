import React, { useState } from 'react';
import { 
  Plus, 
  Inbox, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  MessageCircle, 
  ArrowRight, 
  Trash2, 
  CheckCircle2, 
  Clock,
  X
} from 'lucide-react';
import { usePortal } from '../PortalContext';
import { RfqLead, RfqStatus } from '../types';

interface RfqManagerProps {
  onConvertRfqToQuote: (rfq: RfqLead) => void;
}

export const RfqManager: React.FC<RfqManagerProps> = ({ onConvertRfqToQuote }) => {
  const { rfqs, updateRfqStatus, deleteRfq, addRfq } = usePortal();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Add lead form
  const [name, setName] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [serviceRequested, setServiceRequested] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please provide at least a name and phone number.');
      return;
    }

    addRfq({
      name,
      organization,
      phone,
      email,
      serviceRequested: serviceRequested || 'Mobile Cold-Room / Event Infrastructure',
      location,
      eventDate,
      notes,
      status: 'new',
    });

    setIsAddModalOpen(false);
    setName('');
    setOrganization('');
    setPhone('');
    setEmail('');
    setServiceRequested('');
    setLocation('');
    setEventDate('');
    setNotes('');
  };

  const filteredRfqs = rfqs.filter(r => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">Inbound RFQs &amp; Leads</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage inquiries received via website forms and WhatsApp, and convert them to formal quotes in 1 click.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#075E54] text-white text-xs font-bold transition-all shadow active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Log Inbound Inquiry</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {['all', 'new', 'contacted', 'quoted', 'confirmed', 'closed'].map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              filterStatus === st
                ? 'bg-[#064E3B] text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* RFQ Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRfqs.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-2xl border border-gray-200 text-center text-gray-400">
            No RFQ leads in this category.
          </div>
        ) : (
          filteredRfqs.map(rfq => (
            <div 
              key={rfq.id}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4 hover:border-teal-700/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {rfq.receivedAt}
                  </span>

                  <select
                    value={rfq.status}
                    onChange={e => updateRfqStatus(rfq.id, e.target.value as RfqStatus)}
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                      rfq.status === 'new'
                        ? 'bg-blue-50 text-blue-800 border-blue-300'
                        : rfq.status === 'contacted'
                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                        : rfq.status === 'quoted'
                        ? 'bg-purple-50 text-purple-800 border-purple-300'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    }`}
                  >
                    <option value="new">New Lead</option>
                    <option value="contacted">Contacted</option>
                    <option value="quoted">Quoted</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900">{rfq.name}</h3>
                  {rfq.organization && (
                    <div className="text-xs font-medium text-[#064E3B]">{rfq.organization}</div>
                  )}
                </div>

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs space-y-1">
                  <span className="font-bold text-gray-700 text-[11px] block">Service Requested:</span>
                  <p className="text-gray-900 leading-relaxed font-medium">{rfq.serviceRequested}</p>
                </div>

                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>{rfq.phone}</span>
                  </div>
                  {rfq.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>{rfq.location}</span>
                    </div>
                  )}
                  {rfq.eventDate && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{rfq.eventDate}</span>
                    </div>
                  )}
                </div>

                {rfq.notes && (
                  <p className="text-[11px] text-gray-500 italic bg-gray-50 p-2 rounded">
                    "{rfq.notes}"
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onConvertRfqToQuote(rfq)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#064E3B] hover:bg-[#075E54] text-white text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-sm"
                >
                  <span>Create Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`https://wa.me/${rfq.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${rfq.name}, Thabo Makola here from HLUGISO (Pty) Ltd regarding your enquiry for ${rfq.serviceRequested}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white transition-colors"
                  title="WhatsApp Lead"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                <button
                  onClick={() => {
                    if (window.confirm('Delete this inquiry?')) deleteRfq(rfq.id);
                  }}
                  className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete Lead"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* LOG INBOUND INQUIRY MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 space-y-4 border border-gray-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-base text-gray-900">Log Inbound Client Inquiry</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-600 font-bold block mb-1">Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-gray-600 font-bold block mb-1">Organization / Family</label>
                  <input
                    type="text"
                    value={organization}
                    onChange={e => setOrganization(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-600 font-bold block mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-gray-600 font-bold block mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-600 font-bold block mb-1">Services Requested</label>
                <input
                  type="text"
                  value={serviceRequested}
                  onChange={e => setServiceRequested(e.target.value)}
                  placeholder="e.g. Mobile Cold Room + VIP Restroom Trailer"
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-600 font-bold block mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Lenyenye / Tzaneen"
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-gray-600 font-bold block mb-1">Target Date</label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    placeholder="e.g. Next Saturday"
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-600 font-bold block mb-1">Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#064E3B] hover:bg-[#075E54] text-white font-bold"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

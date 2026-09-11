import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  FileText, 
  Trash2, 
  Edit3, 
  Building2,
  X
} from 'lucide-react';
import { usePortal } from '../PortalContext';
import { ClientRecord } from '../types';

interface ClientsManagerProps {
  onQuoteForClient: (client: ClientRecord) => void;
}

export const ClientsManager: React.FC<ClientsManagerProps> = ({ onQuoteForClient }) => {
  const { clients, addClient, updateClient, deleteClient } = usePortal();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingClient, setEditingClient] = useState<ClientRecord | null>(null);

  // Form State
  const [name, setName] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [type, setType] = useState<ClientRecord['type']>('Funeral Parlour');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const handleOpenAdd = () => {
    setEditingClient(null);
    setName('');
    setOrganization('');
    setType('Funeral Parlour');
    setPhone('');
    setEmail('');
    setAddress('');
    setNotes('');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (client: ClientRecord) => {
    setEditingClient(client);
    setName(client.name);
    setOrganization(client.organization || '');
    setType(client.type);
    setPhone(client.phone);
    setEmail(client.email || '');
    setAddress(client.address || '');
    setNotes(client.notes || '');
    setIsAddModalOpen(true);
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please provide client name and phone number.');
      return;
    }

    if (editingClient) {
      updateClient(editingClient.id, {
        name,
        organization,
        type,
        phone,
        email,
        address,
        notes,
      });
    } else {
      addClient({
        name,
        organization,
        type,
        phone,
        email,
        address,
        notes,
      });
    }

    setIsAddModalOpen(false);
  };

  const filteredClients = clients.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.organization || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.address || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || c.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">Client &amp; Partner Directory</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage partner funeral undertakers, burial societies, corporate clients, and municipal buyers.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#075E54] text-white text-xs font-bold transition-all shadow active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add New Partner</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search partners by name, company, location..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {['all', 'Funeral Parlour', 'Burial Society', 'Municipality', 'Corporate', 'Family / Private'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterType === t
                  ? 'bg-[#064E3B] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t === 'all' ? 'All Categories' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.length === 0 ? (
          <div className="col-span-full py-16 bg-white rounded-2xl border border-gray-200 text-center p-8 space-y-3">
            <Users className="w-10 h-10 text-gray-300 mx-auto" />
            <h3 className="font-bold text-gray-800 text-sm">No Client Records Found</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Your client directory is currently clean. Click &ldquo;+ Add New Partner&rdquo; to add partner funeral undertakers, burial societies, or private clients.
            </p>
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#064E3B] text-white text-xs font-bold hover:bg-[#075E54] shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add First Partner</span>
            </button>
          </div>
        ) : (
          filteredClients.map(client => (
            <div 
              key={client.id}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4 hover:border-teal-700/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {client.type}
                </span>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleOpenEdit(client)}
                    className="p-1 rounded text-gray-400 hover:text-gray-700"
                    title="Edit Partner"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete ${client.name}?`)) deleteClient(client.id);
                    }}
                    className="p-1 rounded text-gray-400 hover:text-red-600"
                    title="Delete Partner"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900">{client.name}</h3>
                {client.organization && (
                  <div className="text-xs font-semibold text-[#064E3B]">{client.organization}</div>
                )}
              </div>

              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{client.phone}</span>
                </div>
                {client.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{client.email}</span>
                  </div>
                )}
                {client.address && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{client.address}</span>
                  </div>
                )}
              </div>

              {client.notes && (
                <div className="text-[11px] text-gray-500 italic bg-gray-50 p-2 rounded-lg">
                  "{client.notes}"
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
              <button
                onClick={() => onQuoteForClient(client)}
                className="flex-1 py-2 px-3 rounded-xl bg-[#064E3B] hover:bg-[#075E54] text-white text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Create Quote</span>
              </button>

              <a
                href={`https://wa.me/${client.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${client.name}, Thabo Makola here from HLUGISO (Pty) Ltd.`)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white transition-colors"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        )))}
      </div>

      {/* ADD / EDIT CLIENT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-4 border border-gray-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-base text-gray-900">
                {editingClient ? 'Edit Client Record' : 'Add New Client / Partner'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-600 font-bold block mb-1">Contact Name / Group *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Phala Funeral Undertakers"
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                />
              </div>

              <div>
                <label className="text-gray-600 font-bold block mb-1">Organization / Undertaker Name</label>
                <input
                  type="text"
                  value={organization}
                  onChange={e => setOrganization(e.target.value)}
                  placeholder="e.g. Phala Group"
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                />
              </div>

              <div>
                <label className="text-gray-600 font-bold block mb-1">Partner Category</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as ClientRecord['type'])}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg font-bold"
                >
                  <option value="Funeral Parlour">Funeral Parlour</option>
                  <option value="Burial Society">Burial Society</option>
                  <option value="Municipality">Municipality / Government</option>
                  <option value="Corporate">Corporate / Enterprise</option>
                  <option value="Family / Private">Family / Private Client</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-600 font-bold block mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="083 597 6462"
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-gray-600 font-bold block mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="client@mail.co.za"
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-600 font-bold block mb-1">Physical Address / Village</label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="e.g. Nkowankowa / Lenyenye / Tzaneen"
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                />
              </div>

              <div>
                <label className="text-gray-600 font-bold block mb-1">Partner Agreement Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. Contract discount applied. Orders Cold Room bi-weekly."
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
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

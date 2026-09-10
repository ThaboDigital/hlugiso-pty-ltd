import React, { useState } from 'react';
import { 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Calendar, 
  AlertTriangle,
  Wrench,
  Edit3,
  X
} from 'lucide-react';
import { usePortal } from '../PortalContext';
import { FleetUnit, FleetStatus } from '../types';

export const FleetTracker: React.FC = () => {
  const { fleet, updateFleetUnit } = usePortal();
  const [selectedUnitForEdit, setSelectedUnitForEdit] = useState<FleetUnit | null>(null);

  // Edit form state
  const [status, setStatus] = useState<FleetStatus>('available');
  const [assignedClient, setAssignedClient] = useState<string>('');
  const [assignedLocation, setAssignedLocation] = useState<string>('');
  const [bookingDates, setBookingDates] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const handleOpenEdit = (unit: FleetUnit) => {
    setSelectedUnitForEdit(unit);
    setStatus(unit.status);
    setAssignedClient(unit.assignedClient || '');
    setAssignedLocation(unit.assignedLocation || '');
    setBookingDates(unit.bookingDates || '');
    setNotes(unit.notes || '');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUnitForEdit) return;

    updateFleetUnit(selectedUnitForEdit.id, {
      status,
      assignedClient: status === 'available' ? '' : assignedClient,
      assignedLocation: status === 'available' ? 'Tzaneen Base Depot' : assignedLocation,
      bookingDates: status === 'available' ? '' : bookingDates,
      notes,
    });

    setSelectedUnitForEdit(null);
  };

  const availableCount = fleet.filter(f => f.status === 'available').length;
  const bookedCount = fleet.filter(f => f.status === 'booked').length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">Fleet &amp; Equipment Allocation</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time weekend tracking for Mobile Cold-Room trailers, VIP Restroom trailers, Sound rigs, and Tents.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <div className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800">
            {availableCount} Units Available
          </div>
          <div className="px-3.5 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-800">
            {bookedCount} Units Deployed
          </div>
        </div>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fleet.map(unit => {
          const isBooked = unit.status === 'booked';
          const isMaintenance = unit.status === 'maintenance';

          return (
            <div 
              key={unit.id}
              className={`bg-white rounded-2xl border p-6 shadow-sm space-y-4 flex flex-col justify-between transition-all ${
                isBooked 
                  ? 'border-amber-300 bg-amber-50/20' 
                  : isMaintenance
                  ? 'border-red-200 bg-red-50/20'
                  : 'border-gray-200 hover:border-emerald-600/40'
              }`}
            >
              <div className="space-y-3">
                {/* Header & Status */}
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
                    {unit.registrationOrCode}
                  </span>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    isBooked
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                      : isMaintenance
                      ? 'bg-red-100 text-red-900 border border-red-200'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                  }`}>
                    {unit.status.replace('_', ' ')}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-gray-900">{unit.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-tight">{unit.capacityOrSpecs}</p>
                </div>

                {/* Assignment Details */}
                {isBooked ? (
                  <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200/80 space-y-1.5 text-xs text-amber-950">
                    <div className="flex items-center space-x-1.5 font-bold">
                      <Users className="w-4 h-4 text-amber-800 shrink-0" />
                      <span>{unit.assignedClient || 'Booked Client'}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-[11px] text-amber-800">
                      <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{unit.assignedLocation || 'Limpopo Region'}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-[11px] text-amber-700 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{unit.bookingDates || 'Upcoming Weekend'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs text-emerald-900 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Stationed at Depot &bull; Ready for deployment</span>
                  </div>
                )}

                {unit.notes && (
                  <div className="text-[11px] text-gray-500 italic bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    "{unit.notes}"
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleOpenEdit(unit)}
                  className="w-full py-2 px-3 rounded-xl bg-gray-100 hover:bg-[#064E3B] hover:text-white text-gray-800 text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Update Deployment Status</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* EDIT MODAL */}
      {selectedUnitForEdit && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-4 border border-gray-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-gray-900">{selectedUnitForEdit.name}</h3>
                <span className="text-xs text-gray-500 font-mono">{selectedUnitForEdit.registrationOrCode}</span>
              </div>
              <button onClick={() => setSelectedUnitForEdit(null)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-600 font-bold block mb-1">Operational Status</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value as FleetStatus)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg font-bold"
                >
                  <option value="available">Available at Depot</option>
                  <option value="booked">Booked for Weekend / Event</option>
                  <option value="in_transit">In Transit / Towing</option>
                  <option value="maintenance">Maintenance / Service</option>
                </select>
              </div>

              {status !== 'available' && (
                <>
                  <div>
                    <label className="text-gray-600 font-bold block mb-1">Assigned Client / Funeral Home</label>
                    <input
                      type="text"
                      value={assignedClient}
                      onChange={e => setAssignedClient(e.target.value)}
                      placeholder="e.g. Phala Funerals / Malatji Family"
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="text-gray-600 font-bold block mb-1">Delivery Destination / Village</label>
                    <input
                      type="text"
                      value={assignedLocation}
                      onChange={e => setAssignedLocation(e.target.value)}
                      placeholder="e.g. Nkowankowa Section B"
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="text-gray-600 font-bold block mb-1">Booking Date Range</label>
                    <input
                      type="text"
                      value={bookingDates}
                      onChange={e => setBookingDates(e.target.value)}
                      placeholder="e.g. Thu 18 Sep – Sun 20 Sep"
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="text-gray-600 font-bold block mb-1">Checklist &amp; Inspection Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. Sanitized, test run completed, generator refueled."
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedUnitForEdit(null)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#064E3B] hover:bg-[#075E54] text-white font-bold"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

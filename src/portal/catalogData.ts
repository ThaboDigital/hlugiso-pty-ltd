import { LineItem, BankingDetails, FleetUnit, ClientRecord, QuoteDocument, InvoiceDocument, RfqLead } from './types';

export const DEFAULT_CATALOG_ITEMS: Omit<LineItem, 'id' | 'total'>[] = [
  // --- Cleaning & Facility Maintenance ---
  {
    description: 'Monthly Corporate Office Janitorial Contract (Daily cleaner, chemicals, hygiene management, supervisory audit)',
    category: 'Cleaning',
    quantity: 1,
    unit: 'Month',
    unitPrice: 8500,
  },
  {
    description: 'Industrial Carpet Steam Extraction & Upholstery Deep Cleaning (Hospital-grade sanitisation, stain treatment)',
    category: 'Cleaning',
    quantity: 1,
    unit: 'Per m² / Office Suite',
    unitPrice: 1800,
  },
  {
    description: 'Deep Ablution Descaling & Sanitary Hygiene Disinfection (Restroom descaling, fixtures, dispensers)',
    category: 'Cleaning',
    quantity: 1,
    unit: 'Per Restroom Block',
    unitPrice: 1450,
  },
  {
    description: 'High-Speed Floor Stripping, Deep Scrubbing & Polymer Sealing (Hard surfaces, vinyl, tiles)',
    category: 'Cleaning',
    quantity: 1,
    unit: 'Per 100 m²',
    unitPrice: 2200,
  },
  {
    description: 'Post-Construction / Post-Renovation Deep Cleanup & Debris Removal (Builder clean, window scraping, dust elimination)',
    category: 'Cleaning',
    quantity: 1,
    unit: 'Project / Site Service',
    unitPrice: 4500,
  },
  {
    description: 'Commercial Pre- & Post-Event Janitorial Cleanup & Waste Bagging Support',
    category: 'Cleaning',
    quantity: 1,
    unit: 'Day Service',
    unitPrice: 1800,
  },

  // --- Construction & Civil Engineering (CIDB Grade 1CE) ---
  {
    description: '80mm Industrial Interlocking Concrete Pavers (Bedding sand, precision laying, joint sand & mechanical compaction)',
    category: 'Construction',
    quantity: 100,
    unit: 'Per m²',
    unitPrice: 380,
  },
  {
    description: '60mm Domestic / Commercial Paving (Supplied, laid, compacted & edged)',
    category: 'Construction',
    quantity: 100,
    unit: 'Per m²',
    unitPrice: 320,
  },
  {
    description: 'Precast Concrete Barrier Kerbing (Fig 3 / Fig 8 with concrete haunching backing & jointing)',
    category: 'Construction',
    quantity: 20,
    unit: 'Per Linear Metre',
    unitPrice: 240,
  },
  {
    description: 'Heavy-Duty Perimeter Security Fencing (1.8m Diamond Mesh / Welded Wire with treated posts & stays)',
    category: 'Construction',
    quantity: 50,
    unit: 'Per Linear Metre',
    unitPrice: 420,
  },
  {
    description: 'Concrete Stormwater V-Drain Channeling & Surface Runoff Mitigation (Excavation, cast-in-place concrete)',
    category: 'Construction',
    quantity: 10,
    unit: 'Per Linear Metre',
    unitPrice: 480,
  },
  {
    description: 'Commercial Building Plastering, Crack Repair & Weatherproof Painting (Interior / Exterior refurbishment)',
    category: 'Construction',
    quantity: 1,
    unit: 'Per 100 m²',
    unitPrice: 3800,
  },
  {
    description: 'Site Clearing, Bulk Earthworks & Sub-Base Road Prep (G5/G7 material grading & compaction)',
    category: 'Construction',
    quantity: 1,
    unit: 'Per Day / Equipment Run',
    unitPrice: 6500,
  },

  // --- General Supply & Procurement ---
  {
    description: 'SABS-Approved Reflective Conti-Suits / Flame & Acid Retardant Workwear with Reflective Tape',
    category: 'Procurement',
    quantity: 10,
    unit: 'Set / Unit',
    unitPrice: 450,
  },
  {
    description: 'SABS Heavy-Duty Steel Toe-Cap Safety Boots & Protective Footwear',
    category: 'Procurement',
    quantity: 10,
    unit: 'Pair',
    unitPrice: 520,
  },
  {
    description: 'Commercial Cleaning Consumables Bulk Pack (25L Pine Gel, 25L Bleach, 25L Degreaser, Mops, Brooms & Cloths)',
    category: 'Procurement',
    quantity: 1,
    unit: 'Bundle Pack',
    unitPrice: 1650,
  },
  {
    description: 'Corporate Restroom Hygiene Pack (Virgin 2-Ply Paper 48s, Liquid Hand Soap 5L, Aerosol Refills)',
    category: 'Procurement',
    quantity: 1,
    unit: 'Pack',
    unitPrice: 1250,
  },
  {
    description: 'General Facility Maintenance Hardware & Fasteners Consumable Kit',
    category: 'Procurement',
    quantity: 1,
    unit: 'Kit',
    unitPrice: 1850,
  },

  // --- Mobile Cold-Chain & Sanitation ---
  {
    description: 'VIP Mobile Restroom Trailer (Dual Private Cubicles, Porcelain Flush, Solar Light, Basins)',
    category: 'Sanitation',
    quantity: 1,
    unit: 'Weekend Hire (Thu - Sun)',
    unitPrice: 3800,
  },
  {
    description: 'Mobile Cold-Room Trailer (Hygienic Chiller -2°C to +4°C, Meat Rail, 220V Mains / Gen Input)',
    category: 'Cold-Chain',
    quantity: 1,
    unit: 'Weekend Hire (Thu - Sun)',
    unitPrice: 3500,
  },
  {
    description: 'Daily Commercial Cold-Room / VIP Restroom Rental (Mid-week or short duration)',
    category: 'Cold-Chain',
    quantity: 1,
    unit: 'Per Day',
    unitPrice: 1200,
  },

  // --- Events & Funeral Infrastructure ---
  {
    description: 'Waterproof Stretch Tent (Heavy-Duty Bedouin, Weather-Resistant, Setup & Rigging included)',
    category: 'Tents',
    quantity: 1,
    unit: 'Event Duration',
    unitPrice: 4500,
  },
  {
    description: 'High-Back Executive VIP Chairs & Memorial Seating (Per 100 Chairs)',
    category: 'Tents',
    quantity: 1,
    unit: 'Bundle of 100',
    unitPrice: 1200,
  },
  {
    description: 'Active PA Sound Reinforcement System + 2x UHF Wireless Mics + Sound Engineer on-site',
    category: 'Sound',
    quantity: 1,
    unit: 'Service Day',
    unitPrice: 2800,
  },
  {
    description: 'Low-Noise 7.5kVA Standby Backup Generator (AVR Regulated, Full Fuel Tank)',
    category: 'Sound',
    quantity: 1,
    unit: 'Event Duration',
    unitPrice: 1500,
  },

  // --- Ceremonial & Agricultural Livestock ---
  {
    description: 'Ceremonial Livestock: Prime Slaughter Ox / Cattle (Inspected, Healthy, Limpopo Farm Sourced)',
    category: 'Livestock',
    quantity: 1,
    unit: 'Head',
    unitPrice: 16500,
  },
  {
    description: 'Ceremonial Livestock: Indigenous Boer Goat (Live weight ~35-45kg, Ritual Ready)',
    category: 'Livestock',
    quantity: 1,
    unit: 'Head',
    unitPrice: 2600,
  },

  // --- Catering & Hospitality ---
  {
    description: 'Traditional Funeral / Event Feast Catering & Buffet Meal Service (Prepared under certified hygiene standards)',
    category: 'Catering',
    quantity: 50,
    unit: 'Per Person / Plate',
    unitPrice: 120,
  },
  {
    description: 'VIP Executive Refreshment & Meeting Staging Pack (Tea, Coffee, Snacks & Premium Bottled Water)',
    category: 'Catering',
    quantity: 1,
    unit: 'Per Day',
    unitPrice: 1500,
  },

  // --- Transport & Delivery ---
  {
    description: 'Doorstep Livestock Trailer Delivery & Offloading (Greater Tzaneen / Mopani Region)',
    category: 'Transport',
    quantity: 1,
    unit: 'Trip',
    unitPrice: 850,
  },
  {
    description: 'Fleet Delivery, Towing & Site Rigging Surcharge (Per km outside Tzaneen 30km radius)',
    category: 'Transport',
    quantity: 1,
    unit: 'Per km',
    unitPrice: 14,
  },
];

export const DEFAULT_BANKING_DETAILS: BankingDetails = {
  bankName: 'First National Bank (FNB)',
  accountHolder: 'HLUGISO (PTY) LTD',
  accountNumber: '62849102847',
  branchCode: '250655',
  accountType: 'Corporate Cheque Account',
  referenceFormat: 'Invoice Number or Client Surname',
};

export const DEFAULT_FLEET_UNITS: FleetUnit[] = [
  {
    id: 'fleet-1',
    name: 'Mobile Cold-Room Trailer #1',
    type: 'cold_room',
    registrationOrCode: 'HLU-MCR-01',
    capacityOrSpecs: '-2°C to +4°C • Single Axle • 220V/Gen • 2x Meat Rails',
    status: 'available',
    assignedLocation: 'Tzaneen Base Depot',
    notes: 'Depot inspected. Chiller calibrated and ready for deployment.',
  },
  {
    id: 'fleet-2',
    name: 'Mobile Cold-Room Trailer #2',
    type: 'cold_room',
    registrationOrCode: 'HLU-MCR-02',
    capacityOrSpecs: '-2°C to +4°C • Heavy-Duty Double Axle • Full Meat Rails',
    status: 'available',
    assignedLocation: 'Tzaneen Base Depot',
    notes: 'Stationed at base. Cleaned, sanitized, and ready for deployment.',
  },
  {
    id: 'fleet-3',
    name: 'VIP Mobile Restroom Trailer #1',
    type: 'vip_toilet',
    registrationOrCode: 'HLU-VIP-01',
    capacityOrSpecs: 'Dual Cubicle (His/Hers) • Porcelain Flush • Solar Lights • Basins',
    status: 'available',
    assignedLocation: 'Tzaneen Base Depot',
    notes: 'Deep-cleaned, sanitized, and fully stocked for deployment.',
  },
  {
    id: 'fleet-4',
    name: 'VIP Mobile Restroom Trailer #2',
    type: 'vip_toilet',
    registrationOrCode: 'HLU-VIP-02',
    capacityOrSpecs: 'Dual Cubicle • Aluminium Safety Stairs • Solar Battery System',
    status: 'available',
    assignedLocation: 'Tzaneen Base Depot',
    notes: 'Solar system charged, sanitized, ready for weekend dispatch.',
  },
  {
    id: 'fleet-5',
    name: 'Main Stage Audio Rig & 7.5kVA Gen',
    type: 'sound_system',
    registrationOrCode: 'HLU-SND-01',
    capacityOrSpecs: '2x 15" Active Tops + 2x Wireless Mics + AVR Gen',
    status: 'available',
    assignedLocation: 'Tzaneen Base Depot',
    notes: 'Tested audio equipment and 7.5kVA generator on standby.',
  },
  {
    id: 'fleet-6',
    name: 'Livestock Transit Utility Trailer',
    type: 'livestock_trailer',
    registrationOrCode: 'HLU-LST-01',
    capacityOrSpecs: 'High-Rail Balled Cattle & Small Stock Transport',
    status: 'available',
    assignedLocation: 'Tzaneen Base Depot',
    notes: 'Sanitized utility livestock trailer ready for transit runs.',
  },
];

export const DEFAULT_CLIENTS: ClientRecord[] = [];

export const DEFAULT_RFQS: RfqLead[] = [];

export const DEFAULT_QUOTES: QuoteDocument[] = [];

export const DEFAULT_INVOICES: InvoiceDocument[] = [];

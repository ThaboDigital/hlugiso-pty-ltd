export type DocumentStatus = 'draft' | 'sent' | 'accepted' | 'invoiced' | 'declined';
export type InvoiceStatus = 'unpaid' | 'deposit_paid' | 'paid' | 'overdue';
export type RfqStatus = 'new' | 'contacted' | 'quoted' | 'confirmed' | 'closed';
export type FleetStatus = 'available' | 'booked' | 'in_transit' | 'maintenance';

export interface LineItem {
  id: string;
  description: string;
  category: 'Cold-Chain' | 'Sanitation' | 'Tents' | 'Sound' | 'Livestock' | 'Cleaning' | 'Transport' | 'Other';
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

export interface ClientRecord {
  id: string;
  name: string;
  organization?: string;
  type: 'Funeral Parlour' | 'Burial Society' | 'Corporate' | 'Municipality' | 'Family / Private';
  phone: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  notes?: string;
}

export interface QuoteDocument {
  id: string;
  quoteNumber: string;
  date: string;
  validUntil: string;
  clientId?: string;
  clientName: string;
  clientOrganization?: string;
  clientPhone: string;
  clientEmail?: string;
  eventLocation: string;
  eventDate: string;
  status: DocumentStatus;
  items: LineItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  depositRequired: number;
  notes?: string;
  convertedToInvoiceId?: string;
  createdAt: string;
}

export interface InvoiceDocument {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  quoteId?: string;
  quoteNumber?: string;
  clientId?: string;
  clientName: string;
  clientOrganization?: string;
  clientPhone: string;
  clientEmail?: string;
  eventLocation: string;
  eventDate: string;
  status: InvoiceStatus;
  items: LineItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  depositPaid: number;
  balanceDue: number;
  notes?: string;
  createdAt: string;
}

export interface RfqLead {
  id: string;
  name: string;
  organization?: string;
  phone: string;
  email?: string;
  serviceRequested: string;
  eventDate?: string;
  location?: string;
  notes?: string;
  status: RfqStatus;
  receivedAt: string;
  estimatedBudget?: number;
}

export interface FleetUnit {
  id: string;
  name: string;
  type: 'cold_room' | 'vip_toilet' | 'sound_system' | 'stretch_tent' | 'livestock_trailer';
  registrationOrCode: string;
  capacityOrSpecs: string;
  status: FleetStatus;
  assignedLocation?: string;
  assignedClient?: string;
  bookingDates?: string;
  notes?: string;
}

export interface BankingDetails {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  branchCode: string;
  accountType: string;
  referenceFormat: string;
}

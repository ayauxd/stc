/**
 * Business Document Types for Softworks
 */

export interface CompanyInfo {
  name: string;
  legalName: string;
  email: string;
  website: string;
  address?: string;
  phone?: string;
  taxId?: string;
}

export interface ClientInfo {
  name: string;
  company?: string;
  email: string;
  address?: string;
  phone?: string;
}

export interface LineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface PaymentInfo {
  method: string;
  details: string[];
}

export interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  client: ClientInfo;
  items: LineItem[];
  subtotal: number;
  tax?: { label: string; rate: number; amount: number };
  total: number;
  currency: string;
  notes?: string;
  paymentInfo: PaymentInfo;
  status?: 'draft' | 'sent' | 'paid' | 'overdue';
}

export interface QuoteData {
  quoteNumber: string;
  issueDate: string;
  validUntil: string;
  client: ClientInfo;
  projectTitle: string;
  projectDescription: string;
  items: LineItem[];
  subtotal: number;
  tax?: { label: string; rate: number; amount: number };
  total: number;
  currency: string;
  terms?: string[];
  notes?: string;
}

export interface ReceiptData {
  receiptNumber: string;
  paymentDate: string;
  client: ClientInfo;
  invoiceReference?: string;
  items: LineItem[];
  subtotal: number;
  tax?: { label: string; rate: number; amount: number };
  total: number;
  currency: string;
  paymentMethod: string;
  notes?: string;
}

export interface ProposalData {
  proposalNumber: string;
  issueDate: string;
  validUntil: string;
  client: ClientInfo;
  projectTitle: string;
  executiveSummary: string;
  problemStatement: string;
  proposedSolution: string;
  deliverables: string[];
  timeline: { phase: string; duration: string; description: string }[];
  investment: LineItem[];
  subtotal: number;
  total: number;
  currency: string;
  terms?: string[];
  nextSteps?: string[];
}

export interface SOWData {
  sowNumber: string;
  issueDate: string;
  effectiveDate: string;
  client: ClientInfo;
  projectTitle: string;
  projectOverview: string;
  scope: { title: string; items: string[] }[];
  outOfScope?: string[];
  deliverables: { item: string; dueDate: string }[];
  timeline: { milestone: string; date: string; description: string }[];
  investment: LineItem[];
  total: number;
  currency: string;
  paymentSchedule: { milestone: string; amount: number; dueDate: string }[];
  assumptions?: string[];
  acceptanceCriteria?: string[];
}

// Default company info for Softworks
export const SOFTWORKS_INFO: CompanyInfo = {
  name: 'Softworks',
  legalName: 'Softworks Trading Company',
  email: 'fred@sftwrks.com',
  website: 'sftwrks.com',
  address: '[YOUR ADDRESS]',
  phone: '[YOUR PHONE]',
  taxId: '[YOUR TAX ID]',
};

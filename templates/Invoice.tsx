/**
 * Invoice Component for Softworks
 * Professional invoice template matching brand design system
 */

import React from 'react';
import { InvoiceData, SOFTWORKS_INFO } from './types';

interface InvoiceProps {
  data: InvoiceData;
  companyInfo?: typeof SOFTWORKS_INFO;
}

const Invoice: React.FC<InvoiceProps> = ({ data, companyInfo = SOFTWORKS_INFO }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data.currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'overdue': return 'bg-red-100 text-red-700 border-red-300';
      case 'sent': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-slate-100 text-slate-600 border-slate-300';
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 print:text-black">
      {/* Header */}
      <div className="bg-[#0A1628] text-white px-8 py-6 print:bg-[#0A1628] print:text-white">
        <div className="max-w-4xl mx-auto flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-black font-['Nunito'] tracking-tight">
              {companyInfo.name}
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">{companyInfo.legalName}</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold font-['Courier_Prime'] tracking-tight text-[#00D4FF]">
              INVOICE
            </span>
            {data.status && (
              <div className={`mt-2 inline-block px-3 py-1 text-xs font-mono uppercase tracking-wider border ${getStatusColor(data.status)}`}>
                {data.status}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* Invoice Details & Client Info */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          {/* Invoice Details */}
          <div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Invoice No.</span>
                <span className="font-bold font-['JetBrains_Mono']">{data.invoiceNumber}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Issue Date</span>
                <span className="font-['JetBrains_Mono']">{data.issueDate}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Due Date</span>
                <span className="font-['JetBrains_Mono'] font-bold text-[#0891B2]">{data.dueDate}</span>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">Bill To</span>
            <div className="text-sm">
              <p className="font-bold">{data.client.name}</p>
              {data.client.company && <p className="text-slate-600">{data.client.company}</p>}
              {data.client.address && <p className="text-slate-500 text-xs mt-1 whitespace-pre-line">{data.client.address}</p>}
              {data.client.email && <p className="text-slate-500 text-xs">{data.client.email}</p>}
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="border border-slate-200 mb-8">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 bg-slate-50 px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-slate-500 border-b border-slate-200">
            <div className="col-span-6">Description</div>
            <div className="col-span-2 text-right">Qty</div>
            <div className="col-span-2 text-right">Rate</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>

          {/* Table Rows */}
          {data.items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 px-4 py-4 text-sm border-b border-slate-100 last:border-b-0"
            >
              <div className="col-span-6">{item.description}</div>
              <div className="col-span-2 text-right font-['JetBrains_Mono'] text-slate-600">{item.quantity}</div>
              <div className="col-span-2 text-right font-['JetBrains_Mono'] text-slate-600">{formatCurrency(item.rate)}</div>
              <div className="col-span-2 text-right font-['JetBrains_Mono'] font-medium">{formatCurrency(item.amount)}</div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-10">
          <div className="w-64">
            <div className="flex justify-between py-2 text-sm border-b border-slate-100">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-['JetBrains_Mono']">{formatCurrency(data.subtotal)}</span>
            </div>
            {data.tax && (
              <div className="flex justify-between py-2 text-sm border-b border-slate-100">
                <span className="text-slate-500">{data.tax.label} ({data.tax.rate}%)</span>
                <span className="font-['JetBrains_Mono']">{formatCurrency(data.tax.amount)}</span>
              </div>
            )}
            <div className="flex justify-between py-3 text-lg font-bold bg-[#0A1628] text-white px-4 -mx-4 mt-2">
              <span className="font-['Courier_Prime']">Total Due</span>
              <span className="font-['JetBrains_Mono'] text-[#00D4FF]">{formatCurrency(data.total)}</span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-3">Payment Details</span>
            <p className="font-bold text-sm mb-2">{data.paymentInfo.method}</p>
            {data.paymentInfo.details.map((line, i) => (
              <p key={i} className="text-xs text-slate-600 font-['JetBrains_Mono']">{line}</p>
            ))}
          </div>
          {data.notes && (
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-3">Notes</span>
              <p className="text-xs text-slate-600">{data.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400">
          <div className="font-mono">
            <span>{companyInfo.email}</span>
            <span className="mx-2">•</span>
            <span>{companyInfo.website}</span>
          </div>
          <div className="font-bold font-['JetBrains_Mono'] text-[#00D4FF]">SOFTWORKS</div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;

// Sample data for testing
export const sampleInvoiceData: InvoiceData = {
  invoiceNumber: 'INV-2026-001',
  issueDate: '2026-01-26',
  dueDate: '2026-02-25',
  status: 'sent',
  client: {
    name: 'John Smith',
    company: 'Acme Corporation',
    email: 'john@acme.com',
    address: '123 Business Ave\nSuite 456\nNew York, NY 10001',
  },
  items: [
    { description: 'AI Strategy Consultation', quantity: 8, rate: 250, amount: 2000 },
    { description: 'Workflow Automation Implementation', quantity: 1, rate: 5000, amount: 5000 },
    { description: 'Training & Documentation', quantity: 4, rate: 150, amount: 600 },
  ],
  subtotal: 7600,
  tax: { label: 'VAT', rate: 7.5, amount: 570 },
  total: 8170,
  currency: 'USD',
  notes: 'Thank you for your business. Payment is due within 30 days.',
  paymentInfo: {
    method: 'Bank Transfer',
    details: [
      '[YOUR BANK NAME]',
      '[YOUR ACCOUNT NUMBER]',
      '[YOUR ROUTING NUMBER]',
    ],
  },
};

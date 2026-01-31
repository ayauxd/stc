/**
 * Receipt Component for Softworks
 * Professional payment receipt template matching brand design system
 */

import React from 'react';
import { ReceiptData, SOFTWORKS_INFO } from './types';

interface ReceiptProps {
  data: ReceiptData;
  companyInfo?: typeof SOFTWORKS_INFO;
}

const Receipt: React.FC<ReceiptProps> = ({ data, companyInfo = SOFTWORKS_INFO }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data.currency,
      minimumFractionDigits: 2,
    }).format(amount);
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
              RECEIPT
            </span>
            <div className="mt-2 inline-block px-3 py-1 text-xs font-mono uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Payment Received
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* Receipt Details & Client Info */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          {/* Receipt Details */}
          <div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Receipt No.</span>
                <span className="font-bold font-['JetBrains_Mono']">{data.receiptNumber}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Payment Date</span>
                <span className="font-['JetBrains_Mono']">{data.paymentDate}</span>
              </div>
              {data.invoiceReference && (
                <div className="col-span-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Invoice Reference</span>
                  <span className="font-['JetBrains_Mono'] text-[#0891B2]">{data.invoiceReference}</span>
                </div>
              )}
            </div>
          </div>

          {/* Received From */}
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">Received From</span>
            <div className="text-sm">
              <p className="font-bold">{data.client.name}</p>
              {data.client.company && <p className="text-slate-600">{data.client.company}</p>}
              {data.client.email && <p className="text-slate-500 text-xs mt-1">{data.client.email}</p>}
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-emerald-50 border border-emerald-200 p-6 mb-8 text-center">
          <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-widest block mb-2">Amount Paid</span>
          <span className="text-4xl font-bold font-['JetBrains_Mono'] text-emerald-700">{formatCurrency(data.total)}</span>
          <p className="text-sm text-emerald-600 mt-2">via {data.paymentMethod}</p>
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
            <div className="flex justify-between py-3 text-lg font-bold bg-emerald-600 text-white px-4 -mx-4 mt-2">
              <span className="font-['Courier_Prime']">Total Paid</span>
              <span className="font-['JetBrains_Mono']">{formatCurrency(data.total)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {data.notes && (
          <div className="mb-8 p-4 bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">Notes</span>
            <p className="text-xs text-slate-600">{data.notes}</p>
          </div>
        )}

        {/* Thank You */}
        <div className="text-center py-8 border-t border-slate-200">
          <p className="text-lg font-['Courier_Prime'] text-slate-700">Thank you for your business!</p>
          <p className="text-sm text-slate-500 mt-2">This receipt confirms payment has been received in full.</p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400">
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

export default Receipt;

// Sample data for testing
export const sampleReceiptData: ReceiptData = {
  receiptNumber: 'RCP-2026-001',
  paymentDate: '2026-01-26',
  invoiceReference: 'INV-2026-001',
  client: {
    name: 'John Smith',
    company: 'Acme Corporation',
    email: 'john@acme.com',
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
  paymentMethod: 'Bank Transfer',
  notes: 'Payment received with thanks. Project will commence as scheduled.',
};

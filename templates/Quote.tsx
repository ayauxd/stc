/**
 * Quote/Estimate Component for Softworks
 * Professional quotation template matching brand design system
 */

import React from 'react';
import { QuoteData, SOFTWORKS_INFO } from './types';

interface QuoteProps {
  data: QuoteData;
  companyInfo?: typeof SOFTWORKS_INFO;
}

const Quote: React.FC<QuoteProps> = ({ data, companyInfo = SOFTWORKS_INFO }) => {
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
              QUOTE
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* Quote Details & Client Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Quote Details */}
          <div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Quote No.</span>
                <span className="font-bold font-['JetBrains_Mono']">{data.quoteNumber}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Issue Date</span>
                <span className="font-['JetBrains_Mono']">{data.issueDate}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Valid Until</span>
                <span className="font-['JetBrains_Mono'] font-bold text-amber-600">{data.validUntil}</span>
              </div>
            </div>
          </div>

          {/* Prepared For */}
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">Prepared For</span>
            <div className="text-sm">
              <p className="font-bold">{data.client.name}</p>
              {data.client.company && <p className="text-slate-600">{data.client.company}</p>}
              {data.client.email && <p className="text-slate-500 text-xs mt-1">{data.client.email}</p>}
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="bg-slate-50 border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold font-['Courier_Prime'] mb-3">{data.projectTitle}</h2>
          <p className="text-sm text-slate-600 leading-relaxed">{data.projectDescription}</p>
        </div>

        {/* Line Items Table */}
        <div className="border border-slate-200 mb-8">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 bg-slate-50 px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-slate-500 border-b border-slate-200">
            <div className="col-span-6">Service / Deliverable</div>
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
              <span className="font-['Courier_Prime']">Total</span>
              <span className="font-['JetBrains_Mono'] text-[#00D4FF]">{formatCurrency(data.total)}</span>
            </div>
          </div>
        </div>

        {/* Terms */}
        {data.terms && data.terms.length > 0 && (
          <div className="mb-8">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-3">Terms & Conditions</span>
            <ul className="text-xs text-slate-600 space-y-1">
              {data.terms.map((term, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#00D4FF]">•</span>
                  {term}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Notes */}
        {data.notes && (
          <div className="mb-8 p-4 bg-[#00D4FF]/5 border border-[#00D4FF]/20">
            <span className="text-[10px] font-mono text-[#0891B2] uppercase tracking-widest block mb-2">Note</span>
            <p className="text-xs text-slate-600">{data.notes}</p>
          </div>
        )}

        {/* Acceptance */}
        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-4">Client Acceptance</span>
            <div className="border-b border-slate-300 pb-2 mb-2">
              <span className="text-[10px] text-slate-400">Signature</span>
            </div>
            <div className="border-b border-slate-300 pb-2 mb-2 mt-8">
              <span className="text-[10px] text-slate-400">Printed Name</span>
            </div>
            <div className="border-b border-slate-300 pb-2 mt-8">
              <span className="text-[10px] text-slate-400">Date</span>
            </div>
          </div>
          <div className="text-right flex flex-col justify-end">
            <p className="text-xs text-slate-500">
              To accept this quote, please sign and return to<br />
              <span className="font-medium text-[#0891B2]">{companyInfo.email}</span>
            </p>
          </div>
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

export default Quote;

// Sample data for testing
export const sampleQuoteData: QuoteData = {
  quoteNumber: 'QT-2026-001',
  issueDate: '2026-01-26',
  validUntil: '2026-02-26',
  client: {
    name: 'Jane Doe',
    company: 'TechStart Inc.',
    email: 'jane@techstart.io',
  },
  projectTitle: 'Workflow Automation Implementation',
  projectDescription: 'Design and implementation of automated workflows to streamline your customer onboarding process, reducing manual tasks by 80% and improving response times.',
  items: [
    { description: 'Discovery & Process Mapping', quantity: 1, rate: 1500, amount: 1500 },
    { description: 'Automation Design & Architecture', quantity: 1, rate: 2500, amount: 2500 },
    { description: 'Implementation & Integration', quantity: 1, rate: 4000, amount: 4000 },
    { description: 'Testing & QA', quantity: 1, rate: 1000, amount: 1000 },
    { description: 'Training & Handover', quantity: 4, rate: 200, amount: 800 },
  ],
  subtotal: 9800,
  total: 9800,
  currency: 'USD',
  terms: [
    '50% deposit required to commence work',
    'Balance due upon project completion',
    'Quote valid for 30 days from issue date',
    'Any scope changes may affect final pricing',
  ],
  notes: 'This quote includes one round of revisions. Additional revisions billed at standard hourly rate.',
};

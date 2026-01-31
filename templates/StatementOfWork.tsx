/**
 * Statement of Work (SOW) Component for Softworks
 * Professional SOW template matching brand design system
 */

import React from 'react';
import { SOWData, SOFTWORKS_INFO } from './types';

interface SOWProps {
  data: SOWData;
  companyInfo?: typeof SOFTWORKS_INFO;
}

const StatementOfWork: React.FC<SOWProps> = ({ data, companyInfo = SOFTWORKS_INFO }) => {
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
      <div className="bg-[#0A1628] text-white px-8 py-8 print:bg-[#0A1628] print:text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-black font-['Nunito'] tracking-tight">
                {companyInfo.name}
              </h1>
              <p className="text-xs text-slate-400 mt-1 font-mono">{companyInfo.legalName}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold font-['Courier_Prime'] tracking-tight text-[#00D4FF]">
                STATEMENT OF WORK
              </span>
              <p className="font-['JetBrains_Mono'] text-sm text-slate-400 mt-1">{data.sowNumber}</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold font-['Courier_Prime'] leading-tight">
            {data.projectTitle}
          </h2>
        </div>
      </div>

      {/* Document Info Bar */}
      <div className="bg-slate-100 border-b border-slate-200 px-8 py-4">
        <div className="max-w-4xl mx-auto flex gap-8 text-sm">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Client</span>
            <span className="font-bold">{data.client.name}</span>
            {data.client.company && <span className="text-slate-500 ml-1">({data.client.company})</span>}
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Issue Date</span>
            <span className="font-['JetBrains_Mono']">{data.issueDate}</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Effective Date</span>
            <span className="font-['JetBrains_Mono'] font-bold text-[#0891B2]">{data.effectiveDate}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-8 py-10">
        {/* Project Overview */}
        <section className="mb-10">
          <h3 className="text-sm font-bold font-['Courier_Prime'] uppercase tracking-wider text-[#0A1628] border-b-2 border-[#0A1628] pb-2 mb-4">
            1. Project Overview
          </h3>
          <p className="text-slate-700 leading-relaxed">{data.projectOverview}</p>
        </section>

        {/* Scope of Work */}
        <section className="mb-10">
          <h3 className="text-sm font-bold font-['Courier_Prime'] uppercase tracking-wider text-[#0A1628] border-b-2 border-[#0A1628] pb-2 mb-4">
            2. Scope of Work
          </h3>
          {data.scope.map((section, i) => (
            <div key={i} className="mb-6">
              <h4 className="font-bold text-sm mb-2">{section.title}</h4>
              <ul className="text-sm text-slate-700 space-y-1 ml-4">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="text-[#00D4FF]">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Out of Scope */}
        {data.outOfScope && data.outOfScope.length > 0 && (
          <section className="mb-10 p-4 bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Out of Scope</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              {data.outOfScope.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-slate-400">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Deliverables */}
        <section className="mb-10">
          <h3 className="text-sm font-bold font-['Courier_Prime'] uppercase tracking-wider text-[#0A1628] border-b-2 border-[#0A1628] pb-2 mb-4">
            3. Deliverables
          </h3>
          <div className="border border-slate-200">
            <div className="grid grid-cols-12 gap-4 bg-slate-50 px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 border-b border-slate-200">
              <div className="col-span-8">Deliverable</div>
              <div className="col-span-4 text-right">Due Date</div>
            </div>
            {data.deliverables.map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 px-4 py-3 text-sm border-b border-slate-100 last:border-b-0">
                <div className="col-span-8 flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#0A1628] text-white text-[10px] font-bold flex items-center justify-center font-['JetBrains_Mono']">
                    {i + 1}
                  </span>
                  {item.item}
                </div>
                <div className="col-span-4 text-right font-['JetBrains_Mono'] text-slate-600">{item.dueDate}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline & Milestones */}
        <section className="mb-10">
          <h3 className="text-sm font-bold font-['Courier_Prime'] uppercase tracking-wider text-[#0A1628] border-b-2 border-[#0A1628] pb-2 mb-4">
            4. Timeline & Milestones
          </h3>
          <div className="space-y-4">
            {data.timeline.map((milestone, i) => (
              <div key={i} className="flex gap-4 items-start pb-4 border-b border-slate-100 last:border-b-0">
                <div className="w-28 flex-shrink-0">
                  <span className="text-xs font-['JetBrains_Mono'] font-bold text-[#0891B2]">{milestone.date}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm mb-1">{milestone.milestone}</h4>
                  <p className="text-xs text-slate-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Investment */}
        <section className="mb-10">
          <h3 className="text-sm font-bold font-['Courier_Prime'] uppercase tracking-wider text-[#0A1628] border-b-2 border-[#0A1628] pb-2 mb-4">
            5. Investment
          </h3>
          <div className="border border-slate-200 mb-6">
            <div className="grid grid-cols-12 gap-4 bg-slate-50 px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 border-b border-slate-200">
              <div className="col-span-6">Item</div>
              <div className="col-span-2 text-right">Qty</div>
              <div className="col-span-2 text-right">Rate</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>
            {data.investment.map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 px-4 py-3 text-sm border-b border-slate-100 last:border-b-0">
                <div className="col-span-6">{item.description}</div>
                <div className="col-span-2 text-right font-['JetBrains_Mono'] text-slate-600">{item.quantity}</div>
                <div className="col-span-2 text-right font-['JetBrains_Mono'] text-slate-600">{formatCurrency(item.rate)}</div>
                <div className="col-span-2 text-right font-['JetBrains_Mono'] font-medium">{formatCurrency(item.amount)}</div>
              </div>
            ))}
            <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[#0A1628] text-white">
              <div className="col-span-10 text-right font-bold font-['Courier_Prime']">Total</div>
              <div className="col-span-2 text-right font-['JetBrains_Mono'] font-bold text-[#00D4FF]">{formatCurrency(data.total)}</div>
            </div>
          </div>

          {/* Payment Schedule */}
          <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Payment Schedule</h4>
          <div className="border border-slate-200">
            <div className="grid grid-cols-12 gap-4 bg-slate-50 px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 border-b border-slate-200">
              <div className="col-span-6">Milestone</div>
              <div className="col-span-3 text-right">Amount</div>
              <div className="col-span-3 text-right">Due Date</div>
            </div>
            {data.paymentSchedule.map((payment, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 px-4 py-3 text-sm border-b border-slate-100 last:border-b-0">
                <div className="col-span-6">{payment.milestone}</div>
                <div className="col-span-3 text-right font-['JetBrains_Mono']">{formatCurrency(payment.amount)}</div>
                <div className="col-span-3 text-right font-['JetBrains_Mono'] text-slate-600">{payment.dueDate}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Assumptions */}
        {data.assumptions && data.assumptions.length > 0 && (
          <section className="mb-10">
            <h3 className="text-sm font-bold font-['Courier_Prime'] uppercase tracking-wider text-[#0A1628] border-b-2 border-[#0A1628] pb-2 mb-4">
              6. Assumptions
            </h3>
            <ul className="text-sm text-slate-700 space-y-2">
              {data.assumptions.map((assumption, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#00D4FF] font-bold">{i + 1}.</span>
                  {assumption}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Acceptance Criteria */}
        {data.acceptanceCriteria && data.acceptanceCriteria.length > 0 && (
          <section className="mb-10">
            <h3 className="text-sm font-bold font-['Courier_Prime'] uppercase tracking-wider text-[#0A1628] border-b-2 border-[#0A1628] pb-2 mb-4">
              7. Acceptance Criteria
            </h3>
            <ul className="text-sm text-slate-700 space-y-2">
              {data.acceptanceCriteria.map((criteria, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  {criteria}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Signatures */}
        <section className="pt-8 border-t-2 border-[#0A1628]">
          <h3 className="text-sm font-bold font-['Courier_Prime'] uppercase tracking-wider text-[#0A1628] mb-6">
            Agreement & Signatures
          </h3>
          <p className="text-sm text-slate-600 mb-8">
            By signing below, both parties agree to the terms, deliverables, timeline, and payment schedule outlined in this Statement of Work.
          </p>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">Client</h4>
              <div className="border-b border-slate-300 pb-2 mb-2">
                <span className="text-[10px] text-slate-400">Signature</span>
              </div>
              <div className="border-b border-slate-300 pb-2 mb-2 mt-8">
                <span className="text-[10px] text-slate-400">Printed Name & Title</span>
              </div>
              <div className="border-b border-slate-300 pb-2 mt-8">
                <span className="text-[10px] text-slate-400">Date</span>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">Softworks</h4>
              <div className="border-b border-slate-300 pb-2 mb-2">
                <span className="text-[10px] text-slate-400">Signature</span>
              </div>
              <div className="border-b border-slate-300 pb-2 mb-2 mt-8">
                <span className="text-[10px] text-slate-400">Printed Name & Title</span>
              </div>
              <div className="border-b border-slate-300 pb-2 mt-8">
                <span className="text-[10px] text-slate-400">Date</span>
              </div>
            </div>
          </div>
        </section>

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

export default StatementOfWork;

// Sample data for testing
export const sampleSOWData: SOWData = {
  sowNumber: 'SOW-2026-001',
  issueDate: '2026-01-26',
  effectiveDate: '2026-02-01',
  client: {
    name: 'Michael Chen',
    company: 'DataFlow Inc.',
    email: 'michael@dataflow.io',
  },
  projectTitle: 'Sales Pipeline Automation System',
  projectOverview: 'This Statement of Work outlines the development of an automated sales pipeline system that integrates your CRM with email, calendar, and communication tools to reduce manual data entry and improve sales team productivity.',
  scope: [
    {
      title: 'CRM Integration',
      items: [
        'Bi-directional sync with Salesforce',
        'Automatic contact creation from email signatures',
        'Deal stage updates based on email/meeting activity',
      ],
    },
    {
      title: 'Email Automation',
      items: [
        'Automated follow-up sequences',
        'Email tracking and engagement metrics',
        'Template management system',
      ],
    },
    {
      title: 'Reporting Dashboard',
      items: [
        'Real-time pipeline visibility',
        'Activity tracking by rep',
        'Forecasting tools',
      ],
    },
  ],
  outOfScope: [
    'Mobile app development',
    'Marketing automation features',
    'Custom CRM development (using existing Salesforce)',
  ],
  deliverables: [
    { item: 'Technical Requirements Document', dueDate: '2026-02-07' },
    { item: 'System Architecture Design', dueDate: '2026-02-14' },
    { item: 'CRM Integration Module', dueDate: '2026-03-01' },
    { item: 'Email Automation System', dueDate: '2026-03-15' },
    { item: 'Reporting Dashboard', dueDate: '2026-03-29' },
    { item: 'User Training & Documentation', dueDate: '2026-04-05' },
  ],
  timeline: [
    { milestone: 'Project Kickoff', date: '2026-02-01', description: 'Discovery sessions and requirements gathering' },
    { milestone: 'Design Complete', date: '2026-02-14', description: 'Architecture approved, development begins' },
    { milestone: 'Alpha Release', date: '2026-03-15', description: 'Core features ready for internal testing' },
    { milestone: 'Beta Release', date: '2026-03-29', description: 'Full system ready for user acceptance testing' },
    { milestone: 'Go Live', date: '2026-04-05', description: 'Production deployment and team training' },
  ],
  investment: [
    { description: 'Discovery & Requirements', quantity: 1, rate: 2500, amount: 2500 },
    { description: 'Architecture & Design', quantity: 1, rate: 3500, amount: 3500 },
    { description: 'CRM Integration Development', quantity: 1, rate: 8000, amount: 8000 },
    { description: 'Email Automation Development', quantity: 1, rate: 6000, amount: 6000 },
    { description: 'Dashboard Development', quantity: 1, rate: 4000, amount: 4000 },
    { description: 'Testing & QA', quantity: 1, rate: 2000, amount: 2000 },
    { description: 'Training & Documentation', quantity: 1, rate: 1500, amount: 1500 },
  ],
  total: 27500,
  currency: 'USD',
  paymentSchedule: [
    { milestone: 'Project Kickoff', amount: 8250, dueDate: '2026-02-01' },
    { milestone: 'Alpha Release', amount: 9625, dueDate: '2026-03-15' },
    { milestone: 'Go Live', amount: 9625, dueDate: '2026-04-05' },
  ],
  assumptions: [
    'Client will provide API access to Salesforce within 5 business days of kickoff',
    'Client will designate a project point of contact available for weekly syncs',
    'Feedback on deliverables will be provided within 3 business days',
    'Existing Salesforce configuration meets minimum requirements',
  ],
  acceptanceCriteria: [
    'All integrations pass automated test suite with 95%+ success rate',
    'Dashboard loads within 3 seconds under normal conditions',
    'Email sequences trigger correctly based on defined rules',
    'User documentation covers all features with step-by-step guides',
  ],
};

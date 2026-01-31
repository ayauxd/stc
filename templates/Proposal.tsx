/**
 * Proposal Component for Softworks
 * Professional project proposal template matching brand design system
 */

import React from 'react';
import { ProposalData, SOFTWORKS_INFO } from './types';

interface ProposalProps {
  data: ProposalData;
  companyInfo?: typeof SOFTWORKS_INFO;
}

const Proposal: React.FC<ProposalProps> = ({ data, companyInfo = SOFTWORKS_INFO }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data.currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 print:text-black">
      {/* Cover Header */}
      <div className="bg-[#0A1628] text-white px-8 py-12 print:bg-[#0A1628] print:text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-black font-['Nunito'] tracking-tight">
                {companyInfo.name}
              </h1>
              <p className="text-xs text-slate-400 mt-1 font-mono">{companyInfo.legalName}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Proposal</span>
              <p className="font-['JetBrains_Mono'] text-[#00D4FF] font-bold">{data.proposalNumber}</p>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold font-['Courier_Prime'] leading-tight mb-4">
            {data.projectTitle}
          </h2>

          <div className="flex gap-8 mt-8 text-sm">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Prepared For</span>
              <span className="font-bold">{data.client.name}</span>
              {data.client.company && <span className="text-slate-400 ml-2">• {data.client.company}</span>}
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Date</span>
              <span className="font-['JetBrains_Mono']">{data.issueDate}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Valid Until</span>
              <span className="font-['JetBrains_Mono'] text-amber-400">{data.validUntil}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Executive Summary */}
        <section className="mb-12">
          <h3 className="text-xs font-mono text-[#00D4FF] uppercase tracking-widest mb-4">Executive Summary</h3>
          <p className="text-lg text-slate-700 leading-relaxed">{data.executiveSummary}</p>
        </section>

        {/* The Challenge */}
        <section className="mb-12 p-6 bg-slate-50 border-l-4 border-[#0A1628]">
          <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">The Challenge</h3>
          <p className="text-slate-700 leading-relaxed">{data.problemStatement}</p>
        </section>

        {/* Our Solution */}
        <section className="mb-12">
          <h3 className="text-xs font-mono text-[#00D4FF] uppercase tracking-widest mb-4">Our Solution</h3>
          <p className="text-slate-700 leading-relaxed">{data.proposedSolution}</p>
        </section>

        {/* Deliverables */}
        <section className="mb-12">
          <h3 className="text-xs font-mono text-[#00D4FF] uppercase tracking-widest mb-4">Deliverables</h3>
          <ul className="space-y-3">
            {data.deliverables.map((deliverable, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 flex-shrink-0 bg-[#0A1628] text-white text-xs font-bold flex items-center justify-center font-['JetBrains_Mono']">
                  {i + 1}
                </span>
                <span className="text-slate-700">{deliverable}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Timeline */}
        <section className="mb-12">
          <h3 className="text-xs font-mono text-[#00D4FF] uppercase tracking-widest mb-6">Timeline</h3>
          <div className="space-y-4">
            {data.timeline.map((phase, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-24 flex-shrink-0">
                  <span className="text-xs font-mono font-bold text-[#0891B2] uppercase">{phase.duration}</span>
                </div>
                <div className="flex-1 pb-4 border-b border-slate-100">
                  <h4 className="font-bold font-['Courier_Prime'] mb-1">{phase.phase}</h4>
                  <p className="text-sm text-slate-600">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Investment */}
        <section className="mb-12">
          <h3 className="text-xs font-mono text-[#00D4FF] uppercase tracking-widest mb-6">Investment</h3>
          <div className="border border-slate-200">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 bg-slate-50 px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-slate-500 border-b border-slate-200">
              <div className="col-span-6">Item</div>
              <div className="col-span-2 text-right">Qty</div>
              <div className="col-span-2 text-right">Rate</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>

            {/* Table Rows */}
            {data.investment.map((item, index) => (
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

            {/* Total */}
            <div className="grid grid-cols-12 gap-4 px-4 py-4 bg-[#0A1628] text-white">
              <div className="col-span-10 text-right font-bold font-['Courier_Prime']">Total Investment</div>
              <div className="col-span-2 text-right font-['JetBrains_Mono'] font-bold text-[#00D4FF]">{formatCurrency(data.total)}</div>
            </div>
          </div>
        </section>

        {/* Terms */}
        {data.terms && data.terms.length > 0 && (
          <section className="mb-12">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">Terms</h3>
            <ul className="text-sm text-slate-600 space-y-2">
              {data.terms.map((term, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#00D4FF]">•</span>
                  {term}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Next Steps */}
        {data.nextSteps && data.nextSteps.length > 0 && (
          <section className="mb-12 p-6 bg-[#00D4FF]/5 border border-[#00D4FF]/20">
            <h3 className="text-xs font-mono text-[#0891B2] uppercase tracking-widest mb-4">Next Steps</h3>
            <ol className="text-sm text-slate-700 space-y-2">
              {data.nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-bold font-['JetBrains_Mono'] text-[#0891B2]">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Acceptance */}
        <section className="pt-8 border-t border-slate-200">
          <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-6">Acceptance</h3>
          <p className="text-sm text-slate-600 mb-8">
            By signing below, you accept this proposal and agree to the terms outlined herein.
          </p>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <div className="border-b border-slate-300 pb-2 mb-2">
                <span className="text-[10px] text-slate-400">Client Signature</span>
              </div>
              <div className="border-b border-slate-300 pb-2 mb-2 mt-8">
                <span className="text-[10px] text-slate-400">Printed Name</span>
              </div>
              <div className="border-b border-slate-300 pb-2 mt-8">
                <span className="text-[10px] text-slate-400">Date</span>
              </div>
            </div>
            <div>
              <div className="border-b border-slate-300 pb-2 mb-2">
                <span className="text-[10px] text-slate-400">Softworks Signature</span>
              </div>
              <div className="border-b border-slate-300 pb-2 mb-2 mt-8">
                <span className="text-[10px] text-slate-400">Printed Name</span>
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

export default Proposal;

// Sample data for testing
export const sampleProposalData: ProposalData = {
  proposalNumber: 'PROP-2026-001',
  issueDate: '2026-01-26',
  validUntil: '2026-02-26',
  client: {
    name: 'Sarah Johnson',
    company: 'GrowthCo',
    email: 'sarah@growthco.com',
  },
  projectTitle: 'AI-Powered Customer Service Automation',
  executiveSummary: 'We propose implementing an intelligent automation system that will transform your customer service operations, reducing response times by 70% while maintaining the personal touch your customers expect.',
  problemStatement: 'Your team currently spends 60% of their time on repetitive inquiries that could be automated. This leads to longer response times, increased costs, and limits your ability to scale support during peak periods.',
  proposedSolution: 'We will design and implement a custom AI-powered system that handles routine inquiries automatically, routes complex issues to the right team members, and provides your agents with context and suggested responses to resolve issues faster.',
  deliverables: [
    'Custom AI chatbot trained on your knowledge base and FAQ content',
    'Intelligent ticket routing system with priority classification',
    'Agent assist dashboard with suggested responses and context',
    'Analytics dashboard tracking resolution times and customer satisfaction',
    'Integration with your existing helpdesk software',
    'Complete documentation and training for your team',
  ],
  timeline: [
    { phase: 'Discovery & Planning', duration: 'Week 1-2', description: 'Deep dive into your current processes, pain points, and goals. Map out the ideal customer journey.' },
    { phase: 'Design & Architecture', duration: 'Week 3-4', description: 'Design the system architecture, AI training plan, and integration approach.' },
    { phase: 'Development', duration: 'Week 5-8', description: 'Build the automation system, train the AI, and develop integrations.' },
    { phase: 'Testing & Refinement', duration: 'Week 9-10', description: 'Thorough testing, AI fine-tuning, and performance optimization.' },
    { phase: 'Launch & Training', duration: 'Week 11-12', description: 'Staged rollout, team training, and handover documentation.' },
  ],
  investment: [
    { description: 'Discovery & Planning', quantity: 1, rate: 3000, amount: 3000 },
    { description: 'Design & Architecture', quantity: 1, rate: 4000, amount: 4000 },
    { description: 'Development & Integration', quantity: 1, rate: 12000, amount: 12000 },
    { description: 'Testing & QA', quantity: 1, rate: 2500, amount: 2500 },
    { description: 'Training & Documentation', quantity: 1, rate: 1500, amount: 1500 },
  ],
  subtotal: 23000,
  total: 23000,
  currency: 'USD',
  terms: [
    '50% deposit to commence work',
    '25% due at development milestone',
    '25% due upon project completion',
    '30-day support period included post-launch',
  ],
  nextSteps: [
    'Review this proposal and let us know if you have any questions',
    'Sign and return to confirm engagement',
    'Schedule kickoff call to begin discovery phase',
  ],
};

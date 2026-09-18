import React from 'react';
import { BusinessLead, SprintStats } from '../types';
import { Star, ArrowRight, CheckCircle2, MessageSquare, Sparkles, DollarSign, ExternalLink } from 'lucide-react';

interface SprintPipelineBoardProps {
  leads: BusinessLead[];
  currency: 'USD' | 'NGN';
  stats: SprintStats;
  onUpdateStatus: (leadId: string, status: BusinessLead['status']) => void;
  onSelectForWebsite: (lead: BusinessLead) => void;
  onOpenPitch: (lead: BusinessLead) => void;
  onOpenProposal: (lead: BusinessLead) => void;
}

export const SprintPipelineBoard: React.FC<SprintPipelineBoardProps> = ({
  leads,
  currency,
  stats,
  onUpdateStatus,
  onSelectForWebsite,
  onOpenPitch,
  onOpenProposal,
}) => {
  const formatPrice = (usd: number) => {
    if (currency === 'NGN') {
      return `₦${(usd * 1500).toLocaleString()}`;
    }
    return `$${usd}`;
  };

  const columns: { id: BusinessLead['status']; title: string; subtitle: string; color: string }[] = [
    { id: 'discovered', title: '1. Map Discovered', subtitle: '4.5★+ no website', color: 'border-stone-400' },
    { id: 'site_ready', title: '2. Website Ready', subtitle: 'Live demo generated', color: 'border-teal-500' },
    { id: 'pitched', title: '3. Pitched', subtitle: 'WhatsApp/Email sent', color: 'border-amber-500' },
    { id: 'follow_up', title: '4. Responded', subtitle: 'In negotiation', color: 'border-indigo-500' },
    { id: 'won', title: '5. Deal Won', subtitle: '$300-$500 secured', color: 'border-emerald-500' },
  ];

  const wonLeads = leads.filter((l) => l.status === 'won');
  const wonRevenueUSD = wonLeads.reduce((acc, l) => acc + l.proposedPrice, 0);

  return (
    <div className="space-y-6 pb-16">
      {/* Sprint Performance Banner */}
      <div className="bg-stone-900 rounded-2xl border border-stone-800 p-6 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>2-HOUR SPRINT REVENUE MONITOR</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display">
            Secured Revenue: <span className="text-emerald-400">{formatPrice(wonRevenueUSD)}</span>
            <span className="text-stone-400 text-sm font-normal ml-2">
              / Target {formatPrice(stats.targetRevenueUSD)}
            </span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            {wonLeads.length} deals closed · {leads.filter((l) => l.status === 'pitched').length} pitches awaiting client reply
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-stone-800/80 px-4 py-2.5 rounded-xl border border-stone-700 text-center">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Pipeline</span>
            <span className="text-lg font-black text-white">{leads.length} Leads</span>
          </div>
          <div className="bg-stone-800/80 px-4 py-2.5 rounded-xl border border-stone-700 text-center">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Sites Generated</span>
            <span className="text-lg font-black text-teal-400">
              {leads.filter((l) => l.status !== 'discovered').length}
            </span>
          </div>
          <div className="bg-stone-800/80 px-4 py-2.5 rounded-xl border border-stone-700 text-center">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Pitched</span>
            <span className="text-lg font-black text-amber-400">
              {leads.filter((l) => l.status === 'pitched' || l.status === 'follow_up' || l.status === 'won').length}
            </span>
          </div>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colLeads = leads.filter((l) => l.status === col.id);
          return (
            <div
              key={col.id}
              className={`bg-stone-100/70 rounded-2xl border-t-4 ${col.color} border border-stone-200/80 p-3.5 flex flex-col min-h-[500px]`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-bold text-xs text-stone-900">{col.title}</h3>
                  <p className="text-[10px] text-stone-500">{col.subtitle}</p>
                </div>
                <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 text-[10px] font-bold flex items-center justify-center">
                  {colLeads.length}
                </span>
              </div>

              <div className="space-y-2.5 flex-1 mt-2">
                {colLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white rounded-xl border border-stone-200/80 p-3 shadow-2xs hover:shadow-xs transition space-y-2"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-xs text-stone-900 leading-snug">
                        {lead.name}
                      </h4>
                      <span className="text-[11px] font-extrabold text-amber-700 whitespace-nowrap">
                        {formatPrice(lead.proposedPrice)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span className="truncate max-w-[120px]">{lead.city}</span>
                      <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                        ★ {lead.rating}
                      </span>
                    </div>

                    {/* Quick actions on card */}
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-1">
                      <button
                        onClick={() => onSelectForWebsite(lead)}
                        title="View Website"
                        className="p-1 rounded hover:bg-stone-100 text-teal-700 text-[10px] font-bold flex items-center gap-0.5"
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Site</span>
                      </button>

                      <button
                        onClick={() => onOpenPitch(lead)}
                        title="Open Pitch"
                        className="p-1 rounded hover:bg-stone-100 text-emerald-700 text-[10px] font-bold flex items-center gap-0.5"
                      >
                        <MessageSquare className="w-2.5 h-2.5" />
                        <span>Pitch</span>
                      </button>

                      <button
                        onClick={() => onOpenProposal(lead)}
                        title="View Quote"
                        className="p-1 rounded hover:bg-stone-100 text-stone-700 text-[10px] font-bold flex items-center gap-0.5"
                      >
                        <DollarSign className="w-2.5 h-2.5" />
                        <span>Quote</span>
                      </button>

                      {/* Advance Button */}
                      {col.id !== 'won' && (
                        <button
                          onClick={() => {
                            const nextStatus: Record<BusinessLead['status'], BusinessLead['status']> = {
                              discovered: 'site_ready',
                              site_ready: 'pitched',
                              pitched: 'follow_up',
                              follow_up: 'won',
                              won: 'won',
                            };
                            onUpdateStatus(lead.id, nextStatus[col.id]);
                          }}
                          title="Advance to next sprint stage"
                          className="p-1 rounded bg-stone-900 hover:bg-stone-800 text-white text-[10px] font-bold flex items-center"
                        >
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {colLeads.length === 0 && (
                  <div className="h-32 border-2 border-dashed border-stone-200 rounded-xl flex items-center justify-center text-[11px] text-stone-400 text-center p-2">
                    No clients in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

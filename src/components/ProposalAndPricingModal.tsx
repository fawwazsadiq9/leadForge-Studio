import React, { useState } from 'react';
import { Check, Copy, Printer, DollarSign, ShieldCheck, Zap, Sparkles, X } from 'lucide-react';
import { BusinessLead, PricingTier } from '../types';
import { PRICING_TIERS } from '../data/mockLeads';

interface ProposalAndPricingModalProps {
  lead: BusinessLead;
  currency: 'USD' | 'NGN';
  onClose: () => void;
  onOpenPitch: (lead: BusinessLead) => void;
}

export const ProposalAndPricingModal: React.FC<ProposalAndPricingModalProps> = ({
  lead,
  currency,
  onClose,
  onOpenPitch,
}) => {
  const [selectedTier, setSelectedTier] = useState<PricingTier>(
    PRICING_TIERS.find((t) => t.priceUSD === lead.proposedPrice) || PRICING_TIERS[1]
  );
  const [includeGbpAudit, setIncludeGbpAudit] = useState(true);
  const [includePriority48h, setIncludePriority48h] = useState(true);
  const [copied, setCopied] = useState(false);

  const formatPrice = (usd: number) => {
    if (currency === 'NGN') {
      return `₦${(usd * 1500).toLocaleString()}`;
    }
    return `$${usd}`;
  };

  const calculateTotal = () => {
    let total = selectedTier.priceUSD;
    if (includeGbpAudit && selectedTier.priceUSD < 500) total += 50;
    // Cap strictly at 500 to adhere to user's 300 to 500 prompt
    if (total > 500) total = 500;
    return total;
  };

  const finalPrice = calculateTotal();

  const generateProposalText = () => {
    return `
============================================================
AGENCY PROPOSAL & PROJECT STATEMENT OF WORK
============================================================
PREPARED FOR:
${lead.name}
${lead.address}, ${lead.city}, ${lead.country}
Contact: ${lead.phone} | WhatsApp: ${lead.whatsapp}

DATE: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
PROPOSED PACKAGE: ${selectedTier.name} (${formatPrice(finalPrice)})
PROPOSED DOMAIN: www.${lead.customDomainIdea}

------------------------------------------------------------
1. EXECUTIVE SUMMARY & LOCAL MARKET OPPORTUNITY
------------------------------------------------------------
${lead.name} boasts an impressive ${lead.rating}★ rating on Google Maps with ${lead.reviewCount}+ verified customer reviews.
However, customers searching for "${lead.category}" in ${lead.city} currently cannot view your full service list, pricing, or book an appointment online directly.

Our agency has already constructed a high-converting, live interactive website preview tailored specifically to your business, brand aesthetic, and services.

------------------------------------------------------------
2. SCOPE OF WORK & DELIVERABLES
------------------------------------------------------------
${selectedTier.features.map((f, i) => `[✓] ${i + 1}. ${f}`).join('\n')}
${includeGbpAudit ? '[✓] Google Business Profile (GBP) Local Search Rank Audit' : ''}
${includePriority48h ? '[✓] 48-Hour Turnaround Fast-Track Guarantee' : ''}

------------------------------------------------------------
3. INVESTMENT & BILLING TERMS
------------------------------------------------------------
Total Turnkey Investment: ${formatPrice(finalPrice)} (One-time investment)
Payment Milestones:
- 50% Commencing Deposit (${formatPrice(finalPrice / 2)}) to bind custom domain & deployment
- 50% Final Payment (${formatPrice(finalPrice / 2)}) upon your final sign-off and domain launch

Delivery Guarantee: Completed, tested, and live within 48 hours of deposit confirmation.

------------------------------------------------------------
4. ACCEPTANCE & NEXT STEPS
------------------------------------------------------------
To proceed with launching your website, simply reply to this proposal via WhatsApp or email with "APPROVED". We will link your custom domain immediately.
============================================================
    `.trim();
  };

  const handleCopyProposal = () => {
    navigator.clipboard.writeText(generateProposalText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-8 shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-stone-900 text-white p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL CLIENT QUOTE ($300 - $500 CHARGE ARCHITECTURE)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display">
              Proposal & Invoice for {lead.name}
            </h2>
            <p className="text-xs text-stone-400">
              Customized for {lead.category} · {lead.city}
            </p>
          </div>
          <button
            id="btn-close-proposal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-stone-700">
          {/* Tier Selector ($300, $400, $500) */}
          <div>
            <label className="block text-stone-900 font-bold text-sm mb-3">
              Select Pricing Tier to Charge Client:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PRICING_TIERS.map((tier) => {
                const isSelected = selectedTier.id === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/40 shadow-md'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div>
                      {tier.popular && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-stone-950 mb-2">
                          MOST POPULAR
                        </span>
                      )}
                      <h4 className="text-sm font-bold text-stone-900">{tier.name}</h4>
                      <div className="my-2">
                        <span className="text-2xl font-extrabold text-stone-900">
                          {formatPrice(tier.priceUSD)}
                        </span>
                        <span className="text-stone-500 text-[11px] block mt-0.5">One-time flat fee</span>
                      </div>
                      <p className="text-stone-600 text-[11px] leading-relaxed mb-4">{tier.description}</p>
                    </div>

                    <div className="space-y-1.5 border-t border-stone-200/60 pt-3">
                      {tier.features.slice(0, 4).map((f, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-stone-700">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Value Add-ons */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
            <h4 className="font-bold text-stone-900 text-xs">Included Value Multipliers:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-stone-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeGbpAudit}
                  onChange={(e) => setIncludeGbpAudit(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-400"
                />
                <div>
                  <p className="font-bold text-stone-800 text-[11px]">Google Business Profile SEO Audit</p>
                  <p className="text-[10px] text-stone-500">Optimizes their ranking on Google Maps for local searches.</p>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-stone-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includePriority48h}
                  onChange={(e) => setIncludePriority48h(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-400"
                />
                <div>
                  <p className="font-bold text-stone-800 text-[11px]">48-Hour Rapid Delivery Guarantee</p>
                  <p className="text-[10px] text-stone-500">Live deployment under custom domain within two business days.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Formatted Proposal Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-stone-900 text-xs">Formatted Client Proposal & Contract:</h4>
              <span className="text-[11px] text-stone-400">Ready to copy or send via WhatsApp/Email</span>
            </div>
            <pre className="p-4 rounded-xl bg-stone-900 text-stone-200 font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap border border-stone-800">
              {generateProposalText()}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-50 border-t border-stone-200 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-stone-500 text-xs font-semibold">Total Price Tag:</span>
            <span className="text-lg font-black text-stone-900">{formatPrice(finalPrice)}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-copy-proposal"
              onClick={handleCopyProposal}
              className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied Proposal to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-600" />
                  <span>Copy Proposal Text</span>
                </>
              )}
            </button>

            <button
              id="btn-print-proposal"
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              id="btn-send-pitch-from-proposal"
              onClick={() => {
                onClose();
                onOpenPitch(lead);
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-white" />
              <span>Send Pitch on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

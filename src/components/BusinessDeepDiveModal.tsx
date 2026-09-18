import React, { useState } from 'react';
import { Star, MapPin, Phone, Clock, Copy, Check, Sparkles, DollarSign, MessageSquare, ExternalLink, ShieldCheck, X } from 'lucide-react';
import { BusinessLead } from '../types';

interface BusinessDeepDiveModalProps {
  lead: BusinessLead;
  currency: 'USD' | 'NGN';
  onClose: () => void;
  onGenerateWebsite: (lead: BusinessLead) => void;
  onOpenProposal: (lead: BusinessLead) => void;
  onOpenPitch: (lead: BusinessLead) => void;
}

export const BusinessDeepDiveModal: React.FC<BusinessDeepDiveModalProps> = ({
  lead,
  currency,
  onClose,
  onGenerateWebsite,
  onOpenProposal,
  onOpenPitch,
}) => {
  const [copied, setCopied] = useState(false);

  const formatPrice = (usd: number) => {
    if (currency === 'NGN') {
      return `₦${(usd * 1500).toLocaleString()}`;
    }
    return `$${usd}`;
  };

  const copyFullDossier = () => {
    const text = `
=== EXTRACTED BUSINESS AUDIT DOSSIER ===
Business Name: ${lead.name}
Category: ${lead.category}
Tagline: ${lead.tagline}
Address: ${lead.address}, ${lead.city}, ${lead.country}
Google Maps Rating: ${lead.rating} ★ (${lead.reviewCount} Reviews)
Website Status: NO WEBSITE DETECTED
Direct Phone: ${lead.phone}
WhatsApp: ${lead.whatsapp}
Operating Hours: ${lead.hours}
Estimated Price Bracket: ${lead.priceRange}

Suggested Domain: ${lead.customDomainIdea}
Target Price: ${formatPrice(lead.proposedPrice)}

Company Story / Bio:
${lead.aboutStory}

Why They Urgently Need A Website:
${lead.whyTheyNeedWebsite}

Services & Pricing:
${lead.services.map((s, i) => `${i + 1}. ${s.title}: ${s.description} [${s.priceEstimate || 'Custom'}]`).join('\n')}

Core Highlights:
${lead.highlights.map((h) => `• ${h}`).join('\n')}

Top Verified Customer Reviews:
${lead.reviews.map((r) => `"${r.text}" - ${r.author} (${r.rating}★, ${r.relativeTime || 'Recent'})`).join('\n')}
=========================================
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-8 shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="bg-stone-900 text-white p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{lead.rating} Google Rating · {lead.reviewCount} Reviews · No Official Website</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display">{lead.name}</h2>
            <p className="text-xs text-stone-400">{lead.category} · {lead.city}, {lead.country}</p>
          </div>
          <button
            id="btn-close-deep-dive"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-stone-700">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-stone-400 font-medium block">Phone & WhatsApp:</span>
              <p className="font-bold text-stone-900 mt-0.5">{lead.phone}</p>
              <a
                href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 font-semibold hover:underline inline-flex items-center gap-1 mt-1"
              >
                Chat on WhatsApp <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-stone-400 font-medium block">Exact Address:</span>
              <p className="font-bold text-stone-900 mt-0.5">{lead.address}</p>
              <p className="text-[11px] text-stone-500 mt-0.5">{lead.hours}</p>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-amber-800 font-bold block">Recommended Price:</span>
              <p className="font-black text-amber-900 text-base mt-0.5">{formatPrice(lead.proposedPrice)}</p>
              <p className="text-[11px] text-amber-700 mt-0.5">Custom Domain: {lead.customDomainIdea}</p>
            </div>
          </div>

          {/* Sales Angle / Opportunity Analysis */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
            <h4 className="font-bold text-sm flex items-center gap-1.5 text-rose-800">
              <ShieldCheck className="w-4 h-4 text-rose-600" />
              Client Vulnerability & Sales Leverage:
            </h4>
            <p className="text-xs text-rose-800 leading-relaxed">
              {lead.whyTheyNeedWebsite}
            </p>
          </div>

          {/* Extracted Services & Pricing */}
          <div>
            <h4 className="font-bold text-stone-900 text-sm mb-3">Extracted Services & Offerings</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lead.services.map((s, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-stone-200 bg-white shadow-xs">
                  <div className="flex items-center justify-between font-bold text-stone-900 mb-1">
                    <span>{s.title}</span>
                    {s.priceEstimate && (
                      <span className="text-xs px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-mono">
                        {s.priceEstimate}
                      </span>
                    )}
                  </div>
                  <p className="text-stone-500 text-xs leading-normal">{s.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews Spotlight */}
          <div>
            <h4 className="font-bold text-stone-900 text-sm mb-3">Extracted Customer Reviews on Maps</h4>
            <div className="space-y-2.5">
              {lead.reviews.map((r, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-stone-800">{r.author}</span>
                    <span className="text-amber-500 font-bold">★ {r.rating}</span>
                  </div>
                  <p className="italic text-stone-600">"{r.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-stone-50 border-t border-stone-200 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-3">
          <button
            id="btn-copy-dossier-modal"
            onClick={copyFullDossier}
            className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-xs font-bold text-stone-700 transition flex items-center gap-1.5 shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Copied Entire Business Dossier!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-stone-600" />
                <span>Copy Everything About Business</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              id="btn-modal-proposal"
              onClick={() => {
                onClose();
                onOpenProposal(lead);
              }}
              className="px-4 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition flex items-center gap-1.5"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>{formatPrice(lead.proposedPrice)} Proposal</span>
            </button>

            <button
              id="btn-modal-pitch"
              onClick={() => {
                onClose();
                onOpenPitch(lead);
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-white" />
              <span>Pitch on WhatsApp</span>
            </button>

            <button
              id="btn-modal-generate-site"
              onClick={() => {
                onClose();
                onGenerateWebsite(lead);
              }}
              className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Launch Live Website Studio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

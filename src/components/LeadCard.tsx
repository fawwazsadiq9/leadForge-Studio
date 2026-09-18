import React, { useState } from 'react';
import {
  Star,
  MapPin,
  Phone,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Building2,
  Calculator,
  QrCode,
  Inbox,
  Zap,
  Send,
} from 'lucide-react';
import { BusinessLead } from '../types';

interface LeadCardProps {
  lead: BusinessLead;
  currency: 'USD' | 'NGN';
  onSelectForWebsite: (lead: BusinessLead) => void;
  onOpenProposal: (lead: BusinessLead) => void;
  onOpenPitch: (lead: BusinessLead) => void;
  onOpenDeepDive: (lead: BusinessLead) => void;
  onUpdateStatus: (leadId: string, status: BusinessLead['status']) => void;
  onOpenRoiCalculator?: (lead: BusinessLead) => void;
  onOpenPitchPortal?: (lead: BusinessLead) => void;
  onOpenInbox?: (lead: BusinessLead) => void;
  onOpenQrCode?: (lead: BusinessLead) => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({
  lead,
  currency,
  onSelectForWebsite,
  onOpenProposal,
  onOpenPitch,
  onOpenDeepDive,
  onUpdateStatus,
  onOpenRoiCalculator,
  onOpenPitchPortal,
  onOpenInbox,
  onOpenQrCode,
}) => {
  const [copied, setCopied] = useState(false);

  const formatPrice = (usd: number) => {
    if (currency === 'NGN') {
      return `₦${(usd * 1500).toLocaleString()}`;
    }
    return `$${usd}`;
  };

  const copyBusinessDetails = () => {
    const text = `
=== BUSINESS AUDIT DOSSIER ===
Business: ${lead.name}
Category: ${lead.category}
Location: ${lead.address}, ${lead.city}, ${lead.country}
Google Rating: ${lead.rating} ★ (${lead.reviewCount} reviews)
Official Website: NONE FOUND (Opportunity)
Phone: ${lead.phone}
WhatsApp: ${lead.whatsapp}
Operating Hours: ${lead.hours}
Suggested Domain: ${lead.customDomainIdea}

Key Services:
${lead.services.map((s) => `- ${s.title}: ${s.description} (${s.priceEstimate || 'Custom'})`).join('\n')}

Top Customer Review:
"${lead.reviews[0]?.text || ''}" - ${lead.reviews[0]?.author || ''}

Pitch Angle:
${lead.whyTheyNeedWebsite}

Proposed Agency Price: ${formatPrice(lead.proposedPrice)}
===============================
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusColors: Record<BusinessLead['status'], { bg: string; text: string; label: string }> = {
    discovered: { bg: 'bg-stone-100 text-stone-700 border-stone-300', text: 'text-stone-700', label: '1. Discovered' },
    site_ready: { bg: 'bg-teal-50 text-teal-800 border-teal-300', text: 'text-teal-700', label: '2. Website Ready' },
    pitched: { bg: 'bg-amber-50 text-amber-800 border-amber-300', text: 'text-amber-700', label: '3. Pitched' },
    follow_up: { bg: 'bg-indigo-50 text-indigo-800 border-indigo-300', text: 'text-indigo-700', label: '4. Responded / Follow-up' },
    won: { bg: 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold', text: 'text-emerald-700', label: '5. Deal Won ($$$)' },
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden">
      {/* Top Banner with Image thumbnail & Status */}
      <div className="relative h-44 w-full overflow-hidden bg-stone-100">
        <img
          src={lead.photos[0]}
          alt={lead.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        {/* Opportunity Badge: No Website Found */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-600/90 backdrop-blur text-white text-[11px] font-bold shadow-sm">
          <ShieldAlert className="w-3 h-3 text-white" />
          <span>NO WEBSITE FOUND</span>
        </div>

        {/* Status Dropdown */}
        <div className="absolute top-3 right-3">
          <select
            id={`status-select-${lead.id}`}
            value={lead.status}
            onChange={(e) => onUpdateStatus(lead.id, e.target.value as BusinessLead['status'])}
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border shadow-xs focus:outline-none cursor-pointer ${
              statusColors[lead.status].bg
            }`}
          >
            <option value="discovered">1. Discovered</option>
            <option value="site_ready">2. Site Ready</option>
            <option value="pitched">3. Pitched</option>
            <option value="follow_up">4. Responded</option>
            <option value="won">5. Won ({formatPrice(lead.proposedPrice)})</option>
          </select>
        </div>

        {/* Rating and Reviews Badge on image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{lead.rating}</span>
              <span className="text-stone-300 text-xs font-normal">
                ({lead.reviewCount} reviews on Google Maps)
              </span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight leading-snug drop-shadow-sm">
              {lead.name}
            </h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-amber-300 block">Charge</span>
            <span className="text-sm font-extrabold text-white bg-black/40 px-2 py-0.5 rounded-md border border-white/20">
              {formatPrice(lead.proposedPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-semibold text-stone-800 px-2 py-0.5 rounded-md bg-stone-100 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-stone-600" />
              {lead.category}
            </span>
            <span className="font-mono text-stone-400">{lead.priceRange}</span>
          </div>

          <div className="space-y-1.5 text-xs text-stone-600">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{lead.address}, {lead.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <a href={`tel:${lead.phone}`} className="hover:text-stone-900 font-medium">
                {lead.phone}
              </a>
              <span className="text-stone-300">·</span>
              <a
                href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 hover:underline font-semibold flex items-center gap-1"
              >
                <span>WhatsApp</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* Customer Review Quote */}
          {lead.reviews[0] && (
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs">
              <p className="text-stone-700 italic line-clamp-2">
                "{lead.reviews[0].text}"
              </p>
              <p className="text-[11px] text-stone-400 font-semibold mt-1">
                — {lead.reviews[0].author} (Google Maps Review)
              </p>
            </div>
          )}

          {/* Why They Need A Website */}
          <div className="text-[11px] text-amber-900 bg-amber-50/80 border border-amber-200/70 p-2.5 rounded-xl">
            <span className="font-bold block text-amber-800 mb-0.5">Sales Opportunity:</span>
            {lead.whyTheyNeedWebsite}
          </div>
        </div>

        {/* Actions Grid */}
        <div className="space-y-2 pt-2 border-t border-stone-100">
          <div className="grid grid-cols-2 gap-2">
            <button
              id={`btn-copy-dossier-${lead.id}`}
              onClick={copyBusinessDetails}
              className="py-2 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-700 transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Copy Info</span>
                </>
              )}
            </button>

            <button
              id={`btn-deep-dive-${lead.id}`}
              onClick={() => onOpenDeepDive(lead)}
              className="py-2 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-700 transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Audit Details</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              id={`btn-proposal-${lead.id}`}
              onClick={() => onOpenProposal(lead)}
              className="py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition flex items-center justify-center gap-1"
            >
              <span>{formatPrice(lead.proposedPrice)} Quote</span>
            </button>

            <button
              id={`btn-pitch-${lead.id}`}
              onClick={() => onOpenPitch(lead)}
              className="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition flex items-center justify-center gap-1"
            >
              <MessageSquare className="w-3 h-3 text-emerald-700" />
              <span>Pitch Script</span>
            </button>
          </div>

          {/* Instant WhatsApp 1-Click Fast Pitch */}
          {lead.whatsapp && (
            <a
              id={`btn-fast-whatsapp-${lead.id}`}
              href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                `Hello ${lead.name}! 👋 I noticed your business has a great ${lead.rating}★ rating on Google Maps (${lead.reviewCount} reviews), but no official website for customers to view your services & book. I already built a complete mobile-friendly website demo for ${lead.name}. Would you like me to send you the private preview link? Flat ${formatPrice(lead.proposedPrice)} turn-key launch if you love it!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onUpdateStatus(lead.id, 'pitched')}
              className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5"
              title="Instant WhatsApp Pitch with pre-written message"
            >
              <Send className="w-3 h-3" />
              <span>Instant WhatsApp Pitch (Fast 1-Click)</span>
            </a>
          )}

          {/* 4 Pillars Quick Utility Bar */}
          <div className="grid grid-cols-4 gap-1.5 pt-1">
            {onOpenRoiCalculator && (
              <button
                id={`btn-card-roi-${lead.id}`}
                onClick={() => onOpenRoiCalculator(lead)}
                title="Calculate ROI & Lost Revenue"
                className="py-1.5 px-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200/80 text-amber-900 text-[10px] font-bold transition flex flex-col items-center justify-center gap-0.5"
              >
                <Calculator className="w-3 h-3 text-amber-600" />
                <span>ROI Engine</span>
              </button>
            )}

            {onOpenPitchPortal && (
              <button
                id={`btn-card-portal-${lead.id}`}
                onClick={() => onOpenPitchPortal(lead)}
                title="Open Client Approval & Deposit Portal"
                className="py-1.5 px-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-emerald-900 text-[10px] font-bold transition flex flex-col items-center justify-center gap-0.5"
              >
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>Pitch Portal</span>
              </button>
            )}

            {onOpenQrCode && (
              <button
                id={`btn-card-qr-${lead.id}`}
                onClick={() => onOpenQrCode(lead)}
                title="Generate Storefront Countertop QR Standee"
                className="py-1.5 px-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 text-indigo-900 text-[10px] font-bold transition flex flex-col items-center justify-center gap-0.5"
              >
                <QrCode className="w-3 h-3 text-indigo-600" />
                <span>QR Standee</span>
              </button>
            )}

            {onOpenInbox && (
              <button
                id={`btn-card-inbox-${lead.id}`}
                onClick={() => onOpenInbox(lead)}
                title="View Customer Booking Inquiries"
                className="py-1.5 px-1 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 text-[10px] font-bold transition flex flex-col items-center justify-center gap-0.5"
              >
                <Inbox className="w-3 h-3 text-stone-600" />
                <span>Inbox</span>
              </button>
            )}
          </div>

          {/* Main CTA: Generate Website */}
          <button
            id={`btn-build-site-${lead.id}`}
            onClick={() => onSelectForWebsite(lead)}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-stone-900 to-stone-800 hover:from-stone-800 hover:to-stone-700 text-white text-xs font-bold transition shadow-sm flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span>Generate Custom Website</span>
            <ArrowRight className="w-3 h-3 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

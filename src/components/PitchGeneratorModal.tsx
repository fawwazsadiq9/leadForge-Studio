import React, { useState } from 'react';
import { MessageSquare, Mail, Phone, Copy, Check, ExternalLink, Sparkles, Loader2, X } from 'lucide-react';
import { BusinessLead } from '../types';

interface PitchGeneratorModalProps {
  lead: BusinessLead;
  currency: 'USD' | 'NGN';
  onClose: () => void;
  onMarkPitched: (leadId: string) => void;
}

export const PitchGeneratorModal: React.FC<PitchGeneratorModalProps> = ({
  lead,
  currency,
  onClose,
  onMarkPitched,
}) => {
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'email' | 'call'>('whatsapp');
  const [copied, setCopied] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const formatPrice = (usd: number) => {
    if (currency === 'NGN') {
      return `₦${(usd * 1500).toLocaleString()}`;
    }
    return `$${usd}`;
  };

  const defaultPrice = formatPrice(lead.proposedPrice);

  // Template generators
  const [whatsappPitch, setWhatsappPitch] = useState(
    `Hello ${lead.name} team! 👋

I came across your business on Google Maps and was blown away by your ${lead.rating}★ rating and ${lead.reviewCount}+ positive reviews from local customers in ${lead.city}! 

Specifically, I saw this glowing feedback:
"${lead.reviews[0]?.text || 'Outstanding service'}"

However, I noticed that when customers search for "${lead.category}" in ${lead.city} on Google, you don't have an official website listed where they can view your full services or book an appointment directly. You're likely losing 20-30 high-paying customers each month to competing clinics/shops with websites.

To show you what's possible, I actually went ahead and created a complete, working website preview for ${lead.name} with your services, hours, customer reviews, and appointment booking form.

Would you like me to send you the private preview link to check it out? 

No upfront cost or obligation at all — if you love it and want to launch it under your own domain (${lead.customDomainIdea}), I can deploy it live for just a flat one-time fee of ${defaultPrice}.

Best regards,
LeadForge Digital Agency
Phone: ${lead.phone}`
  );

  const [emailSubject, setEmailSubject] = useState(
    `Website preview built for ${lead.name} (${lead.rating}★ Google Rating)`
  );

  const [emailBody, setEmailBody] = useState(
    `Hi ${lead.name} Management,

First, congratulations on maintaining such an exceptional ${lead.rating}★ reputation on Google Maps across ${lead.city}. Customers clearly trust your work:
"${lead.reviews[0]?.text || 'Exceptional experience'}"

I noticed, however, that your Google profile does not have an official website linked. In today's digital market, over 74% of high-income clients searching for ${lead.category} verify pricing and book appointments through a website before visiting.

Rather than just pitch you, my studio already designed a complete, responsive website demonstration for ${lead.name}:
- Mobile-first appointment & consultation booking system
- Service catalog with price estimates
- Verified Google Reviews showcase
- Direct WhatsApp instant inquiry routing

We offer turn-key launch packages for local leaders at just a flat ${defaultPrice} (including domain setup & mobile optimization).

Would you be open to a 3-minute look at the preview site this week? Let me know and I'll send over the link.

Sincerely,
Agency Lead Director
LeadForge Studio`
  );

  const [phoneScript, setPhoneScript] = useState(
    `"Hi, good morning! May I speak with the owner or practice manager regarding ${lead.name}?

Hi [Name], my name is [Your Name] from LeadForge Studio. The reason for my call is quick: I was reviewing Google Maps listings in ${lead.city} and saw your outstanding ${lead.rating}-star reviews with ${lead.reviewCount} happy clients.

I noticed you don't have a website listed on your Google profile, which means people searching for ${lead.category} on their phones can't easily book appointments with you.

I actually already built a complete prototype website for ${lead.name} as a showcase. It has your real reviews, service list, and online booking already configured. 

Can I send you a quick WhatsApp or SMS with the preview link so you can take a look? If you like it, we can launch it on your own custom domain for just a one-time ${defaultPrice}."

[COMMON OBJECTION: "We get enough customers through word of mouth."]
"That's exactly why you have a 4.8-star rating! But word-of-mouth clients often search for your exact address and phone number on Google. Having a sleek website makes it effortless for them to book and refer their colleagues."

[COMMON OBJECTION: "How much does it cost?"]
"It's a one-time investment of just ${defaultPrice}, with zero recurring agency retainers. Usually just one or two new clients pays for the entire website."`
  );

  // AI Refinement handler
  const handleAiRefine = async () => {
    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/generate-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business: lead,
          targetPrice: lead.proposedPrice,
          currency: currency,
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.whatsappPitch) setWhatsappPitch(data.whatsappPitch);
        if (data.coldEmailSubject) setEmailSubject(data.coldEmailSubject);
        if (data.coldEmailBody) setEmailBody(data.coldEmailBody);
        if (data.phoneScript) setPhoneScript(data.phoneScript);
      }
    } catch (e) {
      console.error('Error generating pitch via AI:', e);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSendWhatsapp = () => {
    const cleanPhone = lead.whatsapp.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(whatsappPitch);
    const url = `https://wa.me/${cleanPhone}?text=${encoded}`;
    window.open(url, '_blank');
    onMarkPitched(lead.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-8 shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HIGH-CONVERTING OUTREACH ENGINE ({defaultPrice} PITCH)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display">
              Pitch {lead.name}
            </h2>
            <p className="text-xs text-stone-400">
              Target Phone: {lead.phone} · WhatsApp: {lead.whatsapp} · {lead.city}
            </p>
          </div>
          <button
            id="btn-close-pitch"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Channel Switcher */}
        <div className="bg-stone-100 px-6 py-3 border-b border-stone-200 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              id="pitch-tab-whatsapp"
              onClick={() => setActiveChannel('whatsapp')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                activeChannel === 'whatsapp'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Message</span>
            </button>

            <button
              id="pitch-tab-email"
              onClick={() => setActiveChannel('email')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                activeChannel === 'email'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Cold Email</span>
            </button>

            <button
              id="pitch-tab-call"
              onClick={() => setActiveChannel('call')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                activeChannel === 'call'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Cold Call Script</span>
            </button>
          </div>

          <button
            id="btn-ai-refine-pitch"
            onClick={handleAiRefine}
            disabled={isGeneratingAi}
            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition flex items-center gap-1.5 shadow-xs disabled:opacity-50"
          >
            {isGeneratingAi ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Refine Pitch</span>
              </>
            )}
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs text-stone-700">
          {activeChannel === 'whatsapp' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-xs">WhatsApp Client Script:</span>
                <span className="text-[11px] text-stone-500">Includes reference to their 4.8★ reviews</span>
              </div>
              <textarea
                id="textarea-whatsapp-pitch"
                rows={10}
                value={whatsappPitch}
                onChange={(e) => setWhatsappPitch(e.target.value)}
                className="w-full p-4 rounded-xl border border-stone-300 font-sans text-xs leading-relaxed focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <div className="flex items-center justify-between pt-2">
                <button
                  id="btn-copy-whatsapp"
                  onClick={() => copyText(whatsappPitch, 'whatsapp')}
                  className="px-4 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-bold flex items-center gap-1.5"
                >
                  {copied === 'whatsapp' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'whatsapp' ? 'Copied to Clipboard!' : 'Copy Message'}</span>
                </button>

                <button
                  id="btn-launch-whatsapp-web"
                  onClick={handleSendWhatsapp}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp & Send Pitch</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {activeChannel === 'email' && (
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-stone-900 mb-1">Subject Line:</label>
                <input
                  id="input-email-subject"
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-stone-500 focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-900 mb-1">Email Body:</label>
                <textarea
                  id="textarea-email-body"
                  rows={10}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full p-4 rounded-xl border border-stone-300 font-sans text-xs leading-relaxed focus:ring-2 focus:ring-stone-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  id="btn-copy-email"
                  onClick={() => copyText(`Subject: ${emailSubject}\n\n${emailBody}`, 'email')}
                  className="px-4 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-bold flex items-center gap-1.5"
                >
                  {copied === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'email' ? 'Copied Email!' : 'Copy Subject & Body'}</span>
                </button>

                <a
                  href={`mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
                  onClick={() => onMarkPitched(lead.id)}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold flex items-center gap-2 shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open Email Client</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {activeChannel === 'call' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-xs">60-Second Phone Pitch & Objection Handles:</span>
                <span className="text-[11px] text-stone-500">Call: {lead.phone}</span>
              </div>
              <textarea
                id="textarea-phone-script"
                rows={11}
                value={phoneScript}
                onChange={(e) => setPhoneScript(e.target.value)}
                className="w-full p-4 rounded-xl border border-stone-300 font-sans text-xs leading-relaxed focus:ring-2 focus:ring-stone-500 focus:outline-none bg-stone-50/50"
              />
              <div className="flex items-center justify-between pt-2">
                <button
                  id="btn-copy-call"
                  onClick={() => copyText(phoneScript, 'call')}
                  className="px-4 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-bold flex items-center gap-1.5"
                >
                  {copied === 'call' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'call' ? 'Copied Call Script!' : 'Copy Script'}</span>
                </button>

                <a
                  href={`tel:${lead.phone}`}
                  onClick={() => onMarkPitched(lead.id)}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold flex items-center gap-2 shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {lead.phone}</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-50 border-t border-stone-200 p-4 flex items-center justify-between text-xs">
          <span className="text-stone-500">
            Current Status: <strong className="text-stone-800">{lead.status.toUpperCase()}</strong>
          </span>
          <button
            id="btn-mark-pitched"
            onClick={() => {
              onMarkPitched(lead.id);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition shadow-xs"
          >
            Mark as Pitched in 2-Hour Pipeline
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Sparkles, Check, ShieldCheck, CreditCard, ArrowRight, ExternalLink, X, Building2, Phone, CheckCircle2 } from 'lucide-react';
import { BusinessLead } from '../types';

interface ClientPitchPortalModalProps {
  lead: BusinessLead;
  currency: 'USD' | 'NGN';
  onClose: () => void;
  onLaunchSite: (lead: BusinessLead) => void;
}

export const ClientPitchPortalModal: React.FC<ClientPitchPortalModalProps> = ({
  lead,
  currency,
  onClose,
  onLaunchSite,
}) => {
  const [activeStep, setActiveStep] = useState<'review' | 'checkout' | 'confirmed'>('review');
  const [paymentOption, setPaymentOption] = useState<'deposit_50' | 'full_100'>('deposit_50');
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'card'>('transfer');
  const [signatureName, setSignatureName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatMoney = (usd: number) => {
    if (currency === 'NGN') {
      return `₦${(usd * 1500).toLocaleString()}`;
    }
    return `$${usd}`;
  };

  const totalPrice = lead.proposedPrice;
  const depositPrice = Math.round(totalPrice / 2);
  const amountToCharge = paymentOption === 'deposit_50' ? depositPrice : totalPrice;

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signatureName.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setActiveStep('confirmed');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-8 shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Pitch Portal Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white p-6 border-b border-stone-800">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                PREPARED EXCLUSIVELY FOR {lead.name.toUpperCase()}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display">
                Claim & Activate Your Official Business Website
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Target Custom Domain: <strong className="text-white">www.{lead.customDomainIdea}</strong> · {lead.city}, {lead.country}
              </p>
            </div>

            <button
              id="btn-close-pitch-portal"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-stone-700">
          {activeStep === 'review' && (
            <>
              {/* Before vs After Impact Analysis */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-3">
                  Why Customers in {lead.city} Are Excited For This Website:
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Before */}
                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                      CURRENT LIMITATION (Without Website)
                    </span>
                    <h4 className="font-bold text-stone-900 text-sm">Google Maps Profile Only</h4>
                    <ul className="space-y-1.5 text-stone-600 text-[11px]">
                      <li className="flex items-start gap-1.5">
                        <span className="text-rose-500 font-bold">✕</span>
                        <span>Patients/Clients cannot see your full services or price guide</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-rose-500 font-bold">✕</span>
                        <span>Zero after-hours bookings (calls ring out when you are closed)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-rose-500 font-bold">✕</span>
                        <span>Over 70% of searchers bounce to competitors who have websites</span>
                      </li>
                    </ul>
                  </div>

                  {/* After */}
                  <div className="p-5 rounded-2xl bg-emerald-50/70 border-2 border-emerald-500/60 space-y-2.5 shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">
                      YOUR NEW SYSTEM (With This Website)
                    </span>
                    <h4 className="font-bold text-emerald-950 text-sm">24/7 Automated Lead Machine</h4>
                    <ul className="space-y-1.5 text-emerald-900 text-[11px]">
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Interactive appointment booking form routing straight to WhatsApp</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Showcases your {lead.rating}★ Google rating & verified customer testimonials</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Custom domain (www.{lead.customDomainIdea}) with mobile speed optimization</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Scope & Guarantee */}
              <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Turnkey 48-Hour Launch Guarantee
                  </span>
                  <span className="font-extrabold text-stone-900 text-sm">
                    {formatMoney(totalPrice)} Flat Fee
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Everything is already custom designed for {lead.name}. Once you approve the 50% commencing deposit ({formatMoney(depositPrice)}), we link your official domain, connect your business WhatsApp, and submit your site to Google Maps within 48 hours.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  id="btn-inspect-demo-site"
                  onClick={() => {
                    onClose();
                    onLaunchSite(lead);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-bold transition flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Inspect Full Live Demo Website</span>
                </button>

                <button
                  id="btn-proceed-to-checkout"
                  onClick={() => setActiveStep('checkout')}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition flex items-center gap-1.5 shadow-md"
                >
                  <span>Approve & Activate Domain for {formatMoney(depositPrice)}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}

          {activeStep === 'checkout' && (
            <form onSubmit={handleSimulatePayment} className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-1">
                  Secure Project Activation & Deposit Checkout
                </h3>
                <p className="text-[11px] text-stone-500">
                  Select your deposit preference to start domain registration for {lead.name}.
                </p>
              </div>

              {/* Deposit vs Full Payment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setPaymentOption('deposit_50')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                    paymentOption === 'deposit_50'
                      ? 'border-emerald-600 bg-emerald-50/50'
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-stone-900">
                    <span>50% Commencing Deposit</span>
                    <span className="text-emerald-700 text-sm">{formatMoney(depositPrice)}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Balance of {formatMoney(depositPrice)} paid only after domain is live and approved.
                  </p>
                </div>

                <div
                  onClick={() => setPaymentOption('full_100')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                    paymentOption === 'full_100'
                      ? 'border-emerald-600 bg-emerald-50/50'
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-stone-900">
                    <span>100% Full Payment</span>
                    <span className="text-stone-900 text-sm">{formatMoney(totalPrice)}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Includes 1 year free domain registration + priority same-day 24h deployment.
                  </p>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="block font-bold text-stone-800 text-xs">Payment Method:</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 bg-stone-50 flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="payMethod"
                      checked={paymentMethod === 'transfer'}
                      onChange={() => setPaymentMethod('transfer')}
                      className="text-emerald-600"
                    />
                    <div>
                      <span className="font-bold text-xs text-stone-900 block">Bank Wire / Electronic Transfer</span>
                      <span className="text-[10px] text-stone-500">
                        {currency === 'NGN' ? 'Zenith / GTBank / Access Instant Transfer' : 'ACH / Wire Transfer (Chase / Barclays)'}
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 bg-stone-50 flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="payMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-emerald-600"
                    />
                    <div>
                      <span className="font-bold text-xs text-stone-900 block">Credit / Debit Card</span>
                      <span className="text-[10px] text-stone-500">Instant Online Processing</span>
                    </div>
                  </label>
                </div>
              </div>

              {paymentMethod === 'transfer' && (
                <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 font-mono text-[11px] text-stone-800 space-y-1">
                  <p className="font-bold text-stone-900 font-sans">Agency Escrow Account Details:</p>
                  <p>Bank: {currency === 'NGN' ? 'Guaranty Trust Bank (GTBank)' : 'JPMorgan Chase Digital Agency Escrow'}</p>
                  <p>Account Name: LeadForge Global Web Services</p>
                  <p>Account Number: {currency === 'NGN' ? '0482910481' : '9827401928'}</p>
                  <p>Reference: {lead.name.replace(/[^a-zA-Z]/g, '').slice(0, 8).toUpperCase()}-WEB</p>
                </div>
              )}

              {/* Authorized Signature */}
              <div>
                <label className="block font-bold text-stone-800 text-xs mb-1">
                  Authorized Signer Full Name (Business Owner / Manager) *
                </label>
                <input
                  id="input-signer-name"
                  type="text"
                  required
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  placeholder="e.g. Dr. Anthony Adeleke"
                  className="w-full px-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
                />
                <p className="text-[10px] text-stone-400 mt-1">
                  By typing your name, you confirm authorization to bind www.{lead.customDomainIdea} for {lead.name}.
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setActiveStep('review')}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs"
                >
                  Back to Review
                </button>

                <button
                  id="btn-confirm-deposit"
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isProcessing ? (
                    <span>Securing Deposit & Domain...</span>
                  ) : (
                    <span>Sign Agreement & Authorize {formatMoney(amountToCharge)}</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {activeStep === 'confirmed' && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-stone-900 font-display">
                  Deposit Confirmed & Project Launched!
                </h3>
                <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
                  Receipt generated for {lead.name}. Our development team is currently linking <strong>www.{lead.customDomainIdea}</strong> to Google Search.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 max-w-sm mx-auto text-left text-[11px] text-stone-700 space-y-1">
                <p><strong>Signed By:</strong> {signatureName}</p>
                <p><strong>Amount Paid:</strong> {formatMoney(amountToCharge)}</p>
                <p><strong>Status:</strong> DOMAIN BINDING IN PROGRESS (48h Turnaround)</p>
                <p><strong>Receipt #:</strong> LF-{Math.floor(100000 + Math.random() * 900000)}</p>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  id="btn-finish-launch-site"
                  onClick={() => {
                    onClose();
                    onLaunchSite(lead);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition shadow-xs"
                >
                  Open Live Website Studio
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

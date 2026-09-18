import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Copy, Check, X, ArrowRight } from 'lucide-react';
import { BusinessLead } from '../types';

interface RoiCalculatorModalProps {
  lead: BusinessLead;
  currency: 'USD' | 'NGN';
  onClose: () => void;
  onOpenPitch: (lead: BusinessLead) => void;
}

export const RoiCalculatorModal: React.FC<RoiCalculatorModalProps> = ({
  lead,
  currency,
  onClose,
  onOpenPitch,
}) => {
  // Estimated metrics based on niche
  const defaultAvgCustomerValue = currency === 'NGN' ? 45000 : 120;
  const [avgCustomerValue, setAvgCustomerValue] = useState<number>(defaultAvgCustomerValue);
  const [monthlyGoogleSearches, setMonthlyGoogleSearches] = useState<number>(1800);
  const [copied, setCopied] = useState(false);

  // Conversion modeling:
  // 1800 searches * 3% click through = 54 visitors
  // With no website: 0 captured online
  // With high-converting website: 15% conversion = ~8 new customers per month
  const estimatedNewCustomersPerMonth = Math.max(2, Math.round((monthlyGoogleSearches * 0.03) * 0.15));
  const estimatedMonthlyRevenueGain = estimatedNewCustomersPerMonth * avgCustomerValue;
  const estimatedAnnualRevenueGain = estimatedMonthlyRevenueGain * 12;

  const websiteCost = currency === 'NGN' ? lead.proposedPrice * 1500 : lead.proposedPrice;
  const customersToBreakEven = Math.max(1, Math.ceil(websiteCost / Math.max(1, avgCustomerValue)));

  const formatMoney = (amount: number) => {
    if (currency === 'NGN') {
      return `₦${amount.toLocaleString()}`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const copyRoiReport = () => {
    const text = `
=== BUSINESS ROI & REVENUE PROJECTION ===
Business: ${lead.name} (${lead.city})
Category: ${lead.category}

MARKET OPPORTUNITY ANALYSIS:
- Estimated Local Google Searches / Month in ${lead.city}: ${monthlyGoogleSearches.toLocaleString()}
- Average Value per Customer: ${formatMoney(avgCustomerValue)}
- Estimated Lost Inquiries Without Website: ~${estimatedNewCustomersPerMonth} bookings/month

FINANCIAL IMPACT OF A ${formatMoney(websiteCost)} WEBSITE:
- Conservative New Monthly Revenue: ${formatMoney(estimatedMonthlyRevenueGain)}/month
- Projected Annual Revenue Growth: ${formatMoney(estimatedAnnualRevenueGain)}/year
- BREAK-EVEN THRESHOLD: Just ${customersToBreakEven} new customer(s) completely pays for this website!
- Return on Investment (First Year): ${Math.round((estimatedAnnualRevenueGain / websiteCost) * 100)}% ROI

CONCLUSION:
Not having a website currently costs ${lead.name} approximately ${formatMoney(estimatedMonthlyRevenueGain)} in lost business every month. A one-time ${formatMoney(websiteCost)} investment pays for itself in less than 3 weeks.
=========================================
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-8 shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
              <Calculator className="w-3.5 h-3.5" />
              <span>IRREFUTABLE VALUE CALCULATOR & CLIENT SALES LEVERAGE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display">
              ROI & Lost Revenue Analysis for {lead.name}
            </h2>
            <p className="text-xs text-stone-400">
              Shows the owner why paying {formatMoney(websiteCost)} is a no-brainer investment
            </p>
          </div>
          <button
            id="btn-close-roi-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-stone-700">
          {/* Interactive Sliders */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5 font-bold text-stone-900">
                <span>Average Value of 1 Customer / Order:</span>
                <span className="text-sm text-emerald-700 font-extrabold">{formatMoney(avgCustomerValue)}</span>
              </div>
              <input
                id="slider-avg-customer-value"
                type="range"
                min={currency === 'NGN' ? 5000 : 20}
                max={currency === 'NGN' ? 300000 : 800}
                step={currency === 'NGN' ? 5000 : 10}
                value={avgCustomerValue}
                onChange={(e) => setAvgCustomerValue(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <p className="text-[11px] text-stone-400 mt-1">
                Typical for {lead.category} (e.g. dental visit, vehicle service, custom cake, repair).
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5 font-bold text-stone-900">
                <span>Estimated Local Monthly Searches in {lead.city}:</span>
                <span className="text-sm text-amber-600 font-extrabold">{monthlyGoogleSearches.toLocaleString()} searches</span>
              </div>
              <input
                id="slider-monthly-searches"
                type="range"
                min={500}
                max={6000}
                step={100}
                value={monthlyGoogleSearches}
                onChange={(e) => setMonthlyGoogleSearches(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <p className="text-[11px] text-stone-400 mt-1">
                People actively typing "{lead.category} near me" or "{lead.category} {lead.city}" into Google.
              </p>
            </div>
          </div>

          {/* Big Key Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center">
              <span className="text-[11px] font-bold uppercase text-rose-700 block">Current Lost Revenue</span>
              <p className="text-xl font-black text-rose-900 mt-1">
                {formatMoney(estimatedMonthlyRevenueGain)}
                <span className="text-[11px] font-normal text-rose-600 block">per month</span>
              </p>
              <p className="text-[10px] text-rose-700 mt-1">Going straight to competitors with websites</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-[11px] font-bold uppercase text-emerald-700 block">Annual Projected Gain</span>
              <p className="text-xl font-black text-emerald-900 mt-1">
                {formatMoney(estimatedAnnualRevenueGain)}
                <span className="text-[11px] font-normal text-emerald-600 block">per year</span>
              </p>
              <p className="text-[10px] text-emerald-700 mt-1">With 24/7 online booking enabled</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-400 text-center">
              <span className="text-[11px] font-bold uppercase text-amber-800 block">Break-Even Point</span>
              <p className="text-2xl font-black text-amber-900 mt-1">
                {customersToBreakEven} Client{customersToBreakEven > 1 ? 's' : ''}
              </p>
              <p className="text-[10px] text-amber-800 font-semibold mt-1">
                Website pays for itself on day 1!
              </p>
            </div>
          </div>

          {/* Psychological Leverage Box */}
          <div className="p-4 rounded-2xl bg-stone-900 text-stone-200 space-y-2">
            <h4 className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              The Closer Script for the Business Owner:
            </h4>
            <p className="text-xs text-stone-300 italic leading-relaxed">
              "Mr. {lead.name.split(' ')[0]}, you charge an average of {formatMoney(avgCustomerValue)}. To break even on our entire {formatMoney(websiteCost)} one-time fee, you only need <strong className="text-white underline">{customersToBreakEven} single customer</strong> from Google this month. Every customer after that for the next 5 years is 100% pure profit for your business."
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-50 border-t border-stone-200 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-3">
          <button
            id="btn-copy-roi-report"
            onClick={copyRoiReport}
            className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied Financial Breakdown!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-600" />
                <span>Copy ROI Pitch for Client</span>
              </>
            )}
          </button>

          <button
            id="btn-pitch-from-roi"
            onClick={() => {
              onClose();
              onOpenPitch(lead);
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <span>Send Pitch With ROI Numbers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Sparkles,
  Filter,
  Loader2,
  PlusCircle,
  CheckCircle2,
  Calculator,
  QrCode,
  Inbox,
  ArrowRight,
  Sliders,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { BusinessLead } from '../types';
import { LeadCard } from './LeadCard';

interface LeadExplorerProps {
  leads: BusinessLead[];
  currency: 'USD' | 'NGN';
  onSelectForWebsite: (lead: BusinessLead) => void;
  onOpenProposal: (lead: BusinessLead) => void;
  onOpenPitch: (lead: BusinessLead) => void;
  onOpenDeepDive: (lead: BusinessLead) => void;
  onUpdateStatus: (leadId: string, status: BusinessLead['status']) => void;
  onAddCustomLead: (newLead: BusinessLead) => void;
  onAppendLeads: (newLeads: BusinessLead[]) => void;
  onOpenRoiCalculator?: (lead: BusinessLead) => void;
  onOpenPitchPortal?: (lead: BusinessLead) => void;
  onOpenInbox?: (lead: BusinessLead) => void;
  onOpenQrCode?: (lead: BusinessLead) => void;
}

export const LeadExplorer: React.FC<LeadExplorerProps> = ({
  leads,
  currency,
  onSelectForWebsite,
  onOpenProposal,
  onOpenPitch,
  onOpenDeepDive,
  onUpdateStatus,
  onAddCustomLead,
  onAppendLeads,
  onOpenRoiCalculator,
  onOpenPitchPortal,
  onOpenInbox,
  onOpenQrCode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [minRatingFilter, setMinRatingFilter] = useState(0);
  const [showSixPillars, setShowSixPillars] = useState(true);

  // Live AI Search state
  const [liveQuery, setLiveQuery] = useState('');
  const [liveLocation, setLiveLocation] = useState('Lagos, Nigeria');
  const [isSearchingLive, setIsSearchingLive] = useState(false);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [liveSuccessMessage, setLiveSuccessMessage] = useState<string | null>(null);

  // Manual Add Lead Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadCategory, setNewLeadCategory] = useState('');
  const [newLeadLocation, setNewLeadLocation] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadRating, setNewLeadRating] = useState('4.8');
  const [newLeadReviews, setNewLeadReviews] = useState('45');

  const locationPresets = [
    { label: 'All Regions', value: 'All' },
    { label: '🇳🇬 Lagos (Nigeria)', value: 'Lagos' },
    { label: '🇳🇬 Abuja (Nigeria)', value: 'Abuja' },
    { label: '🇳🇬 Port Harcourt', value: 'Port Harcourt' },
    { label: '🇳🇬 Ibadan', value: 'Ibadan' },
    { label: '🇬🇧 London (UK)', value: 'London' },
    { label: '🇺🇸 Houston (USA)', value: 'Houston' },
    { label: '🇦🇪 Dubai (UAE)', value: 'Dubai' },
  ];

  const categories = [
    'All',
    'Dental & Oral Healthcare',
    'European & Luxury Auto Repair',
    'Artisan Bakery & Specialty Cafe',
    'Aesthetic Dermatology & Day Spa',
    'Architectural Welding & Ironwork',
    'Luxury Timepiece Restoration & Repair',
    'Veterinary Clinic & Farm Supply',
    'Custom Furniture & Interior Joinery'
  ];

  const handleLiveSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchingLive(true);
    setLiveError(null);
    setLiveSuccessMessage(null);

    try {
      const res = await fetch('/api/search-businesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: liveQuery || 'high rated businesses without website',
          location: liveLocation || 'Lagos, Nigeria',
        }),
      });

      const data = await res.json();
      if (data.success && data.businesses && data.businesses.length > 0) {
        onAppendLeads(data.businesses);
        setLiveSuccessMessage(`Found ${data.businesses.length} high-rated businesses in ${liveLocation} without websites! Added to your lead dashboard.`);
        setLiveQuery('');
      } else {
        setLiveError(data.error || 'No matching businesses found. Try another city or category.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Search failed. Please try again.';
      setLiveError(msg);
    } finally {
      setIsSearchingLive(false);
    }
  };

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim()) return;

    const lead: BusinessLead = {
      id: `manual-${Date.now()}`,
      name: newLeadName,
      category: newLeadCategory || 'General Local Business',
      tagline: `Premium ${newLeadCategory || 'Services'} in ${newLeadLocation || 'Local Area'}`,
      city: newLeadLocation || 'Lagos, Nigeria',
      country: newLeadLocation.includes('Nigeria') ? 'Nigeria' : 'International',
      address: `High Street, ${newLeadLocation || 'Lagos'}`,
      rating: parseFloat(newLeadRating) || 4.8,
      reviewCount: parseInt(newLeadReviews) || 50,
      hasWebsite: false,
      websiteStatus: 'no_website',
      phone: newLeadPhone || '+234 800 000 0000',
      whatsapp: newLeadPhone.replace(/[^0-9]/g, '') || '2348000000000',
      hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
      priceRange: '$$',
      services: [
        { title: 'Core Consultation & Service', description: 'Comprehensive client consultation and expert execution.', priceEstimate: 'Custom quote' },
        { title: 'Standard Package', description: 'Our most requested service tier with guaranteed customer satisfaction.', priceEstimate: 'From $100' },
        { title: 'Premium Care', description: 'Turnkey priority service with dedicated support.', priceEstimate: 'From $250' }
      ],
      highlights: [
        'Top rated service provider in this locality',
        'Consistently high 5-star customer feedback',
        'Honest pricing with transparent estimates',
        'Family-owned and locally trusted'
      ],
      reviews: [
        {
          author: 'Recent Customer',
          rating: 5,
          text: 'Superb service, highly professional and timely. It was tough to find them without a website, but totally worth it!',
          relativeTime: '1 week ago'
        }
      ],
      photos: [
        'https://images.unsplash.com/photo-1556742049-0a67e55722c3?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80'
      ],
      themeColor: 'teal',
      fontStyle: 'modern',
      status: 'discovered',
      proposedPrice: 400,
      currency: currency,
      customDomainIdea: `${newLeadName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      aboutStory: `${newLeadName} has been serving valued clients in ${newLeadLocation} with distinction and unmatched quality.`,
      whyTheyNeedWebsite: 'Losing high-value inbound customers searching online who book competitors with instant websites.',
    };

    onAddCustomLead(lead);
    setShowAddModal(false);
    setNewLeadName('');
    setNewLeadCategory('');
    setNewLeadLocation('');
    setNewLeadPhone('');
  };

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      searchQuery === '' ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.services.some((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLocation =
      locationFilter === 'All' ||
      lead.city.toLowerCase().includes(locationFilter.toLowerCase()) ||
      lead.country.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesCategory =
      categoryFilter === 'All' || lead.category === categoryFilter;

    const matchesRating = lead.rating >= minRatingFilter;

    return matchesSearch && matchesLocation && matchesCategory && matchesRating;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner with live map discovery instructions */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            HIGH-CONVERTING CLIENT ACQUISITION
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
            Discover 4.5★+ Businesses on Maps with <span className="text-amber-400 underline decoration-amber-500/40">NO Website</span>
          </h2>
          <p className="text-sm text-stone-300 leading-relaxed">
            These businesses have established local reputations, high reviews, and loyal customers, but are completely invisible to searchers looking for websites. Generate instant working website demos, send 1-click WhatsApp pitches, and close turn-key deals as fast as possible.
          </p>
        </div>

        {/* Live Search Form via AI & Maps */}
        <form onSubmit={handleLiveSearch} className="mt-6 pt-6 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              id="input-live-query"
              type="text"
              value={liveQuery}
              onChange={(e) => setLiveQuery(e.target.value)}
              placeholder="Niche (e.g. Dentists, Auto repair, Bakeries, Plumbers)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-800/90 border border-stone-700 text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="sm:col-span-4 relative">
            <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              id="input-live-location"
              type="text"
              value={liveLocation}
              onChange={(e) => setLiveLocation(e.target.value)}
              placeholder="City or Area (e.g. Ikeja, Lagos or Houston, TX)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-800/90 border border-stone-700 text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="sm:col-span-3">
            <button
              id="btn-trigger-live-search"
              type="submit"
              disabled={isSearchingLive}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSearchingLive ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                  <span>Scanning Maps...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>Scan Live Maps</span>
                </>
              )}
            </button>
          </div>
        </form>

        {liveSuccessMessage && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{liveSuccessMessage}</span>
          </div>
        )}

        {liveError && (
          <div className="mt-3 p-3 rounded-xl bg-rose-950/80 border border-rose-700 text-rose-200 text-xs">
            {liveError}
          </div>
        )}
      </div>

      {/* Filter and Location Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search bar inside lead catalog */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              id="input-lead-catalog-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter leads by name, service, or keyword..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-stone-200 text-xs text-stone-800 placeholder-stone-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Action to manual add a local business lead */}
          <div className="flex items-center gap-3">
            <select
              id="select-min-rating"
              value={minRatingFilter}
              onChange={(e) => setMinRatingFilter(parseFloat(e.target.value))}
              className="text-xs px-3 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 font-semibold focus:outline-none shadow-xs"
            >
              <option value={0}>All Ratings</option>
              <option value={4.5}>4.5★ and Above</option>
              <option value={4.8}>4.8★ and Above (Top Tier)</option>
            </select>

            <button
              id="btn-add-custom-lead"
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Add Custom Business</span>
            </button>
          </div>
        </div>

        {/* Location Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-stone-500 whitespace-nowrap flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            Location:
          </span>
          {locationPresets.map((loc) => (
            <button
              key={loc.value}
              onClick={() => setLocationFilter(loc.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                locationFilter === loc.value
                  ? 'bg-stone-900 text-white font-bold shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {loc.label}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-stone-500 whitespace-nowrap flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Niche:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition ${
                categoryFilter === cat
                  ? 'bg-amber-600 text-white font-bold'
                  : 'bg-white border border-stone-200 hover:bg-stone-50 text-stone-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* THE 6 PILLARS OF THE $500 IRREFUTABLE OFFER */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
        <button
          onClick={() => setShowSixPillars(!showSixPillars)}
          className="w-full px-6 py-4 bg-stone-50/80 hover:bg-stone-100/80 border-b border-stone-200/80 flex items-center justify-between text-left transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 font-black flex items-center justify-center text-sm shadow-xs">
              ★
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 font-display flex items-center gap-2">
                <span>The 6 Pillars That Make This An Irrefutable $300–$500 Purchase</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Ready to Deploy
                </span>
              </h3>
              <p className="text-xs text-stone-500">
                Business owners don't buy code — they buy customer volume. Here is why this offer closes in under 2 hours.
              </p>
            </div>
          </div>
          <div className="text-stone-400 p-1">
            {showSixPillars ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {showSixPillars && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gradient-to-b from-white to-stone-50/40">
            {/* Pillar 1 */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-3 hover:border-amber-400 transition">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    Pillar 1 · The Math of Buying
                  </span>
                  <Calculator className="w-4 h-4 text-amber-600" />
                </div>
                <h4 className="font-bold text-sm text-stone-900 font-display">
                  Interactive ROI & Lost Revenue Engine
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Calculates local search volume in their city vs average ticket value (e.g. ₦45k or $120). Demonstrates they lose ~₦1,225,000/mo ($2,800) and that <strong>just 1 to 2 bookings</strong> completely pays for the website.
                </p>
              </div>
              {onOpenRoiCalculator && leads[0] && (
                <button
                  onClick={() => onOpenRoiCalculator(leads[0])}
                  className="w-full py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Launch ROI Calculator Demo</span>
                </button>
              )}
            </div>

            {/* Pillar 2 */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-3 hover:border-emerald-400 transition">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Pillar 2 · Client Presentation
                  </span>
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                </div>
                <h4 className="font-bold text-sm text-stone-900 font-display">
                  Dedicated Client Pitch & Approval Portal
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Branded exclusively for them (<em>"Prepared Exclusively for [Business Name]"</em>). Shows Before vs. After contrast and an instant 50% deposit checkout with digital agreement & receipt.
                </p>
              </div>
              {onOpenPitchPortal && leads[0] && (
                <button
                  onClick={() => onOpenPitchPortal(leads[0])}
                  className="w-full py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Preview Client Pitch Portal</span>
                </button>
              )}
            </div>

            {/* Pillar 3 */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-3 hover:border-teal-400 transition">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                    Pillar 3 · Hands-On Control
                  </span>
                  <Sliders className="w-4 h-4 text-teal-600" />
                </div>
                <h4 className="font-bold text-sm text-stone-900 font-display">
                  Real-Time Website Customizer & Editor
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Tweak punchy headlines, phone numbers, WhatsApp links, and announcement banners live. Add or edit custom services with instant desktop, tablet, and mobile responsiveness.
                </p>
              </div>
              {leads[0] && (
                <button
                  onClick={() => onSelectForWebsite(leads[0])}
                  className="w-full py-1.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>Open Website Editor</span>
                </button>
              )}
            </div>

            {/* Pillar 4 */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-3 hover:border-rose-400 transition">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                    Pillar 4 · Immediate Proof
                  </span>
                  <Inbox className="w-4 h-4 text-rose-600" />
                </div>
                <h4 className="font-bold text-sm text-stone-900 font-display">
                  Live Customer Inquiries & Lead Inbox
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  The appointment booking form on the generated website is wired directly into a live Inquiries Inbox. Logs customer name, phone, service, date, and provides 1-click WhatsApp replies.
                </p>
              </div>
              {onOpenInbox && leads[0] && (
                <button
                  onClick={() => onOpenInbox(leads[0])}
                  className="w-full py-1.5 px-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Inbox className="w-3.5 h-3.5 text-rose-600" />
                  <span>Inspect Live Bookings Inbox</span>
                </button>
              )}
            </div>

            {/* Pillar 5 */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-3 hover:border-indigo-400 transition">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                    Pillar 5 · Physical Tangibility
                  </span>
                  <QrCode className="w-4 h-4 text-indigo-600" />
                </div>
                <h4 className="font-bold text-sm text-stone-900 font-display">
                  Printable Storefront / Countertop QR Standee
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Generates a printable 5" × 7" countertop standee / window sticker complete with business branding, Google rating, and a smartphone QR code to scan and book online immediately.
                </p>
              </div>
              {onOpenQrCode && leads[0] && (
                <button
                  onClick={() => onOpenQrCode(leads[0])}
                  className="w-full py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <QrCode className="w-3.5 h-3.5 text-amber-300" />
                  <span>Generate QR Standee</span>
                </button>
              )}
            </div>

            {/* Pillar 6 */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-3 hover:border-emerald-400 transition">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Pillar 6 · Rapid Close
                  </span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <h4 className="font-bold text-sm text-stone-900 font-display">
                  2-Hour Sprint Engine & Outreach Hub
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Multi-channel outreach with ready-to-send WhatsApp, cold email, and phone scripts with built-in objection handles. Track progress on the 5-stage Sprint Pipeline toward $2,000.
                </p>
              </div>
              {leads[0] && (
                <button
                  onClick={() => onOpenPitch(leads[0])}
                  className="w-full py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  <span>Launch WhatsApp Outreach Hub</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Leads Counter Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div>
          <h3 className="text-base font-bold text-stone-900 tracking-tight">
            High-Potential Map Leads ({filteredLeads.length})
          </h3>
          <p className="text-xs text-stone-500">
            Click "Generate Custom Website" to instantly preview the client's site, then send our $300-$500 pitch.
          </p>
        </div>
        <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Average Price: $400 / Lead
        </span>
      </div>

      {/* Grid of Leads */}
      {filteredLeads.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              currency={currency}
              onSelectForWebsite={onSelectForWebsite}
              onOpenProposal={onOpenProposal}
              onOpenPitch={onOpenPitch}
              onOpenDeepDive={onOpenDeepDive}
              onUpdateStatus={onUpdateStatus}
              onOpenRoiCalculator={onOpenRoiCalculator}
              onOpenPitchPortal={onOpenPitchPortal}
              onOpenInbox={onOpenInbox}
              onOpenQrCode={onOpenQrCode}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
          <p className="text-stone-500 text-sm">No businesses match your current filters.</p>
          <button
            onClick={() => {
              setLocationFilter('All');
              setCategoryFilter('All');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Manual Add Business Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-stone-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-stone-900">Add Business Found on Google Maps</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleManualAdd} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Business Name *</label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. Victoria Island Specialty Dental"
                  className="w-full px-3 py-2 rounded-lg border text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Category / Niche *</label>
                  <input
                    type="text"
                    required
                    value={newLeadCategory}
                    onChange={(e) => setNewLeadCategory(e.target.value)}
                    placeholder="e.g. Dental Clinic, Auto Repair"
                    className="w-full px-3 py-2 rounded-lg border text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">City & Area *</label>
                  <input
                    type="text"
                    required
                    value={newLeadLocation}
                    onChange={(e) => setNewLeadLocation(e.target.value)}
                    placeholder="e.g. Victoria Island, Lagos"
                    className="w-full px-3 py-2 rounded-lg border text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    placeholder="+234 803 123 4567"
                    className="w-full px-3 py-2 rounded-lg border text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={newLeadRating}
                    onChange={(e) => setNewLeadRating(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Review Count</label>
                  <input
                    type="number"
                    value={newLeadReviews}
                    onChange={(e) => setNewLeadReviews(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border text-stone-600 hover:bg-stone-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-stone-900 text-white font-bold hover:bg-stone-800 shadow-sm"
                >
                  Add Lead to Agency
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

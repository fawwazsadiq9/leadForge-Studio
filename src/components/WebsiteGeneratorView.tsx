import React, { useState } from 'react';
import {
  Monitor,
  Smartphone,
  Tablet,
  Download,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Palette,
  MessageSquare,
  Phone,
  Sliders,
  Calculator,
  QrCode,
  Inbox,
  Plus,
  Trash2,
  CheckCircle,
  Zap,
  Send,
} from 'lucide-react';
import { BusinessLead, ClientInquiry } from '../types';
import { generateStandaloneHtml } from '../utils/htmlExporter';

interface WebsiteGeneratorViewProps {
  lead: BusinessLead;
  allLeads: BusinessLead[];
  currency: 'USD' | 'NGN';
  inquiryCount: number;
  onSelectLead: (lead: BusinessLead) => void;
  onOpenProposal: (lead: BusinessLead) => void;
  onOpenPitch: (lead: BusinessLead) => void;
  onOpenPitchPortal: (lead: BusinessLead) => void;
  onOpenRoiCalculator: (lead: BusinessLead) => void;
  onOpenInbox: (lead: BusinessLead) => void;
  onOpenQrCode: (lead: BusinessLead) => void;
  onAddInquiry: (inquiry: ClientInquiry) => void;
}

export const WebsiteGeneratorView: React.FC<WebsiteGeneratorViewProps> = ({
  lead,
  allLeads,
  currency,
  inquiryCount,
  onSelectLead,
  onOpenProposal,
  onOpenPitch,
  onOpenPitchPortal,
  onOpenRoiCalculator,
  onOpenInbox,
  onOpenQrCode,
  onAddInquiry,
}) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTheme, setActiveTheme] = useState<string>(lead.themeColor || 'teal');
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);

  // Live editable overrides
  const [customTagline, setCustomTagline] = useState(lead.tagline);
  const [customPhone, setCustomPhone] = useState(lead.phone);
  const [customWhatsapp, setCustomWhatsapp] = useState(lead.whatsapp);
  const [customAnnouncement, setCustomAnnouncement] = useState(
    `★ ${lead.rating} Rating on Google Maps (${lead.reviewCount} Verified Reviews) · Open Today`
  );
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [showReviewsSection, setShowReviewsSection] = useState(true);
  const [showBookingSection, setShowBookingSection] = useState(true);

  // Booking Form State inside simulated site
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formService, setFormService] = useState(lead.services[0]?.title || 'General Service');
  const [formDate, setFormDate] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Add Service Form
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [activeServices, setActiveServices] = useState(lead.services);

  const formatPrice = (usd: number) => {
    if (currency === 'NGN') {
      return `₦${(usd * 1500).toLocaleString()}`;
    }
    return `$${usd}`;
  };

  const themeColors: Record<string, { primary: string; hover: string; light: string; text: string; bgClass: string }> = {
    teal: { primary: '#0d9488', hover: '#0f766e', light: '#f0fdfa', text: '#115e59', bgClass: 'bg-teal-600' },
    emerald: { primary: '#059669', hover: '#047857', light: '#ecfdf5', text: '#065f46', bgClass: 'bg-emerald-600' },
    amber: { primary: '#d97706', hover: '#b45309', light: '#fffbeb', text: '#92400e', bgClass: 'bg-amber-600' },
    rose: { primary: '#e11d48', hover: '#be123c', light: '#fff1f2', text: '#9f1239', bgClass: 'bg-rose-600' },
    indigo: { primary: '#4f46e5', hover: '#4338ca', light: '#eef2ff', text: '#3730a3', bgClass: 'bg-indigo-600' },
    slate: { primary: '#334155', hover: '#1e293b', light: '#f8fafc', text: '#0f172a', bgClass: 'bg-slate-800' },
  };

  const currentTheme = themeColors[activeTheme] || themeColors.teal;

  const handleDownloadHtml = () => {
    const updatedLead: BusinessLead = {
      ...lead,
      tagline: customTagline,
      phone: customPhone,
      whatsapp: customWhatsapp,
      services: activeServices,
    };
    const html = generateStandaloneHtml(updatedLead, activeTheme);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lead.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-website.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    const updatedLead: BusinessLead = {
      ...lead,
      tagline: customTagline,
      phone: customPhone,
      whatsapp: customWhatsapp,
      services: activeServices,
    };
    const html = generateStandaloneHtml(updatedLead, activeTheme);
    navigator.clipboard.writeText(html);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    // Create a real inquiry inside the CRM inbox
    const newInq: ClientInquiry = {
      id: `inq-${Date.now()}`,
      leadId: lead.id,
      businessName: lead.name,
      clientName: formName,
      phone: formPhone,
      serviceRequested: formService,
      preferredDate: formDate || 'Earliest Available',
      notes: formNotes,
      createdAt: 'Just now',
      status: 'new',
    };

    onAddInquiry(newInq);
    setBookingConfirmed(true);
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitle.trim()) return;
    setActiveServices([
      ...activeServices,
      {
        title: newServiceTitle,
        description: newServiceDesc || 'Professional standard service with satisfaction guarantee.',
        priceEstimate: newServicePrice || undefined,
      },
    ]);
    setNewServiceTitle('');
    setNewServiceDesc('');
    setNewServicePrice('');
  };

  const handleRemoveService = (index: number) => {
    setActiveServices(activeServices.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 pb-16">
      {/* High-Value Power Toolbar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Client Selector & Switcher */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-stone-500 whitespace-nowrap">Active Client:</label>
          <select
            id="select-active-client"
            value={lead.id}
            onChange={(e) => {
              const selected = allLeads.find((l) => l.id === e.target.value);
              if (selected) {
                onSelectLead(selected);
                setCustomTagline(selected.tagline);
                setCustomPhone(selected.phone);
                setCustomWhatsapp(selected.whatsapp);
                setActiveServices(selected.services);
              }
            }}
            className="text-xs font-bold text-stone-900 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
          >
            {allLeads.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name} ({l.city}) · ★ {l.rating}
              </option>
            ))}
          </select>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-stone-600">
          <button
            id="device-desktop"
            onClick={() => setDevice('desktop')}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              device === 'desktop' ? 'bg-white text-stone-900 shadow-xs' : 'hover:text-stone-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            id="device-tablet"
            onClick={() => setDevice('tablet')}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              device === 'tablet' ? 'bg-white text-stone-900 shadow-xs' : 'hover:text-stone-900'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            id="device-mobile"
            onClick={() => setDevice('mobile')}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              device === 'mobile' ? 'bg-white text-stone-900 shadow-xs' : 'hover:text-stone-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile (375px)</span>
          </button>
        </div>

        {/* Color Palette Switcher */}
        <div className="flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-stone-400 mr-1" />
          {Object.keys(themeColors).map((cKey) => (
            <button
              key={cKey}
              onClick={() => setActiveTheme(cKey)}
              title={`Theme: ${cKey}`}
              className={`w-6 h-6 rounded-full transition border-2 ${
                activeTheme === cKey ? 'border-stone-900 scale-110' : 'border-white'
              }`}
              style={{ backgroundColor: themeColors[cKey].primary }}
            />
          ))}
        </div>

        {/* Tool shortcuts */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            id="btn-toggle-customizer"
            onClick={() => setShowCustomizer(!showCustomizer)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              showCustomizer ? 'bg-stone-900 text-white' : 'border border-stone-300 bg-white hover:bg-stone-50 text-stone-700'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showCustomizer ? 'Close Editor' : 'Customize Live'}</span>
          </button>

          <button
            id="btn-open-inbox-badge"
            onClick={() => onOpenInbox(lead)}
            className="px-3 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold transition flex items-center gap-1.5 relative shadow-xs"
          >
            <Inbox className="w-3.5 h-3.5 text-emerald-600" />
            <span>Lead Inbox</span>
            {inquiryCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center">
                {inquiryCount}
              </span>
            )}
          </button>

          <button
            id="btn-open-roi-calc"
            onClick={() => onOpenRoiCalculator(lead)}
            className="px-3 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>ROI Calculator</span>
          </button>

          <button
            id="btn-open-qr-standee"
            onClick={() => onOpenQrCode(lead)}
            className="px-3 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <QrCode className="w-3.5 h-3.5 text-indigo-600" />
            <span>QR Standee</span>
          </button>

          <button
            id="btn-open-client-portal"
            onClick={() => onOpenPitchPortal(lead)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Client Pitch Portal</span>
          </button>

          <button
            id="btn-download-html"
            onClick={handleDownloadHtml}
            className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            title="Download standalone HTML file"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Download HTML</span>
          </button>

          {lead.whatsapp && (
            <a
              id="btn-quick-close-whatsapp"
              href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                `Hello ${lead.name}! 👋 I just finished designing the live online storefront demo for your business. You can review all services, reviews, and direct booking features. Can I send you the link to check it out right now?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm animate-pulse"
              title="Pitch this generated website directly on WhatsApp in 1 click"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Fast Pitch Now</span>
            </a>
          )}
        </div>
      </div>

      {/* Live Customizer Drawer */}
      {showCustomizer && (
        <div className="bg-stone-900 text-white rounded-2xl p-6 border border-stone-800 space-y-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div>
              <h3 className="font-bold text-sm font-display flex items-center gap-2 text-amber-400">
                <Sliders className="w-4 h-4" />
                Live Client Website Customizer
              </h3>
              <p className="text-xs text-stone-400">
                Any changes made here reflect instantly in the preview below and the downloadable HTML.
              </p>
            </div>
            <button
              onClick={() => setShowCustomizer(false)}
              className="text-stone-400 hover:text-white text-xs font-bold underline"
            >
              Done Editing
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Branding & Contact */}
            <div className="space-y-3">
              <span className="font-bold text-amber-300 uppercase tracking-wider text-[10px] block">
                1. Text & Contact Details
              </span>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Headline / Punchy Tagline</label>
                <input
                  type="text"
                  value={customTagline}
                  onChange={(e) => setCustomTagline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  value={customPhone}
                  onChange={(e) => setCustomPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">WhatsApp Contact</label>
                <input
                  type="text"
                  value={customWhatsapp}
                  onChange={(e) => setCustomWhatsapp(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Section Toggles */}
            <div className="space-y-3">
              <span className="font-bold text-amber-300 uppercase tracking-wider text-[10px] block">
                2. Visible Website Modules
              </span>

              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-stone-800 border border-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAnnouncement}
                  onChange={(e) => setShowAnnouncement(e.target.checked)}
                  className="rounded text-amber-500"
                />
                <span>Google Review Header Banner</span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-stone-800 border border-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showBookingSection}
                  onChange={(e) => setShowBookingSection(e.target.checked)}
                  className="rounded text-amber-500"
                />
                <span>24/7 Appointment Booking System</span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-stone-800 border border-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showReviewsSection}
                  onChange={(e) => setShowReviewsSection(e.target.checked)}
                  className="rounded text-amber-500"
                />
                <span>Google Maps Verified Reviews Block</span>
              </label>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Top Banner Announcement</label>
                <input
                  type="text"
                  value={customAnnouncement}
                  onChange={(e) => setCustomAnnouncement(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs"
                />
              </div>
            </div>

            {/* Add Service Item */}
            <div className="space-y-3">
              <span className="font-bold text-amber-300 uppercase tracking-wider text-[10px] block">
                3. Add Custom Service & Price
              </span>

              <form onSubmit={handleAddService} className="space-y-2">
                <input
                  type="text"
                  placeholder="Service Name (e.g. VIP Consultation)"
                  value={newServiceTitle}
                  onChange={(e) => setNewServiceTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs"
                />
                <input
                  type="text"
                  placeholder="Price (e.g. $150 or ₦45,000)"
                  value={newServicePrice}
                  onChange={(e) => setNewServicePrice(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Service Catalog</span>
                </button>
              </form>

              <div className="max-h-24 overflow-y-auto space-y-1 pr-1">
                {activeServices.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-stone-800 text-[11px]">
                    <span className="truncate">{s.title} ({s.priceEstimate || 'Free'})</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveService(idx)}
                      className="text-stone-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simulated Browser Viewport */}
      <div className="flex justify-center">
        <div
          className={`transition-all duration-300 rounded-2xl shadow-2xl border border-stone-300 overflow-hidden bg-white ${
            device === 'desktop'
              ? 'w-full max-w-6xl'
              : device === 'tablet'
              ? 'w-[768px]'
              : 'w-[380px]'
          }`}
        >
          {/* Simulated Browser Bar */}
          <div className="bg-stone-800 px-4 py-2.5 flex items-center justify-between border-b border-stone-700 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            </div>

            <div className="bg-stone-900/90 px-4 py-1 rounded-md text-[11px] font-mono text-stone-300 border border-stone-700/60 max-w-sm w-full text-center truncate">
              https://www.{lead.customDomainIdea}
            </div>

            <div className="flex items-center gap-2 text-stone-400 text-[11px]">
              <span className="text-emerald-400">● 200 OK</span>
              <span>SSL Secure</span>
            </div>
          </div>

          {/* WEBSITE CONTENT */}
          <div className="font-sans antialiased text-stone-800 bg-stone-50 max-h-[75vh] overflow-y-auto">
            {/* Announcement Bar */}
            {showAnnouncement && (
              <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 text-center flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center gap-1 font-semibold text-amber-400">
                  {customAnnouncement}
                </span>
                <span className="hidden sm:inline text-stone-600">|</span>
                <span className="hidden sm:inline">{lead.address}</span>
                <span className="hidden sm:inline text-stone-600">|</span>
                <a href={`tel:${customPhone}`} className="underline font-bold text-white hover:text-amber-300">
                  {customPhone}
                </a>
              </div>
            )}

            {/* Navbar */}
            <nav className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-stone-200 px-6 py-4 flex items-center justify-between">
              <div>
                <a href="#home" className="text-xl font-bold font-display tracking-tight text-stone-900">
                  {lead.name}
                </a>
                <p className="text-[11px] text-stone-500 font-medium">
                  {lead.category} · {lead.city}
                </p>
              </div>

              <div className="hidden md:flex items-center space-x-6 text-xs font-semibold text-stone-600">
                <a href="#services" className="hover:text-stone-900">Services</a>
                <a href="#about" className="hover:text-stone-900">About</a>
                {showReviewsSection && <a href="#reviews" className="hover:text-stone-900">Reviews</a>}
                <a href="#contact" className="hover:text-stone-900">Contact & Hours</a>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${customWhatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="#book"
                  className="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-xs transition"
                  style={{ backgroundColor: currentTheme.primary }}
                >
                  Book Appointment
                </a>
              </div>
            </nav>

            {/* Hero Section */}
            <div
              className="py-14 sm:py-20 px-6 sm:px-12 border-b border-stone-200"
              style={{ background: `linear-gradient(to bottom, ${currentTheme.light}, #ffffff)` }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white border border-stone-200 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Open Today · {lead.hours.split('|')[0]}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight font-display">
                    {customTagline}
                  </h1>

                  <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
                    {lead.aboutStory}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-xs">
                      <span className="text-amber-500 font-bold text-base">★ {lead.rating}</span>
                      <span className="text-[11px] text-stone-600 font-medium">Google Rating<br />({lead.reviewCount} Reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-xs">
                      <span className="text-stone-900 font-bold text-base">100%</span>
                      <span className="text-[11px] text-stone-600 font-medium">Verified Care &<br />Quality Guarantee</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <a
                      href="#book"
                      className="px-6 py-3 rounded-xl text-xs font-bold text-white shadow-md transition transform active:scale-95"
                      style={{ backgroundColor: currentTheme.primary }}
                    >
                      Schedule Appointment
                    </a>
                    <a
                      href={`tel:${customPhone}`}
                      className="px-5 py-3 rounded-xl text-xs font-bold bg-white border border-stone-300 text-stone-800 hover:bg-stone-50 transition shadow-xs flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{customPhone}</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-white">
                    <img
                      src={lead.photos[0]}
                      alt={lead.name}
                      className="w-full h-72 sm:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">{lead.category}</span>
                      <p className="text-base font-bold font-display">{lead.name}</p>
                      <p className="text-xs text-stone-200">{lead.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="py-10 px-6 sm:px-12 bg-white border-b border-stone-200">
              <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {lead.highlights.map((h, i) => (
                  <div key={i} className="p-4 rounded-xl border border-stone-100 bg-stone-50/60">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs text-white mb-2"
                      style={{ backgroundColor: currentTheme.primary }}
                    >
                      0{i + 1}
                    </div>
                    <h3 className="text-xs font-bold text-stone-900 mb-0.5">{h}</h3>
                    <p className="text-[11px] text-stone-500 leading-normal">
                      Reliable local standard of excellence recognized across {lead.city}.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Grid */}
            <div id="services" className="py-14 px-6 sm:px-12 bg-stone-50">
              <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center max-w-xl mx-auto">
                  <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: currentTheme.primary }}>
                    Our Specializations
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
                    Featured Services & Treatments
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Transparent rates, world-class equipment, and patient-first dedication.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeServices.map((svc, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="text-base font-bold text-stone-900">{svc.title}</h3>
                          {svc.priceEstimate && (
                            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-stone-100 text-stone-700 whitespace-nowrap">
                              {svc.priceEstimate}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed mb-4">{svc.description}</p>
                      </div>
                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                        <a
                          href="#book"
                          onClick={() => setFormService(svc.title)}
                          className="font-bold hover:underline"
                          style={{ color: currentTheme.primary }}
                        >
                          Book this service →
                        </a>
                        <a
                          href={`https://wa.me/${customWhatsapp.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.name)},%20I%20am%20inquiring%20about%20${encodeURIComponent(svc.title)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-stone-500 hover:text-stone-800 font-medium"
                        >
                          Quick WhatsApp
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Proof / Real Reviews */}
            {showReviewsSection && (
              <div id="reviews" className="py-14 px-6 sm:px-12 bg-white border-y border-stone-200">
                <div className="max-w-6xl mx-auto space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: currentTheme.primary }}>
                        Customer Reputation
                      </p>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
                        Verified Google Maps Reviews
                      </h2>
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-500 font-bold text-base">
                      ★★★★★
                      <span className="text-stone-800 text-xs font-semibold">
                        {lead.rating} out of 5.0 ({lead.reviewCount} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {lead.reviews.map((r, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="text-amber-500 text-xs">★★★★★</div>
                          <p className="text-xs text-stone-700 italic leading-relaxed">
                            "{r.text}"
                          </p>
                        </div>
                        <div className="pt-4 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500 mt-4">
                          <span className="font-bold text-stone-800">{r.author}</span>
                          <span>{r.relativeTime || 'Google Verified'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Booking Section */}
            {showBookingSection && (
              <div id="book" className="py-14 px-6 sm:px-12 bg-stone-50">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: currentTheme.primary }}>
                        Book Direct
                      </p>
                      <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
                        Schedule Your Appointment
                      </h3>
                      <p className="text-xs text-stone-500">
                        We respond within 15 minutes to confirm your slot.
                      </p>
                    </div>

                    <form onSubmit={handleBookingSubmit} className="space-y-3 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-stone-700 mb-1">Your Full Name *</label>
                          <input
                            id="input-book-name"
                            type="text"
                            required
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="e.g. Sandra Johnson"
                            className="w-full px-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-stone-700 mb-1">Phone or WhatsApp *</label>
                          <input
                            id="input-book-phone"
                            type="tel"
                            required
                            value={formPhone}
                            onChange={(e) => setFormPhone(e.target.value)}
                            placeholder={customPhone}
                            className="w-full px-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-stone-700 mb-1">Select Service *</label>
                          <select
                            id="select-book-service"
                            value={formService}
                            onChange={(e) => setFormService(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          >
                            {activeServices.map((s, i) => (
                              <option key={i} value={s.title}>{s.title}</option>
                            ))}
                            <option value="General Consultation">General Consultation / First Visit</option>
                          </select>
                        </div>
                        <div>
                          <label className="block font-bold text-stone-700 mb-1">Preferred Date</label>
                          <input
                            id="input-book-date"
                            type="date"
                            value={formDate}
                            onChange={(e) => setFormDate(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-stone-700 mb-1">Additional Notes</label>
                        <textarea
                          id="textarea-book-notes"
                          rows={2}
                          value={formNotes}
                          onChange={(e) => setFormNotes(e.target.value)}
                          placeholder="Briefly describe what you need or special requirements..."
                          className="w-full px-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>

                      <button
                        id="btn-submit-booking-sim"
                        type="submit"
                        className="w-full py-3 rounded-xl text-xs font-bold text-white shadow-md transition"
                        style={{ backgroundColor: currentTheme.primary }}
                      >
                        Confirm Booking Request
                      </button>
                    </form>

                    {bookingConfirmed && (
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-2 animate-in fade-in">
                        <p className="font-bold text-xs flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          Booking Request Recorded & Added to Lead Inbox!
                        </p>
                        <p className="text-[11px] text-emerald-700">
                          In live operation, this triggers instant SMS/WhatsApp alerts to the business owner ({customPhone}).
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <a
                            href={`https://wa.me/${customWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${lead.name}, my name is ${formName}. I'd like to book an appointment for ${formService} on ${formDate || 'soonest date'}. Phone: ${formPhone}. Notes: ${formNotes}`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 shadow-xs"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>Forward to Business WhatsApp</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => onOpenInbox(lead)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-300 bg-white text-emerald-800 text-[11px] font-bold hover:bg-emerald-50"
                          >
                            <Inbox className="w-3 h-3" />
                            <span>View in Lead Inbox ({inquiryCount + 1})</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Location & Hours Card */}
                  <div id="contact" className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                    <h3 className="text-lg font-bold text-stone-900 font-display">Premises & Contact</h3>

                    <div className="space-y-3 text-xs text-stone-600">
                      <div>
                        <span className="font-bold text-stone-900 block">Address:</span>
                        <p>{lead.address}</p>
                        <p className="text-stone-400">{lead.city}, {lead.country}</p>
                      </div>

                      <div className="pt-2 border-t border-stone-100">
                        <span className="font-bold text-stone-900 block">Operating Hours:</span>
                        <p>{lead.hours}</p>
                      </div>

                      <div className="pt-2 border-t border-stone-100">
                        <span className="font-bold text-stone-900 block">Direct Telephone:</span>
                        <a href={`tel:${customPhone}`} className="font-bold underline text-stone-900">
                          {customPhone}
                        </a>
                      </div>
                    </div>

                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(lead.name + ' ' + lead.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full py-2.5 rounded-xl border border-stone-300 text-center text-xs font-bold text-stone-700 hover:bg-stone-50 transition"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <footer className="bg-stone-950 text-stone-400 py-8 px-6 text-xs border-t border-stone-800">
              <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div>
                  <p className="font-bold text-white text-sm">{lead.name}</p>
                  <p className="text-[11px] text-stone-500">{customTagline}</p>
                </div>
                <p className="text-[11px] text-stone-500">
                  © {new Date().getFullYear()} {lead.name}. Powered by LeadForge Studio.
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LeadExplorer } from './components/LeadExplorer';
import { WebsiteGeneratorView } from './components/WebsiteGeneratorView';
import { BusinessDeepDiveModal } from './components/BusinessDeepDiveModal';
import { ProposalAndPricingModal } from './components/ProposalAndPricingModal';
import { PitchGeneratorModal } from './components/PitchGeneratorModal';
import { SprintPipelineBoard } from './components/SprintPipelineBoard';
import { RoiCalculatorModal } from './components/RoiCalculatorModal';
import { ClientPitchPortalModal } from './components/ClientPitchPortalModal';
import { InquiriesInboxModal } from './components/InquiriesInboxModal';
import { QrCodeGeneratorModal } from './components/QrCodeGeneratorModal';
import { GeminiChatbot } from './components/GeminiChatbot';
import { PWAInstallModal } from './components/PWAInstallModal';
import { INITIAL_LEADS, INITIAL_INQUIRIES } from './data/mockLeads';
import { BusinessLead, SprintStats, ClientInquiry } from './types';
import { Inbox, Mail, MessageSquare, Phone, Calendar, Clock, User, CheckCircle2, DollarSign, Sparkles, Bot } from 'lucide-react';

export default function App() {
  const [leads, setLeads] = useState<BusinessLead[]>(INITIAL_LEADS);
  const [activeLead, setActiveLead] = useState<BusinessLead>(INITIAL_LEADS[0]);
  const [inquiries, setInquiries] = useState<ClientInquiry[]>(INITIAL_INQUIRIES);
  const [currentTab, setCurrentTab] = useState<'leads' | 'website' | 'proposal' | 'outreach' | 'pipeline' | 'inbox' | 'copilot'>('leads');
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  // Modals state
  const [deepDiveLead, setDeepDiveLead] = useState<BusinessLead | null>(null);
  const [proposalLead, setProposalLead] = useState<BusinessLead | null>(null);
  const [pitchLead, setPitchLead] = useState<BusinessLead | null>(null);
  const [roiLead, setRoiLead] = useState<BusinessLead | null>(null);
  const [pitchPortalLead, setPitchPortalLead] = useState<BusinessLead | null>(null);
  const [inboxLead, setInboxLead] = useState<BusinessLead | null>(null);
  const [qrLead, setQrLead] = useState<BusinessLead | null>(null);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);

  // 2-Hour Sprint Timer State (7200 seconds = 2 hours)
  const [sprintSeconds, setSprintSeconds] = useState<number>(7200);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Sprint Timer Countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && sprintSeconds > 0) {
      interval = setInterval(() => {
        setSprintSeconds((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, sprintSeconds]);

  // Derived sprint stats
  const sprintStats: SprintStats = {
    targetRevenueUSD: 2000,
    achievedRevenueUSD: leads
      .filter((l) => l.status === 'won')
      .reduce((acc, l) => acc + l.proposedPrice, 0),
    leadsDiscovered: leads.length,
    sitesGenerated: leads.filter((l) => l.status !== 'discovered').length,
    pitchesSent: leads.filter((l) => l.status === 'pitched' || l.status === 'follow_up' || l.status === 'won').length,
    dealsClosed: leads.filter((l) => l.status === 'won').length,
    secondsRemaining: sprintSeconds,
    isRunning: isTimerRunning,
  };

  const handleToggleTimer = () => {
    setIsTimerRunning((prev) => !prev);
  };

  const handleResetTimer = () => {
    setSprintSeconds(7200);
    setIsTimerRunning(true);
  };

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'USD' ? 'NGN' : 'USD'));
  };

  const handleSelectForWebsite = (lead: BusinessLead) => {
    setActiveLead(lead);
    if (lead.status === 'discovered') {
      handleUpdateStatus(lead.id, 'site_ready');
    }
    setCurrentTab('website');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProposal = (lead: BusinessLead) => {
    setProposalLead(lead);
  };

  const handleOpenPitch = (lead: BusinessLead) => {
    setPitchLead(lead);
  };

  const handleOpenDeepDive = (lead: BusinessLead) => {
    setDeepDiveLead(lead);
  };

  const handleOpenRoi = (lead: BusinessLead) => {
    setRoiLead(lead);
  };

  const handleOpenPitchPortal = (lead: BusinessLead) => {
    setPitchPortalLead(lead);
  };

  const handleOpenInbox = (lead: BusinessLead) => {
    setInboxLead(lead);
  };

  const handleOpenQr = (lead: BusinessLead) => {
    setQrLead(lead);
  };

  const handleUpdateStatus = (leadId: string, newStatus: BusinessLead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    if (activeLead.id === leadId) {
      setActiveLead((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleAddCustomLead = (newLead: BusinessLead) => {
    setLeads((prev) => [newLead, ...prev]);
    setActiveLead(newLead);
  };

  const handleAppendLeads = (newLeads: BusinessLead[]) => {
    setLeads((prev) => {
      const existingIds = new Set(prev.map((l) => l.id));
      const filteredNew = newLeads.filter((l) => !existingIds.has(l.id));
      return [...filteredNew, ...prev];
    });
    if (newLeads.length > 0) {
      setActiveLead(newLeads[0]);
    }
  };

  const handleMarkPitched = (leadId: string) => {
    handleUpdateStatus(leadId, 'pitched');
  };

  const handleAddInquiry = (newInq: ClientInquiry) => {
    setInquiries((prev) => [newInq, ...prev]);
  };

  const handleUpdateInquiryStatus = (inquiryId: string, status: ClientInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === inquiryId ? { ...i, status } : i))
    );
  };

  const formatPrice = (usd: number) => {
    if (currency === 'NGN') {
      return `₦${(usd * 1500).toLocaleString()}`;
    }
    return `$${usd}`;
  };

  return (
    <div className="min-h-screen bg-stone-100/60 text-stone-900 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Header with 2-Hour Timer and Global Controls */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
        stats={sprintStats}
        onToggleTimer={handleToggleTimer}
        onResetTimer={handleResetTimer}
        activeBusinessName={activeLead.name}
        totalInquiriesCount={inquiries.length}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {currentTab === 'leads' && (
          <LeadExplorer
            leads={leads}
            currency={currency}
            onSelectForWebsite={handleSelectForWebsite}
            onOpenProposal={handleOpenProposal}
            onOpenPitch={handleOpenPitch}
            onOpenDeepDive={handleOpenDeepDive}
            onUpdateStatus={handleUpdateStatus}
            onAddCustomLead={handleAddCustomLead}
            onAppendLeads={handleAppendLeads}
            onOpenRoiCalculator={handleOpenRoi}
            onOpenPitchPortal={handleOpenPitchPortal}
            onOpenInbox={handleOpenInbox}
            onOpenQrCode={handleOpenQr}
          />
        )}

        {currentTab === 'website' && (
          <WebsiteGeneratorView
            lead={activeLead}
            allLeads={leads}
            currency={currency}
            inquiryCount={inquiries.filter((i) => i.leadId === activeLead.id).length}
            onSelectLead={setActiveLead}
            onOpenProposal={handleOpenProposal}
            onOpenPitch={handleOpenPitch}
            onOpenPitchPortal={handleOpenPitchPortal}
            onOpenRoiCalculator={handleOpenRoi}
            onOpenInbox={handleOpenInbox}
            onOpenQrCode={handleOpenQr}
            onAddInquiry={handleAddInquiry}
          />
        )}

        {currentTab === 'proposal' && (
          <div className="space-y-6 pb-16">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-display text-stone-900">
                  Client Proposal & Quotation Engine ($300 to $500)
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Currently configured for: <strong className="text-stone-800">{activeLead.name}</strong> ({activeLead.city})
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={activeLead.id}
                  onChange={(e) => {
                    const l = leads.find((item) => item.id === e.target.value);
                    if (l) setActiveLead(l);
                  }}
                  className="text-xs font-bold px-3 py-2 rounded-xl border border-stone-300 bg-stone-50"
                >
                  {leads.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => handleOpenProposal(activeLead)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-xs transition"
                >
                  Open Full Proposal Document
                </button>
              </div>
            </div>

            <div className="bg-stone-900 rounded-3xl p-8 text-white space-y-6">
              <div className="max-w-2xl">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  Pricing Rationale
                </span>
                <h3 className="text-2xl font-bold font-display">
                  Why Charging $300 to $500 Closes Rapidly in 2 Hours
                </h3>
                <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                  Local business owners with 4.5★+ ratings know their craft, but often hesitate when big agencies quote $3,000-$5,000. At a flat $300-$500 (₦450k-₦750k) with a pre-built preview ready to inspect on their phone, the risk is zero and the decision takes under 5 minutes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-stone-800">
                <div className="p-5 rounded-2xl bg-stone-800/70 border border-stone-700">
                  <span className="text-xs font-bold text-amber-400">STARTER · $300</span>
                  <p className="text-base font-bold text-white mt-1">Single-Page Express</p>
                  <p className="text-[11px] text-stone-400 mt-2">
                    Ideal for small artisan shops, sole proprietors, and neighborhood service providers.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-stone-800/70 border-2 border-amber-500">
                  <span className="text-xs font-bold text-amber-400">GROWTH · $400 (RECOMMENDED)</span>
                  <p className="text-base font-bold text-white mt-1">Lead Machine & Online Booking</p>
                  <p className="text-[11px] text-stone-400 mt-2">
                    Features interactive appointment request routing directly to their WhatsApp.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-stone-800/70 border border-stone-700">
                  <span className="text-xs font-bold text-amber-400">ELITE · $500</span>
                  <p className="text-base font-bold text-white mt-1">Market Domination & SEO</p>
                  <p className="text-[11px] text-stone-400 mt-2">
                    Includes Google Business Profile audit and local citation rank optimization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'outreach' && (
          <div className="space-y-6 pb-16">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-display text-stone-900">
                  Client Outreach Hub
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Launch ready-to-send personalized WhatsApp, Cold Email & Call scripts for any business.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={activeLead.id}
                  onChange={(e) => {
                    const l = leads.find((item) => item.id === e.target.value);
                    if (l) setActiveLead(l);
                  }}
                  className="text-xs font-bold px-3 py-2 rounded-xl border border-stone-300 bg-stone-50"
                >
                  {leads.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => handleOpenPitch(activeLead)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition"
                >
                  Open Outreach Modal
                </button>
              </div>
            </div>

            {/* Quick Pitch Preview Card */}
            <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  1-Click Direct WhatsApp
                </span>
                <h3 className="text-2xl font-bold font-display text-stone-900">
                  Pitch {activeLead.name} on WhatsApp
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  In Nigeria and global markets, WhatsApp is the #1 tool for closing local business owners. Because we already built a live website preview, they can tap the link and see their real business immediately.
                </p>
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                  <p><strong>Owner Phone:</strong> {activeLead.phone}</p>
                  <p><strong>WhatsApp Direct:</strong> {activeLead.whatsapp}</p>
                  <p><strong>Proposed Price:</strong> {currency === 'NGN' ? `₦${(activeLead.proposedPrice * 1500).toLocaleString()}` : `$${activeLead.proposedPrice}`}</p>
                </div>
                <button
                  onClick={() => handleOpenPitch(activeLead)}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition"
                >
                  Configure & Send WhatsApp Pitch Now
                </button>
              </div>

              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-3">
                <span className="text-[11px] font-bold uppercase text-stone-500 block">
                  Outreach Angle & Strategy
                </span>
                <h4 className="font-bold text-sm text-stone-900">
                  Leveraging Their {activeLead.rating}★ Rating
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  "{activeLead.reviews[0]?.text}"
                </p>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                  <strong>Why they buy:</strong> They already earned great customer trust. Giving them a website for $300-$500 captures the dozens of people who find them on Google Maps each week but bounce without booking.
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'pipeline' && (
          <SprintPipelineBoard
            leads={leads}
            currency={currency}
            stats={sprintStats}
            onUpdateStatus={handleUpdateStatus}
            onSelectForWebsite={handleSelectForWebsite}
            onOpenPitch={handleOpenPitch}
            onOpenProposal={handleOpenProposal}
          />
        )}

        {currentTab === 'inbox' && (
          <div className="space-y-6 pb-16">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 mb-1">
                  <Inbox className="w-4 h-4" />
                  <span>24/7 INCOMING CLIENT APPOINTMENTS & BOOKINGS</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900">
                  Customer Inquiries & Lead Inbox
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Real client booking requests captured across your active generated websites.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-xs text-emerald-900">
                  <span className="font-bold">{inquiries.length} Total Bookings</span> Captured
                </div>
              </div>
            </div>

            {/* Inquiries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inquiries.map((inq) => {
                const matchedLead = leads.find((l) => l.id === inq.leadId);
                return (
                  <div
                    key={inq.id}
                    className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                          {inq.businessName}
                        </span>
                        <span className="text-[10px] text-stone-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {inq.createdAt}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-800 font-bold text-xs">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-stone-900">{inq.clientName}</h4>
                          <p className="text-[11px] text-stone-500">{inq.phone}</p>
                        </div>
                      </div>

                      <div className="mt-3 p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs space-y-1">
                        <p className="text-stone-700">
                          <strong>Service:</strong> {inq.serviceRequested}
                        </p>
                        <p className="text-stone-700">
                          <strong>Date:</strong> {inq.preferredDate}
                        </p>
                        {inq.notes && (
                          <p className="text-stone-500 italic text-[11px] pt-1 border-t border-stone-200/50">
                            "{inq.notes}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      <select
                        value={inq.status}
                        onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as ClientInquiry['status'])}
                        className="text-[11px] font-bold px-2 py-1 rounded-lg border border-stone-300 bg-stone-50"
                      >
                        <option value="new">🔴 New Request</option>
                        <option value="contacted">🟡 Contacted</option>
                        <option value="booked">🟢 Confirmed</option>
                      </select>

                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hello ${inq.clientName}, this is ${inq.businessName}. We received your appointment booking for ${inq.serviceRequested}.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-xs"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Reply WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {currentTab === 'copilot' && (
          <div className="space-y-6 pb-16">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-600 mb-1">
                  <Bot className="w-4 h-4" />
                  <span>MULTI-TURN GEMINI AI SALES COPILOT</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900">
                  AI Deal Closer, Roleplay & Objection Coach
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Powered by Gemini models with custom role system instructions for high-ticket closing.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-500 font-medium">Evaluate Business:</span>
                <select
                  value={activeLead.id}
                  onChange={(e) => {
                    const l = leads.find((item) => item.id === e.target.value);
                    if (l) setActiveLead(l);
                  }}
                  className="text-xs font-bold px-3 py-2 rounded-xl border border-stone-300 bg-stone-50"
                >
                  {leads.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name} ({l.city})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <GeminiChatbot
              activeLead={activeLead}
              currency={currency}
            />
          </div>
        )}
      </main>

      {/* Floating Gemini Copilot Launcher & Floating Widget */}
      {currentTab !== 'copilot' && !isCopilotOpen && (
        <button
          id="btn-open-floating-copilot"
          onClick={() => setIsCopilotOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white shadow-xl border border-stone-700 flex items-center gap-2.5 transition transform hover:scale-105 group"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-stone-950 font-bold shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold font-display">AI Sales Copilot</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </button>
      )}

      {currentTab !== 'copilot' && isCopilotOpen && (
        <GeminiChatbot
          activeLead={activeLead}
          currency={currency}
          isFloating
          onClose={() => setIsCopilotOpen(false)}
        />
      )}

      {/* ALL INTERACTIVE MODALS */}
      {deepDiveLead && (
        <BusinessDeepDiveModal
          lead={deepDiveLead}
          currency={currency}
          onClose={() => setDeepDiveLead(null)}
          onGenerateWebsite={handleSelectForWebsite}
          onOpenProposal={handleOpenProposal}
          onOpenPitch={handleOpenPitch}
        />
      )}

      {proposalLead && (
        <ProposalAndPricingModal
          lead={proposalLead}
          currency={currency}
          onClose={() => setProposalLead(null)}
          onOpenPitch={handleOpenPitch}
        />
      )}

      {pitchLead && (
        <PitchGeneratorModal
          lead={pitchLead}
          currency={currency}
          onClose={() => setPitchLead(null)}
          onMarkPitched={handleMarkPitched}
        />
      )}

      {roiLead && (
        <RoiCalculatorModal
          lead={roiLead}
          currency={currency}
          onClose={() => setRoiLead(null)}
          onOpenPitch={handleOpenPitch}
        />
      )}

      {pitchPortalLead && (
        <ClientPitchPortalModal
          lead={pitchPortalLead}
          currency={currency}
          onClose={() => setPitchPortalLead(null)}
          onLaunchSite={handleSelectForWebsite}
        />
      )}

      {inboxLead && (
        <InquiriesInboxModal
          lead={inboxLead}
          inquiries={inquiries}
          onClose={() => setInboxLead(null)}
          onUpdateStatus={handleUpdateInquiryStatus}
        />
      )}

      {qrLead && (
        <QrCodeGeneratorModal
          lead={qrLead}
          onClose={() => setQrLead(null)}
        />
      )}

      {/* PWA Phone Deployment & Install Modal */}
      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />
    </div>
  );
}

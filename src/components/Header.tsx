import React from 'react';
import { Timer, DollarSign, Globe, Play, Pause, RotateCcw, Target, Sparkles, Bot, Smartphone, Download, Zap } from 'lucide-react';
import { SprintStats, SprintMode } from '../types';

interface HeaderProps {
  currentTab: 'leads' | 'website' | 'proposal' | 'outreach' | 'pipeline' | 'inbox' | 'copilot';
  onTabChange: (tab: 'leads' | 'website' | 'proposal' | 'outreach' | 'pipeline' | 'inbox' | 'copilot') => void;
  currency: 'USD' | 'NGN';
  onToggleCurrency: () => void;
  stats: SprintStats;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onSelectSprintMode?: (mode: SprintMode) => void;
  activeBusinessName?: string;
  totalInquiriesCount?: number;
  onOpenInstallModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  currency,
  onToggleCurrency,
  stats,
  onToggleTimer,
  onResetTimer,
  onSelectSprintMode,
  activeBusinessName,
  totalInquiriesCount = 0,
  onOpenInstallModal,
}) => {
  // Format seconds remaining into HH:MM:SS
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = stats.secondsRemaining < 300; // less than 5 mins

  return (
    <header className="bg-stone-900 text-stone-100 border-b border-stone-800 relative z-40 shadow-md">
      {/* Top Bar: Agency Sprint Progress */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-amber-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>RAPID DEAL CLOSER MODE</span>
          </div>
          <span className="text-stone-600 hidden sm:inline">|</span>
          <span className="text-stone-400 hidden sm:inline">
            Fast Flow: Pick 4.5★+ map business → Instant WhatsApp pitch → Close $300-$500 immediately
          </span>
        </div>

        {/* Sprint Timer and Revenue Target */}
        <div className="flex items-center flex-wrap gap-2.5 ml-auto">
          {/* Speed Preset Selector */}
          {onSelectSprintMode && (
            <div className="flex items-center bg-stone-950/80 border border-stone-800 rounded-lg p-0.5 text-[11px]">
              <button
                id="sprint-speed-instant"
                onClick={() => onSelectSprintMode('instant')}
                className={`px-2 py-0.5 rounded font-bold transition flex items-center gap-1 ${
                  stats.mode === 'instant' ? 'bg-amber-500 text-stone-950 shadow-xs' : 'text-stone-400 hover:text-white'
                }`}
                title="Instant Close Mode: Zero delay, immediate 1-click pitches"
              >
                <Zap className="w-3 h-3" />
                <span>Instant (ASAP)</span>
              </button>
              <button
                id="sprint-speed-15m"
                onClick={() => onSelectSprintMode('15min')}
                className={`px-2 py-0.5 rounded font-bold transition ${
                  stats.mode === '15min' ? 'bg-amber-500 text-stone-950 shadow-xs' : 'text-stone-400 hover:text-white'
                }`}
                title="15-Minute Rapid Blitz"
              >
                15m Blitz
              </button>
              <button
                id="sprint-speed-30m"
                onClick={() => onSelectSprintMode('30min')}
                className={`px-2 py-0.5 rounded font-bold transition ${
                  stats.mode === '30min' ? 'bg-amber-500 text-stone-950 shadow-xs' : 'text-stone-400 hover:text-white'
                }`}
                title="30-Minute Sprint"
              >
                30m
              </button>
              <button
                id="sprint-speed-120m"
                onClick={() => onSelectSprintMode('120min')}
                className={`px-2 py-0.5 rounded font-bold transition ${
                  stats.mode === '120min' ? 'bg-amber-500 text-stone-950 shadow-xs' : 'text-stone-400 hover:text-white'
                }`}
                title="2-Hour Marathon"
              >
                2h
              </button>
            </div>
          )}

          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border font-mono font-bold ${
            stats.mode === 'instant'
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : isLowTime
              ? 'bg-rose-950/70 border-rose-600 text-rose-300 animate-pulse'
              : 'bg-stone-800/90 border-stone-700 text-amber-300'
          }`}>
            <Timer className="w-3.5 h-3.5 text-amber-400" />
            <span>{stats.mode === 'instant' ? 'FAST-TRACK' : formatTime(stats.secondsRemaining)}</span>
            {stats.mode !== 'instant' && (
              <>
                <button
                  id="header-toggle-timer"
                  onClick={onToggleTimer}
                  title={stats.isRunning ? 'Pause Sprint Timer' : 'Resume Sprint Timer'}
                  className="hover:text-white transition ml-1"
                >
                  {stats.isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
                <button
                  id="header-reset-timer"
                  onClick={onResetTimer}
                  title="Reset Timer"
                  className="hover:text-white transition"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </>
            )}
          </div>

          {/* Revenue tracker */}
          <div className="flex items-center gap-1.5 bg-stone-800/70 border border-stone-700/80 px-2.5 py-1 rounded-lg text-stone-300">
            <Target className="w-3 h-3 text-emerald-400" />
            <span className="text-stone-400">Target:</span>
            <span className="font-semibold text-emerald-400">
              {currency === 'USD' ? `$${stats.targetRevenueUSD}` : `₦${(stats.targetRevenueUSD * 1500).toLocaleString()}`}
            </span>
          </div>

          {/* Currency Switcher */}
          <button
            id="header-currency-toggle"
            onClick={onToggleCurrency}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition font-medium"
            title="Toggle between USD ($300-$500) and NGN (₦450k-₦750k)"
          >
            <DollarSign className="w-3 h-3 text-amber-400" />
            <span>{currency}</span>
          </button>

          {/* Download Project ZIP */}
          <a
            id="header-download-zip-btn"
            href="/leadforge-project.zip"
            download="leadforge-fullstack-project.zip"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/30 transition font-medium text-xs"
            title="Download complete full-stack codebase ZIP for Vercel / GitHub"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export ZIP</span>
          </a>

          {/* Install Mobile App Button */}
          {onOpenInstallModal && (
            <button
              id="header-install-app-btn"
              onClick={onOpenInstallModal}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold transition shadow-xs text-xs"
              title="Deploy LeadForge to phone (iPhone or Android)"
            >
              <Smartphone className="w-3.5 h-3.5 text-stone-950" />
              <span>Install App</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-teal-500 flex items-center justify-center text-stone-950 font-black text-lg shadow-sm">
            <Globe className="w-5 h-5 text-stone-950" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
              LeadForge Agency Studio
              <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                Maps Lead Engine
              </span>
            </h1>
            <p className="text-xs text-stone-400">
              Targeting high-rated businesses without websites across Nigeria & Global markets
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            id="tab-leads"
            onClick={() => onTabChange('leads')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              currentTab === 'leads'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-750 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            1. Discover Leads
          </button>

          <button
            id="tab-website"
            onClick={() => onTabChange('website')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 relative ${
              currentTab === 'website'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-750 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            2. Live Website Studio
            {activeBusinessName && (
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
            )}
          </button>

          <button
            id="tab-proposal"
            onClick={() => onTabChange('proposal')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              currentTab === 'proposal'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-750 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            3. $300-$500 Proposal
          </button>

          <button
            id="tab-outreach"
            onClick={() => onTabChange('outreach')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              currentTab === 'outreach'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-750 hover:text-white'
            }`}
          >
            <span>💬</span>
            4. Outreach Pitches
          </button>

          <button
            id="tab-pipeline"
            onClick={() => onTabChange('pipeline')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              currentTab === 'pipeline'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-750 hover:text-white'
            }`}
          >
            <span>📊</span>
            5. Sprint Pipeline
          </button>

          <button
            id="tab-inbox"
            onClick={() => onTabChange('inbox')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 relative ${
              currentTab === 'inbox'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-750 hover:text-white'
            }`}
          >
            <span>📬</span>
            6. Inquiries Inbox
            {totalInquiriesCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-stone-950 text-[10px] font-black">
                {totalInquiriesCount}
              </span>
            )}
          </button>

          <button
            id="tab-copilot"
            onClick={() => onTabChange('copilot')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              currentTab === 'copilot'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-750 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-amber-400" />
            7. AI Sales Copilot
          </button>
        </div>
      </div>
    </header>
  );
};

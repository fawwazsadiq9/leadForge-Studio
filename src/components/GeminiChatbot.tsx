import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  ShieldAlert,
  Zap,
  Brain,
  MessageSquare,
  Flame,
  HelpCircle,
  Building2,
  Loader2,
  X,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { BusinessLead, ChatMessage, ChatbotPersona, GeminiModelChoice } from '../types';

interface GeminiChatbotProps {
  activeLead?: BusinessLead;
  currency?: 'USD' | 'NGN';
  isFloating?: boolean;
  onClose?: () => void;
}

interface PersonaConfig {
  id: ChatbotPersona;
  name: string;
  badge: string;
  tagline: string;
  icon: typeof Bot;
  color: string;
  systemInstruction: string;
}

const PERSONAS: PersonaConfig[] = [
  {
    id: 'closer',
    name: 'Agency Deal Closer',
    badge: 'Closing Strategist',
    tagline: 'Master the 2-hour sprint & close $300–$500 deals effortlessly',
    icon: Flame,
    color: 'from-amber-500 to-orange-600',
    systemInstruction: `You are the LeadForge Chief Closing Strategist. You specialize in the 2-Hour Agency Sprint model: finding 4.5+ star local businesses on Google Maps that lack websites, building an instant live website preview, and closing $300 to $500 (or ₦450,000 to ₦750,000) packages with zero resistance. Always provide tactical, actionable, psychological closing scripts and urgency drivers.`,
  },
  {
    id: 'objection',
    name: 'Objection Sparring Partner',
    badge: 'Roleplay Simulation',
    tagline: 'Practice handling "We only use Instagram" and "No budget"',
    icon: ShieldAlert,
    color: 'from-rose-500 to-red-600',
    systemInstruction: `You are a realistic, busy, skeptical local business owner (e.g. mechanic, dental clinic owner, boutique founder, bakery owner). You have great customer reviews, but you're skeptical about paying $300-$500 for a website. Roleplay directly with the user. Challenge them with real objections ("We have an Instagram", "How much?", "I'm busy right now", "Send me an email"). After they reply, grade their answer out of 10 and give a sharper rebuttal suggestion.`,
  },
  {
    id: 'copywriter',
    name: 'WhatsApp & DM Copywriter',
    badge: 'High-Response Copy',
    tagline: 'Hyper-personalized WhatsApp & email scripts citing real reviews',
    icon: MessageSquare,
    color: 'from-emerald-500 to-teal-600',
    systemInstruction: `You are an elite direct-response WhatsApp and cold outreach copywriter. Your messages achieve 70%+ open and response rates because you quote actual customer reviews, celebrate their 4.5+ star rating, and share a working link to a preview website you already built for them. Keep messages concise, punchy, conversational, and respectful.`,
  },
  {
    id: 'roi',
    name: 'ROI & Unit Economics Analyst',
    badge: 'The Math of Buying',
    tagline: 'Prove to clients that 1-2 customer bookings completely pays for the site',
    icon: Brain,
    color: 'from-indigo-500 to-purple-600',
    systemInstruction: `You are a unit economics and customer acquisition specialist for local brick-and-mortar businesses. Break down mathematically why a $300-$500 (or ₦450,000-₦750,000) website is an investment with positive ROI, not an expense. Calculate customer lifetime value, search volume, and payback time.`,
  },
];

const STARTER_PROMPTS: Record<ChatbotPersona, string[]> = {
  closer: [
    'How do I close a deal in under 2 hours without sounding pushy?',
    'What is the best script to propose a 50% deposit before launching the domain?',
    'How do I structure a $300 Starter vs $400 Growth vs $500 Premium tier?',
  ],
  objection: [
    'Roleplay as an auto repair shop owner who says "All my business is word of mouth."',
    'Handle this objection: "We already have a Facebook and Instagram page, why do we need a website?"',
    'Handle this objection: "Can you do it for $100 instead of $400?"',
  ],
  copywriter: [
    'Write a friendly WhatsApp pitch praising their Google rating and linking their live preview.',
    'Write a 60-second phone opening for calling the receptionist or owner.',
    'Create a 2-sentence follow-up WhatsApp message 24 hours after sending the preview link.',
  ],
  roi: [
    'Break down the ROI for a local dental clinic charging $150 per cleaning.',
    'How much revenue is a 4.8-star salon losing each month without an online booking site?',
    'Explain the concept of "Payback in 1 Customer" in plain terms for a bakery.',
  ],
};

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  activeLead,
  currency = 'USD',
  isFloating = false,
  onClose,
}) => {
  const [selectedPersona, setSelectedPersona] = useState<ChatbotPersona>('closer');
  const [selectedModel, setSelectedModel] = useState<GeminiModelChoice>('gemini-3.5-flash');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Initial welcome message per persona
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content: `👋 Hello! I am your **LeadForge AI Sales Strategist**, powered by Gemini. 

I am ready to help you:
- **Craft personalized WhatsApp & cold pitch scripts** citing real Google reviews
- **Spar and overcome tough objections** ("We only use Instagram", "Too expensive")
- **Calculate bulletproof ROI math** that closes deals in under 2 hours

${activeLead ? `Currently reviewing: **${activeLead.name}** (${activeLead.category} in ${activeLead.city}). Feel free to ask anything about closing this specific client!` : 'Select any business lead or pick a topic below to begin.'}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.5-flash',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentPersona = PERSONAS.find((p) => p.id === selectedPersona) || PERSONAS[0];

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Build contextual system instruction with active lead data if present
      let contextualInstruction = currentPersona.systemInstruction;
      if (activeLead) {
        contextualInstruction += `\n\nCURRENT CONTEXT:
The user is currently evaluating this specific local business lead in LeadForge Studio:
- Business Name: ${activeLead.name}
- Category: ${activeLead.category}
- City / Country: ${activeLead.city}, ${activeLead.country}
- Google Rating: ${activeLead.rating} stars with ${activeLead.reviewCount} reviews
- Phone: ${activeLead.phone}
- WhatsApp: ${activeLead.whatsapp}
- Current Website Status: ${activeLead.websiteStatus} (No official domain)
- Proposed Pricing Tier: ${currency === 'NGN' ? `₦${(activeLead.proposedPrice * 1500).toLocaleString()}` : `$${activeLead.proposedPrice}`}
- Sample Customer Review: "${activeLead.reviews?.[0]?.text || 'Outstanding service'}"
Whenever relevant, tailor your advice or scripts specifically to this business!`;
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          systemInstruction: contextualInstruction,
          model: selectedModel,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to receive response from Gemini');
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'model',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || selectedModel,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: unknown) {
      console.error('Chatbot error:', err);
      const errText = err instanceof Error ? err.message : 'Unknown error';
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `⚠️ **Error communicating with Gemini AI**: ${errText}. Please verify your network or try again with a different model.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-reset-${Date.now()}`,
        role: 'model',
        content: `🔄 Conversation refreshed for **${currentPersona.name}**. How can I help you close your next deal today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel,
      },
    ]);
  };

  const handleCopyMessage = (index: number, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleInjectLeadContext = () => {
    if (!activeLead) return;
    const prompt = `Help me pitch ${activeLead.name} (${activeLead.category} in ${activeLead.city}). They have a ${activeLead.rating}★ rating with ${activeLead.reviewCount} reviews but no website. Give me a 3-step action plan to close them at ${currency === 'NGN' ? `₦${(activeLead.proposedPrice * 1500).toLocaleString()}` : `$${activeLead.proposedPrice}`}.`;
    handleSendMessage(prompt);
  };

  return (
    <div
      id="gemini-chatbot-container"
      className={`bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden flex flex-col transition-all duration-200 ${
        isFloating
          ? isExpanded
            ? 'fixed inset-4 sm:inset-10 z-50 max-w-5xl mx-auto h-[90vh]'
            : 'fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[480px] h-[620px] max-h-[85vh]'
          : 'w-full h-[720px]'
      }`}
    >
      {/* Header Bar */}
      <div className="bg-stone-900 text-stone-100 p-4 flex items-center justify-between border-b border-stone-800 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${currentPersona.color} flex items-center justify-center text-white shadow-xs shrink-0`}>
            <Bot className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-white truncate">
                Gemini Sales Copilot
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {currentPersona.badge}
              </span>
            </div>
            <p className="text-[11px] text-stone-400 truncate">
              {currentPersona.tagline}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          <button
            onClick={handleResetChat}
            title="Reset Conversation"
            className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {isFloating && (
            <>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Collapse' : 'Expand'}
                className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition hidden sm:block"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  title="Close Copilot"
                  className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Role and Model Selection Toolbar */}
      <div className="bg-stone-50 border-b border-stone-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
        {/* Role Selector Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
          {PERSONAS.map((p) => {
            const Icon = p.icon;
            const isSelected = selectedPersona === p.id;
            return (
              <button
                key={p.id}
                id={`persona-${p.id}`}
                onClick={() => setSelectedPersona(p.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:bg-stone-200/80 border border-stone-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-stone-500'}`} />
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Model Selection Dropdown */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-[10px] font-bold uppercase text-stone-400 hidden sm:inline">
            Model:
          </span>
          <select
            id="gemini-model-selector"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value as GeminiModelChoice)}
            className="text-xs font-semibold py-1 px-2.5 rounded-lg bg-white border border-stone-200 text-stone-800 shadow-2xs hover:border-stone-300 focus:outline-hidden"
          >
            <option value="gemini-3.5-flash">Gemini 3.5 Flash (Balanced)</option>
            <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash-Lite (Fast)</option>
            <option value="gemini-3.8-flash">Gemini 3.8 Flash (Maps & Grounded)</option>
            <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Deep Strategy)</option>
          </select>
        </div>
      </div>

      {/* Active Lead Context Notification Pill (if any) */}
      {activeLead && (
        <div className="bg-amber-50/70 border-b border-amber-200/60 px-4 py-2 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2 truncate text-amber-900">
            <Building2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">
              Evaluating: <strong>{activeLead.name}</strong> ({activeLead.category} · {activeLead.city})
            </span>
          </div>
          <button
            onClick={handleInjectLeadContext}
            className="text-[11px] font-bold text-amber-800 hover:text-amber-950 bg-amber-200/70 hover:bg-amber-300/80 px-2 py-0.5 rounded-md transition shrink-0 ml-2"
          >
            Pitch This Lead
          </button>
        </div>
      )}

      {/* Message Thread (Scrollable) */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-50/40">
        {messages.map((msg, index) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${currentPersona.color} flex items-center justify-center text-white shrink-0 shadow-2xs mt-0.5`}>
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-2xs relative group ${
                  isUser
                    ? 'bg-stone-900 text-white rounded-tr-xs'
                    : 'bg-white text-stone-800 border border-stone-200/90 rounded-tl-xs'
                }`}
              >
                {/* Header info in bubble */}
                <div className="flex items-center justify-between gap-4 mb-1.5 pb-1 border-b border-stone-100 text-[10px] text-stone-400">
                  <span className="font-semibold text-stone-500">
                    {isUser ? 'You' : currentPersona.name}
                  </span>
                  <div className="flex items-center gap-2">
                    {msg.modelUsed && !isUser && (
                      <span className="text-[9px] bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded font-mono">
                        {msg.modelUsed}
                      </span>
                    )}
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleCopyMessage(index, msg.content)}
                        title="Copy message"
                        className="opacity-0 group-hover:opacity-100 transition p-0.5 hover:text-stone-700"
                      >
                        {copiedIndex === index ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Content formatting */}
                <div className="space-y-1.5 whitespace-pre-wrap font-sans">
                  {msg.content}
                </div>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-lg bg-stone-800 flex items-center justify-center text-stone-200 shrink-0 shadow-2xs mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Bubble */}
        {isLoading && (
          <div className="flex items-start gap-2.5 justify-start">
            <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${currentPersona.color} flex items-center justify-center text-white shrink-0 shadow-2xs animate-pulse`}>
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-xs p-3.5 border border-stone-200 text-xs text-stone-500 flex items-center gap-2 shadow-2xs">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" />
              <span>Gemini is generating response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Suggestions */}
      <div className="px-4 py-2 bg-stone-50 border-t border-stone-200/80 overflow-x-auto scrollbar-none shrink-0">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Quick Prompts:
          </span>
          {STARTER_PROMPTS[selectedPersona].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 px-2.5 py-1 rounded-lg transition text-left truncate max-w-[280px]"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-3 bg-white border-t border-stone-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Ask ${currentPersona.name} anything (e.g. "How do I close a $400 deal in 2 hours?")...`}
            disabled={isLoading}
            className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900 transition disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-stone-200 text-stone-950 font-bold transition shadow-xs disabled:cursor-not-allowed shrink-0"
            title="Send Message"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
        <div className="flex items-center justify-between text-[10px] text-stone-400 mt-1 px-1">
          <span>Multi-turn conversational chat with history</span>
          <span>Powered by @google/genai</span>
        </div>
      </div>
    </div>
  );
};

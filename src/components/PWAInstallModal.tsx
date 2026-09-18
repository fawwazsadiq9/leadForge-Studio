import React, { useState } from 'react';
import { Download, Smartphone, Share2, PlusSquare, X, Check, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      setInstallSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="bg-stone-900 border border-stone-700 text-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative space-y-5 animate-in fade-in zoom-in duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xl shadow-md">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold font-display text-white">Deploy App to Phone</h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                PWA / Offline Ready
              </span>
            </div>
            <p className="text-xs text-stone-400">Install as a standalone native app on iOS or Android</p>
          </div>
        </div>

        {isInstalled ? (
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-3">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold">LeadForge is already installed!</p>
              <p className="text-emerald-300/80 text-[11px] mt-0.5">
                You are currently running the standalone app. Enjoy offline access and zero browser address bars!
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Direct Chrome / Android 1-Click Install */}
            {isInstallable && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>One-click install available for your browser.</span>
                </div>
                <button
                  id="btn-pwa-direct-install"
                  onClick={handleInstallClick}
                  className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{installSuccess ? 'Installing to Home Screen...' : 'Install App Now (1-Click)'}</span>
                </button>
              </div>
            )}

            {/* iOS Safari Instructions */}
            {isIOS && (
              <div className="space-y-3 bg-stone-800/80 p-4 rounded-2xl border border-stone-700">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <span>iPhone / iPad Installation (Safari)</span>
                </h4>
                <ol className="text-xs text-stone-300 space-y-2.5 list-decimal list-inside leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-amber-400 shrink-0">1.</span>
                    <span>
                      Tap the <strong>Share</strong> icon in the bottom Safari toolbar (square with upward arrow <Share2 className="w-3.5 h-3.5 inline mx-0.5 text-stone-300" />).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-amber-400 shrink-0">2.</span>
                    <span>
                      Scroll down and tap <strong>Add to Home Screen</strong> (<PlusSquare className="w-3.5 h-3.5 inline mx-0.5 text-stone-300" />).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-amber-400 shrink-0">3.</span>
                    <span>
                      Tap <strong>Add</strong> in the top-right corner. LeadForge will appear as a full standalone phone app!
                    </span>
                  </li>
                </ol>
              </div>
            )}

            {/* Universal Phone QR Code Scan or Direct Link */}
            {!isIOS && !isInstallable && (
              <div className="space-y-3 bg-stone-800/80 p-4 rounded-2xl border border-stone-700 text-xs text-stone-300">
                <p className="font-semibold text-stone-200">Open directly in your mobile browser:</p>
                <div className="p-2.5 rounded-xl bg-stone-950 font-mono text-[11px] text-amber-300 break-all select-all border border-stone-800">
                  {typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-kbsjjnlgyioouem23tod3z-906488018285.europe-west2.run.app'}
                </div>
                <div className="text-[11px] text-stone-400 space-y-1">
                  <p>• On Android: Tap Chrome menu (<strong>⋮</strong>) → <strong>Install app</strong>.</p>
                  <p>• On iPhone: Tap Safari <strong>Share</strong> → <strong>Add to Home Screen</strong>.</p>
                </div>
              </div>
            )}
          </>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-[11px] text-stone-400">
          <span>✓ Full-screen standalone view</span>
          <span>✓ Instant WhatsApp & phone hooks</span>
        </div>
      </div>
    </div>
  );
};

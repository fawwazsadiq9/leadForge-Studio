import React from 'react';
import { QrCode, Printer, Star, X, CheckCircle, Sparkles } from 'lucide-react';
import { BusinessLead } from '../types';

interface QrCodeGeneratorModalProps {
  lead: BusinessLead;
  onClose: () => void;
}

export const QrCodeGeneratorModal: React.FC<QrCodeGeneratorModalProps> = ({
  lead,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  // Construct a Google Chart QR code URL or SVG representation
  const targetUrl = `https://www.${lead.customDomainIdea}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(targetUrl)}&margin=10`;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full my-8 shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
              <QrCode className="w-3.5 h-3.5" />
              <span>PRINTABLE STOREFRONT MARKETING COLLATERAL</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display">
              Tabletop QR Standee for {lead.name}
            </h2>
            <p className="text-xs text-stone-400">
              Ready to print and place on reception desk, counter, or storefront window
            </p>
          </div>
          <button
            id="btn-close-qr-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Card Area */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-stone-700 flex flex-col items-center">
          <div
            id="printable-standee"
            className="w-full max-w-sm bg-white rounded-3xl border-4 border-stone-900 p-6 text-center shadow-xl space-y-4"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 block mb-1">
                SCAN WITH ANY SMARTPHONE
              </span>
              <h3 className="text-xl font-black text-stone-900 font-display leading-tight">
                {lead.name}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">{lead.category} · {lead.city}</p>
            </div>

            <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-sm">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{lead.rating} Google Rating</span>
              <span className="text-stone-400 text-xs">({lead.reviewCount} Reviews)</span>
            </div>

            {/* QR Code Image */}
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 inline-block shadow-inner">
              <img
                src={qrCodeUrl}
                alt={`QR code for ${lead.name}`}
                className="w-52 h-52 mx-auto rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <p className="font-mono text-xs font-bold text-stone-900">
                www.{lead.customDomainIdea}
              </p>
              <p className="text-[11px] text-stone-500">
                Book Appointments · View Price List · Verified Reviews
              </p>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-center gap-4 text-[10px] text-stone-400">
              <span>{lead.phone}</span>
              <span>•</span>
              <span>Open: {lead.hours.split('|')[0]}</span>
            </div>
          </div>

          <p className="text-[11px] text-stone-500 text-center max-w-md">
            Giving the business owner this tangible printable standee turns the digital website into an immediate physical reality for their shop or clinic.
          </p>
        </div>

        {/* Footer */}
        <div className="bg-stone-50 border-t border-stone-200 p-4 sm:p-6 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-medium">Standard 5" x 7" Standee Size</span>
          <button
            id="btn-print-qr-standee"
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Print Countertop Standee (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

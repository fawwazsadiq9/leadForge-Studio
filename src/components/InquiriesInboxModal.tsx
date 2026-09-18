import React from 'react';
import { Mail, MessageSquare, Phone, CheckCircle2, Clock, Calendar, Sparkles, X, User } from 'lucide-react';
import { ClientInquiry, BusinessLead } from '../types';

interface InquiriesInboxModalProps {
  lead: BusinessLead;
  inquiries: ClientInquiry[];
  onClose: () => void;
  onUpdateStatus: (inquiryId: string, status: ClientInquiry['status']) => void;
}

export const InquiriesInboxModal: React.FC<InquiriesInboxModalProps> = ({
  lead,
  inquiries,
  onClose,
  onUpdateStatus,
}) => {
  const leadInquiries = inquiries.filter((i) => i.leadId === lead.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-8 shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIVE LEAD CAPTURE ENGINE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display">
              Customer Inquiries for {lead.name}
            </h2>
            <p className="text-xs text-stone-400">
              Direct bookings captured through the website's 24/7 appointment system
            </p>
          </div>
          <button
            id="btn-close-inbox-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-stone-700">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-900 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Live Automated Lead Routing:
              </h4>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                Every visitor submission on www.{lead.customDomainIdea} triggers an instant WhatsApp notification to {lead.phone}.
              </p>
            </div>
            <span className="font-black text-emerald-950 text-sm whitespace-nowrap ml-4">
              {leadInquiries.length} Inquiries
            </span>
          </div>

          <div className="space-y-3">
            {leadInquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-4 rounded-2xl border border-stone-200 bg-white shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-700">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-xs">{inq.clientName}</h4>
                      <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {inq.createdAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <select
                      value={inq.status}
                      onChange={(e) => onUpdateStatus(inq.id, e.target.value as ClientInquiry['status'])}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-lg border border-stone-300 bg-stone-50"
                    >
                      <option value="new">🔴 New Request</option>
                      <option value="contacted">🟡 Contacted</option>
                      <option value="booked">🟢 Confirmed & Booked</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <div>
                    <span className="text-stone-400 font-medium">Requested Service:</span>
                    <p className="font-bold text-stone-900">{inq.serviceRequested}</p>
                  </div>
                  <div>
                    <span className="text-stone-400 font-medium">Preferred Date:</span>
                    <p className="font-bold text-stone-900 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-stone-500" />
                      {inq.preferredDate}
                    </p>
                  </div>
                  {inq.notes && (
                    <div className="sm:col-span-2 pt-1 border-t border-stone-200/50">
                      <span className="text-stone-400 font-medium">Client Notes:</span>
                      <p className="text-stone-700 italic">"{inq.notes}"</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-stone-500">Phone: {inq.phone}</span>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${inq.phone}`}
                      className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-bold text-[11px] flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call Client</span>
                    </a>

                    <a
                      href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hello ${inq.clientName}! This is ${lead.name}. We received your booking request for ${inq.serviceRequested} on ${inq.preferredDate}. We are happy to confirm your appointment!`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-xs"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Confirm on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {leadInquiries.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-stone-200 rounded-2xl space-y-2 text-stone-400">
                <Mail className="w-8 h-8 mx-auto text-stone-300" />
                <p className="font-bold text-xs">No simulated inquiries yet</p>
                <p className="text-[11px] max-w-sm mx-auto">
                  Submit the appointment form inside the Website Studio to test capturing customer inquiries.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-50 border-t border-stone-200 p-4 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs"
          >
            Close Inbox
          </button>
        </div>
      </div>
    </div>
  );
};

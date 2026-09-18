import { BusinessLead } from '../types';

export function generateStandaloneHtml(lead: BusinessLead, themeColor = 'teal'): string {
  const colorMap: Record<string, { primary: string; hover: string; light: string; text: string }> = {
    teal: { primary: '#0d9488', hover: '#0f766e', light: '#f0fdfa', text: '#115e59' },
    emerald: { primary: '#059669', hover: '#047857', light: '#ecfdf5', text: '#065f46' },
    amber: { primary: '#d97706', hover: '#b45309', light: '#fffbeb', text: '#92400e' },
    rose: { primary: '#e11d48', hover: '#be123c', light: '#fff1f2', text: '#9f1239' },
    indigo: { primary: '#4f46e5', hover: '#4338ca', light: '#eef2ff', text: '#3730a3' },
    slate: { primary: '#334155', hover: '#1e293b', light: '#f8fafc', text: '#0f172a' },
  };

  const colors = colorMap[themeColor] || colorMap.teal;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${lead.name} - ${lead.tagline}</title>
  <meta name="description" content="${lead.name} in ${lead.city}. Rated ${lead.rating} stars with ${lead.reviewCount} customer reviews. Book appointments and explore our services.">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-display { font-family: 'Playfair Display', serif; }
    :root {
      --primary-color: ${colors.primary};
      --primary-hover: ${colors.hover};
      --primary-light: ${colors.light};
      --primary-text: ${colors.text};
    }
  </style>
</head>
<body class="bg-stone-50 text-stone-800 antialiased selection:bg-teal-500 selection:text-white">

  <!-- Top Announcement Bar -->
  <div class="bg-stone-900 text-stone-200 text-xs py-2 px-4 text-center flex items-center justify-center gap-3">
    <span class="inline-flex items-center gap-1 font-medium text-amber-400">
      ★ ${lead.rating} Rating on Google Maps (${lead.reviewCount} Verified Reviews)
    </span>
    <span class="hidden sm:inline text-stone-500">|</span>
    <span class="hidden sm:inline">${lead.address}</span>
    <span class="hidden sm:inline text-stone-500">|</span>
    <a href="tel:${lead.phone}" class="underline font-semibold hover:text-white">${lead.phone}</a>
  </div>

  <!-- Main Navigation -->
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-stone-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
      <div>
        <a href="#home" class="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 font-display">
          ${lead.name}
        </a>
        <p class="text-xs text-stone-500 font-medium">${lead.category} · ${lead.city}</p>
      </div>
      <nav class="hidden md:flex items-center space-x-8 text-sm font-semibold text-stone-600">
        <a href="#services" class="hover:text-stone-900 transition-colors">Services</a>
        <a href="#about" class="hover:text-stone-900 transition-colors">About Us</a>
        <a href="#reviews" class="hover:text-stone-900 transition-colors">Reviews</a>
        <a href="#location" class="hover:text-stone-900 transition-colors">Hours & Map</a>
      </nav>
      <div class="flex items-center gap-3">
        <a href="https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.name)},%20I%20saw%20your%20website%20and%20would%20like%20to%20make%20an%20inquiry." target="_blank"
           class="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm">
          WhatsApp Us
        </a>
        <a href="#book" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white shadow-md transition" style="background-color: ${colors.primary};">
          Book Appointment
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="home" class="relative py-16 sm:py-24 overflow-hidden border-b border-stone-200" style="background: linear-gradient(to bottom, ${colors.light}, #ffffff);">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-7 space-y-6">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-stone-200 shadow-xs">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Open Today · ${lead.hours.split('|')[0] || lead.hours}</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight font-display">
          ${lead.tagline}
        </h1>
        <p class="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
          ${lead.aboutStory}
        </p>

        <!-- Trust Badges -->
        <div class="flex flex-wrap items-center gap-4 pt-2">
          <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-stone-200 shadow-xs">
            <span class="text-amber-500 font-bold text-lg">★ ${lead.rating}</span>
            <span class="text-xs text-stone-600 font-medium">Google Rating<br>(${lead.reviewCount} reviews)</span>
          </div>
          <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-stone-200 shadow-xs">
            <span class="text-stone-900 font-bold text-lg">100%</span>
            <span class="text-xs text-stone-600 font-medium">Satisfaction<br>Commitment</span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
          <a href="#book" class="inline-flex justify-center items-center px-8 py-3.5 rounded-xl text-sm font-bold text-white shadow-lg transition transform active:scale-95" style="background-color: ${colors.primary};">
            Request an Appointment
          </a>
          <a href="tel:${lead.phone}" class="inline-flex justify-center items-center px-6 py-3.5 rounded-xl text-sm font-semibold bg-white border border-stone-300 text-stone-800 hover:bg-stone-50 transition shadow-xs">
            Call ${lead.phone}
          </a>
        </div>
      </div>

      <div class="lg:col-span-5 relative">
        <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200 bg-white">
          <img src="${lead.photos[0]}" alt="${lead.name}" class="w-full h-80 sm:h-96 object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div class="absolute bottom-4 left-4 right-4 text-white">
            <p class="text-xs font-semibold uppercase tracking-wider text-amber-300">${lead.category}</p>
            <p class="text-lg font-bold font-display">${lead.name}</p>
            <p class="text-xs text-stone-200">${lead.address}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Highlights / Why Choose Us -->
  <section class="py-12 bg-white border-b border-stone-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${lead.highlights.map((item, idx) => `
          <div class="p-6 rounded-xl border border-stone-100 bg-stone-50/50 hover:bg-stone-50 transition">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-white mb-3" style="background-color: ${colors.primary};">
              0${idx + 1}
            </div>
            <h3 class="text-sm font-bold text-stone-900 mb-1">${item}</h3>
            <p class="text-xs text-stone-500 leading-normal">Dedicated to delivering exceptional quality and patient satisfaction every single day.</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="py-16 sm:py-24 bg-stone-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <p class="text-xs uppercase tracking-widest font-bold mb-2" style="color: ${colors.primary};">Our Expertise</p>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-stone-900 font-display">Specialized Services & Treatments</h2>
        <p class="text-sm sm:text-base text-stone-600 mt-3">Tailored treatments executed by certified professionals with transparent pricing and exceptional care.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${lead.services.map((svc) => `
          <div class="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div class="flex items-start justify-between gap-4 mb-3">
                <h3 class="text-lg font-bold text-stone-900">${svc.title}</h3>
                ${svc.priceEstimate ? `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 whitespace-nowrap">${svc.priceEstimate}</span>` : ''}
              </div>
              <p class="text-sm text-stone-600 leading-relaxed mb-6">${svc.description}</p>
            </div>
            <div class="pt-4 border-t border-stone-100 flex items-center justify-between">
              <a href="#book" class="text-xs font-bold hover:underline" style="color: ${colors.primary};">Schedule This Service →</a>
              <a href="https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}?text=Hello,%20I%20am%20interested%20in%20learning%20more%20about%20${encodeURIComponent(svc.title)}" target="_blank" class="text-xs font-semibold text-stone-500 hover:text-stone-800">
                Inquire via WhatsApp
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Google Reviews / Social Proof -->
  <section id="reviews" class="py-16 sm:py-24 bg-white border-y border-stone-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <p class="text-xs uppercase tracking-widest font-bold mb-2" style="color: ${colors.primary};">Client Testimonials</p>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-stone-900 font-display">Backed by ${lead.reviewCount}+ 5-Star Reviews</h2>
        </div>
        <div class="mt-4 md:mt-0 flex items-center gap-2">
          <div class="text-amber-500 text-xl font-bold">★★★★★</div>
          <span class="text-sm font-semibold text-stone-800">${lead.rating} Out of 5.0 on Google Maps</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${lead.reviews.map((rev) => `
          <div class="bg-stone-50 p-6 rounded-2xl border border-stone-200/70 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 text-amber-500 mb-3 text-sm">
                ${'★'.repeat(Math.floor(rev.rating))}
              </div>
              <p class="text-sm text-stone-700 italic leading-relaxed mb-6">"${rev.text}"</p>
            </div>
            <div class="flex items-center justify-between border-t border-stone-200/60 pt-4">
              <div>
                <p class="text-xs font-bold text-stone-900">${rev.author}</p>
                <p class="text-[11px] text-stone-500">Verified Google Review</p>
              </div>
              <span class="text-[11px] text-stone-400 font-medium">${rev.relativeTime || 'Recent'}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Interactive Booking Form & Map -->
  <section id="book" class="py-16 sm:py-24 bg-stone-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <!-- Booking Form -->
        <div class="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-stone-200 shadow-md">
          <p class="text-xs uppercase tracking-widest font-bold mb-2" style="color: ${colors.primary};">Instant Reservation</p>
          <h2 class="text-2xl sm:text-3xl font-bold text-stone-900 mb-3 font-display">Book Your Consultation</h2>
          <p class="text-sm text-stone-600 mb-8">Fill in your preferred details below. Our desk will confirm your appointment within 15 minutes.</p>

          <form onsubmit="handleAppointmentSubmit(event)" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-stone-700 mb-1">Your Full Name *</label>
                <input id="clientName" required type="text" placeholder="e.g. Samuel Ade" class="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
              </div>
              <div>
                <label class="block text-xs font-bold text-stone-700 mb-1">Phone / WhatsApp Number *</label>
                <input id="clientPhone" required type="tel" placeholder="${lead.phone}" class="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-stone-700 mb-1">Select Service *</label>
                <select id="clientService" class="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                  ${lead.services.map((s) => `<option value="${s.title}">${s.title}</option>`).join('')}
                  <option value="General Consultation">General Consultation / First Visit</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-stone-700 mb-1">Preferred Date</label>
                <input id="clientDate" type="date" class="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-stone-700 mb-1">Notes or Special Requirements</label>
              <textarea id="clientNotes" rows="3" placeholder="Briefly describe what you need..." class="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"></textarea>
            </div>

            <button type="submit" class="w-full py-3.5 rounded-xl text-sm font-bold text-white shadow-lg transition" style="background-color: ${colors.primary};">
              Confirm & Send Booking Request
            </button>
            <p class="text-xs text-stone-400 text-center">No payment required now. You can pay securely upon arrival at our clinic.</p>
          </form>

          <div id="bookingConfirmation" class="hidden mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
            <p class="font-bold">✓ Booking Request Received!</p>
            <p class="text-xs mt-1 text-emerald-700">Thank you! Click below to send an instant reminder to our WhatsApp desk:</p>
            <a id="whatsappConfirmBtn" href="#" target="_blank" class="inline-block mt-3 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700">
              Open in WhatsApp & Notify Manager
            </a>
          </div>
        </div>

        <!-- Location & Hours Card -->
        <div id="location" class="lg:col-span-5 space-y-6">
          <div class="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
            <h3 class="text-lg font-bold text-stone-900 mb-4 font-display">Visit Our Premises</h3>
            <div class="space-y-3 text-sm text-stone-600">
              <div class="flex items-start gap-3">
                <span class="text-stone-400 font-bold">📍</span>
                <div>
                  <p class="font-semibold text-stone-900">${lead.name}</p>
                  <p>${lead.address}</p>
                  <p class="text-xs text-stone-500 mt-1">${lead.city}, ${lead.country}</p>
                </div>
              </div>
              <div class="flex items-start gap-3 pt-2 border-t border-stone-100">
                <span class="text-stone-400 font-bold">🕒</span>
                <div>
                  <p class="font-semibold text-stone-900">Opening Hours</p>
                  <p class="text-xs text-stone-600">${lead.hours}</p>
                </div>
              </div>
              <div class="flex items-start gap-3 pt-2 border-t border-stone-100">
                <span class="text-stone-400 font-bold">📞</span>
                <div>
                  <p class="font-semibold text-stone-900">Direct Telephone</p>
                  <a href="tel:${lead.phone}" class="text-xs font-bold text-teal-700 underline">${lead.phone}</a>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-stone-100 flex items-center gap-3">
              <a href="https://maps.google.com/?q=${encodeURIComponent(lead.name + ' ' + lead.address)}" target="_blank" class="w-full py-2.5 rounded-xl border border-stone-300 text-center text-xs font-bold text-stone-700 hover:bg-stone-50 transition">
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-stone-950 text-stone-400 py-12 border-t border-stone-800 text-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <p class="font-bold text-white text-sm">${lead.name}</p>
        <p class="mt-0.5">${lead.tagline}</p>
      </div>
      <p>© ${new Date().getFullYear()} ${lead.name}. All rights reserved. Professional web design by LeadForge Studio.</p>
    </div>
  </footer>

  <script>
    function handleAppointmentSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('clientName').value;
      const phone = document.getElementById('clientPhone').value;
      const service = document.getElementById('clientService').value;
      const date = document.getElementById('clientDate').value || 'Soonest available';
      const notes = document.getElementById('clientNotes').value || 'No additional notes';

      const box = document.getElementById('bookingConfirmation');
      box.classList.remove('hidden');

      const whatsappText = encodeURIComponent(
        'Hello ${lead.name}, my name is ' + name + '. I just submitted an appointment request on your website for ' + service + ' on ' + date + '. My phone: ' + phone + '. Notes: ' + notes
      );
      const waBtn = document.getElementById('whatsappConfirmBtn');
      waBtn.href = 'https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}?text=' + whatsappText;
    }
  </script>
</body>
</html>`;
}

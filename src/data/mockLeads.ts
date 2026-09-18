import { BusinessLead, PricingTier, ClientInquiry } from '../types';

export const INITIAL_LEADS: BusinessLead[] = [
  {
    id: 'lead-ng-lagos-1',
    name: 'Crown Heights Dental Clinic',
    category: 'Dental & Oral Healthcare',
    tagline: 'Premier Cosmetic & General Dentistry in Ikeja',
    city: 'Ikeja, Lagos',
    country: 'Nigeria',
    address: '14 Allen Avenue, Ikeja, Lagos State',
    rating: 4.8,
    reviewCount: 142,
    hasWebsite: false,
    websiteStatus: 'no_website',
    phone: '+234 803 452 8910',
    whatsapp: '+2348034528910',
    hours: 'Mon - Sat: 8:00 AM - 6:30 PM (Emergency 24/7 on call)',
    priceRange: '₦₦',
    services: [
      { title: 'Teeth Whitening & Scaling', description: 'Advanced laser scaling and painless deep polish for an immaculate smile.', priceEstimate: 'From ₦35,000' },
      { title: 'Dental Implants & Crowns', description: 'Permanent natural-looking ceramic restorations engineered for durability.', priceEstimate: 'Custom quote' },
      { title: 'Orthodontics & Clear Aligners', description: 'Precision teeth alignment and discreet clear aligners for teens & adults.', priceEstimate: 'From ₦250,000' },
      { title: 'Emergency Tooth Extraction', description: 'Zero-pain sedation extractions with rapid gentle healing protocol.', priceEstimate: 'From ₦25,000' }
    ],
    highlights: [
      'Over 12 years serving Ikeja families',
      'Gentle pediatric & adult sedation dentistry',
      'Modern digital 3D intraoral imaging',
      'Zero long waiting times with scheduled slots'
    ],
    reviews: [
      {
        author: 'Dr. Tunde Alabi',
        rating: 5,
        text: 'The best dental experience in Lagos by a mile. Dr. Michael was so gentle with my scaling, practically zero pain. They deserve a proper website so more people find them!',
        relativeTime: '2 weeks ago'
      },
      {
        author: 'Ngozi Eze',
        rating: 5,
        text: 'Clean facility, friendly nurses, and transparent pricing. I had to look up their address on Google Maps because they had no official site. Top notch service!',
        relativeTime: '1 month ago'
      },
      {
        author: 'Babatunde Williams',
        rating: 4.8,
        text: 'Got my ceramic crowns done here. Perfect bite alignment and friendly front desk. Highly recommended.',
        relativeTime: '2 months ago'
      }
    ],
    photos: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: 'teal',
    fontStyle: 'modern',
    status: 'discovered',
    proposedPrice: 400,
    currency: 'USD',
    customDomainIdea: 'crownheightsdentalng.com',
    aboutStory: 'Founded in 2012 in the bustling heart of Ikeja, Crown Heights Dental Clinic provides world-class preventive, surgical, and cosmetic dental treatments. Led by seasoned maxillofacial specialists, our mission is restoring confidence through radiant, healthy smiles using cutting-edge sterile technology.',
    whyTheyNeedWebsite: 'Currently losing 40+ prospective patients a month who search "dentist near Ikeja" on Google and click competing clinics with instant appointment booking.'
  },
  {
    id: 'lead-ng-abuja-2',
    name: 'Apex Precision Auto Masters',
    category: 'European & Luxury Auto Repair',
    tagline: 'Certified German & Japanese Vehicle Specialists in Wuse',
    city: 'Wuse 2, Abuja',
    country: 'Nigeria',
    address: 'Plot 722 Adetokunbo Ademola Crescent, Wuse 2, Abuja, FCT',
    rating: 4.9,
    reviewCount: 96,
    hasWebsite: false,
    websiteStatus: 'no_website',
    phone: '+234 812 904 3311',
    whatsapp: '+2348129043311',
    hours: 'Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 4:00 PM',
    priceRange: '₦₦₦',
    services: [
      { title: 'Computerized Diagnostics & ECU Remapping', description: 'Dealer-level OBD2 diagnostics for Mercedes, BMW, Audi, Lexus, Range Rover.', priceEstimate: 'From ₦25,000' },
      { title: 'Automatic Transmission Overhaul', description: 'Precision valve body servicing, torque converter flush, and gear rebuilds.', priceEstimate: 'Custom quote' },
      { title: 'Brembo Brake & Air Suspension Repair', description: 'Airmatic bladder replacement, valve blocks, calibration & performance discs.', priceEstimate: 'From ₦65,000' },
      { title: 'Scheduled Preventive Maintenance', description: 'Full synthetic oil, OEM filtration, spark plugs, fluids & 35-point safety check.', priceEstimate: 'From ₦45,000' }
    ],
    highlights: [
      'Certified Bosch & Star Diagnostic equipment',
      'Genuine OEM parts directly imported from Germany',
      '6-Month warranty on all major mechanical repairs',
      'Comfortable air-conditioned customer lounge with WiFi'
    ],
    reviews: [
      {
        author: 'Engr. Suleiman Danladi',
        rating: 5,
        text: 'They solved a complex gearbox jerk in my Mercedes E350 that two official dealerships failed to diagnose for months. Fair billing and extreme professionalism.',
        relativeTime: '3 weeks ago'
      },
      {
        author: 'Chioma Okonjo',
        rating: 5,
        text: 'Honest mechanics are rare in Abuja! Apex diagnosed my Lexus RX350 steering noise in 15 minutes and fixed it same day without overcharging. They really need a website.',
        relativeTime: '1 month ago'
      }
    ],
    photos: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: 'amber',
    fontStyle: 'display',
    status: 'discovered',
    proposedPrice: 450,
    currency: 'USD',
    customDomainIdea: 'apexautomastersabuja.com',
    aboutStory: 'Apex Precision Auto Masters has been Abuja’s trusted luxury workshop since 2016. Our master technicians combine dealership-grade digital scanners with meticulous European craftsmanship to keep your Mercedes, BMW, Audi, Lexus, and Porsche running at peak factory performance.',
    whyTheyNeedWebsite: 'Abuja expatriates, diplomats, and corporate executives search online for reputable luxury mechanics every day. A sleek web presence with service price estimators will immediately secure high-margin fleet maintenance contracts.'
  },
  {
    id: 'lead-ng-ph-3',
    name: 'Flour & Fire Artisan Bakery & Bistro',
    category: 'Artisan Bakery & Specialty Cafe',
    tagline: 'Handcrafted Sourdough, Custom Cakes & Gourmet Brunch in GRA',
    city: 'Port Harcourt',
    country: 'Nigeria',
    address: '22 Tombia Street, GRA Phase 2, Port Harcourt, Rivers State',
    rating: 4.9,
    reviewCount: 218,
    hasWebsite: false,
    websiteStatus: 'social_only',
    phone: '+234 809 778 1122',
    whatsapp: '+2348097781122',
    hours: 'Tue - Sun: 7:30 AM - 8:30 PM (Closed Mondays)',
    priceRange: '₦₦',
    services: [
      { title: 'Signature Wedding & Celebration Cakes', description: 'Tiered architectural cakes crafted with Italian meringue buttercream.', priceEstimate: 'From ₦45,000' },
      { title: 'Slow-Fermented Artisan Sourdough & Croissants', description: 'Wild yeast naturally leavened bread and laminated butter viennoiserie.', priceEstimate: 'From ₦3,500' },
      { title: 'Gourmet Brunch & Specialty Coffee', description: 'Avocado tartines, shakshuka, eggs Benedict paired with freshly pulled single-origin espresso.', priceEstimate: 'From ₦6,000' },
      { title: 'Corporate Catering & Dessert Boxes', description: 'Custom pastry boxes, mini quiches, and dessert tables for executive meetings.', priceEstimate: 'Custom packages' }
    ],
    highlights: [
      'Freshly baked daily from 5:00 AM using 100% pure butter',
      'Voted Top Brunch spot in Port Harcourt GRA',
      'Zero artificial preservatives or trans fats',
      'Direct order pickup and chilled courier delivery across PH'
    ],
    reviews: [
      {
        author: 'Tamuno Briggs',
        rating: 5,
        text: 'The almond croissants rival Paris! I ordered my daughter’s 10th birthday cake from here via Instagram DM which took forever—a website with direct cake builder would be heavenly!',
        relativeTime: '4 days ago'
      },
      {
        author: 'Sarah Ibiwari',
        rating: 5,
        text: 'Best eggs benedict and iced caramel latte in the entire South-South. Cozy ambiance and great staff.',
        relativeTime: '2 weeks ago'
      }
    ],
    photos: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: 'rose',
    fontStyle: 'serif',
    status: 'discovered',
    proposedPrice: 350,
    currency: 'USD',
    customDomainIdea: 'flourandfirebakery.com',
    aboutStory: 'Founded by Le Cordon Bleu-trained pastry chef Amara Peters, Flour & Fire brings authentic French viennoiserie and rustic sourdough baking to Port Harcourt. Every loaf is naturally fermented for 36 hours for exceptional depth of flavor and easy digestion.',
    whyTheyNeedWebsite: 'They currently lose hours answering repeated cake pricing questions on WhatsApp and Instagram DM. An interactive menu with instant online cake reservations and wedding consultation booking will double their high-ticket cake revenue.'
  },
  {
    id: 'lead-ng-lekki-4',
    name: 'Serenity Oasis Wellness & MedSpa',
    category: 'Aesthetic Dermatology & Day Spa',
    tagline: 'Luxury Rejuvenation, Deep Tissue Massage & Skin Therapy in Lekki',
    city: 'Lekki Phase 1, Lagos',
    country: 'Nigeria',
    address: '18 Admiralty Way, Lekki Phase 1, Lagos',
    rating: 4.8,
    reviewCount: 175,
    hasWebsite: false,
    websiteStatus: 'no_website',
    phone: '+234 818 223 9944',
    whatsapp: '+2348182239944',
    hours: 'Daily: 9:00 AM - 8:00 PM',
    priceRange: '₦₦₦',
    services: [
      { title: 'HydraFacial MD & Chemical Peels', description: 'Deep pore extraction, hyaluronic infusion, and clinical glow resurfacing.', priceEstimate: 'From ₦50,000' },
      { title: 'Hot Stone & Swedish Deep Tissue Therapy', description: 'Therapeutic muscle decompression using organic aromatherapeutic botanical oils.', priceEstimate: 'From ₦35,000' },
      { title: 'Body Sculpting & Lymphatic Drainage', description: 'Non-invasive cavitation, radiofrequency contouring, and detox wraps.', priceEstimate: 'From ₦65,000' },
      { title: 'Bridal & Couples Pamper Packages', description: 'Exclusive private suite access with champagne, foot baths & full body scrub.', priceEstimate: 'From ₦120,000' }
    ],
    highlights: [
      'Certified aesthetic dermatologists and holistic therapists',
      'Private soundproof VIP treatment suites',
      'Organic cold-pressed essential oils',
      'Over 5,000 satisfied Lekki and Victoria Island clients'
    ],
    reviews: [
      {
        author: 'Funke Akindele-Cole',
        rating: 5,
        text: 'The ambiance is sheer paradise. Had the deep tissue massage after a stressful week in Victoria Island traffic. Left feeling reborn! They need an online booking portal urgently.',
        relativeTime: '1 week ago'
      },
      {
        author: 'David Oladipo',
        rating: 4.9,
        text: 'Booked a couples package for our anniversary. Professional therapists and spotlessly clean. 10/10 service.',
        relativeTime: '3 weeks ago'
      }
    ],
    photos: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: 'emerald',
    fontStyle: 'serif',
    status: 'discovered',
    proposedPrice: 500,
    currency: 'USD',
    customDomainIdea: 'serenitymedspalekki.com',
    aboutStory: 'Serenity Oasis Wellness & MedSpa is an exclusive urban sanctuary nestled on Admiralty Way. We merge state-of-the-art non-invasive cosmetic dermatology with timeless holistic relaxation rituals to provide rejuvenating escapes for modern Lagos professionals.',
    whyTheyNeedWebsite: 'High-income Lekki residents expect frictionless online appointment scheduling, gift card purchases, and transparent treatment menus rather than back-and-forth WhatsApp inquiries.'
  },
  {
    id: 'lead-us-houston-5',
    name: 'Bayou City Custom Metal & Gates',
    category: 'Architectural Welding & Ironwork',
    tagline: 'Custom Ornamental Driveway Gates, Railings & Structural Steel',
    city: 'Houston, Texas',
    country: 'United States',
    address: '4920 Washington Ave, Houston, TX 77007',
    rating: 4.9,
    reviewCount: 88,
    hasWebsite: false,
    websiteStatus: 'no_website',
    phone: '+1 (713) 555-0194',
    whatsapp: '+17135550194',
    hours: 'Mon - Fri: 7:00 AM - 5:00 PM | Sat by Appointment',
    priceRange: '$$$',
    services: [
      { title: 'Automatic Driveway Gates & Openers', description: 'Heavy-duty forged wrought iron gates with LiftMaster keypad & smartphone integration.', priceEstimate: 'From $2,800' },
      { title: 'Custom Modern Staircase Railings', description: 'Cable railings, glass clamps, and horizontal steel bars for luxury remodels.', priceEstimate: 'From $1,500' },
      { title: 'Commercial Security Fencing', description: 'Anti-climb industrial perimeter enclosures with certified powder-coated finish.', priceEstimate: 'Free estimate' },
      { title: 'Mobile Welding & Emergency Repairs', description: 'On-site MIG/TIG structural steel repairs for residential & commercial gates.', priceEstimate: 'From $250' }
    ],
    highlights: [
      '20+ years master fabrication in Greater Houston',
      'Lifetime structural warranty on all welded frames',
      'Free in-person 3D design consultation & measurements',
      'Fully licensed and insured ($2M general liability)'
    ],
    reviews: [
      {
        author: 'Robert Sterling',
        rating: 5,
        text: 'Carlos and his fabrication crew built an 18-foot automatic iron gate for my Heights home. Flawless craftsmanship, solid welds, and worked in the Texas heat with a smile. Carlos told me he relies only on word of mouth—he would get 5x more jobs with a clean website!',
        relativeTime: '2 weeks ago'
      },
      {
        author: 'Melissa Vance',
        rating: 5,
        text: 'Replaced our outdated wooden staircase railing with matte black modern horizontal steel. Transformed the entire house. True artists.',
        relativeTime: '1 month ago'
      }
    ],
    photos: [
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: 'slate',
    fontStyle: 'display',
    status: 'discovered',
    proposedPrice: 500,
    currency: 'USD',
    customDomainIdea: 'bayoucustommetal.com',
    aboutStory: 'Founded in 2004, Bayou City Custom Metal is Houston’s benchmark for architectural metal fabrication. We forge custom driveway gates, modern iron balustrades, and structural steel solutions that enhance curb appeal and secure private estates.',
    whyTheyNeedWebsite: 'Homeowners in River Oaks, The Heights, and Katy search online for custom gate estimates. A single gate job nets $3,000-$8,000, so a $500 website delivers an instant 10x ROI on the very first lead captured.'
  },
  {
    id: 'lead-uk-london-6',
    name: 'Kensington Heritage Clock & Watchmaker',
    category: 'Luxury Timepiece Restoration & Repair',
    tagline: 'Master Swiss Watchmaking, Dial Restoration & Heritage Overhauls',
    city: 'Kensington, London',
    country: 'United Kingdom',
    address: '42 Old Brompton Rd, South Kensington, London SW7 3DY',
    rating: 4.9,
    reviewCount: 112,
    hasWebsite: false,
    websiteStatus: 'no_website',
    phone: '+44 20 7946 0882',
    whatsapp: '+442079460882',
    hours: 'Mon - Fri: 9:30 AM - 5:30 PM | Sat: 10:00 AM - 3:00 PM',
    priceRange: '$$$',
    services: [
      { title: 'Full Movement Overhaul & Disassembly', description: 'Complete sonic cleaning, synthetic lubrication, escapement regulation, and pressure test.', priceEstimate: 'From £320' },
      { title: 'Rolex, Omega & Patek Philippe Polishing', description: 'Factory-standard micro-lapping to restore crisp beveled edges without over-polishing.', priceEstimate: 'From £180' },
      { title: 'Antique Dial & Crystal Restoration', description: 'Restoration of patinated dials, luminescent tritium stabilization, and custom sapphire crystals.', priceEstimate: 'Custom quote' },
      { title: 'Pre-Purchase Authenticity Valuation', description: 'Physical inspection with timegrapher amplitude testing and serial registry check.', priceEstimate: '£95' }
    ],
    highlights: [
      'WOSTEP & BHI certified horologists with 35+ years experience',
      'Cleanroom workshop with micro-pressure vacuum testing',
      '2-Year written warranty on all complete mechanical overhauls',
      'Fully insured vault storage for collector watches'
    ],
    reviews: [
      {
        author: 'Sir Arthur Pendelton',
        rating: 5,
        text: 'Restored my grandfather’s 1964 Omega Speedmaster back to +2 seconds a day. Exceptional integrity and deep horological knowledge. Extraordinary service that deserves an elegant online showcase.',
        relativeTime: '3 weeks ago'
      },
      {
        author: 'Charlotte De Vries',
        rating: 5,
        text: 'The only watchmaker in London I trust with my vintage Cartier Santos. Always honest, courteous, and transparent.',
        relativeTime: '2 months ago'
      }
    ],
    photos: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: 'indigo',
    fontStyle: 'serif',
    status: 'discovered',
    proposedPrice: 480,
    currency: 'USD',
    customDomainIdea: 'kensingtonwatchrestoration.co.uk',
    aboutStory: 'Located steps from the V&A Museum in South Kensington, our atelier has preserved the art of Swiss and British horology for three decades. We restore vintage family heirlooms and modern luxury timepieces with surgical precision.',
    whyTheyNeedWebsite: 'Wealthy timepiece collectors across London and international visitors need an authoritative web presence with mail-in repair intake forms and past restoration galleries.'
  },
  {
    id: 'lead-ng-ibadan-7',
    name: 'Bodija Agro-Veterinary & Pet Care',
    category: 'Veterinary Clinic & Farm Supply',
    tagline: 'Comprehensive Small Animal Surgery & Farm Livestock Care in Bodija',
    city: 'Bodija, Ibadan',
    country: 'Nigeria',
    address: 'Plot 15 Old Bodija Road, Ibadan, Oyo State',
    rating: 4.7,
    reviewCount: 104,
    hasWebsite: false,
    websiteStatus: 'no_website',
    phone: '+234 802 331 4455',
    whatsapp: '+2348023314455',
    hours: 'Mon - Sat: 8:00 AM - 7:00 PM (24hr Emergency Line)',
    priceRange: '₦₦',
    services: [
      { title: 'Pet Vaccinations & Microchipping', description: 'Rabies, DHPP, deworming, and health certification for domestic pets.', priceEstimate: 'From ₦12,000' },
      { title: 'Surgical Procedures & Neutering', description: 'Sterile soft-tissue surgery, spay/neuter, and orthopedic fracture fixation.', priceEstimate: 'From ₦35,000' },
      { title: 'Poultry & Farm Livestock Consulting', description: 'Disease diagnosis, biosecurity protocols, and feed optimization for farms in Oyo.', priceEstimate: 'From ₦25,000' },
      { title: 'Pet Boarding & Grooming Spa', description: 'Air-conditioned pet suites, medicated flea baths, and nail trimming.', priceEstimate: 'From ₦8,000/night' }
    ],
    highlights: [
      'Resident Veterinary Doctors licensed by VCN',
      'Emergency mobile ambulance across Ibadan metropolis',
      'In-house diagnostic blood laboratory',
      'Over 10 years serving pet parents & commercial farmers'
    ],
    reviews: [
      {
        author: 'Dr. Adebayo Adeleke',
        rating: 5,
        text: 'Saved my German Shepherd from severe parvovirus when other clinics gave up. The doctors are compassionate and attentive. They really should have a proper website so pet owners find them immediately in emergencies.',
        relativeTime: '2 weeks ago'
      },
      {
        author: 'Yinka Olatunji',
        rating: 4.8,
        text: 'Best veterinary pharmacy and clinic in Bodija. Honest advice and fair charges.',
        relativeTime: '1 month ago'
      }
    ],
    photos: [
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: 'teal',
    fontStyle: 'modern',
    status: 'discovered',
    proposedPrice: 350,
    currency: 'USD',
    customDomainIdea: 'bodijavetcare.com',
    aboutStory: 'Founded in 2014 by Dr. Samuel Babalola (DVM), Bodija Agro-Veterinary combines compassionate small animal care with practical agricultural livestock consulting. We operate Ibadan’s premier clinic equipped with modern surgical suites and emergency triage.',
    whyTheyNeedWebsite: 'When pets get sick at night, pet parents panic and search on their phones: "24 hour emergency vet Ibadan". Without a website showing their emergency hotline and location, they miss dozens of life-saving clients every week.'
  },
  {
    id: 'lead-ae-dubai-8',
    name: 'Al Quoz Heritage Carpentry & Bespoke Joinery',
    category: 'Custom Furniture & Interior Joinery',
    tagline: 'Handcrafted Teak, Oak & Walnut Luxury Millwork in Dubai',
    city: 'Al Quoz Industrial 3, Dubai',
    country: 'United Arab Emirates',
    address: 'Warehouse 14, Street 8, Al Quoz 3, Dubai',
    rating: 4.9,
    reviewCount: 138,
    hasWebsite: false,
    websiteStatus: 'no_website',
    phone: '+971 4 338 9912',
    whatsapp: '+97143389912',
    hours: 'Mon - Sat: 8:00 AM - 7:00 PM',
    priceRange: '$$$',
    services: [
      { title: 'Bespoke Solid Wood Dining Tables', description: 'Live-edge walnut and aged teak dining tables with hand-buffed organic oil finishes.', priceEstimate: 'From AED 4,500' },
      { title: 'Custom Walk-In Wardrobes & Cabinetry', description: 'Architectural fluted wood panels, concealed LED lighting, and soft-close German hardware.', priceEstimate: 'Custom quote' },
      { title: 'Outdoor Teak Pergolas & Decking', description: 'Marine-grade weather-resistant teak and ipe decking engineered for Dubai desert heat.', priceEstimate: 'From AED 350/sqm' },
      { title: 'Commercial Restaurant & Boutique Fit-Outs', description: 'Bespoke barista bars, acoustic slat walls, and custom reception desks.', priceEstimate: 'Full turnkey project' }
    ],
    highlights: [
      'Family-owned joinery workshop active in UAE since 1998',
      'Imported FSC-certified European hardwoods and Indonesian teak',
      'Laser-precise 3D CAD shop drawings before manufacturing',
      'Installed in luxury villas across Palm Jumeirah & Emirates Hills'
    ],
    reviews: [
      {
        author: 'Rashid Al Maktoum',
        rating: 5,
        text: 'Master Tariq built an 8-seater live edge dining table for our villa. The wood grain and joinery are museum-quality. It is astonishing they only operate by phone and word of mouth without a website.',
        relativeTime: '1 month ago'
      },
      {
        author: 'Sophie Dupont',
        rating: 5,
        text: 'Transformed our master bedroom with floor-to-ceiling fluted oak wardrobes. Clean installation, on time, and reasonably priced for Dubai standards.',
        relativeTime: '2 months ago'
      }
    ],
    photos: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
    ],
    themeColor: 'amber',
    fontStyle: 'serif',
    status: 'discovered',
    proposedPrice: 500,
    currency: 'USD',
    customDomainIdea: 'alquozjoinerydubai.com',
    aboutStory: 'Founded in 1998 in Al Quoz, our artisan woodworking workshop bridges classical timber joinery with contemporary Scandinavian and minimalist architectural aesthetics. We hand-select premium timbers to create timeless legacy furniture.',
    whyTheyNeedWebsite: 'Interior designers and luxury villa owners in Dubai search constantly for local bespoke joiners. A $500 website showcasing their portfolio will capture lucrative villa remodeling contracts worth $15,000+.'
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'tier-starter',
    name: 'Starter Local Presence',
    priceUSD: 300,
    priceNGN: 450000,
    description: 'Perfect for local shops wanting a high-converting digital storefront that turns Google Maps searchers into immediate paying customers.',
    features: [
      'High-speed single-page responsive website',
      'Mobile & desktop optimized layout',
      'Direct WhatsApp click-to-chat & instant call buttons',
      'Google Maps listing link & interactive location map',
      'Showcase of services, opening hours & pricing',
      'Google Reviews spotlight badge (4.8★+ proof)',
      '1 Year free high-speed hosting setup'
    ]
  },
  {
    id: 'tier-growth',
    name: 'Growth Lead Machine',
    priceUSD: 400,
    priceNGN: 600000,
    description: 'Our most popular package. Engineered to dominate local search competitors, capture appointment bookings, and automate customer inquiries.',
    popular: true,
    features: [
      'Everything in Starter ($300) package',
      'Interactive Online Appointment & Quote Request form',
      'Direct WhatsApp inquiry lead routing to owner phone',
      'Photo gallery showcase of previous work & premises',
      'Local SEO Schema markup to rank #1 on Google Local Pack',
      'Custom domain configuration (.com or .ng included)',
      'Social media integration (Instagram, Facebook)',
      '48-Hour expedited delivery guarantee'
    ]
  },
  {
    id: 'tier-premium',
    name: 'Elite Market Domination',
    priceUSD: 500,
    priceNGN: 750000,
    description: 'Complete high-ticket agency web solution designed to make the business look like the undisputed #1 authority in their city.',
    features: [
      'Everything in Growth ($400) package',
      'Multi-section dynamic website with deep service pages',
      'Customer Testimonials Carousel with verified Google badges',
      'Google Business Profile (GBP) audit & ranking optimization checklist',
      'Professional copycrafted sales text written for maximum conversion',
      'Automated email notification system for new client inquiries',
      '30 Days of priority support & free content updates',
      'Printable QR Code table tents/stickers linking to website'
    ]
  }
];

export const INITIAL_INQUIRIES: ClientInquiry[] = [
  {
    id: 'inq-seed-1',
    leadId: 'lead-ng-lagos-1',
    businessName: 'Crown Heights Dental Clinic',
    clientName: 'Samuel Adekunle',
    phone: '+234 802 334 1928',
    serviceRequested: 'Teeth Whitening & Scaling',
    preferredDate: 'Tomorrow at 2:00 PM',
    notes: 'Looking for teeth scaling before my wedding this weekend.',
    createdAt: '12 minutes ago',
    status: 'new',
  },
  {
    id: 'inq-seed-2',
    leadId: 'lead-ng-lagos-1',
    businessName: 'Crown Heights Dental Clinic',
    clientName: 'Funke Williams',
    phone: '+234 814 992 0182',
    serviceRequested: 'Orthodontics & Clear Aligners',
    preferredDate: 'Saturday morning',
    notes: 'Inquiring about clear aligners consultation for my 16yo daughter.',
    createdAt: '1 hour ago',
    status: 'contacted',
  },
  {
    id: 'inq-seed-3',
    leadId: 'lead-ng-lagos-2',
    businessName: 'Lekki Auto Kraft & Performance',
    clientName: 'Emeka Nwosu',
    phone: '+234 809 112 4490',
    serviceRequested: 'German Car Diagnostics & ECM Tuning',
    preferredDate: 'Friday 9:00 AM',
    notes: 'Mercedes Benz C300 check engine light diagnosis.',
    createdAt: '3 hours ago',
    status: 'new',
  },
];

export interface BusinessReview {
  author: string;
  rating: number;
  text: string;
  relativeTime?: string;
}

export interface BusinessService {
  title: string;
  description: string;
  priceEstimate?: string;
  iconName?: string;
}

export interface BusinessLead {
  id: string;
  name: string;
  category: string;
  tagline: string;
  city: string;
  country: string;
  address: string;
  rating: number;
  reviewCount: number;
  hasWebsite: boolean;
  websiteStatus: 'no_website' | 'broken_link' | 'social_only';
  phone: string;
  whatsapp: string;
  hours: string;
  priceRange: '$' | '$$' | '$$$' | '₦₦' | '₦₦₦';
  services: BusinessService[];
  highlights: string[];
  reviews: BusinessReview[];
  photos: string[];
  themeColor: 'indigo' | 'emerald' | 'amber' | 'rose' | 'teal' | 'slate';
  fontStyle: 'modern' | 'serif' | 'display';
  status: 'discovered' | 'site_ready' | 'pitched' | 'follow_up' | 'won';
  proposedPrice: number; // e.g. 300, 350, 400, 450, 500
  currency: 'USD' | 'NGN';
  customDomainIdea: string;
  aboutStory: string;
  whyTheyNeedWebsite: string;
  lastContacted?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  priceUSD: number;
  priceNGN: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export type SprintMode = 'instant' | '15min' | '30min' | '60min' | '120min';

export interface SprintStats {
  targetRevenueUSD: number;
  achievedRevenueUSD: number;
  leadsDiscovered: number;
  sitesGenerated: number;
  pitchesSent: number;
  dealsClosed: number;
  secondsRemaining: number;
  isRunning: boolean;
  mode?: SprintMode;
}

export interface ClientInquiry {
  id: string;
  leadId: string;
  businessName: string;
  clientName: string;
  phone: string;
  serviceRequested: string;
  preferredDate: string;
  notes?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'booked';
}

export interface WebsiteCustomization {
  headline?: string;
  subheadline?: string;
  phone?: string;
  whatsapp?: string;
  showAnnouncement: boolean;
  announcementText: string;
  showReviews: boolean;
  showBookingForm: boolean;
  showGallery: boolean;
  showMap: boolean;
  showPricing: boolean;
  floatingWhatsApp: boolean;
  ctaButtonText: string;
}

export interface BusinessRoiEstimate {
  estimatedMonthlySearches: number;
  estimatedMissedLeads: number;
  averageCustomerValue: number;
  estimatedLostMonthlyRevenue: number;
  paybackCustomerCount: number;
}

export type GeminiModelChoice = 'gemini-3.5-flash' | 'gemini-3.1-flash-lite' | 'gemini-3.1-pro-preview' | 'gemini-3.8-flash';

export type ChatbotPersona = 'closer' | 'objection' | 'copywriter' | 'roi';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
}


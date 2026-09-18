import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API: Search for real businesses without websites on Google Maps / Web
app.post('/api/search-businesses', async (req, res) => {
  try {
    const { query, location } = req.body;
    const targetLocation = location || 'Lagos, Nigeria';
    const targetQuery = query || 'high rated local businesses';

    const ai = getGeminiClient();

    const prompt = `You are an expert agency researcher identifying high-potential business clients.
Task: Search for real, actual local businesses located in "${targetLocation}" related to "${targetQuery}".
Criteria:
1. They must have GOOD REVIEWS (minimum 4.3 stars or higher, ideally with 20+ reviews).
2. They do NOT have a professional website (they only have a Google Maps/Business listing, or rely solely on phone/WhatsApp/Instagram without an official domain).
3. They provide valuable services where a $300-$500 website will generate high return on investment (e.g. clinics, automotive, bakeries/catering, spas/salons, fabricators, legal/consulting, boutique hotels, pet care).

Return 4 to 6 businesses as a valid JSON array of objects with the exact following schema:
[
  {
    "id": "gen-1",
    "name": "Exact Business Name",
    "category": "Specific Niche or Category",
    "tagline": "Punchy attractive tagline for their business",
    "city": "${targetLocation}",
    "country": "Country name",
    "address": "Realistic or exact street address in ${targetLocation}",
    "rating": 4.8,
    "reviewCount": 94,
    "hasWebsite": false,
    "websiteStatus": "no_website",
    "phone": "Realistic local phone format with country code",
    "whatsapp": "Digits only for whatsapp link e.g. 2348012345678",
    "hours": "e.g. Mon-Sat 8:00 AM - 6:00 PM",
    "priceRange": "$$" or "$$$" or "₦₦" or "₦₦₦",
    "services": [
      { "title": "Service 1", "description": "Specific compelling description", "priceEstimate": "e.g. From $50 or ₦25,000" },
      { "title": "Service 2", "description": "Specific compelling description", "priceEstimate": "e.g. From $120 or ₦60,000" },
      { "title": "Service 3", "description": "Specific compelling description", "priceEstimate": "e.g. Custom quote" }
    ],
    "highlights": [
      "Key reason customers love them 1",
      "Key reason customers love them 2",
      "Key reason customers love them 3"
    ],
    "reviews": [
      { "author": "Customer Name", "rating": 5, "text": "Realistic quote from their Google review highlighting their quality and noting how hard they were to find without a site", "relativeTime": "2 weeks ago" },
      { "author": "Another Customer", "rating": 4.9, "text": "Another genuine customer review quote", "relativeTime": "1 month ago" }
    ],
    "themeColor": "emerald" or "teal" or "amber" or "rose" or "indigo" or "slate",
    "fontStyle": "modern" or "serif" or "display",
    "proposedPrice": 350 or 400 or 450 or 500,
    "currency": "${targetLocation.toLowerCase().includes('nigeria') ? 'NGN' : 'USD'}",
    "customDomainIdea": "idealdomainname.com",
    "aboutStory": "2-3 sentence engaging backstory of their business, craftsmanship, and commitment to their local community.",
    "whyTheyNeedWebsite": "Clear explanation of how they are currently losing customers without a website and how a $300-$500 site solves it immediately."
  }
]

Provide ONLY the raw JSON array. Do not add markdown code fences or conversational prose.`;

    // Perform query with search grounding for real map-grounded knowledge
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const responseText = response.text || '';
    // Clean potential markdown backticks
    const cleanedJson = responseText
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    let businesses = [];
    try {
      businesses = JSON.parse(cleanedJson);
    } catch {
      // Fallback regex to find array
      const match = cleanedJson.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (match) {
        businesses = JSON.parse(match[0]);
      } else {
        throw new Error('Could not parse businesses array from AI response');
      }
    }

    // Add random IDs if missing
    businesses = businesses.map((b: Record<string, unknown>, index: number) => ({
      ...b,
      id: b.id || `live-lead-${Date.now()}-${index}`,
      status: 'discovered',
      photos: b.photos || [
        'https://images.unsplash.com/photo-1556742049-0a67e55722c3?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80'
      ]
    }));

    return res.json({ success: true, businesses });
  } catch (error: unknown) {
    console.error('Error searching businesses:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to search businesses';
    return res.status(500).json({ success: false, error: errorMessage });
  }
});

// API: Generate bespoke sales pitch & proposal for a client
app.post('/api/generate-pitch', async (req, res) => {
  try {
    const { business, targetPrice = 400, currency = 'USD' } = req.body;
    if (!business || !business.name) {
      return res.status(400).json({ error: 'Business details required' });
    }

    const ai = getGeminiClient();
    const prompt = `You are a high-ticket agency copywriter specializing in converting local businesses ($300 - $500 web design packages).
Client details:
- Name: ${business.name}
- Category: ${business.category}
- Location: ${business.city}, ${business.country}
- Rating: ${business.rating} stars with ${business.reviewCount} Google reviews
- Top Review: "${business.reviews?.[0]?.text || 'Exceptional service'}" by ${business.reviews?.[0]?.author || 'a customer'}
- Price to charge: ${currency === 'NGN' ? `₦${(targetPrice * 1500).toLocaleString()}` : `$${targetPrice}`}
- Proposed Domain: ${business.customDomainIdea || 'their custom domain'}

Generate:
1. "whatsappPitch": A friendly, non-pushy, high-converting WhatsApp message (150-200 words) ready to send directly to their phone. Reference their actual high Google rating, congratulate them on happy customers, point out that customers searching for ${business.category} on Google might miss them, and explain that you already created a live working website preview for them to test right now. Mention the clear price (${currency === 'NGN' ? `₦${(targetPrice * 1500).toLocaleString()}` : `$${targetPrice}`}) with zero upfront commitment to view.
2. "coldEmail": A crisp cold email with Subject Line, personalized opening praising their specific reviews, value proposition, link placeholder, and clean call-to-action.
3. "phoneScript": A 60-second confident phone script to talk to the manager/owner, with objection handling ("We only use Instagram", "How much does it cost?").
4. "roiPitch": A 2-sentence mathematical explanation showing how just 1 or 2 new customers will pay back the entire ${currency === 'NGN' ? `₦${(targetPrice * 1500).toLocaleString()}` : `$${targetPrice}`} website investment.

Return as JSON with keys: whatsappPitch, coldEmailSubject, coldEmailBody, phoneScript, roiPitch. No markdown code blocks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const data = JSON.parse(response.text || '{}');
    return res.json({ success: true, ...data });
  } catch (error: unknown) {
    console.error('Error generating pitch:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate pitch';
    return res.status(500).json({ success: false, error: errorMessage });
  }
});

// API: Multi-turn Gemini Chatbot with custom role system instructions
app.post('/api/chat', async (req, res) => {
  try {
    const {
      messages,
      systemInstruction,
      model = 'gemini-3.5-flash',
    } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const ai = getGeminiClient();

    // Format messages for @google/genai multi-turn history
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    // Supported models per instructions: gemini-3.5-flash, gemini-3.1-flash-lite, gemini-3.1-pro-preview, gemini-3.8-flash
    const targetModel = model || 'gemini-3.5-flash';

    const defaultRoleInstruction = `You are the LeadForge AI Sales Strategist & Deal Closer Copilot.
Your mission is to help freelancers and digital agencies discover 4.5+ star local businesses on Google Maps that lack websites, build high-converting live website previews, and close $300 to $500 (or ₦450,000 to ₦750,000) deals in under 2 hours.
Always provide tactical, actionable, clear advice with realistic scripts, objection handling, mathematical ROI calculations, and psychological closing techniques.`;

    const response = await ai.models.generateContent({
      model: targetModel,
      contents,
      config: {
        systemInstruction: systemInstruction || defaultRoleInstruction,
      },
    });

    const reply = response.text || 'I could not generate a response. Please try again.';
    return res.json({ success: true, reply, modelUsed: targetModel });
  } catch (error: unknown) {
    console.error('Error in chat API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate response';
    return res.status(500).json({ success: false, error: errorMessage });
  }
});

// Start server with Vite middleware in dev or static dist in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Lead Studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

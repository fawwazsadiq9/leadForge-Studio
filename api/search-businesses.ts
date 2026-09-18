import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is required');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build-vercel',
      },
    },
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, location } = req.body || {};
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
    "email": "contact email or realistic format",
    "estimatedMonthlyLoss": "$1,200 - $3,500/mo",
    "dealValue": "$350",
    "painPoints": ["No online booking or price menu", "Losing customers searching on Google Maps to competitors with websites", "Manual phone handling only"],
    "opportunitySummary": "High rating business losing high-intent search traffic because customers cannot browse services or book online."
  }
]
Respond ONLY with the raw JSON array. No markdown codeblocks, no conversational text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '[]';
    let businesses = [];
    try {
      businesses = JSON.parse(text);
    } catch {
      const match = text.match(/\\[[\\s\\S]*\\]/);
      if (match) {
        businesses = JSON.parse(match[0]);
      }
    }

    return res.status(200).json({ success: true, businesses });
  } catch (error: unknown) {
    console.error('Error in Vercel search-businesses function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to search businesses';
    return res.status(500).json({ success: false, error: errorMessage });
  }
}

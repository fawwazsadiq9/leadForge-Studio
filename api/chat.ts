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
    const { message, history, businessContext, systemInstruction, model } = req.body || {};
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getGeminiClient();
    const targetModel = model || 'gemini-2.5-flash';

    const defaultRoleInstruction = `You are "LeadForge Copilot", an elite sales closer and agency growth assistant built into the LeadForge Studio application.
Your mission: Help freelance web developers and agency owners discover local businesses lacking websites, pitch them irresistible bespoke web solutions, overcome customer objections, and close $300-$500 deals within a 2-hour sprint window.

Guidelines:
1. Provide punchy, highly actionable, practical closing advice, sales scripts, WhatsApp voice note pitches, and outreach strategies.
2. If businessContext is provided, tailor your exact answers and pitch scripts to that specific business's name, category, location, and pain points.
3. Keep answers clear, professional, concise, and formatted nicely with bullet points.`;

    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (businessContext) {
      contents.push({
        role: 'user',
        parts: [{ text: `[Active Business Target]: ${JSON.stringify(businessContext)}` }],
      });
      contents.push({
        role: 'model',
        parts: [{ text: `Understood. I will calibrate all responses, pitches, objection rebuttals, and pricing strategies specifically for ${businessContext.name || 'this business'}.` }],
      });
    }

    if (Array.isArray(history)) {
      for (const item of history) {
        contents.push({
          role: item.role === 'model' ? 'model' : 'user',
          parts: [{ text: item.text }],
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: targetModel,
      contents,
      config: {
        systemInstruction: systemInstruction || defaultRoleInstruction,
      },
    });

    const reply = response.text || 'I could not generate a response. Please try again.';
    return res.status(200).json({ success: true, reply, modelUsed: targetModel });
  } catch (error: unknown) {
    console.error('Error in Vercel chat API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate response';
    return res.status(500).json({ success: false, error: errorMessage });
  }
}

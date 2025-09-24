import { NextRequest, NextResponse } from "next/server";
import { ZARA_SYSTEM_PROMPT } from '@/lib/zara/prompt';
import { retrieveSnippets } from '@/lib/zara/retrieval';

interface ApiRequest {
  message: string;
  locale: string;
  history?: Array<{
    id: string;
    content: string;
    isUser: boolean;
  }>;
}

interface ApiResponse {
  response: string;
  topic: string;
  isProductQuery: boolean;
}

function detectProductQuery(message: string): boolean {
  const productTerms = ['pricing', 'price', 'cost', 'plan', 'subscription', 'billing', 'feature', 'privacy', 'data', 'security', 'support', 'help'];
  const messageLower = message.toLowerCase();
  return productTerms.some(term => messageLower.includes(term));
}

function extractTopic(message: string): string {
  // Extract key topic from message for context payload
  const words = message.toLowerCase().split(' ').filter(word => word.length > 3);
  return words.slice(0, 3).join(' ');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ApiRequest;
    
    if (!body?.message || typeof body.message !== "string") {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const message = body.message.slice(0, 2000);
    const locale = body.locale || 'en';
    const isProductQuery = detectProductQuery(message);
    const topic = extractTopic(message);

    let contextSnippets = '';
    if (isProductQuery) {
      const retrievalResult = await retrieveSnippets(message);
      if (retrievalResult.hasResults) {
        contextSnippets = '\n\nRelevant information:\n' + 
          retrievalResult.matches.map(match => match.content).join('\n\n');
      }
    }

    const userInstruction = `User message: "${message}"
User locale: ${locale}${contextSnippets}

Follow the system instructions exactly. Respond in ${locale === 'en' ? 'English' : locale === 'de' ? 'German' : locale === 'fr' ? 'French' : locale === 'es' ? 'Spanish' : locale === 'it' ? 'Italian' : 'English'}.`;

    // Use OpenAI API
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.7,
        max_tokens: 800,
        messages: [
          { role: "system", content: ZARA_SYSTEM_PROMPT },
          ...(body.history?.slice(-4).map(h => ({ 
            role: h.isUser ? "user" : "assistant" as const,
            content: h.content
          })) || []),
          { role: "user", content: userInstruction },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error: `AI service error: ${error}` }, { status: 500 });
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

    const payload: ApiResponse = {
      response: aiResponse,
      topic,
      isProductQuery
    };
    
    return NextResponse.json(payload);
  } catch (error: any) {
    console.error('Zara chat error:', error);
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}

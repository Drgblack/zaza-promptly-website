import { NextRequest, NextResponse } from "next/server";
import { classifyMessage, MessageLane } from '@/lib/zara/classifier';
import { retrieveSnippets, retrievePlaybook } from '@/lib/zara/retrieval';
import { validateZaraAnswer, createFallbackAnswer, sanitizeAnswer, ZaraAnswer } from '@/lib/zara/schema';

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
  answer: ZaraAnswer;
  lane: MessageLane;
  usedPlaybook?: string;
}

const SYSTEM_PROMPTS = {
  coaching: `You are Zara, a practical teaching assistant. You MUST respond in valid JSON using this exact schema:

{
  "title": "Brief title (max 8 words)",
  "what_to_do": ["3-5 imperative bullets with concrete steps"],
  "say_this": ["2-3 short scripts teachers can copy verbatim"],
  "differentiation": ["1-3 quick adaptations for SEND/ELL"],
  "next_steps": ["1-2 actions for this week"],
  "context_payload": {
    "topic": "topic from user query",
    "locale": "user's locale",
    "tone": "warm-professional",
    "goal": "teaching goal"
  },
  "ctas": {
    "improve_in_promptly": "Improve in Promptly",
    "start_trial": "Start Free Trial"
  }
}

Focus on practical classroom strategies. Use imperative voice for what_to_do. Keep scripts short and copyable.`,

  parent_note: `You are Zara, helping teachers write parent communications. You MUST respond in valid JSON using this exact schema:

{
  "title": "Parent Communication",
  "what_to_do": ["Brief steps for this communication"],
  "say_this": ["Parent-ready version", "Concise alternate", "Warm-professional alternate"],
  "differentiation": ["Adaptations for different family communication styles"],
  "next_steps": ["Follow-up actions"],
  "context_payload": {
    "topic": "communication topic",
    "locale": "user's locale", 
    "tone": "warm-professional",
    "goal": "parent-communication",
    "draft": "original text if provided"
  },
  "ctas": {
    "improve_in_promptly": "Improve in Promptly",
    "start_trial": "Start Free Trial"
  }
}

For parent notes: Focus on the 3 versions in say_this. Preserve names/dates from original.`,

  product_info: `You are Zara, providing product information about Promptly. You MUST respond in valid JSON using this exact schema:

{
  "title": "Product Information",
  "what_to_do": ["How to get this information or take action"],
  "say_this": ["Clear answer based on retrieved information"],
  "differentiation": ["Options for different user needs"],
  "next_steps": ["Actions user can take"],
  "context_payload": {
    "topic": "product question topic",
    "locale": "user's locale",
    "tone": "warm-professional",
    "goal": "product-inquiry"
  },
  "ctas": {
    "improve_in_promptly": "Try Promptly",
    "start_trial": "Start Free Trial"
  }
}

Only use the provided retrieval information. If information is missing, say so and direct to appropriate page.`
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ApiRequest;
    
    if (!body?.message || typeof body.message !== "string") {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const message = body.message.slice(0, 2000);
    const locale = body.locale || 'en';
    
    // Classify the message into a lane
    const classification = classifyMessage(message);
    const lane = classification.lane;
    
    // Prepare context based on lane
    let contextContent = '';
    let usedPlaybook = '';
    
    if (lane === 'product_info') {
      const retrievalResult = await retrieveSnippets(message);
      if (retrievalResult.hasResults) {
        contextContent = '\n\nRelevant product information:\n' + 
          retrievalResult.matches.map(match => `${match.source}: ${match.content}`).join('\n\n');
      }
    } else if (lane === 'coaching') {
      // Check for matching playbook
      const playbook = await retrievePlaybook(message);
      if (playbook) {
        contextContent = '\n\nRelevant playbook content:\n' + playbook.content;
        usedPlaybook = playbook.filename;
      }
    }

    const systemPrompt = SYSTEM_PROMPTS[lane];
    
    const userInstruction = `User message: "${message}"
User locale: ${locale}
Classification: ${lane} (confidence: ${classification.confidence.toFixed(2)})${contextContent}

Respond in ${locale === 'en' ? 'English' : locale === 'de' ? 'German' : locale === 'fr' ? 'French' : locale === 'es' ? 'Spanish' : locale === 'it' ? 'Italian' : 'English'}. Return ONLY valid JSON matching the schema.`;

    // Call OpenAI API
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    let attempts = 0;
    let validAnswer: ZaraAnswer | null = null;
    
    while (attempts < 2 && !validAnswer) {
      attempts++;
      
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: attempts === 1 ? 0.3 : 0.1, // Lower temp on retry
          max_tokens: 1000,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userInstruction + (attempts > 1 ? "\n\nPrevious attempt failed validation. Return valid JSON only." : "") },
          ],
          response_format: { type: "json_object" }
        }),
      });

      if (!response.ok) {
        throw new Error(`AI service error: ${await response.text()}`);
      }

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content;
      
      if (!aiResponse) {
        continue;
      }

      try {
        const parsedResponse = JSON.parse(aiResponse);
        const validation = validateZaraAnswer(parsedResponse);
        
        if (validation.isValid && validation.answer) {
          validAnswer = sanitizeAnswer(validation.answer);
          break;
        }
      } catch (parseError) {
        console.warn('JSON parse error on attempt', attempts, parseError);
        continue;
      }
    }

    // Fallback if validation fails twice
    if (!validAnswer) {
      if (lane === 'coaching' && usedPlaybook) {
        // Use curated playbook fallback
        const playbook = await retrievePlaybook(message);
        if (playbook) {
          validAnswer = createPlaybookAnswer(playbook, locale);
        }
      }
      
      if (!validAnswer) {
        validAnswer = createFallbackAnswer(message, locale);
      }
    }

    const payload: ApiResponse = {
      answer: validAnswer,
      lane,
      usedPlaybook: usedPlaybook || undefined
    };
    
    return NextResponse.json(payload);
    
  } catch (error: any) {
    console.error('Zara 2.1 chat error:', error);
    
    // Return a safe fallback answer
    const fallback: ApiResponse = {
      answer: createFallbackAnswer(body?.message || "help", body?.locale || "en"),
      lane: 'coaching'
    };
    
    return NextResponse.json(fallback);
  }
}

function createPlaybookAnswer(playbook: any, locale: string): ZaraAnswer {
  // Parse playbook markdown to extract structured content
  const lines = playbook.content.split('\n');
  const stepsSection = extractSection(lines, '## Steps');
  const scriptsSection = extractSection(lines, '## Scripts'); 
  const differentiationSection = extractSection(lines, '## Differentiation');
  
  return {
    title: playbook.title,
    what_to_do: stepsSection.slice(0, 5),
    say_this: scriptsSection.slice(0, 3),
    differentiation: differentiationSection.slice(0, 2),
    next_steps: [
      "Practice this routine daily for 5 days to build consistency",
      "Track results and adjust based on your classroom needs"
    ],
    context_payload: {
      topic: playbook.filename.replace('-', ' '),
      locale,
      tone: "warm-professional",
      goal: "classroom-strategy"
    },
    ctas: {
      improve_in_promptly: "Improve in Promptly",
      start_trial: "Start Free Trial"
    }
  };
}

function extractSection(lines: string[], sectionHeader: string): string[] {
  const startIndex = lines.findIndex(line => line.startsWith(sectionHeader));
  if (startIndex === -1) return [];
  
  const items = [];
  for (let i = startIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('## ')) break; // Next section
    if (line.startsWith('- ')) {
      items.push(line.substring(2));
    } else if (line.match(/^\d+\./)) {
      items.push(line.replace(/^\d+\.\s*/, ''));
    } else if (line.startsWith('"') && line.endsWith('"')) {
      items.push(line.slice(1, -1));
    }
  }
  return items.filter(item => item.length > 0);
}
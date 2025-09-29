import { z } from 'zod';
import type { SnippetInput } from './buildPrompt';
import { buildPrompt } from './buildPrompt';

const Schema = z.object({
  polished: z.string().min(40),
  email: z.object({
    greeting: z.string().min(3),
    body: z.string().min(40),
    closing: z.string(),
    signature: z.string()
  })
});

// Mock AI call - replace with actual OpenAI integration
async function callOpenAIJSON(prompt: string, input: SnippetInput) {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
  
  const { roughNote, tone, studentName, preset } = input;
  const studentRef = studentName?.trim() || "your child";
  
  // Detect sentiment of rough note to generate appropriate response
  const isNegative = /loud|disrupt|problem|issue|concern|fight|rude|inappropriate|missing|absent|late/.test(roughNote?.toLowerCase() || '');
  const isPositive = /great|excellent|wonderful|helped|kind|good|improved|progress|proud/.test(roughNote?.toLowerCase() || '');
  
  let polishedContent: string;
  
  if (isNegative) {
    // Negative behavior - structured response
    polishedContent = `I wanted to share an update about ${studentRef}'s behavior this week. ${roughNote}

I understand this can be concerning, and I want to work together to support ${studentRef} in making better choices. We're implementing a simple strategy to help redirect their energy positively.

Please let me know if you'd like to discuss this further. Your partnership is valuable in helping ${studentRef} succeed.`;
  } else if (isPositive) {
    // Positive behavior - praise focused
    polishedContent = `I'm delighted to share some wonderful news about ${studentRef}. ${roughNote}

This kind of positive behavior really stands out and deserves recognition. ${studentRef} should be proud of their efforts, and I hope you'll celebrate this achievement at home.`;
  } else {
    // Neutral/general update
    polishedContent = `I wanted to share a quick update about ${studentRef}. ${roughNote}

I'll continue to monitor their progress and keep you informed. Please feel free to reach out if you have any questions or concerns.`;
  }

  // Adjust tone
  if (tone === 'firm' && isNegative) {
    polishedContent = polishedContent.replace('I wanted to share', 'I need to discuss');
  } else if (tone === 'enthusiastic' && isPositive) {
    polishedContent = polishedContent.replace('I\'m delighted', 'I\'m absolutely thrilled');
  }

  return {
    polished: polishedContent,
    email: {
      greeting: "Hi there,",
      body: polishedContent,
      closing: "Warm regards,",
      signature: "Ms. Johnson"
    }
  };
}

export async function generateSnippet(input: SnippetInput) {
  const prompt = buildPrompt(input);
  const raw = await callOpenAIJSON(prompt, input);
  const parsed = Schema.safeParse(raw);
  if (!parsed.success) throw new Error('MODEL_BAD_OUTPUT');
  return parsed.data;
}
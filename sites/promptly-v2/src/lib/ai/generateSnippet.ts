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

// Sanitization function to replace harsh language
function sanitizeLanguage(text: string): string {
  const replacements = {
    'lazy': 'struggles with motivation',
    'stupid': 'struggling with concepts', 
    'bad kid': 'child who needs support',
    'naughty': 'finding it hard to stay focused',
    'disruptive': 'finding it hard to stay focused',
    'refuses to work': 'reluctant to engage',
    'won\'t listen': 'needs reminders',
    'doesn\'t care': 'is not fully engaged right now',
    'terrible': 'concerning',
    'awful': 'challenging',
    'horrible': 'difficult',
    'acting out': 'showing challenging behavior',
    'being difficult': 'finding it hard to engage',
    'bad behavior': 'challenging behavior'
  };

  let sanitized = text;
  Object.entries(replacements).forEach(([harsh, professional]) => {
    const regex = new RegExp(`\\b${harsh}\\b`, 'gi');
    sanitized = sanitized.replace(regex, professional);
  });

  return sanitized;
}

// Mock AI call - replace with actual OpenAI integration  
async function callOpenAIJSON(prompt: string, input: SnippetInput) {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
  
  const { roughNote } = input;
  const sanitizedNote = sanitizeLanguage(roughNote || '');
  
  // Detect if this is clearly praise vs concern vs mixed
  const isPraise = /great|excellent|wonderful|helped|kind|good|improved|progress|proud|positive|achievement|success|brilliant/i.test(roughNote || '');
  const hasConcerns = /lazy|disrupt|problem|issue|concern|fight|rude|inappropriate|missing|absent|late|homework|assignment|struggles|difficult|challenge/i.test(roughNote || '');
  const hasStrengths = /good at|strong|talent|ability|sports|art|math|reading|creative|helps|kind|friendly/i.test(roughNote || '');
  
  let polishedContent: string;
  
  if (isPraise && !hasConcerns) {
    // Pure praise - can be more positive
    polishedContent = `I wanted to let you know about your child's positive contribution recently. ${sanitizedNote.replace(/\[.*?\]/g, 'They')} 

This kind of effort and progress really stands out in our classroom. It's great to see their growing confidence and willingness to engage. Please celebrate this success with them at home, as it makes a real difference.`;
  } else if (hasConcerns && hasStrengths) {
    // Mixed - acknowledge both (realistic balance)
    polishedContent = `I'd like to share an update about your child. While they ${sanitizedNote.toLowerCase().includes('good at') || sanitizedNote.toLowerCase().includes('sports') ? 'show real strength in areas like sports and have natural ability' : 'have areas where they shine'}, they have been ${sanitizedNote.toLowerCase().includes('lazy') ? 'struggling with motivation' : 'finding some aspects challenging'}.

We're working on strategies to help them transfer their strengths to all areas of learning. Your support at home will make a real difference, and I'd be happy to share specific ideas.`;
  } else if (hasConcerns) {
    // Concerns - neutral, professional opener
    polishedContent = `I'd like to share an update about your child. Recently they have been ${sanitizedNote.replace(/\[.*?\]/g, 'the student').toLowerCase()}

This has affected their learning and participation in class. We're encouraging them to develop stronger habits and providing extra support where needed. Please let me know if you'd like to discuss strategies we can try together.`;
  } else {
    // Neutral update - measured tone
    polishedContent = `Here's a quick update on your child's progress. ${sanitizedNote}

I'm committed to supporting their continued development and will keep you informed of their growth. Please reach out anytime you'd like to discuss how things are going.`;
  }

  // Final sanitization pass
  polishedContent = sanitizeLanguage(polishedContent);

  // Ensure 90-120 words
  const words = polishedContent.split(/\s+/);
  if (words.length > 120) {
    polishedContent = words.slice(0, 120).join(' ') + '.';
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
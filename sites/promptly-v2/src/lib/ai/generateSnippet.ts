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
    'lazy': 'needs motivation',
    'stupid': 'struggling with concepts',
    'bad kid': 'child who needs support',
    'naughty': 'challenging behavior',
    'disruptive': 'struggles with focus',
    'refuses to work': 'reluctant to engage',
    'won\'t listen': 'needs reminders',
    'terrible': 'concerning',
    'awful': 'challenging',
    'horrible': 'difficult',
    'acting out': 'showing challenging behavior',
    'being difficult': 'finding it hard to engage'
  };

  let sanitized = text;
  Object.entries(replacements).forEach(([harsh, professional]) => {
    const regex = new RegExp(harsh, 'gi');
    sanitized = sanitized.replace(regex, professional);
  });

  return sanitized;
}

// Mock AI call - replace with actual OpenAI integration  
async function callOpenAIJSON(prompt: string, input: SnippetInput) {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
  
  const { roughNote } = input;
  const sanitizedNote = sanitizeLanguage(roughNote || '');
  
  // Detect if this is praise or concern
  const isPraise = /great|excellent|wonderful|helped|kind|good|improved|progress|proud|positive|achievement|success/i.test(sanitizedNote);
  const isConcern = /challenging|struggles|needs|concern|missing|absent|late|homework|assignment|focus/i.test(sanitizedNote);
  
  let polishedContent: string;
  
  if (isPraise) {
    // Praise - K-12 best practice structure
    polishedContent = `I'm delighted to share some positive news about your child. ${sanitizedNote.replace(/\[.*?\]/g, 'They')} 

This kind of effort and progress really stands out. Your child should be proud of their achievement, and I hope you'll celebrate this success together. Please let me know if you'd like to discuss how we can continue building on these strengths.`;
  } else if (isConcern) {
    // Concern - Required structure: Positive opener → Observation → Constructive suggestion → Partnership close
    polishedContent = `I wanted to reach out about your child, who shows real potential in our classroom. Recently, ${sanitizedNote.toLowerCase()}

This has been affecting their learning progress, and I want to help them succeed. We're trying some new strategies to support their engagement and focus in class.

I'd love to partner with you on this. Could we schedule a quick chat to discuss how we can best support them together?`;
  } else {
    // Neutral update - still follow structure
    polishedContent = `I wanted to share an update about your child, who is a valued member of our classroom community. ${sanitizedNote}

I'm committed to supporting their continued growth and development. We'll keep working on building positive learning habits together.

Please feel free to reach out anytime you'd like to discuss their progress. Your partnership means so much in helping them thrive.`;
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
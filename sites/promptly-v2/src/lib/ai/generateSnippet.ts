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
  
  const { roughNote } = input;
  
  // Detect if this is praise or concern
  const isPraise = /great|excellent|wonderful|helped|kind|good|improved|progress|proud|positive|achievement|success/i.test(roughNote || '');
  const isConcern = /loud|disrupt|problem|issue|concern|fight|rude|inappropriate|missing|absent|late|homework|assignment/i.test(roughNote || '');
  
  let polishedContent: string;
  
  if (isPraise) {
    // Praise - brief and warm (2-3 sentences, under 130 words)
    polishedContent = `I'm delighted to share some wonderful news about your child's progress. ${roughNote.replace(/\[.*?\]/g, 'they').trim()}

This positive behavior really stands out and deserves recognition. I hope you'll celebrate this achievement at home!`;
  } else if (isConcern) {
    // Concern - 4-part structure (under 130 words)
    const cleanNote = roughNote.replace(/\[.*?\]/g, 'the student').trim();
    polishedContent = `I wanted to update you about what happened in class today. ${cleanNote}

This is impacting their learning and the classroom environment. We're implementing a simple strategy to help redirect their focus positively.

I'd love to discuss how we can work together to support them. Please feel free to reach out if you'd like to chat about next steps.`;
  } else {
    // Neutral update
    const cleanNote = roughNote.replace(/\[.*?\]/g, 'your child').trim();
    polishedContent = `I wanted to share a quick update about your child's week. ${cleanNote}

I'll continue monitoring their progress and keep you informed. Please reach out if you have any questions.`;
  }

  // Ensure under 130 words
  const words = polishedContent.split(/\s+/);
  if (words.length > 130) {
    polishedContent = words.slice(0, 130).join(' ') + '...';
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
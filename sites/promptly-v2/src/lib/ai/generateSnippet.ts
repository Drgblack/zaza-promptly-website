import { z } from 'zod';
import type { SnippetInput } from './buildPrompt';
import { runSnippetPipeline, type GeneratedOutput } from './snippetPipeline';

const Schema = z.object({
  polished: z.string().min(40),
  email: z.object({
    greeting: z.string().min(3),
    body: z.string().min(40),
    closing: z.string(),
    signature: z.string()
  })
});

export async function generateSnippet(input: SnippetInput): Promise<GeneratedOutput> {
  const { roughNote, pronouns, preset } = input;
  
  if (!roughNote?.trim()) {
    throw new Error('No input provided');
  }
  
  // Use the new 3-stage pipeline with pronouns and preset support
  const result = await runSnippetPipeline(roughNote.trim(), pronouns, preset);
  
  // Validate with existing schema for backwards compatibility
  const parsed = Schema.safeParse(result);
  if (!parsed.success) {
    console.error('Pipeline output failed validation:', parsed.error);
    throw new Error('MODEL_BAD_OUTPUT');
  }
  
  return parsed.data;
}
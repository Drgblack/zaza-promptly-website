export type SnippetInput = {
  preset?: 'behaviour' | 'praise' | 'missing' | 'attendance';
  roughNote?: string;
  studentName?: string;
  tone: 'supportive' | 'neutral' | 'firm' | 'enthusiastic';
  language: 'en' | 'de' | 'es' | 'fr' | 'it';
};

export const buildPrompt = (input: SnippetInput) => {
  const { roughNote, tone, language } = input;

  // Determine if this is praise or concern based on content
  const isPraise = /great|excellent|wonderful|helped|kind|good|improved|progress|proud|positive|achievement|success/i.test(roughNote || '');

  return `
SYSTEM:
You are "Promptly – Comment Agent," a writing assistant for K–12 teachers. 
Transform rough teacher notes into professional, empathetic parent messages.

Rules:
- Maximum 130 words total
- Reference the rough note directly - never invent facts
- Use plain language, no jargon, no filler
- No contradictions (don't praise if note shows problems)
- Professional but warm tone

Structure for PRAISE:
- Keep warm and brief (2-3 sentences)
- Acknowledge the specific positive behavior
- Encourage continuation

Structure for CONCERNS:
- Observation: What happened (factual)
- Impact: How it affects learning/class
- Next step: What we're trying/suggesting
- Invitation: Ask parent to discuss/support

LANGUAGE: ${language || 'en'}

INPUT:
Rough note: """${(roughNote || '').trim()}"""

OUTPUT:
Return JSON with keys:
{
 "polished": "<body text only, no greeting/closing>",
 "email": {
   "greeting": "Hi there,",
   "body": "<same polished content>",
   "closing": "Warm regards,",
   "signature": "Ms. Johnson"
 }
}

${isPraise ? 'This appears to be PRAISE - keep it warm and brief (2-3 sentences).' : 'This appears to be a CONCERN - use the 4-part structure: Observation → Impact → Next step → Invitation.'}
`;
};
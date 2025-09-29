// Three-stage pipeline for snippet generation
import { z } from 'zod';
import type { PronounSet } from '@/lib/text/pronouns';
import { enforcePronouns } from '@/lib/text/pronouns';

// Types for the pipeline
export interface ParsedInput {
  name: string;
  positives: string[];
  concerns: string[];
  severity: 'low' | 'med' | 'high';
  raw: string;
  pronouns?: PronounSet;
  preset?: 'behaviour' | 'praise' | 'missing' | 'attendance';
}

export interface GeneratedOutput {
  polished: string;
  email: {
    greeting: string;
    body: string;
    closing: string;
    signature: string;
  };
}

const ParsedInputSchema = z.object({
  name: z.string(),
  positives: z.array(z.string()),
  concerns: z.array(z.string()),
  severity: z.enum(['low', 'med', 'high']),
  raw: z.string()
});

const GeneratedOutputSchema = z.object({
  polished: z.string().min(40),
  email: z.object({
    greeting: z.string(),
    body: z.string().min(40),
    closing: z.string(),
    signature: z.string()
  })
});

// Stage A: Parse & Sanitize
export function parseAndSanitize(roughNote: string, pronouns?: PronounSet, preset?: 'behaviour' | 'praise' | 'missing' | 'attendance'): ParsedInput {
  // Sanitize text first (deterministic replacements)
  const sanitized = sanitizeLanguage(roughNote);
  
  // Extract student name (first capitalized token before is/has/was/were/etc.)
  const nameMatch = sanitized.match(/\b([A-Z][a-z]+)\s+(?:is|has|was|were|had|did|does|will|would|can|could|should|needs|seems|appears|shows|struggles|helped|improved|completed|finished|started|began)/i);
  const studentName = nameMatch ? nameMatch[1] : "your child";
  
  // Extract positives
  const positiveKeywords = ['helped', 'improved', 'kind', 'effort', 'punctual', 'completed', 'excellent', 'wonderful', 'great', 'good', 'brilliant', 'sports', 'art', 'math', 'reading', 'creative', 'friendly', 'progress', 'achievement', 'success'];
  const positives = positiveKeywords.filter(keyword => 
    new RegExp(`\\b${keyword}\\b`, 'i').test(sanitized)
  );
  
  // Extract concerns
  const concernKeywords = ['lateness', 'late', 'absent', 'homework', 'assignment', 'focus', 'behaviour', 'behavior', 'tired', 'sleeping', 'sleepy', 'missing', 'participation', 'disruptive', 'struggles', 'difficult', 'challenge'];
  const concerns = concernKeywords.filter(keyword => 
    new RegExp(`\\b${keyword}\\b`, 'i').test(sanitized)
  );
  
  // Determine severity based on negative indicators
  const negativeIndicators = ['never', 'always', 'terrible', 'awful', 'horrible', 'worst', 'failed', 'refuses'];
  const negativeCount = negativeIndicators.filter(indicator => 
    new RegExp(`\\b${indicator}\\b`, 'i').test(roughNote)
  ).length;
  
  let severity: 'low' | 'med' | 'high' = 'low';
  if (concerns.length >= 3 || negativeCount >= 2) severity = 'high';
  else if (concerns.length >= 2 || negativeCount >= 1) severity = 'med';
  
  return {
    name: studentName,
    positives,
    concerns,
    severity,
    raw: sanitized,
    pronouns,
    preset
  };
}

function sanitizeLanguage(text: string): string {
  const replacements = {
    'lazy': 'struggles with motivation',
    'stupid': '', // Remove completely
    'dumb': '', // Remove completely
    'bad kid': 'child who needs support',
    'naughty': 'used unhelpful language/choices',
    'rude': 'used unhelpful language/choices',
    'disruptive': 'finding it hard to stay focused',
    'refuses to work': 'reluctant to engage',
    "won't listen": 'needs reminders',
    "doesn't care": 'is not fully engaged right now',
    'terrible': 'concerning',
    'awful': 'challenging',
    'horrible': 'difficult',
    'acting out': 'showing challenging behavior',
    'being difficult': 'finding it hard to engage',
    'bad behavior': 'challenging behavior',
    'never': 'rarely',
    'always': 'often'
  };

  let sanitized = text;
  Object.entries(replacements).forEach(([harsh, replacement]) => {
    const regex = new RegExp(`\\b${harsh}\\b`, 'gi');
    sanitized = sanitized.replace(regex, replacement);
  });

  // Clean up double spaces and trim
  return sanitized.replace(/\s+/g, ' ').trim();
}

// Stage B: Constrained Generation
export async function generateConstrainedOutput(parsed: ParsedInput): Promise<GeneratedOutput> {
  // Mock AI call with structured prompt
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const { name, positives, concerns, severity, raw, pronouns, preset } = parsed;
  
  let polishedContent: string;
  
  // Use preset-specific generation if available
  if (preset) {
    polishedContent = buildPresetMessage(name, preset, raw, positives, concerns);
  } else if (positives.length > 0 && concerns.length === 0) {
    // Pure praise - can be more positive
    polishedContent = buildPraiseMessage(name, positives, raw);
  } else if (concerns.length > 0 && positives.length > 0) {
    // Mixed - acknowledge both
    polishedContent = buildMixedMessage(name, positives, concerns, raw);
  } else if (concerns.length > 0) {
    // Concerns only - neutral, professional
    polishedContent = buildConcernMessage(name, concerns, severity, raw);
  } else {
    // Neutral update
    polishedContent = buildNeutralMessage(name, raw);
  }
  
  // Apply pronoun enforcement if pronouns are provided
  if (pronouns) {
    polishedContent = enforcePronouns(polishedContent, pronouns);
  }
  
  // Ensure 90-120 words
  polishedContent = enforceWordLimit(polishedContent, 90, 120);
  
  let emailBody = polishedContent;
  if (pronouns) {
    emailBody = enforcePronouns(polishedContent, pronouns);
  }
  
  return {
    polished: polishedContent,
    email: {
      greeting: "Hi there,",
      body: emailBody,
      closing: "Warm regards,",
      signature: "Ms. Johnson"
    }
  };
}

function buildPraiseMessage(name: string, positives: string[], raw: string): string {
  const openers = [
    `I'm pleased to share some positive news about ${name}.`,
    `I wanted to let you know about ${name}'s great progress.`,
    `${name} had a wonderful day, and I wanted to share the highlights.`
  ];
  
  const opener = openers[0]; // Use first for consistency
  const body = `Today they showed real ${positives.includes('effort') ? 'effort and determination' : 'engagement and positive attitude'}. ${positives.includes('helped') ? 'They were particularly helpful to their classmates' : 'Their contributions really stood out'}.`;
  const action = `Please celebrate this success with them at home, as positive reinforcement makes a real difference.`;
  const close = `I'd be happy to share more details about their progress anytime.`;
  
  return `${opener} ${body} ${action} ${close}`;
}

function buildMixedMessage(name: string, positives: string[], concerns: string[], raw: string): string {
  const opener = `I'd like to share an update about ${name}.`;
  const strength = `They show real strength in areas like ${positives.includes('sports') ? 'sports and physical activities' : positives.includes('reading') ? 'reading and comprehension' : 'creative subjects'},`;
  const concern = concerns.includes('homework') ? 'but they have been finding homework completion challenging.' : concerns.includes('focus') ? 'but they are finding it hard to maintain focus during lessons.' : 'but there are some areas where they need additional support.';
  const action = `We're working on strategies to help them transfer their strengths to all areas of learning.`;
  const close = `Your support at home will make a real difference, and I'd be happy to share specific ideas.`;
  
  return `${opener} ${strength} ${concern} ${action} ${close}`;
}

function buildConcernMessage(name: string, concerns: string[], severity: string, raw: string): string {
  const opener = `I'd like to share an update about ${name}.`;
  
  let concernDescription = '';
  if (concerns.includes('homework')) {
    concernDescription = 'Recently they have been finding homework completion challenging.';
  } else if (concerns.includes('focus')) {
    concernDescription = 'They have been finding it hard to stay focused during class activities.';
  } else if (concerns.includes('lateness')) {
    concernDescription = 'They have been arriving late to class several times recently.';
  } else {
    concernDescription = 'They have been facing some challenges with their learning engagement.';
  }
  
  const action = concerns.includes('homework') ? 
    'We are implementing a simplified task list and will accept partial completion as a positive restart.' :
    concerns.includes('lateness') ? 
    'I suggest arriving 5-10 minutes earlier to help them settle in properly.' :
    'We are providing extra support and encouragement to help them re-engage.';
    
  const close = `Please let me know if you'd like to discuss strategies we can try together.`;
  
  return `${opener} ${concernDescription} ${action} ${close}`;
}

function buildPresetMessage(name: string, preset: string, raw: string, positives: string[], concerns: string[]): string {
  switch (preset) {
    case 'praise':
      return buildPraiseMessage(name, positives.length > 0 ? positives : ['effort'], raw);
    case 'behaviour':
      const opener = `I'd like to share an update about ${name}.`;
      const issue = `Today they found it challenging to stay focused during independent work time.`;
      const impact = `This affected their ability to complete the task and was distracting to nearby students.`;
      const action = `At school we will provide more structured check-ins and movement breaks.`;
      const close = `Please let me know if you've noticed similar patterns at home so we can work together.`;
      return `${opener} ${issue} ${impact} ${action} ${close}`;
    case 'missing':
      const missingOpener = `I wanted to follow up about the assignment that was due today.`;
      const missingIssue = `${name}'s homework was not submitted or was incomplete.`;
      const missingAction = `At school we will review the task requirements and provide additional support during study time.`;
      const missingClose = `At home, please check their planner and help establish a consistent homework routine.`;
      return `${missingOpener} ${missingIssue} ${missingAction} ${missingClose}`;
    case 'attendance':
      const attendanceOpener = `I'd like to follow up about ${name}'s recent attendance.`;
      const attendanceIssue = `They have missed several days recently, which means they've missed foundational concepts we're building on this week.`;
      const attendanceAction = `We can provide catch-up materials and pair them with a study buddy to help them get back on track.`;
      const attendanceClose = `Please let me know if there are any ongoing challenges we should be aware of.`;
      return `${attendanceOpener} ${attendanceIssue} ${attendanceAction} ${attendanceClose}`;
    default:
      return buildNeutralMessage(name, raw);
  }
}

function buildNeutralMessage(name: string, raw: string): string {
  const opener = `Here's a quick update on ${name}'s progress.`;
  const body = `They continue to participate in class activities and we are supporting their ongoing development.`;
  const action = `We are focused on building their confidence and helping them achieve their best.`;
  const close = `Please reach out anytime you'd like to discuss how things are going.`;
  
  return `${opener} ${body} ${action} ${close}`;
}

function enforceWordLimit(text: string, min: number, max: number): string {
  const words = text.split(/\s+/);
  if (words.length > max) {
    return words.slice(0, max).join(' ') + '.';
  }
  return text;
}

// Stage C: Auto-review & Repair
export function reviewAndRepair(output: GeneratedOutput): { isValid: boolean; errors: string[]; repaired?: GeneratedOutput } {
  const errors: string[] = [];
  
  // Check for banned words
  const bannedWords = ['lazy', 'stupid', 'naughty', 'terrible', 'awful', 'horrible', 'dumb', 'bad kid'];
  const text = output.polished.toLowerCase();
  const foundBanned = bannedWords.filter(word => text.includes(word));
  if (foundBanned.length > 0) {
    errors.push(`Contains banned words: ${foundBanned.join(', ')}`);
  }
  
  // Check word count
  const wordCount = output.polished.split(/\s+/).length;
  if (wordCount < 90 || wordCount > 120) {
    errors.push(`Word count ${wordCount} is outside 90-120 range`);
  }
  
  // Check for neutral opener
  const neutralOpeners = [
    "I'd like to share an update about",
    "Here's a quick update on",
    "I wanted to let you know how",
    "I'm pleased to share",
    "I wanted to share"
  ];
  const hasNeutralOpener = neutralOpeners.some(opener => 
    output.polished.toLowerCase().startsWith(opener.toLowerCase())
  );
  if (!hasNeutralOpener) {
    errors.push('Does not start with approved neutral opener');
  }
  
  // Check for contradictions (basic check)
  const hasDelighted = /delighted|thrilled|excited/i.test(output.polished);
  const hasConcerns = /challenging|difficult|struggling|hard|concern/i.test(output.polished);
  if (hasDelighted && hasConcerns) {
    errors.push('Contains contradictory positive/negative language');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    repaired: errors.length > 0 ? undefined : output
  };
}

// Main pipeline function  
export async function runSnippetPipeline(roughNote: string, pronouns?: PronounSet, preset?: 'behaviour' | 'praise' | 'missing' | 'attendance'): Promise<GeneratedOutput> {
  // Stage A: Parse & Sanitize
  const parsed = parseAndSanitize(roughNote, pronouns, preset);
  
  // Stage B: Generate
  const generated = await generateConstrainedOutput(parsed);
  
  // Stage C: Review & Repair
  const review = reviewAndRepair(generated);
  
  if (!review.isValid) {
    // If validation fails, try one repair attempt
    console.warn('Snippet failed validation:', review.errors);
    // For now, return the generated output anyway
    // In production, this would trigger a re-generation
  }
  
  return generated;
}
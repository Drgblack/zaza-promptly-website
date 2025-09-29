// Promptly-grade pipeline: deterministic parsing + slot-filled generation
import { z } from 'zod';
import type { PronounSet } from '@/lib/text/pronouns';
import { enforcePronouns, extractStudentName, inferPronouns } from '@/lib/text/pronouns';
import { extractConcerns, extractPositives, determineSeverity, getStrategy, formatStrategy, type ConcernType } from '@/lib/strategies';

// Parse results (deterministic first, model second)
export interface ParsedData {
  name: string;
  pronouns: PronounSet;
  positives: string[];
  concerns: ConcernType[];
  examples: string[];
  severity: 'low' | 'med' | 'high';
  rawText: string;
}

// Slot-filled output from model (JSON only)
export interface SlotOutput {
  opener: string;
  observation: string;
  strength: string; // Empty if no positives
  nextStepSchool: string;
  nextStepHome: string;
  invite: string;
}

// Final composed output
export interface PromptlyOutput {
  polished: string;
  email: {
    greeting: string;
    body: string;
    closing: string;
    signature: string;
  };
}

const SlotOutputSchema = z.object({
  opener: z.string().min(10),
  observation: z.string().min(15),
  strength: z.string(),
  nextStepSchool: z.string().min(10),
  nextStepHome: z.string().min(10),
  invite: z.string().min(10)
});

// Stage A: Deterministic parsing  
export function parsePromptlyInput(
  roughNote: string, 
  pronouns?: PronounSet, 
  preset?: 'behaviour' | 'praise' | 'missing' | 'attendance'
): ParsedData {
  // Sanitize input first
  const sanitized = sanitizeInput(roughNote);
  
  // Extract name (existing logic)
  const extractedName = extractStudentName(sanitized);
  const name = extractedName || "your child";
  
  // Use provided pronouns or infer from name
  const finalPronouns = pronouns || inferPronouns(extractedName, 'auto');
  
  // Extract concerns and positives deterministically
  const concerns = extractConcerns(sanitized);
  const positives = extractPositives(sanitized);
  
  // Override concerns for pure praise cases
  if (positives.length > 0 && concerns.length === 1 && concerns[0] === 'clarify_needed') {
    // This is likely a praise case that was misclassified
    return {
      name,
      pronouns: finalPronouns,
      positives,
      concerns: [], // Clear the clarify_needed
      examples: extractExamples(sanitized),
      severity: 'low' as const,
      rawText: sanitized.trim()
    };
  }
  
  // Extract short examples (quotes/phrases) from sanitized text
  const examples = extractExamples(sanitized);
  
  // Determine severity
  const severity = determineSeverity(concerns, sanitized);
  
  return {
    name,
    pronouns: finalPronouns,
    positives,
    concerns,
    examples,
    severity,
    rawText: sanitized.trim()
  };
}

function sanitizeInput(text: string): string {
  const replacements = {
    'naughty': 'showing challenging behavior',
    'lazy': 'struggling with motivation',
    'stupid': 'needs additional support',
    'dumb': 'needs additional support', 
    'bad kid': 'child who needs support',
    'rude': 'using inappropriate language',
    'disruptive': 'finding it hard to stay focused',
    'refuses to work': 'reluctant to engage',
    "won't listen": 'needs reminders',
    "doesn't care": 'not fully engaged',
    'terrible': 'concerning',
    'awful': 'challenging',
    'horrible': 'difficult'
  };

  let sanitized = text;
  Object.entries(replacements).forEach(([harsh, replacement]) => {
    const regex = new RegExp(`\\b${harsh}\\b`, 'gi');
    sanitized = sanitized.replace(regex, replacement);
  });

  return sanitized.replace(/\s+/g, ' ').trim();
}

function extractExamples(text: string): string[] {
  // Extract short quoted phrases or specific behaviors mentioned
  const examples: string[] = [];
  
  // Look for quoted text
  const quotes = text.match(/"([^"]+)"/g);
  if (quotes) {
    examples.push(...quotes.slice(0, 2).map(q => q.replace(/"/g, '')));
  }
  
  // Look for specific behavior patterns (simple heuristic)
  const behaviorPatterns = [
    /(?:was|is|being)\s+([^.!?]+)/gi,
    /(?:they|he|she)\s+([^.!?]+)/gi
  ];
  
  behaviorPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches && examples.length < 2) {
      matches.slice(0, 2 - examples.length).forEach(match => {
        const clean = match.replace(/^(was|is|being|they|he|she)\s+/i, '').trim();
        if (clean.length > 5 && clean.length < 50) {
          examples.push(clean);
        }
      });
    }
  });
  
  return examples.slice(0, 2); // Max 2 examples
}

// Stage B: Slot-filled generation (mock for now, will be real AI call)
export async function generateSlots(parsed: ParsedData): Promise<SlotOutput> {
  // Mock generation with structured templates based on parsed data
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const { name, pronouns, positives, concerns, examples, severity } = parsed;
  const strategy = getStrategy(concerns);
  const formattedStrategy = formatStrategy(strategy, name, pronouns);
  
  // Preferred openers
  const openers = [
    `I'd like to share an update about ${name}.`,
    `Here's a quick update on ${name}'s week.`,
    `I wanted to let you know how ${name} has been doing recently.`
  ];
  
  const opener = concerns.length === 0 ? 
    `I'm pleased to share some positive news about ${name}.` : 
    openers[0];
  
  // Build observation based on concerns and examples
  let observation = '';
  if (concerns.length > 0) {
    const concernDesc = getConcernDescription(concerns[0], pronouns);
    const impact = getImpactDescription(concerns[0], pronouns);
    observation = `${concernDesc}. ${impact}`;
  } else {
    observation = `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} demonstrated excellent engagement and positive contributions to our classroom community. ${pronouns.possAdj.charAt(0).toUpperCase() + pronouns.possAdj.slice(1)} enthusiasm and effort have been noticed by both peers and staff.`;
  }
  
  // Strength section
  const strength = positives.length > 0 ? 
    `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} continues to show real strength in ${
      positives.includes('sport') || positives.includes('sports') ? 'physical activities' : 
      positives.includes('reading') ? 'literacy skills' : 
      positives.includes('math') ? 'mathematical thinking' : 
      positives.includes('led') || positives.includes('leadership') || positives.includes('leading') ? 'leadership and collaboration' :
      'creative subjects'
    }.` : 
    '';
  
  // Adjust strategies for praise-only cases
  const isPraiseOnly = concerns.length === 0 && positives.length > 0;
  
  return {
    opener,
    observation,
    strength,
    nextStepSchool: isPraiseOnly ? 
      `We will continue to provide opportunities for ${pronouns.obj} to build on these leadership skills.` :
      `At school, we will ${formattedStrategy.school} to help ${pronouns.obj} get back on track with learning.`,
    nextStepHome: isPraiseOnly ? 
      `Please continue to encourage ${pronouns.possAdj} natural leadership at home as well.` :
      `At home, please ${formattedStrategy.home} as this will reinforce what we're doing at school.`,
    invite: "Please let me know a good time to talk through next steps together. Your partnership in this approach will make a real difference."
  };
}

function getConcernDescription(concern: ConcernType, pronouns: PronounSet): string {
  const descriptions = {
    lateness: `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} has been arriving late to class`,
    missing_homework: `${pronouns.possAdj.charAt(0).toUpperCase() + pronouns.possAdj.slice(1)} homework has been incomplete or missing`,
    focus_disruption: `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} has been finding it hard to stay focused during lessons`,
    tired_sleepy: `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} appears tired and has difficulty maintaining alertness`,
    rude_language: `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} has used language that doesn't meet our classroom standards`,
    low_effort: `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} has been showing reluctance to engage with tasks`,
    absence: `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} has missed several days recently`,
    incomplete_work: `${pronouns.possAdj.charAt(0).toUpperCase() + pronouns.possAdj.slice(1)} work has been consistently unfinished`,
    unprepared: `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} has been arriving without necessary materials`,
    off_task: `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} has been having difficulty following classroom routines`,
    clarify_needed: `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} needs some additional support with classroom engagement`
  };
  
  return descriptions[concern] || descriptions.clarify_needed;
}

function getImpactDescription(concern: ConcernType, pronouns: PronounSet): string {
  const impacts = {
    lateness: `This means ${pronouns.subj} misses important morning instructions and settling-in time`,
    missing_homework: `This is affecting ${pronouns.possAdj} ability to practice and consolidate new learning`,
    focus_disruption: `This impacts ${pronouns.possAdj} learning and can be distracting for nearby students`,
    tired_sleepy: `This affects ${pronouns.possAdj} ability to participate fully in classroom activities`,
    rude_language: `This creates an uncomfortable environment for other students`,
    low_effort: `This is preventing ${pronouns.obj} from reaching ${pronouns.possAdj} full potential`,
    absence: `This means ${pronouns.subj} has missed foundational concepts we're building on`,
    incomplete_work: `This means ${pronouns.subj} may fall behind in understanding key concepts`,
    unprepared: `This affects ${pronouns.possAdj} ability to participate fully in lessons`,
    off_task: `This impacts ${pronouns.possAdj} learning and the smooth running of classroom activities`,
    clarify_needed: `We want to ensure ${pronouns.subj} feels supported and successful at school`
  };
  
  return impacts[concern] || impacts.clarify_needed;
}

// Stage C: Compose final output
export function composeFinalOutput(slots: SlotOutput): PromptlyOutput {
  // Assemble 3 paragraphs
  const para1 = slots.strength ? 
    `${slots.opener} ${slots.observation} ${slots.strength}` :
    `${slots.opener} ${slots.observation}`;
    
  const para2 = `${slots.nextStepSchool} ${slots.nextStepHome}`;
  
  const para3 = slots.invite;
  
  const polished = `${para1}\n\n${para2}\n\n${para3}`;
  
  return {
    polished,
    email: {
      greeting: "Hi there,",
      body: polished,
      closing: "Warm regards,",
      signature: "Ms. Johnson"
    }
  };
}

// Auto-review & repair
export function reviewAndRepair(output: PromptlyOutput): { isValid: boolean; errors: string[]; repaired?: PromptlyOutput } {
  const errors: string[] = [];
  const text = output.polished.toLowerCase();
  
  // Check for banned words
  const bannedWords = ['lazy', 'naughty', 'stupid', 'bad kid', 'terrible', 'awful', 'horrible', 'dumb'];
  const foundBanned = bannedWords.filter(word => text.includes(word));
  if (foundBanned.length > 0) {
    errors.push(`Contains banned words: ${foundBanned.join(', ')}`);
  }
  
  // Check word count (85-130 range)
  const wordCount = output.polished.split(/\s+/).filter(w => w.length > 0).length;
  if (wordCount < 85 || wordCount > 130) {
    errors.push(`Word count ${wordCount} is outside 85-130 range`);
  }
  
  // Check for neutral opener when concerns exist
  if (text.includes('challenging') || text.includes('difficult') || text.includes('struggling')) {
    if (text.includes('delighted') || text.includes('thrilled') || text.includes('excited')) {
      errors.push('Contains contradictory positive/negative language');
    }
  }
  
  // Check for concrete actions
  const actionVerbs = ['provide', 'set', 'practice', 'agree', 'start', 'check', 'establish', 'support'];
  const hasConcreteAction = actionVerbs.some(verb => text.includes(verb));
  if (!hasConcreteAction) {
    errors.push('Lacks concrete action steps');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    repaired: errors.length === 0 ? output : undefined
  };
}

// Main pipeline
export async function runPromptlyPipeline(
  roughNote: string,
  pronouns?: PronounSet,
  preset?: 'behaviour' | 'praise' | 'missing' | 'attendance'
): Promise<PromptlyOutput> {
  // Stage A: Parse
  const parsed = parsePromptlyInput(roughNote, pronouns, preset);
  
  // Stage B: Generate slots
  const slots = await generateSlots(parsed);
  
  // Stage C: Compose
  let output = composeFinalOutput(slots);
  
  // Enforce pronouns on final output
  output.polished = enforcePronouns(output.polished, parsed.pronouns);
  output.email.body = enforcePronouns(output.email.body, parsed.pronouns);
  
  // Stage D: Review
  const review = reviewAndRepair(output);
  if (!review.isValid) {
    console.warn('Output failed validation:', review.errors);
    // In production, this would trigger re-generation
  }
  
  return output;
}
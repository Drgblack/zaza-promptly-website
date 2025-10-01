// Promptly-grade pipeline: deterministic parsing + slot-filled generation
import { z } from 'zod';
import type { PronounSet } from '@/lib/text/pronouns';
import { enforcePronouns, extractStudentName, inferPronouns } from '@/lib/text/pronouns';
import { extractConcerns, extractPositives, determineSeverity, getStrategy, formatStrategy, pickPaddingSentence, selectOpener, selectCloser, getConcernCluster, type ConcernType } from '@/lib/strategies';

// Pronoun resolution: explicit choice beats auto-inference
type Pronoun = 'he' | 'she' | 'they';
function resolvePronoun({toggle, name}: {toggle: 'auto' | 'he' | 'she' | 'they', name?: string}): Pronoun {
  if (toggle === 'he' || toggle === 'she' || toggle === 'they') return toggle;     // explicit > auto ✔
  // auto path only:
  const inferred = inferFromCsv(name); // returns 'he'|'she'|undefined
  return inferred ?? 'they';
}

function inferFromCsv(name?: string): 'he' | 'she' | undefined {
  if (!name) return undefined;
  
  // Enhanced name normalization
  const normalized = name
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\s-]/gu, '') // Remove punctuation/emoji/dots, keep Unicode letters
    .split(/[\s-]+/)[0] // First token only (handles "Mary-Jane" → "mary")
    .normalize('NFD') // Decompose accents
    .replace(/[\u0300-\u036f]/g, ''); // Remove accent marks
  
  if (!normalized) return undefined;
  
  // Updated name mappings including Mary
  const maleNames = ['john', 'johnny', 'jack', 'phillip', 'liam', 'noah', 'michael', 'benjamin', 'james', 'joseph', 'charles', 'matthew', 'andrew', 'lucas', 'daniel', 'henry', 'william', 'oliver'];
  const femaleNames = ['sandra', 'mary', 'sally', 'emma', 'olivia', 'ava', 'sophia', 'isabella', 'amelia', 'mia', 'charlotte', 'abigail', 'emily', 'hannah', 'elizabeth', 'katherine', 'lilly', 'kate', 'abby', 'sarah', 'beth', 'liza'];
  
  if (maleNames.includes(normalized)) return 'he';
  if (femaleNames.includes(normalized)) return 'she';
  return undefined;
}
import { qualityGate, fixPronounAgreement, fixSentenceSeams, enforceGoldStandardPronouns, convertToUKEnglish, applyMicroPolish, grammarRepair, postComposeGrammarRepair, enforceWordLimit } from '@/lib/quality/qualityGate';
import { pickOpener, pickCloser, getConcernKey, getPronounKey, type PronounKey, type ConcernKey } from '@/lib/knowledgeBase';

// Parse results (deterministic first, model second)
export interface ParsedData {
  name: string;
  pronouns: PronounSet;
  pronounSource: 'auto' | 'explicit'; // Track source for debug info
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
  toggle: 'auto' | 'he' | 'she' | 'they' = 'auto',
  preset?: 'behaviour' | 'praise' | 'missing' | 'attendance'
): ParsedData {
  // Sanitize input first
  const sanitized = sanitizeInput(roughNote);
  
  // Extract name (existing logic)
  const extractedName = extractStudentName(sanitized);
  const name = extractedName || "your child";
  
  // Resolve pronouns using explicit override logic
  const resolvedPronoun = resolvePronoun({toggle, name: extractedName});
  const pronounSource = (toggle === 'he' || toggle === 'she' || toggle === 'they') ? 'explicit' : 'auto';
  const finalPronouns: PronounSet = {
    subj: resolvedPronoun,
    obj: resolvedPronoun === 'he' ? 'him' : resolvedPronoun === 'she' ? 'her' : 'them',
    possAdj: resolvedPronoun === 'he' ? 'his' : resolvedPronoun === 'she' ? 'her' : 'their'
  };
  
  // Extract concerns and positives deterministically
  const concerns = extractConcerns(sanitized);
  const positives = extractPositives(sanitized);
  
  // Override concerns for pure praise cases
  if (positives.length > 0 && concerns.length === 1 && concerns[0] === 'clarify_needed') {
    // This is likely a praise case that was misclassified
    return {
      name,
      pronouns: finalPronouns,
      pronounSource,
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
    pronounSource,
    positives,
    concerns,
    examples,
    severity,
    rawText: sanitized.trim()
  };
}

function sanitizeInput(text: string): string {
  const replacements = {
    'lazy': 'finding it hard to stay motivated',
    'naughty': 'showing challenging behaviour', 
    'bad': 'showing challenging behaviour',
    'bad at': 'finding {subject} challenging',
    'naughty boy': 'child showing challenging behaviour',
    'bad kid': 'child showing challenging behaviour',
    'stupid': 'needs additional support',
    'dumb': 'needs additional support', 
    'rude': 'using inappropriate language',
    'disruptive': 'finding it hard to stay focused',
    'refuses to work': 'reluctant to engage',
    "won't listen": 'needs reminders',
    "doesn't care": 'not fully engaged',
    'without excuses': 'without a note from home or the office',
    'without any excuses': 'without a note from home or the office',
    'no excuses': 'without a note from home or the office',
    'terrible': 'concerning',
    'awful': 'challenging',
    'horrible': 'difficult',
    'always': 'often',
    'never': 'rarely',
    'very naughty': 'showing challenging behaviour'
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

// Repair function for failed quality gate
async function generateSlotsWithRepair(parsed: ParsedData, errors: string[]): Promise<SlotOutput> {
  // Apply specific repair strategies based on error types
  const repairInstructions = errors.map(error => {
    if (error === 'too_short') return 'Add more specific details to reach 95+ words';
    if (error === 'too_long') return 'Shorten sentences to stay under 120 words';
    if (error === 'readability_out_of_range') return 'Use simpler words and shorter sentences';
    if (error === 'not_enough_actions') return 'Include more concrete action verbs';
    if (error.startsWith('banned:')) return 'Remove harsh language and use supportive terms';
    return 'Improve quality and clarity';
  }).join('. ');
  
  console.log('Applying repair instructions:', repairInstructions);
  
  // For now, use same generation logic with awareness of needed repairs
  return generateSlots(parsed);
}

// Stage B: Slot-filled generation (mock for now, will be real AI call)
export async function generateSlots(parsed: ParsedData): Promise<SlotOutput> {
  // Mock generation with structured templates based on parsed data
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const { name, pronouns, positives, concerns, examples, severity } = parsed;
  const strategy = getStrategy(concerns);
  const formattedStrategy = formatStrategy(strategy, name, pronouns);
  
  // Use context-aware opener variants
  const opener = selectOpener(concerns, name, pronouns);
  
  // Special handling for lateness + homework combination (used in multiple places)
  const hasLateness = concerns.includes('lateness');
  const hasHomework = concerns.includes('missing_homework');
  
  // Build observation based on concerns and examples
  let observation = '';
  if (concerns.length > 0) {
    
    if (hasLateness && hasHomework) {
      observation = `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} has been arriving late to class, and some homework has been incomplete. This affects settling-in time and the chance to hear the first instructions.`;
    } else {
      const concernDesc = getConcernDescription(concerns[0], pronouns);
      const impact = getImpactDescription(concerns[0], pronouns);
      
        // Add specific examples or additional concerns for richer content
        let additionalDetail = '';
        if (concerns.length > 1) {
          // Build a simpler additional concern description
          const secondConcern = concerns[1];
          let secondDesc = '';
          switch (secondConcern) {
            case 'missing_homework':
              secondDesc = `${pronouns.possAdj} homework has often been incomplete`;
              break;
            case 'throwing_items':
              secondDesc = `${pronouns.subj} has thrown items during group work`;
              break;
            case 'focus_disruption':
              secondDesc = `${pronouns.subj} has had difficulty maintaining focus`;
              break;
            case 'low_effort':
              secondDesc = `${pronouns.subj} is finding it hard to stay motivated`;
              break;
            case 'off_task':
              secondDesc = `${pronouns.subj} is showing challenging behaviour`;
              break;
            default:
              secondDesc = `${pronouns.subj} has also shown other challenging behaviors`;
          }
          additionalDetail = ` ${secondDesc}.`;
        } else if (examples.length > 0) {
          additionalDetail = ` For example, ${pronouns.subj} ${examples[0]}.`;
        }
        
      // Add more specific timing/context details to reach word count
      const timeContext = getTimeContext(concerns[0]);
      observation = `${concernDesc}.${additionalDetail} ${impact} ${timeContext}`;
    }
  } else {
    observation = `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} demonstrated excellent engagement and positive contributions to our classroom community. ${pronouns.possAdj.charAt(0).toUpperCase() + pronouns.possAdj.slice(1)} enthusiasm and effort have been noticed by both peers and staff.`;
  }
  
  // Strength section - always include one for concern cases
  const strength = positives.length > 0 ? 
    `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} continues to show real strength in ${
      positives.includes('sport') || positives.includes('sports') ? 'physical activities' : 
      positives.includes('reading') ? 'literacy skills' : 
      positives.includes('math') ? 'mathematical thinking' : 
      positives.includes('led') || positives.includes('leadership') || positives.includes('leading') ? 'leadership and collaboration' :
      'creative subjects'
    }.` : 
    concerns.length > 0 ? `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} continues to show effort and engagement in classroom activities.` : '';
  
  // Adjust strategies for praise-only cases and specific combinations
  const isPraiseOnly = concerns.length === 0 && positives.length > 0;
  const hasLatenessAndHomework = hasLateness && hasHomework;
  
  let nextStepSchool: string;
  let nextStepHome: string;
  
  if (isPraiseOnly) {
    nextStepSchool = `We will continue to provide opportunities for ${pronouns.obj} to build on these leadership skills.`;
    nextStepHome = `Please continue to encourage ${pronouns.possAdj} natural leadership at home as well.`;
  } else if (hasLatenessAndHomework) {
    nextStepSchool = `At school, I'll meet ${name} at the door and have a one-minute "Do Now" ready so ${pronouns.subj} can start immediately. I'll also prompt ${pronouns.obj} to note homework clearly before leaving.`;
    nextStepHome = `At home, please aim to leave 10 minutes earlier and pack the bag the night before. A quiet, short homework slot (about 15 minutes) most days works well.`;
  } else {
    nextStepSchool = `At school, ${formattedStrategy.school}`;
    nextStepHome = `At home, ${formattedStrategy.home.charAt(0).toLowerCase() + formattedStrategy.home.slice(1)}`;
  }
  
  return {
    opener,
    observation,
    strength,
    nextStepSchool,
    nextStepHome,
    invite: selectCloser(concerns)
  };
}

function getTimeContext(concern: ConcernType): string {
  const contexts = {
    lateness: "This pattern has been consistent over the past week and affects morning learning opportunities.",
    missing_homework: "This has been happening frequently and impacts learning consolidation.",
    focus_disruption: "This is most noticeable during whole-class instruction and independent work time.",
    tired_sleepy: "This is particularly evident during morning sessions and after lunch.",
    rude_language: "This has occurred during both structured and unstructured times.",
    low_effort: "This is evident across different subject areas and task types.",
    absence: "This pattern is affecting continuity of learning and peer relationships.",
    incomplete_work: "This is happening across multiple subjects and affects progress tracking.",
    unprepared: "This occurs regularly and impacts readiness to learn.",
    off_task: "This is most noticeable during transition times and independent work.",
    clarify_needed: "We are observing patterns that need further discussion."
  };
  
  return contexts[concern] || contexts.clarify_needed;
}

function getConcernDescription(concern: ConcernType, pronouns: PronounSet): string {
  const descriptions = {
    lateness: `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} has been arriving late to class`,
    missing_homework: `${pronouns.possAdj.charAt(0).toUpperCase() + pronouns.possAdj.slice(1)} homework has been incomplete or missing`,
    focus_disruption: `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} has been finding it hard to stay focused during lessons`,
    tired_sleepy: `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} appears tired and has difficulty maintaining alertness`,
    rude_language: `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} has used language that doesn't meet our classroom standards`,
    low_effort: `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} is finding it hard to stay motivated`,
    absence: `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} has missed several days recently`,
    incomplete_work: `${pronouns.possAdj.charAt(0).toUpperCase() + pronouns.possAdj.slice(1)} work has been consistently unfinished`,
    unprepared: `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} has been arriving without necessary materials`,
    off_task: `${pronouns.subj.charAt(0).toUpperCase() + pronouns.subj.slice(1)} has been showing challenging behaviour`,
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

// Stage C: Compose final output (without KB opener/closer - added later)
export function composeFinalOutput(slots: SlotOutput): PromptlyOutput {
  // Core content without opener/closer (will be added from KB)
  // Combine all core content into single paragraph for 3-paragraph structure
  const strengthPart = slots.strength ? ` ${slots.strength}` : '';
  const coreContent = `${slots.observation}${strengthPart} ${slots.nextStepSchool} ${slots.nextStepHome}`.trim();
  
  // Ensure email body has same content as polished
  return {
    polished: coreContent,
    email: {
      greeting: "Hi there,",
      body: coreContent, // Same enforced text
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

// Main pipeline - deterministic KB-aligned with correct order
export async function runPromptlyPipeline(
  roughNote: string,
  toggle: 'auto' | 'he' | 'she' | 'they' = 'auto',
  preset?: 'behaviour' | 'praise' | 'missing' | 'attendance'
): Promise<PromptlyOutput & { parsed: ParsedData }> {
  // Stage A: Parse
  const parsed = parsePromptlyInput(roughNote, toggle, preset);
  
  // Stage B: Generate slots (core content only)
  const slots = await generateSlots(parsed);
  
  // Stage C: Compose core content (without opener/closer)
  let output = composeFinalOutput(slots);
  
  // Stage D: Insert deterministic KB opener/closer
  const pronounKey = getPronounKey(parsed.pronouns);
  const concernKey = getConcernKey(parsed.concerns, parsed.positives.length > 0);
  
  const opener = pickOpener(pronounKey, concernKey, parsed.name);
  const closer = pickCloser(pronounKey, concernKey);
  
  // Combine: opener + core content + closer
  const withKB = `${opener}\n\n${output.polished}\n\n${closer}`;
  
  // Stage E: Add padding if needed (95-120 words)
  function addPaddingIfNeeded(text: string): string {
    const wordCount = (s: string) => (s.trim().match(/\b[\w'']+\b/g)?.length ?? 0);
    const MIN_WORDS = 95;
    const MAX_WORDS = 120;
    
    if (wordCount(text) >= MIN_WORDS) {
      return text;
    }
    
    const usedPadding: string[] = [];
    let paddedText = text;
    
    // Add first padding sentence
    const pad1 = pickPaddingSentence(paddedText, usedPadding);
    const testText1 = `${paddedText} ${pad1}`;
    
    if (wordCount(testText1) <= MAX_WORDS) {
      paddedText = testText1;
      usedPadding.push(pad1);
    }
    
    // Add second padding if still needed
    if (wordCount(paddedText) < MIN_WORDS) {
      const pad2 = pickPaddingSentence(paddedText, usedPadding);
      const testText2 = `${paddedText} ${pad2}`;
      
      if (wordCount(testText2) <= MAX_WORDS) {
        paddedText = testText2;
      }
    }
    
    return paddedText;
  }
  
  let paddedContent = addPaddingIfNeeded(withKB);
  
  // Stage F: Word count guard (cap at 120)
  paddedContent = enforceWordLimit(paddedContent, 120);
  
  // Stage G: Post-composition grammar repair
  function applyFinalProcessing(text: string): string {
    let processed = text;
    
    // 1. Post-composition grammar repair (after padding, before QA)
    processed = postComposeGrammarRepair(processed, pronounKey);
    
    // 2. UK English conversion
    processed = convertToUKEnglish(processed);
    
    // 3. Final sentence cleanup
    processed = fixSentenceSeams(processed);
    
    return processed;
  }
  
  // Apply final processing to both outputs
  output.polished = applyFinalProcessing(paddedContent);
  output.email.body = applyFinalProcessing(paddedContent);
  
  // Stage H: Quality gate (final check - no regeneration)
  const gate = qualityGate(output.polished, parsed.pronouns);
  
  // Debug logging (only when debug mode enabled)
  if (process.env.NEXT_PUBLIC_DEBUG_SNIPPET === '1') {
    console.log('🔍 KB-Aligned Pipeline:', {
      pronounKey,
      concernKey,
      wordCount: (output.polished.match(/\b[\w'']+\b/g) || []).length,
      paragraphs: output.polished.split('\n\n').length,
      qualityGate: gate.ok ? 'PASS' : 'FAIL',
      errors: gate.errors
    });
  }
  
  if (!gate.ok) {
    console.warn('Final output failed quality gate:', gate.errors);
    console.warn('Metrics:', gate.metrics);
  }
  
  return { ...output, parsed };
}

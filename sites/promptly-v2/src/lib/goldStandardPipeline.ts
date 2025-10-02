// Gold-standard Promptly pipeline: deterministic, no paraphrasing
import { z } from 'zod';
import { KB, pickOpenerCloser, type Pronoun } from '@/lib/kb';
import { repairGrammar } from '@/lib/postComposeGrammarRepair';
import type { PronounSet } from '@/lib/text/pronouns';
import { inferPronouns } from '@/lib/text/pronouns';

// Input validation
const InputSchema = z.object({
  focus: z.string().min(1, 'Focus text required'),
  student: z.string().optional(),
  pronounToggle: z.enum(['auto', 'he', 'she', 'they'])
});

export type GoldInput = z.infer<typeof InputSchema>;

export interface GoldOutput {
  polished: string;
  emailReady: string;
  debug: {
    pronounSource: 'explicit' | 'auto-csv' | 'auto-fallback';
    pronoun: Pronoun;
    name: string;
    paragraphs: number;
    wordCount: number;
    qaStatus: 'PASS' | 'FAIL';
    pipeline: string;
  };
}

// Enhanced name mappings for reliable pronoun inference
const NAME_MAPPINGS: Record<string, 'he' | 'she'> = {
  // Male names
  'john': 'he', 'johnny': 'he', 'jack': 'he', 'james': 'he', 'jamie': 'he',
  'michael': 'he', 'mike': 'he', 'david': 'he', 'dave': 'he', 'robert': 'he',
  'phillip': 'he', 'phil': 'he', 'william': 'he', 'bill': 'he', 'kenny': 'he',
  'thomas': 'he', 'tom': 'he', 'richard': 'he', 'rick': 'he', 'daniel': 'he',
  'dan': 'he', 'matthew': 'he', 'matt': 'he', 'anthony': 'he', 'tony': 'he',
  
  // Female names
  'mary': 'she', 'marie': 'she', 'sandra': 'she', 'sandy': 'she', 'emma': 'she',
  'sally': 'she', 'sarah': 'she', 'sara': 'she', 'jennifer': 'she', 'jen': 'she',
  'jessica': 'she', 'lisa': 'she', 'karen': 'she', 'nancy': 'she', 'betty': 'she',
  'jane': 'she', 'helen': 'she', 'patricia': 'she', 'pat': 'she', 'linda': 'she'
};

/**
 * Name handling: no "your child" when a name exists
 */
function extractValidName(studentInput?: string): string {
  const name = studentInput?.trim();
  if (!name) return "your child";
  
  // Validate name format (letters, spaces, hyphens, apostrophes)
  if (/^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$/.test(name)) {
    return name;
  }
  
  return "your child";
}

/**
 * Pronoun resolution: explicit choice beats auto-inference
 */
function resolvePronoun(toggle: 'auto' | 'he' | 'she' | 'they', name: string): {
  pronoun: Pronoun;
  source: 'explicit' | 'auto-csv' | 'auto-fallback';
} {
  // Explicit choice always wins
  if (toggle === 'he' || toggle === 'she' || toggle === 'they') {
    return { pronoun: toggle, source: 'explicit' };
  }
  
  // Auto inference from name
  if (name !== "your child") {
    const normalized = name.toLowerCase().trim();
    const inferred = NAME_MAPPINGS[normalized];
    if (inferred) {
      return { pronoun: inferred, source: 'auto-csv' };
    }
  }
  
  // Fallback to 'they'
  return { pronoun: 'they', source: 'auto-fallback' };
}

/**
 * Determine concern type for KB selection
 */
function getConcernType(focusText: string): 'focus' | 'attendance' {
  const text = focusText.toLowerCase();
  
  // Look for attendance-related keywords
  if (text.includes('late') || text.includes('absent') || text.includes('missing') || 
      text.includes('attendance') || text.includes('arriving')) {
    return 'attendance';
  }
  
  // Default to focus issues
  return 'focus';
}

/**
 * Compose core body (school + home actions)
 */
function composeCoreBody(focusText: string, name: string, pronoun: Pronoun): string {
  const concerns = extractBasicConcerns(focusText);
  const actions = generateActions(concerns, name, pronoun);
  
  return `${concerns} ${actions}`.trim();
}

/**
 * Extract basic concern description
 */
function extractBasicConcerns(focusText: string): string {
  // Simple transformation of input to professional language
  const text = focusText.toLowerCase();
  
  if (text.includes('late') && text.includes('homework')) {
    return "There have been some challenges with punctuality and homework completion.";
  } else if (text.includes('late') || text.includes('arriving')) {
    return "There have been some challenges with punctuality.";
  } else if (text.includes('focus') || text.includes('distract') || text.includes('talking')) {
    return "There have been some challenges with maintaining focus during lessons.";
  } else if (text.includes('homework') || text.includes('missing')) {
    return "There have been some challenges with homework completion.";
  }
  
  return "I wanted to share some observations about classroom engagement.";
}

/**
 * Generate school and home actions
 */
function generateActions(concerns: string, name: string, pronoun: Pronoun): string {
  const schoolAction = `At school, I'll provide additional support and clear expectations.`;
  const homeAction = `At home, please continue to encourage consistent routines.`;
  
  return `${schoolAction} ${homeAction}`;
}

/**
 * Word count utilities
 */
function countWords(text: string): number {
  return (text.trim().match(/\b[\w'']+\b/g)?.length ?? 0);
}

/**
 * Safe padding sentences for expansion
 */
const PADDING_SENTENCES = [
  "This will help ensure consistent progress.",
  "I appreciate your ongoing support.",
  "Together we can help maintain positive momentum.",
  "Thank you for your partnership in this.",
  "Your collaboration makes such a positive difference.",
  "I look forward to continuing our partnership.",
  "Please feel free to reach out with any questions."
];

/**
 * Word count guard with safe padding
 */
function enforceWordCount(text: string): string {
  const MIN_WORDS = 95;
  const MAX_WORDS = 120;
  let current = text;
  let wordCount = countWords(current);
  
  // If under minimum, add padding more aggressively
  if (wordCount < MIN_WORDS) {
    for (const padding of PADDING_SENTENCES) {
      if (wordCount >= MIN_WORDS) break;
      
      const testText = `${current} ${padding}`;
      const testWordCount = countWords(testText);
      
      if (testWordCount <= MAX_WORDS) {
        current = testText;
        wordCount = testWordCount;
      } else {
        // If adding full sentence would exceed max, try shorter phrases
        const shortPhrases = [
          "This supports consistent progress.",
          "I appreciate your support.",
          "Thank you for your partnership.",
          "Your support is valued.",
          "I look forward to hearing from you."
        ];
        
        for (const phrase of shortPhrases) {
          const phraseTest = `${current} ${phrase}`;
          const phraseWordCount = countWords(phraseTest);
          if (phraseWordCount >= MIN_WORDS && phraseWordCount <= MAX_WORDS) {
            current = phraseTest;
            wordCount = phraseWordCount;
            break;
          }
        }
        break;
      }
    }
  }
  
  // If over maximum, trim from end of paragraph 2
  if (wordCount > MAX_WORDS) {
    const paragraphs = current.split('\n\n');
    if (paragraphs.length >= 3) {
      // Trim sentences from end of middle paragraph
      let para2 = paragraphs[1];
      const sentences = para2.split(/(?<=[.!?])\s+/);
      
      while (sentences.length > 1 && countWords(current) > MAX_WORDS) {
        sentences.pop();
        para2 = sentences.join(' ');
        paragraphs[1] = para2;
        current = paragraphs.join('\n\n');
      }
    }
  }
  
  return current;
}

/**
 * QA gate with hard checks
 */
function qaGate(text: string, expectedOpener: string, expectedClosers: string[]): {
  passed: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  // Check paragraph count
  const paragraphs = text.split('\n\n').filter(p => p.trim());
  if (paragraphs.length !== 3) {
    errors.push(`Expected 3 paragraphs, got ${paragraphs.length}`);
  }
  
  // Check word count
  const wordCount = countWords(text);
  if (wordCount < 95 || wordCount > 120) {
    errors.push(`Word count ${wordCount} outside range 95-120`);
  }
  
  // Check opener (exact match, case-insensitive)
  const actualOpener = paragraphs[0]?.trim() || '';
  if (!actualOpener.toLowerCase().includes(expectedOpener.toLowerCase())) {
    errors.push(`Opener mismatch`);
  }
  
  // Check closer (must end with one of the approved closers)
  const actualCloser = paragraphs[2]?.trim() || '';
  const hasValidCloser = expectedClosers.some(closer => 
    actualCloser.toLowerCase().includes(closer.toLowerCase())
  );
  if (!hasValidCloser) {
    errors.push(`Closer mismatch`);
  }
  
  // Check for banned words
  const bannedWords = ['lazy', 'naughty', 'bad', 'stupid'];
  const lowerText = text.toLowerCase();
  const foundBanned = bannedWords.filter(word => lowerText.includes(word));
  if (foundBanned.length > 0) {
    errors.push(`Banned words: ${foundBanned.join(', ')}`);
  }
  
  return {
    passed: errors.length === 0,
    errors
  };
}

/**
 * Main gold-standard pipeline
 */
export async function goldStandardPipeline(input: GoldInput): Promise<GoldOutput> {
  // Validate input
  const parsed = InputSchema.parse(input);
  
  // Extract and validate name
  const name = extractValidName(parsed.student);
  
  // Resolve pronoun with source tracking
  const { pronoun, source } = resolvePronoun(parsed.pronounToggle, name);
  
  // Determine concern type for KB selection
  const concernType = getConcernType(parsed.focus);
  
  // Get exact opener and closer from KB (no paraphrasing)
  const { opener, closer } = pickOpenerCloser(pronoun, name, concernType);
  
  // Compose core body
  const coreBody = composeCoreBody(parsed.focus, name, pronoun);
  
  // Assemble 3 paragraphs (hard rule)
  const paragraph1 = opener.trim();
  const paragraph2 = coreBody.trim();
  const paragraph3 = closer.trim();
  
  let output = [paragraph1, paragraph2, paragraph3].join('\n\n');
  
  // Apply deterministic grammar repair
  output = repairGrammar(output);
  
  // Enforce word count with safe padding
  output = enforceWordCount(output);
  
  // Final QA gate
  const qa = qaGate(output, opener, KB[pronoun].closers);
  
  // Debug info
  const debug = {
    pronounSource: source,
    pronoun,
    name,
    paragraphs: output.split('\n\n').length,
    wordCount: countWords(output),
    qaStatus: qa.passed ? 'PASS' as const : 'FAIL' as const,
    pipeline: 'v3.2-GOLD'
  };
  
  if (!qa.passed) {
    console.warn('QA Gate failed:', qa.errors);
  }
  
  return {
    polished: output,
    emailReady: output, // Same content for both
    debug
  };
}

// Legacy function for backward compatibility
export { goldStandardPipeline as processPromptly };
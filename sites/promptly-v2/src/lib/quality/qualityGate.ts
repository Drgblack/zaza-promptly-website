// Promptly quality gate — deterministic checks for parent-ready messages.

export type PronounSet = { subj: 'he'|'she'|'they'; obj: 'him'|'her'|'them'; possAdj: 'his'|'her'|'their' };

export type GateConfig = {
  minWords?: number;        // default 95
  maxWords?: number;        // default 120
  requireParagraphs?: number; // default 3
  bannedWords?: string[];   // lowercased
  requireActionVerbs?: string[]; // verbs we expect to see in strategies
};

export type GateResult = {
  ok: boolean;
  errors: string[];         // machine-readable reasons
  metrics: {
    words: number;
    paragraphs: number;
    actionVerbHits: string[];
    pronounMismatches: string[];
    hasDelighted: boolean;
    gradeLevel: number;
  };
};

// --- Defaults ---------------------------------------------------------------

const DEFAULT_BANNED = [
  'lazy','naughty','stupid','dumb','bad kid','useless','hopeless','always','never'
];

export const ACTION_VERBS = [
  // school actions
  'meet','use','seat','reteach','provide','offer','accept','break','give','check',
  // home actions  
  'leave','pack','set','practice','agree','aim','try','start','send','encourage','build'
];

// --- Utils ------------------------------------------------------------------

const wordCount = (s: string) => (s.trim().match(/\b[\w'']+\b/g)?.length ?? 0);
const paraSplit = (s: string) => s.trim().split(/\n{2,}/).map(p => p.trim()).filter(Boolean);

// Simple readability estimate (Flesch-Kincaid grade level approximation)
function estimateGradeLevel(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.match(/\b[\w'']+\b/g) || [];
  const syllables = words.reduce((total, word) => {
    // Simple syllable counting: vowel groups
    const vowelGroups = word.toLowerCase().match(/[aeiouy]+/g) || [];
    return total + Math.max(1, vowelGroups.length);
  }, 0);
  
  if (sentences.length === 0 || words.length === 0) return 0;
  
  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;
  
  // Simplified Flesch-Kincaid formula
  return 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
}

function findBanned(text: string, banned: string[]): string[] {
  const lower = text.toLowerCase();
  return banned.filter(b => lower.includes(b));
}

function findActionVerbs(text: string, verbs: string[]): string[] {
  const hits = new Set<string>();
  const lower = ` ${text.toLowerCase()} `;
  verbs.forEach(v => {
    // match infinitive or common forms; very light stem
    const re = new RegExp(`\\b${v}(?:s|es|ed|ing)?\\b`, 'g');
    if (re.test(lower)) hits.add(v);
  });
  return Array.from(hits);
}

// Subject–verb agreement (very lightweight)
function pronounAgreementIssues(text: string, p: PronounSet): string[] {
  const issues: string[] = [];
  const t = text;

  // plural vs singular heuristics
  if (p.subj === 'he' || p.subj === 'she') {
    // catch "they are/they have" leftovers
    if (/\bthey (?:are|were|have|do)\b/i.test(t)) issues.push('pronoun_plural_leftover');
    // catch "they continues/they misses" (seen earlier)
    if (/\bthey [a-z]+s\b/i.test(t)) issues.push('pronoun_plural_s_agreement');
  } else { // they
    // catch singular verb after they
    if (/\bthey (?:is|was|has|does)\b/i.test(t)) issues.push('they_singular_verb');
  }
  return issues;
}

function hasDelighted(text: string): boolean {
  return /\bdelighted\b/i.test(text);
}

// --- Main gate --------------------------------------------------------------

export function qualityGate(
  finalText: string,
  pronouns: PronounSet,
  cfg: GateConfig = {}
): GateResult {
  const minWords = cfg.minWords ?? 95;
  const maxWords = cfg.maxWords ?? 120;
  const reqParas  = cfg.requireParagraphs ?? 3;
  const banned  = (cfg.bannedWords ?? DEFAULT_BANNED).map(s => s.toLowerCase());
  const verbs   = cfg.requireActionVerbs ?? ACTION_VERBS;

  const text = finalText.trim().replace(/[ \t]+\n/g, '\n'); // tidy
  const words = wordCount(text);
  const paras = paraSplit(text);
  const bannedHits = findBanned(text, banned);
  const actionHits = findActionVerbs(text, verbs);
  const pronounIssues = pronounAgreementIssues(text, pronouns);
  const delighted = hasDelighted(text);
  const gradeLevel = estimateGradeLevel(text);

  const errors: string[] = [];
  if (words < minWords) errors.push('too_short');
  if (words > maxWords) errors.push('too_long');
  if (paras.length !== reqParas) errors.push('wrong_paragraph_count');
  if (bannedHits.length) errors.push(`banned:${bannedHits.join(',')}`);
  if (actionHits.length < 2) errors.push('not_enough_actions');
  if (pronounIssues.length) errors.push(...pronounIssues);
  // if any concern slots were present upstream, block "delighted"
  if (delighted) errors.push('tone_exaggerated_delighted');
  // Check readability: Grade 6-8 range
  if (gradeLevel < 6 || gradeLevel > 8) errors.push('readability_out_of_range');

  return {
    ok: errors.length === 0,
    errors,
    metrics: {
      words,
      paragraphs: paras.length,
      actionVerbHits: actionHits,
      pronounMismatches: pronounIssues,
      hasDelighted: delighted,
      gradeLevel: Math.round(gradeLevel * 10) / 10 // Round to 1 decimal
    }
  };
}

// Micro-edit pass for subject-verb agreement
export function fixPronounAgreement(text: string, p: PronounSet): string {
  let fixed = text;
  
  if (p.subj === 'he' || p.subj === 'she') {
    // Fix "they continues" → "he/she continues"
    fixed = fixed.replace(/\bthey ([a-z]+s)\b/gi, (match, verb) => {
      const cap = match[0] === match[0].toUpperCase();
      const pronoun = cap ? p.subj.charAt(0).toUpperCase() + p.subj.slice(1) : p.subj;
      return `${pronoun} ${verb}`;
    });
    
    // Fix "they are/were/have/do" → "he/she is/was/has/does"
    const replacements = {
      'are': p.subj === 'he' ? 'is' : 'is',
      'were': p.subj === 'he' ? 'was' : 'was', 
      'have': p.subj === 'he' ? 'has' : 'has',
      'do': p.subj === 'he' ? 'does' : 'does'
    };
    
    Object.entries(replacements).forEach(([plural, singular]) => {
      const regex = new RegExp(`\\bthey ${plural}\\b`, 'gi');
      fixed = fixed.replace(regex, (match) => {
        const cap = match[0] === match[0].toUpperCase();
        const pronoun = cap ? p.subj.charAt(0).toUpperCase() + p.subj.slice(1) : p.subj;
        return `${pronoun} ${singular}`;
      });
    });
  } else {
    // Fix "they is/was/has/does" → "they are/were/have/do"
    const replacements = {
      'is': 'are',
      'was': 'were',
      'has': 'have', 
      'does': 'do'
    };
    
    Object.entries(replacements).forEach(([singular, plural]) => {
      const regex = new RegExp(`\\bthey ${singular}\\b`, 'gi');
      fixed = fixed.replace(regex, (match) => {
        const cap = match[0] === match[0].toUpperCase();
        const pronoun = cap ? 'They' : 'they';
        return `${pronoun} ${plural}`;
      });
    });
  }
  
  return fixed;
}

// Fix sentence seams (punctuation and capitalization)
export function fixSentenceSeams(text: string): string {
  let fixed = text;
  
  // Fix capitalization after periods
  fixed = fixed.replace(/(\.\s+)([a-z])/g, (match, punct, letter) => 
    punct + letter.toUpperCase()
  );
  
  // Ensure sentences end with punctuation (but preserve paragraph breaks)
  fixed = fixed.replace(/([^.!?\n])\s*\n\n/g, '$1.\n\n');
  
  // Remove single line breaks within paragraphs (but preserve double breaks)
  fixed = fixed.replace(/([^.\n])\n([a-z])/g, '$1 $2');
  
  // Normalize paragraph spacing (exactly two newlines)
  fixed = fixed.replace(/\n{3,}/g, '\n\n');
  fixed = fixed.replace(/\n\s*\n/g, '\n\n');
  
  return fixed.trim();
}
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
    mixedPronouns: string[];
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

// Check for mixed pronouns (post-composition enforcement)
function checkMixedPronouns(text: string, targetPronoun: PronounSet): string[] {
  const issues: string[] = [];
  const lower = text.toLowerCase();
  
  // Define all possible pronouns
  const allPronouns = {
    he: ['he', 'him', 'his'],
    she: ['she', 'her', 'hers'],
    they: ['they', 'them', 'their', 'theirs']
  };
  
  // Get target pronoun type
  const targetType = targetPronoun.subj === 'he' ? 'he' : 
                    targetPronoun.subj === 'she' ? 'she' : 'they';
  
  // Check for any pronouns that don't match the target
  Object.entries(allPronouns).forEach(([type, pronouns]) => {
    if (type !== targetType) {
      pronouns.forEach(pronoun => {
        // Use word boundaries to avoid false positives (e.g., "the" containing "he")
        const regex = new RegExp(`\\b${pronoun}\\b`, 'gi');
        if (regex.test(text)) {
          issues.push(`mixed_pronoun_found_${pronoun}`);
        }
      });
    }
  });
  
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
  const mixedPronounIssues = checkMixedPronouns(text, pronouns);
  const delighted = hasDelighted(text);
  const gradeLevel = estimateGradeLevel(text);

  const errors: string[] = [];
  if (words < minWords) errors.push('too_short');
  if (words > maxWords) errors.push('too_long');
  if (paras.length !== reqParas) errors.push('wrong_paragraph_count');
  if (bannedHits.length) errors.push(`banned:${bannedHits.join(',')}`);
  if (actionHits.length < 2) errors.push('not_enough_actions');
  if (pronounIssues.length) errors.push(...pronounIssues);
  if (mixedPronounIssues.length) errors.push(...mixedPronounIssues);
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
      mixedPronouns: mixedPronounIssues,
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
    
    // Fix contractions: "they've" → "he's/she's", "they're" → "he's/she's"
    fixed = fixed.replace(/\bthey've\b/gi, (match) => {
      const cap = match[0] === match[0].toUpperCase();
      const pronoun = cap ? p.subj.charAt(0).toUpperCase() + p.subj.slice(1) : p.subj;
      return `${pronoun}'s`;
    });
    
    fixed = fixed.replace(/\bthey're\b/gi, (match) => {
      const cap = match[0] === match[0].toUpperCase();
      const pronoun = cap ? p.subj.charAt(0).toUpperCase() + p.subj.slice(1) : p.subj;
      return `${pronoun}'s`;
    });
    
    // Fix incorrect contractions that might have been created
    fixed = fixed.replace(/\b(he|she)'ve\b/gi, (match) => {
      const cap = match[0] === match[0].toUpperCase();
      const pronoun = cap ? match.charAt(0).toUpperCase() + match.slice(1, 2) : match.slice(0, 2);
      return `${pronoun}'s`;
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
    
    // Fix "they [verb]s" → "they [verb]" (remove third person singular -s)
    fixed = fixed.replace(/\bthey ([a-z]+)s\b/gi, (match, verb) => {
      const cap = match[0] === match[0].toUpperCase();
      const pronoun = cap ? 'They' : 'they';
      // Special cases: has → have, does → do, is → are
      if (verb.toLowerCase() === 'ha') return `${pronoun} have`;
      if (verb.toLowerCase() === 'doe') return `${pronoun} do`;
      if (verb.toLowerCase() === 'i') return `${pronoun} are`;
      return `${pronoun} ${verb}`;
    });
  }
  
  return fixed;
}

// Fix sentence seams (punctuation and capitalization)
export function fixSentenceSeams(text: string): string {
  let fixed = text;
  
  // First, protect specific patterns from being split
  // Protect "how [Name] is" patterns specifically
  const protectedPatterns = [
    /\bhow\s+[A-Z][a-z]+\s+is\s+/g,
    /\bwhat\s+[A-Z][a-z]+\s+(?:is|has|was|were|did|does|will|would|can|could|should)\s+/g,
    /\bwhen\s+[A-Z][a-z]+\s+(?:is|has|was|were|did|does|will|would|can|could|should)\s+/g,
    /\bwhere\s+[A-Z][a-z]+\s+(?:is|has|was|were|did|does|will|would|can|could|should)\s+/g,
    /\b(?:meet|call|help|support|see|visit|contact|prompt|give|provide|teach|show)\s+[A-Z][a-z]+\s+/g
  ];
  
  // Mark protected spans
  const protectedSpans: Array<{start: number, end: number}> = [];
  protectedPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(fixed)) !== null) {
      protectedSpans.push({start: match.index, end: match.index + match[0].length});
    }
  });
  
  // Fix missing period before capital letter (e.g., "students This" → "students. This")
  // But avoid protected spans
  fixed = fixed.replace(/([a-z])(\s+)([A-Z][a-z]+\s+(?:is|has|was|were|had|did|does|will|would|can|could|should|this|these|that|those|it|we|they|he|she|i'll|i've|i|at|in|on|for|with|from|during|after|before))/g, 
    (match, lastChar, space, capitalStart, offset) => {
      // Don't add period if it's already there or if it's after other punctuation
      if ('.!?:;,'.includes(lastChar)) return match;
      
      // Don't add period if this match is within a protected span
      const matchEnd = offset + match.length;
      const isProtected = protectedSpans.some(span => 
        (offset >= span.start && offset < span.end) || 
        (matchEnd > span.start && matchEnd <= span.end) ||
        (offset < span.start && matchEnd > span.end)
      );
      
      if (isProtected) return match;
      
      return lastChar + '.' + space + capitalStart;
    }
  );
  
  // Fix capitalization after periods (but not after paragraph breaks)
  fixed = fixed.replace(/(\.\s+)([a-z])(?!\n)/g, (match, punct, letter) => 
    punct + letter.toUpperCase()
  );
  
  // Ensure paragraphs end with punctuation (but preserve paragraph structure)
  fixed = fixed.replace(/([^.!?\n])\s*\n\n/g, '$1.\n\n');
  
  // Normalize paragraph spacing (exactly two newlines)
  fixed = fixed.replace(/\n{3,}/g, '\n\n');
  fixed = fixed.replace(/\n\s*\n/g, '\n\n');
  
  return fixed.trim();
}

// Enhanced pronoun enforcement (gold standard)
export function enforceGoldStandardPronouns(text: string, pronouns: { subj: string; obj: string; possAdj: string }): string {
  let fixed = text;
  
  // Step 1: Strip all opposing pronouns completely
  if (pronouns.subj === 'they') {
    // Remove he/him/his, she/her/hers
    fixed = fixed.replace(/\b(he|him|his)\b/gi, pronouns.subj);
    fixed = fixed.replace(/\b(she|her|hers)\b/gi, (match) => {
      // Context-aware replacement
      if (match.toLowerCase() === 'her' && fixed.indexOf(match) > 0) {
        const prevChar = fixed[fixed.indexOf(match) - 1];
        if (prevChar === ' ') return pronouns.possAdj; // possessive context
      }
      return pronouns.subj === 'they' ? (match.toLowerCase() === 'her' ? pronouns.obj : pronouns.subj) : pronouns.subj;
    });
  } else if (pronouns.subj === 'he') {
    // Remove they/them/their, she/her/hers
    fixed = fixed.replace(/\b(they|them|their|theirs)\b/gi, (match) => {
      const lower = match.toLowerCase();
      if (lower === 'they') return pronouns.subj;
      if (lower === 'them') return pronouns.obj;
      if (lower === 'their' || lower === 'theirs') return pronouns.possAdj;
      return pronouns.subj;
    });
    fixed = fixed.replace(/\b(she|her|hers)\b/gi, (match) => {
      const lower = match.toLowerCase();
      if (lower === 'she') return pronouns.subj;
      if (lower === 'her') return pronouns.obj;
      if (lower === 'hers') return pronouns.possAdj;
      return pronouns.subj;
    });
  } else if (pronouns.subj === 'she') {
    // Remove they/them/their, he/him/his
    fixed = fixed.replace(/\b(they|them|their|theirs)\b/gi, (match) => {
      const lower = match.toLowerCase();
      if (lower === 'they') return pronouns.subj;
      if (lower === 'them') return pronouns.obj;
      if (lower === 'their' || lower === 'theirs') return pronouns.possAdj;
      return pronouns.subj;
    });
    fixed = fixed.replace(/\b(he|him|his)\b/gi, (match) => {
      const lower = match.toLowerCase();
      if (lower === 'he') return pronouns.subj;
      if (lower === 'him') return pronouns.obj;
      if (lower === 'his') return pronouns.possAdj;
      return pronouns.subj;
    });
  }
  
  // Step 2: Fix verb agreement
  if (pronouns.subj === 'they') {
    // they is/was/has/does → they are/were/have/do
    fixed = fixed.replace(/\bthey is\b/gi, 'they are');
    fixed = fixed.replace(/\bthey was\b/gi, 'they were');
    fixed = fixed.replace(/\bthey has\b/gi, 'they have');
    fixed = fixed.replace(/\bthey does\b/gi, 'they do');
    fixed = fixed.replace(/\bthey ([a-z]+)s\b/gi, (match, verb) => {
      // Remove third person singular -s from verbs after "they"
      const exceptions = ['has', 'is', 'was', 'does'];
      if (exceptions.includes(verb + 's')) return match; // Already handled above
      return `they ${verb}`;
    });
  } else {
    // he/she are/were/have/do → he/she is/was/has/does
    const subj = pronouns.subj;
    fixed = fixed.replace(new RegExp(`\\b${subj} are\\b`, 'gi'), `${subj} is`);
    fixed = fixed.replace(new RegExp(`\\b${subj} were\\b`, 'gi'), `${subj} was`);
    fixed = fixed.replace(new RegExp(`\\b${subj} have\\b`, 'gi'), `${subj} has`);
    fixed = fixed.replace(new RegExp(`\\b${subj} do\\b`, 'gi'), `${subj} does`);
  }
  
  return fixed;
}

// UK English conversion
export function convertToUKEnglish(text: string): string {
  const conversions = {
    'program': 'programme',
    'programs': 'programmes',
    'behavior': 'behaviour',
    'behaviors': 'behaviours',
    'practice': 'practise', // when used as verb
    'organize': 'organise',
    'organized': 'organised',
    'organizing': 'organising',
    'realize': 'realise',
    'realizes': 'realises',
    'realized': 'realised',
    'center': 'centre',
    'centers': 'centres'
  };
  
  let fixed = text;
  Object.entries(conversions).forEach(([us, uk]) => {
    const regex = new RegExp(`\\b${us}\\b`, 'gi');
    fixed = fixed.replace(regex, uk);
  });
  
  return fixed;
}

// Micro-polish rules
export function applyMicroPolish(text: string, name: string): string {
  let fixed = text;
  
  // 1. Mid-sentence "please" must be lowercase
  fixed = fixed.replace(/([^.!?])\s+Please\s+/g, '$1 please ');
  
  // 2. Limit name mentions to 1 per paragraph
  const paragraphs = fixed.split('\n\n');
  const polishedParagraphs = paragraphs.map(para => {
    const nameRegex = new RegExp(`\\b${name}\\b`, 'gi');
    const matches = para.match(nameRegex);
    if (matches && matches.length > 1) {
      // Replace subsequent mentions with pronouns (simplified)
      let nameCount = 0;
      return para.replace(nameRegex, (match) => {
        nameCount++;
        if (nameCount === 1) return match;
        return 'they'; // Simplified - should use proper pronoun detection
      });
    }
    return para;
  });
  
  return polishedParagraphs.join('\n\n');
}
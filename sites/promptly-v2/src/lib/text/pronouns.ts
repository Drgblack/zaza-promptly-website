import { BOY, GIRL, UNISEX, NICK_TO_BASE } from './names-generated';

export type PronounSet = { subj: 'he'|'she'|'they'; obj: 'him'|'her'|'them'; possAdj: 'his'|'her'|'their' };
export type Override = 'auto'|'he'|'she'|'they';

export function pronounsFor(set: 'he'|'she'|'they'): PronounSet {
  if (set === 'he')   return { subj:'he',   obj:'him',  possAdj:'his'   };
  if (set === 'she')  return { subj:'she',  obj:'her',  possAdj:'her'   };
  return                { subj:'they', obj:'them', possAdj:'their' };
}

// Normalize: lower, strip diacritics, map ß→ss, replace umlauts, remove punctuation.
export function normalizeName(raw?: string): string {
  if (!raw) return '';
  let s = raw.trim().toLowerCase();
  s = s
    .replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue')
    .replace(/ß/g,'ss')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'') // strip accents
    .replace(/[^a-z\- ]/g,'') // keep letters, hyphen, space
    .replace(/\s+/g,' ')
    .trim();
  // take first token if full name supplied
  s = s.split(/[ \-]/)[0]; 
  if (NICK_TO_BASE[s]) s = NICK_TO_BASE[s];
  return s;
}

function isBoy(n: string): boolean {
  return BOY.has(n) || BOY.has(n.replace(/y$/,'ie'));
}
function isGirl(n: string): boolean {
  return GIRL.has(n) || GIRL.has(n.replace(/ie$/,'y'));
}

export function inferPronouns(name?: string, override: Override = 'auto'): PronounSet {
  if (override !== 'auto') return pronounsFor(override);
  const n = normalizeName(name);
  if (!n) return pronounsFor('they');
  if (isBoy(n))  return pronounsFor('he');
  if (isGirl(n)) return pronounsFor('she');
  if (UNISEX.has(n)) return pronounsFor('they');
  // Try simple stem (johnny→john)
  const stem = n.endsWith('y') ? n.slice(0,-1) : n;
  if (BOY.has(stem))  return pronounsFor('he');
  if (GIRL.has(stem)) return pronounsFor('she');
  return pronounsFor('they');
}

// Helper to force pronouns consistently 
export function enforcePronouns(text: string, p: PronounSet): string {
  // Always replace with specified pronouns - this ensures consistency
  let result = text;
  
  // Handle capitalized versions (sentence start)
  result = result.replace(/\bThey\b/g, p.subj.charAt(0).toUpperCase() + p.subj.slice(1));
  result = result.replace(/\bTheir\b/g, p.possAdj.charAt(0).toUpperCase() + p.possAdj.slice(1));
  result = result.replace(/\bThem\b/g, p.obj.charAt(0).toUpperCase() + p.obj.slice(1));
  
  // Handle lowercase versions  
  result = result.replace(/\bthey\b/g, p.subj);
  result = result.replace(/\btheir\b/g, p.possAdj);
  result = result.replace(/\bthem\b/g, p.obj);
  
  return result;
}

// Extract first name from text (helper for pipeline)
export function extractStudentName(text: string): string {
  // Look for capitalized words that appear before common verbs or contexts
  const namePattern = /\b([A-Z][a-z]+)\s+(?:is|has|was|were|had|did|does|will|would|can|could|should|needs|seems|appears|shows|struggles|helped|improved|completed|finished|started|began|helps|falls|misses|led)/;
  const match = text.match(namePattern);
  return match ? match[1] : '';
}
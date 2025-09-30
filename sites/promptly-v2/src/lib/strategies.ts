// Strategy bank: deterministic concern → action mappings

export type ConcernType = 
  | 'lateness' 
  | 'missing_homework' 
  | 'focus_disruption' 
  | 'tired_sleepy' 
  | 'rude_language' 
  | 'low_effort' 
  | 'absence' 
  | 'incomplete_work' 
  | 'unprepared' 
  | 'off_task'
  | 'throwing_items'
  | 'clarify_needed';

export interface Strategy {
  school: string;
  home: string;
}

export const STRATEGY_BANK: Record<ConcernType, Strategy> = {
  lateness: {
    school: "I'll meet {name} at the door with a short 'Do Now' so {pro.subj} can start immediately.",
    home: "Please aim to leave 10 minutes earlier; packing the bag the night before often helps."
  },
  missing_homework: {
    school: "I'll give a simple checklist and accept a partial restart.",
    home: "Set a 15-minute homework slot; a timer and quiet space make it easier."
  },
  focus_disruption: {
    school: "I'll use a quiet 2-step cue and seat {name} where distractions are lower.",
    home: "Let's agree on one cue word you can also use so the message is consistent."
  },
  tired_sleepy: {
    school: "I'll offer a water break and short stretch at the start.",
    home: "A steady bedtime and a quick breakfast or snack usually improves focus."
  },
  rude_language: {
    school: "We'll reteach respectful language and provide a safe place to pause when upset.",
    home: "If this happens at home, a calm pause + practice using kind words is helpful."
  },
  low_effort: {
    school: "I'll break tasks into smaller steps and check in more frequently.",
    home: "Praise for starting, not just finishing; small wins build momentum."
  },
  absence: {
    school: "I'll provide catch-up materials and pair {name} with a study buddy.",
    home: "A consistent morning routine and early bedtime help support attendance."
  },
  incomplete_work: {
    school: "I'll check understanding first and simplify the task if needed.",
    home: "Set up a quiet homework space with supplies ready; remove distractions."
  },
  unprepared: {
    school: "I'll do a morning check-in and keep backup supplies available.",
    home: "Try an evening pack-up routine with a visual checklist by the door."
  },
  off_task: {
    school: "I'll give clear 2-step expectations and use gentle redirect signals.",
    home: "Practice following simple instructions at home; start with fun activities."
  },
  throwing_items: {
    school: "We'll reteach room-safety routines and provide a safe place to put items when upset.",
    home: "If this happens at home, a calm pause + practice putting the item down is helpful."
  },
  clarify_needed: {
    school: "I'll observe more closely and note specific patterns to understand better.",
    home: "Please share any changes you've noticed at home that might help {pro.obj}."
  }
};

// Keywords that map to concerns
export const CONCERN_KEYWORDS: Record<string, ConcernType> = {
  'late': 'lateness',
  'lateness': 'lateness',
  'tardy': 'lateness',
  'arrived late': 'lateness',
  'getting in late': 'lateness',
  
  'homework': 'missing_homework', 
  'assignment': 'missing_homework',
  'missing work': 'missing_homework',
  'not submitted': 'missing_homework',
  'forgot homework': 'missing_homework',
  'misses homework': 'missing_homework',
  
  'focus': 'focus_disruption',
  'distracted': 'focus_disruption', 
  'disruptive': 'focus_disruption',
  'disruption': 'focus_disruption',
  'chatting': 'focus_disruption',
  'talking': 'focus_disruption',
  'unfocused': 'focus_disruption',
  'finding it hard to stay focused': 'focus_disruption',
  'showing challenging behavior': 'focus_disruption',
  
  'tired': 'tired_sleepy',
  'sleepy': 'tired_sleepy',
  'sleeping': 'tired_sleepy',
  'exhausted': 'tired_sleepy',
  'yawning': 'tired_sleepy',
  'falls asleep': 'tired_sleepy',
  'asleep': 'tired_sleepy',
  
  'rude': 'rude_language',
  'inappropriate language': 'rude_language',
  'swearing': 'rude_language',
  'unkind words': 'rude_language',
  'using inappropriate language': 'rude_language',
  
  'struggling with motivation': 'low_effort',
  'struggles with': 'low_effort',
  'struggling': 'low_effort',
  'no effort': 'low_effort', 
  'gave up': 'low_effort',
  'not trying': 'low_effort',
  'unmotivated': 'low_effort',
  
  'absent': 'absence',
  'absence': 'absence',
  'missed': 'absence',
  'away': 'absence',
  
  'incomplete': 'incomplete_work',
  'unfinished': 'incomplete_work',
  'half done': 'incomplete_work',
  'partial': 'incomplete_work',
  
  'unprepared': 'unprepared',
  'no supplies': 'unprepared',
  'forgot materials': 'unprepared',
  'no books': 'unprepared',
  
  'off task': 'off_task',
  'wandering': 'off_task',
  'not following': 'off_task',
  'doing other things': 'off_task',
  
  'throwing': 'throwing_items',
  'threw': 'throwing_items',
  'throws': 'throwing_items',
  'throwing items': 'throwing_items',
  'threw items': 'throwing_items',
  'throws things': 'throwing_items'
};

// Positive keywords for strength detection
export const POSITIVE_KEYWORDS = [
  'helped', 'improved', 'kind', 'effort', 'punctual', 'completed', 
  'excellent', 'wonderful', 'great', 'good', 'brilliant', 'brilliantly',
  'sports', 'sport', 'art', 'math', 'reading', 'creative', 'friendly', 
  'progress', 'achievement', 'success', 'leadership', 'leading', 'led',
  'collaborated', 'teamwork', 'responsible', 'organized', 'curious', 
  'engaged', 'helps', 'helps others'
];

// Extract concerns from text
export function extractConcerns(text: string): ConcernType[] {
  const lowerText = text.toLowerCase();
  const found = new Set<ConcernType>();
  
  Object.entries(CONCERN_KEYWORDS).forEach(([keyword, concern]) => {
    if (lowerText.includes(keyword)) {
      found.add(concern);
    }
  });
  
  return found.size > 0 ? Array.from(found) : ['clarify_needed'];
}

// Extract positives from text  
export function extractPositives(text: string): string[] {
  const lowerText = text.toLowerCase();
  return POSITIVE_KEYWORDS.filter(keyword => 
    new RegExp(`\\b${keyword}\\b`, 'i').test(lowerText)
  );
}

// Determine severity based on concerns and language intensity
export function determineSeverity(concerns: ConcernType[], text: string): 'low' | 'med' | 'high' {
  const lowerText = text.toLowerCase();
  
  // Strong negative indicators
  const strongIndicators = ['never', 'always', 'terrible', 'awful', 'horrible', 'worst', 'failed', 'refuses'];
  const strongCount = strongIndicators.filter(indicator => 
    new RegExp(`\\b${indicator}\\b`, 'i').test(text)
  ).length;
  
  if (concerns.length >= 3 || strongCount >= 2) return 'high';
  if (concerns.length >= 2 || strongCount >= 1) return 'med';
  return 'low';
}

// Get strategy for primary concern
export function getStrategy(concerns: ConcernType[]): Strategy {
  if (concerns.length === 0 || concerns[0] === 'clarify_needed') {
    return STRATEGY_BANK.clarify_needed;
  }
  
  // Use the first concern as primary
  return STRATEGY_BANK[concerns[0]];
}

// Format strategy for use in templates (with pronouns)
export function formatStrategy(strategy: Strategy, name: string, pronouns: { subj: string; obj: string; possAdj: string }): { school: string; home: string } {
  const formatText = (text: string) => {
    return text
      .replace(/{name}/g, name)
      .replace(/{pro\.subj}/g, pronouns.subj)
      .replace(/{pro\.obj}/g, pronouns.obj)
      .replace(/{pro\.poss}/g, pronouns.possAdj)
      .replace(/{subj}/g, pronouns.subj)
      .replace(/{obj}/g, pronouns.obj)
      .replace(/{possAdj}/g, pronouns.possAdj)
      .replace(/\bthey\b/gi, pronouns.subj)
      .replace(/\btheir\b/gi, pronouns.possAdj)
      .replace(/\bthem\b/gi, pronouns.obj);
  };

  return {
    school: formatText(strategy.school),
    home: formatText(strategy.home)
  };
}
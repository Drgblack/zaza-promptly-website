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
  | 'clarify_needed';

export interface Strategy {
  school: string;
  home: string;
}

export const STRATEGY_BANK: Record<ConcernType, Strategy> = {
  lateness: {
    school: "meet at door with a quick start task",
    home: "aim to leave 10 minutes earlier"
  },
  missing_homework: {
    school: "provide checklist and accept partial as restart", 
    home: "set a 15-minute homework slot"
  },
  focus_disruption: {
    school: "2-step cue and seating that reduces distractions",
    home: "agree one cue word to refocus"
  },
  tired_sleepy: {
    school: "provide regular water breaks and short stretch breaks",
    home: "establish consistent bedtime and provide a quick morning snack"
  },
  rude_language: {
    school: "calm reminder of respectful words we use",
    home: "practice using kind words when frustrated"
  },
  low_effort: {
    school: "break tasks into smaller steps",
    home: "praise for starting, not just finishing"
  },
  absence: {
    school: "provide catch-up materials and pair with study buddy",
    home: "consistent morning routine to support attendance"
  },
  incomplete_work: {
    school: "check understanding and simplify task as needed",
    home: "set up quiet space for focused work time"
  },
  unprepared: {
    school: "morning check-in and backup supplies available",
    home: "evening pack-up routine with visual checklist"
  },
  off_task: {
    school: "clear expectations and gentle redirect signals",
    home: "practice following 2-step instructions"
  },
  clarify_needed: {
    school: "observe more closely and note specific patterns",
    home: "share any changes you've noticed at home"
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
  'doing other things': 'off_task'
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
  return {
    school: strategy.school.replace(/{name}/g, name).replace(/\bthey\b/gi, pronouns.subj).replace(/\btheir\b/gi, pronouns.possAdj).replace(/\bthem\b/gi, pronouns.obj),
    home: strategy.home.replace(/{name}/g, name).replace(/\bthey\b/gi, pronouns.subj).replace(/\btheir\b/gi, pronouns.possAdj).replace(/\bthem\b/gi, pronouns.obj)
  };
}
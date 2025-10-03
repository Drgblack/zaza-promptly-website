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
    school: "I'll meet {name} at the door with a short 'Do Now' so {they} can start immediately.",
    home: "Please aim to leave 10 minutes earlier; packing the bag the night before often helps."
  },
  missing_homework: {
    school: "I'll give a simple checklist and accept a partial restart.",
    home: "Set a 15-minute homework slot; a timer and quiet space make it easier."
  },
  focus_disruption: {
    school: "I'll use a quiet two-step cue and seat {name} where distractions are lower.",
    home: "Let's agree on one cue word you can also use so the message is consistent."
  },
  tired_sleepy: {
    school: "I'll offer a water break and a short stretch at the start.",
    home: "A steady bedtime and a quick breakfast or snack usually improves focus."
  },
  rude_language: {
    school: "We'll reteach respectful language and provide a safe place to pause when upset.",
    home: "If this happens at home, a calm pause + practice using kind words is helpful."
  },
  low_effort: {
    school: "I'll break tasks into smaller steps and praise the first minute of effort.",
    home: "Please encourage a short 'first minute' start at home; celebrate starting, not just finishing."
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
    school: "We'll keep a spare set of basics at school and review the day's essentials each morning.",
    home: "Packing the night before and placing the bag by the door helps {name} arrive ready."
  },
  off_task: {
    school: "I'll give clear 2-step expectations and use gentle redirect signals.",
    home: "Practice following simple instructions at home; start with fun activities."
  },
  throwing_items: {
    school: "We'll reteach room-safety routines and provide a safe place to put items when upset.",
    home: "If this happens at home, a calm pause and practising putting the item down is helpful."
  },
  clarify_needed: {
    school: "I'll observe more closely and note specific patterns to understand better.",
    home: "Please share any changes you've noticed at home that might help us."
  }
};

// Keywords that map to concerns
export const CONCERN_KEYWORDS: Record<string, ConcernType> = {
  'lateness': 'lateness',
  'tardy': 'lateness',
  'arrived late': 'lateness',
  'arriving late': 'lateness',
  'getting in late': 'lateness',
  'comes in late': 'lateness',
  'late to class': 'lateness',
  'late arrival': 'lateness',
  'has been late': 'lateness',
  'have been late': 'lateness',
  'been late': 'lateness',
  
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
  'finding it hard to stay motivated': 'low_effort',
  
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
  'showing challenging behaviour': 'off_task',
  
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

// Padding sentences for word count fallback (pronoun-safe)
export const PADDING_SENTENCES = {
  partnership: [
    "I'm available to talk through next steps at a time that works for you.",
    "I appreciate your support and partnership as we help build steady routines.",
    "Please let me know a good time to check in together this week.",
    "I'm happy to share updates and adjust the plan based on what you notice at home."
  ],
  monitoring: [
    "I'll keep you updated on progress and what seems to help most.",
    "We'll review how this plan is working and make small changes if needed.",
    "I'll touch base again after a few lessons to share how it's going."
  ],
  consistency: [
    "Keeping the same routine at home and school usually makes the plan easier.",
    "Using the same language at home and in class helps messages feel clear and calm."
  ],
  encouragement: [
    "I value the effort being shown and want to build on every small step forward.",
    "Thank you for your continued support—it makes a real difference."
  ]
};

// Pick appropriate padding sentence based on note content and intent
export function pickPaddingSentence(text: string, usedSentences: string[] = []): string {
  const lowerText = text.toLowerCase();
  
  // Determine intent based on content
  let category: keyof typeof PADDING_SENTENCES;
  
  if (lowerText.includes('discuss') || lowerText.includes('time') || lowerText.includes('talk')) {
    category = 'partnership';
  } else if (lowerText.includes('school') && lowerText.includes('home')) {
    category = 'monitoring';
  } else if (lowerText.includes('cue') || lowerText.includes('routine') || lowerText.includes('consistent')) {
    category = 'consistency';
  } else {
    category = 'encouragement';
  }
  
  // Filter out already used sentences
  const available = PADDING_SENTENCES[category].filter(sentence => !usedSentences.includes(sentence));
  
  // If all sentences in category are used, try other categories
  if (available.length === 0) {
    const allSentences = Object.values(PADDING_SENTENCES).flat();
    const stillAvailable = allSentences.filter(sentence => !usedSentences.includes(sentence));
    return stillAvailable[0] || PADDING_SENTENCES.partnership[0]; // fallback
  }
  
  return available[0];
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
      // Handle KB format placeholders
      .replace(/{they}/g, pronouns.subj)
      .replace(/{them}/g, pronouns.obj)
      .replace(/{their}/g, pronouns.possAdj);
  };

  return {
    school: formatText(strategy.school),
    home: formatText(strategy.home)
  };
}

// Opener variants based on concern clusters
export const OPENER_VARIANTS = {
  attendance: [
    "I'm getting in touch about {name}'s mornings. Over the past week {they}'ve been arriving late...",
    "We've noticed some challenges with {name} arriving on time recently, and I'd like to discuss ways to support smoother starts..."
  ],
  homework: [
    "A quick note about homework for {name}: several tasks have been incomplete or missing...",
    "I want to flag a pattern with {name}'s homework so we can support consistent study habits together..."
  ],
  focus: [
    "I'd like to share how {name} is managing focus during lessons. Recently {they} find it harder to stay settled...",
    "We've observed {name} sometimes distracted in class, which makes instructions harder to follow. Let's plan some strategies..."
  ],
  praise: [
    "I'm pleased to share something positive about {name} while we also look at next steps...",
    "{name} has been showing real effort in class, and I'd like to highlight that while we plan additional support..."
  ],
  general: [
    "I'd like to share an update about {name}."
  ]
};

// Closer variants based on context
export const CLOSER_VARIANTS = {
  general: [
    "If you're free this week, I'd love to share ideas and hear what works at home.",
    "We can touch base by phone or email — whichever works best for you."
  ],
  attendance: [
    "Could we agree a quick plan that fits your morning routine?",
    "Let's review progress after a week and see if mornings feel smoother."
  ],
  homework: [
    "Shall we try this routine for two weeks and review together?",
    "Please let me know if you'd like extra resources for home study."
  ],
  focus: [
    "I can call after school to share ideas and agree one cue word we can both use.",
    "Let's schedule a quick chat so we're consistent between home and school."
  ]
};

// Determine concern cluster from concerns array
export function getConcernCluster(concerns: ConcernType[]): keyof typeof OPENER_VARIANTS {
  if (concerns.includes('lateness') || concerns.includes('absence')) return 'attendance';
  // Prioritize behavioral/focus concerns over homework issues
  if (concerns.includes('focus_disruption') || concerns.includes('off_task') || concerns.includes('rude_language') || concerns.includes('low_effort')) return 'focus';
  if (concerns.includes('missing_homework') || concerns.includes('incomplete_work')) return 'homework';
  if (concerns.length === 0) return 'praise';
  return 'general';
}

// Select opener variant
export function selectOpener(concerns: ConcernType[], name: string, pronouns: { subj: string; obj: string; possAdj: string }): string {
  const cluster = getConcernCluster(concerns);
  const variants = OPENER_VARIANTS[cluster];
  const selected = variants[0]; // Use first variant for consistency
  
  return selected
    .replace(/{name}/g, name)
    .replace(/{they}/g, pronouns.subj)
    .replace(/{them}/g, pronouns.obj)
    .replace(/{their}/g, pronouns.possAdj);
}

// Select closer variant
export function selectCloser(concerns: ConcernType[]): string {
  const cluster = getConcernCluster(concerns);
  const variants = CLOSER_VARIANTS[cluster] || CLOSER_VARIANTS.general;
  return variants[0]; // Use first variant for consistency
}
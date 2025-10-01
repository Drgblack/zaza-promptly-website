// Deterministic Knowledge Base - exact KB entries for openers and closers
// Source of truth: knowledge/docs/Strategies.md

export type PronounKey = "he" | "she" | "they";
export type ConcernKey = "lateness_homework" | "focus_talking" | "balanced" | "praise" | "general";

// Deterministic Knowledge Base with exact KB sentences
export const KB = {
  opener: {
    he: {
      lateness_homework: "I'm getting in touch about {name}'s mornings. Over the past week he's been arriving late and his homework has been incomplete or missing.",
      focus_talking: "I'd like to share how {name} is managing focus during lessons. Recently he finds it harder to stay settled and sometimes talks with friends during instruction time.",
      balanced: "I want to share an update about {name}. He continues to show effort in class while we work on some areas that need attention.",
      praise: "I'm pleased to share something positive about {name}. He has been showing real effort in class and contributing well to our classroom community.",
      general: "I'd like to share an update about {name}."
    },
    she: {
      lateness_homework: "I'm getting in touch about {name}'s mornings. Over the past week she's been arriving late and her homework has been incomplete or missing.",
      focus_talking: "I'd like to share how {name} is managing focus during lessons. Recently she finds it harder to stay settled and sometimes talks with friends during instruction time.",
      balanced: "I want to share an update about {name}. She continues to show effort in class while we work on some areas that need attention.",
      praise: "I'm pleased to share something positive about {name}. She has been showing real effort in class and contributing well to our classroom community.",
      general: "I'd like to share an update about {name}."
    },
    they: {
      lateness_homework: "I'm getting in touch about {name}'s mornings. Over the past week they've been arriving late and their homework has been incomplete or missing.",
      focus_talking: "I'd like to share how {name} is managing focus during lessons. Recently they find it harder to stay settled and sometimes talk with friends during instruction time.",
      balanced: "I want to share an update about {name}. They continue to show effort in class while we work on some areas that need attention.",
      praise: "I'm pleased to share something positive about {name}. They have been showing real effort in class and contributing well to our classroom community.",
      general: "I'd like to share an update about {name}."
    }
  },
  closer: {
    he: {
      lateness_homework: "Could we agree a quick plan that fits your morning routine and supports his homework habits?",
      focus_talking: "I can call after school to share ideas and agree one cue word we can both use.",
      balanced: "If you're free this week, I'd love to share ideas and hear what works at home.",
      praise: "We can touch base by phone or email — whichever works best for you.",
      general: "Please let me know a good time to check in together this week."
    },
    she: {
      lateness_homework: "Could we agree a quick plan that fits your morning routine and supports her homework habits?",
      focus_talking: "I can call after school to share ideas and agree one cue word we can both use.",
      balanced: "If you're free this week, I'd love to share ideas and hear what works at home.",
      praise: "We can touch base by phone or email — whichever works best for you.",
      general: "Please let me know a good time to check in together this week."
    },
    they: {
      lateness_homework: "Could we agree a quick plan that fits your morning routine and supports their homework habits?",
      focus_talking: "I can call after school to share ideas and agree one cue word we can both use.",
      balanced: "If you're free this week, I'd love to share ideas and hear what works at home.",
      praise: "We can touch base by phone or email — whichever works best for you.",
      general: "Please let me know a good time to check in together this week."
    }
  }
} as const;

// Convert concerns array to concern key
export function getConcernKey(concerns: string[], hasPositives: boolean): ConcernKey {
  // Check for combined concerns first
  const hasLateness = concerns.includes('lateness') || concerns.includes('absence');
  const hasHomework = concerns.includes('missing_homework') || concerns.includes('incomplete_work');
  
  if (hasLateness && hasHomework) return 'lateness_homework';
  
  // Focus/talking concerns
  const hasFocus = concerns.includes('focus_disruption') || concerns.includes('off_task') || 
                   concerns.includes('rude_language') || concerns.includes('low_effort');
  if (hasFocus) return 'focus_talking';
  
  // Individual concerns map to balanced
  if (hasLateness || hasHomework || concerns.length > 0) {
    return hasPositives ? 'balanced' : 'general';
  }
  
  // Pure praise
  if (hasPositives && concerns.length === 0) return 'praise';
  
  return 'general';
}

// Pick exact opener from KB
export function pickOpener(pronoun: PronounKey, cluster: ConcernKey, name: string): string {
  const template = KB.opener[pronoun][cluster];
  return template.replace(/{name}/g, name);
}

// Pick exact closer from KB  
export function pickCloser(pronoun: PronounKey, cluster: ConcernKey): string {
  return KB.closer[pronoun][cluster];
}

// Convert pronoun object to PronounKey
export function getPronounKey(pronouns: { subj: string; obj: string; possAdj: string }): PronounKey {
  if (pronouns.subj === 'he') return 'he';
  if (pronouns.subj === 'she') return 'she';
  return 'they';
}
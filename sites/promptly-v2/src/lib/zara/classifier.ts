export type MessageLane = 'coaching' | 'parent_note' | 'product_info';

export interface ClassificationResult {
  lane: MessageLane;
  confidence: number;
  reason: string;
}

export function classifyMessage(message: string): ClassificationResult {
  const messageLower = message.toLowerCase().trim();
  
  // Product info keywords (highest priority - most specific)
  const productKeywords = [
    'pricing', 'price', 'cost', 'plan', 'subscription', 'billing', 'payment',
    'privacy', 'gdpr', 'data', 'security', 'ferpa', 'student data',
    'feature', 'limit', 'trial', 'free', 'upgrade', 'account',
    'contact', 'support', 'help', 'bug', 'technical'
  ];
  
  // Parent note indicators (medium priority - often explicit)
  const parentNoteKeywords = [
    'parent', 'message', 'email', 'note', 'communication', 'home',
    'contact parent', 'send home', 'family', 'guardian', 'mom', 'dad',
    'draft', 'write', 'rewrite', 'edit', 'professional'
  ];
  
  // Coaching indicators (broad catch-all)
  const coachingKeywords = [
    'classroom', 'student', 'behavior', 'management', 'strategy', 'routine',
    'transition', 'calm', 'settle', 'disruption', 'engagement', 'learning',
    'lesson', 'activity', 'group work', 'seating', 'regulation', 'focus',
    'attention', 'motivation', 'differentiation', 'instruction', 'teaching'
  ];
  
  // Check for explicit drafting patterns
  const draftPatterns = [
    /dear |hi |hello /i,
    /mrs?\.|ms\./i,
    /wanted to (let you know|touch base|update you|inform you)/i,
    /regarding |about .*(homework|behavior|progress|assignment)/i,
    /(please|could you|would you) .*(let me know|contact me|call)/i
  ];
  
  // Score each lane
  let productScore = 0;
  let parentScore = 0;
  let coachingScore = 0;
  
  // Product info scoring
  productKeywords.forEach(keyword => {
    if (messageLower.includes(keyword)) {
      productScore += keyword === 'pricing' || keyword === 'price' ? 3 : 2;
    }
  });
  
  // Parent note scoring
  parentNoteKeywords.forEach(keyword => {
    if (messageLower.includes(keyword)) {
      parentScore += keyword === 'parent' || keyword === 'draft' ? 3 : 2;
    }
  });
  
  // Draft pattern bonus
  draftPatterns.forEach(pattern => {
    if (pattern.test(message)) {
      parentScore += 4;
    }
  });
  
  // Coaching scoring
  coachingKeywords.forEach(keyword => {
    if (messageLower.includes(keyword)) {
      coachingScore += 1;
    }
  });
  
  // Question patterns boost coaching
  if (/how (do i|can i|to)|what (should i|can i)|strategy|help with|advice/i.test(message)) {
    coachingScore += 2;
  }
  
  // Determine winner
  const scores = [
    { lane: 'product_info' as MessageLane, score: productScore },
    { lane: 'parent_note' as MessageLane, score: parentScore },
    { lane: 'coaching' as MessageLane, score: coachingScore }
  ];
  
  scores.sort((a, b) => b.score - a.score);
  const winner = scores[0];
  
  // Default to coaching if no clear winner
  if (winner.score === 0) {
    return {
      lane: 'coaching',
      confidence: 0.3,
      reason: 'Default to coaching - no specific indicators found'
    };
  }
  
  // Calculate confidence based on score gap
  const runnerUp = scores[1];
  const gap = winner.score - runnerUp.score;
  const confidence = Math.min(0.9, 0.4 + (gap * 0.1));
  
  return {
    lane: winner.lane,
    confidence,
    reason: `Matched ${winner.lane} patterns (score: ${winner.score})`
  };
}

// Test cases for validation
export const testClassifications = [
  { message: "How much does Promptly cost?", expected: 'product_info' },
  { message: "What are your privacy policies?", expected: 'product_info' },
  { message: "Dear Mrs Johnson, I wanted to let you know about Emma's progress", expected: 'parent_note' },
  { message: "Draft a note about missing homework", expected: 'parent_note' },
  { message: "How do I settle the class after lunch?", expected: 'coaching' },
  { message: "Strategy for noisy transitions", expected: 'coaching' },
  { message: "Help with classroom management", expected: 'coaching' }
];
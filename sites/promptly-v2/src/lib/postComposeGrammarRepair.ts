type Fix = [RegExp, string];

// Order matters: most specific → general
const FIXES: Fix[] = [
  // Subject–verb agreement (she/he/they)
  [/\b(She|she) find\b/g, "$1 finds"],
  [/\b(She|she) continue\b/g, "$1 continues"],
  [/\b(He|he) find\b/g, "$1 finds"],
  [/\b(He|he) continue\b/g, "$1 continues"],
  [/\b(They|they) finds\b/g, "$1 find"],
  [/\b(They|they) continues\b/g, "$1 continue"],
  
  // Additional verb agreement patterns
  [/\b(She|she) have\b/g, "$1 has"],
  [/\b(He|he) have\b/g, "$1 has"],
  [/\b(They|they) has\b/g, "$1 have"],
  [/\b(She|she) are\b/g, "$1 is"],
  [/\b(He|he) are\b/g, "$1 is"],
  [/\b(They|they) is\b/g, "$1 are"],

  // "students This" → "students. This"
  [/(\w)\s+(This|That|It)\b/g, "$1. $2"],

  // Double spaces → single (but preserve paragraph breaks)
  [/([ \t]){2,}/g, " "],

  // Ensure period at ends of sentences before newlines
  [/([a-z])\n/g, "$1.\n"],
  
  // Clean up any trailing whitespace before punctuation
  [/\s+([.!?])/g, "$1"],
];

/**
 * Post-composition grammar repair - ordered, deterministic
 * Run after assembling 3 paragraphs but before QA
 */
export function repairGrammar(s: string): string {
  let out = s;
  for (const [re, rep] of FIXES) {
    out = out.replace(re, rep);
  }
  return out.trim();
}
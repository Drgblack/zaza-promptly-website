import { runPromptlyPipeline } from '../promptlyPipeline';

describe('GT-PRONOUN Test Cases', () => {
  // GT-PRONOUN-001: Sandra (She/Her) - lateness + disruption + missing homework
  test('GT-PRONOUN-001: Sandra - She/Her pronouns with lateness concerns', async () => {
    const input = "Sandra is naughty in class and bad at maths homework. She's late most days and disrupts others during lessons.";
    const result = await runPromptlyPipeline(input, { subj: 'she', obj: 'her', possAdj: 'her' });
    
    // Check word count (95-120)
    const wordCount = result.polished.split(/\s+/).length;
    expect(wordCount).toBeGreaterThanOrEqual(95);
    expect(wordCount).toBeLessThanOrEqual(120);
    
    // Check 3 paragraphs
    const paragraphs = result.polished.split('\n\n').filter(p => p.trim().length > 0);
    expect(paragraphs).toHaveLength(3);
    
    // Check consistent she/her pronouns
    expect(result.polished).toMatch(/\bshe\b/i);
    expect(result.polished).toMatch(/\bher\b/i);
    expect(result.polished).not.toMatch(/\bhe\b|\bhim\b|\bhis\b|\bthey\b|\bthem\b|\btheir\b/i);
    
    // Check contains strategies from bank
    expect(result.polished).toContain("I'll meet Sandra at the door");
    expect(result.polished).toContain("aim to leave 10 minutes earlier");
  }, 30000);

  // GT-PRONOUN-002: John (He/Him) - helping others but forgets homework
  test('GT-PRONOUN-002: John - He/Him pronouns with homework concerns', async () => {
    const input = "John helps others but forgets homework sometimes. He's good at explaining things to classmates.";
    const result = await runPromptlyPipeline(input, { subj: 'he', obj: 'him', possAdj: 'his' });
    
    // Check word count (95-120)
    const wordCount = result.polished.split(/\s+/).length;
    expect(wordCount).toBeGreaterThanOrEqual(95);
    expect(wordCount).toBeLessThanOrEqual(120);
    
    // Check 3 paragraphs
    const paragraphs = result.polished.split('\n\n').filter(p => p.trim().length > 0);
    expect(paragraphs).toHaveLength(3);
    
    // Check consistent he/him pronouns
    expect(result.polished).toMatch(/\bhe\b/i);
    expect(result.polished).toMatch(/\bhim\b|\bhis\b/i);
    expect(result.polished).not.toMatch(/\bshe\b|\bher\b|\bthey\b|\bthem\b|\btheir\b/i);
    
    // Check contains strategies from bank
    expect(result.polished).toContain("simple checklist");
    expect(result.polished).toContain("15-minute homework slot");
  }, 30000);

  // GT-PRONOUN-003: Alex (They/Them) - talks with friends during lessons
  test('GT-PRONOUN-003: Alex - They/Them pronouns with focus concerns', async () => {
    const input = "Alex talks with friends during lessons and finds it hard to stay focused. They are creative and good at art projects.";
    const result = await runPromptlyPipeline(input, { subj: 'they', obj: 'them', possAdj: 'their' });
    
    // Check word count (95-120)
    const wordCount = result.polished.split(/\s+/).length;
    expect(wordCount).toBeGreaterThanOrEqual(95);
    expect(wordCount).toBeLessThanOrEqual(120);
    
    // Check 3 paragraphs
    const paragraphs = result.polished.split('\n\n').filter(p => p.trim().length > 0);
    expect(paragraphs).toHaveLength(3);
    
    // Check consistent they/them pronouns
    expect(result.polished).toMatch(/\bthey\b/i);
    expect(result.polished).toMatch(/\bthem\b|\btheir\b/i);
    expect(result.polished).not.toMatch(/\bhe\b|\bhim\b|\bhis\b|\bshe\b|\bher\b/i);
    
    // Check contains strategies from bank
    expect(result.polished).toContain("quiet two-step cue");
    expect(result.polished).toContain("seat Alex where distractions are lower");
  }, 30000);

  // GT-PRONOUN-004: Johnny (Auto-detect) - late and forgets homework
  test('GT-PRONOUN-004: Johnny - Auto-detect pronouns (should use he/him)', async () => {
    const input = "Johnny is late and sometimes forgets homework. He tries hard in sports and is popular with classmates.";
    const result = await runPromptlyPipeline(input, undefined); // Auto-detect
    
    // Check word count (95-120)
    const wordCount = result.polished.split(/\s+/).length;
    expect(wordCount).toBeGreaterThanOrEqual(95);
    expect(wordCount).toBeLessThanOrEqual(120);
    
    // Check 3 paragraphs
    const paragraphs = result.polished.split('\n\n').filter(p => p.trim().length > 0);
    expect(paragraphs).toHaveLength(3);
    
    // Auto-detect should infer he/him for Johnny
    expect(result.polished).toMatch(/\bhe\b/i);
    expect(result.polished).toMatch(/\bhim\b|\bhis\b/i);
    expect(result.polished).not.toMatch(/\bshe\b|\bher\b|\bthey\b|\bthem\b|\btheir\b/i);
    
    // Check contains strategies from bank
    expect(result.polished).toContain("meet Johnny at the door");
    expect(result.polished).toContain("simple checklist");
  }, 30000);
});
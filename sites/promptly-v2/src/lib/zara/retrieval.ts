type SnippetMatch = {
  content: string;
  score: number;
  source: string;
};

type RetrievalResult = {
  matches: SnippetMatch[];
  hasResults: boolean;
  searchTerms: string[];
};

type PlaybookMatch = {
  title: string;
  content: string;
  keywords: string[];
  filename: string;
};

export async function retrieveSnippets(query: string): Promise<RetrievalResult> {
  const searchTerms = extractSearchTerms(query);
  const snippetPromises = searchTerms.map(term => fetchRelevantSnippets(term));
  const results = await Promise.all(snippetPromises);
  
  const allMatches = results.flat();
  const deduplicated = deduplicateByContent(allMatches);
  const scored = scoreAndSort(deduplicated, searchTerms);
  
  return {
    matches: scored.slice(0, 3), // Top 3 most relevant
    hasResults: scored.length > 0,
    searchTerms
  };
}

export async function retrievePlaybook(query: string): Promise<PlaybookMatch | null> {
  const playbooks = [
    'after-lunch-reset',
    'noisy-transitions', 
    'new-seating-plan',
    'low-level-disruption',
    'positive-reinforcement',
    'formative-checks',
    'time-on-task-stamina',
    'group-work-norms',
    'calm-corner-regulation',
    'entry-routines-do-now'
  ];
  
  const queryLower = query.toLowerCase();
  let bestMatch: PlaybookMatch | null = null;
  let highestScore = 0;
  
  for (const playbook of playbooks) {
    try {
      const response = await fetch(`/zara/playbooks/${playbook}.md`);
      if (!response.ok) continue;
      
      const content = await response.text();
      const keywordsMatch = content.match(/## Keywords\n(.+)/);
      const keywords = keywordsMatch ? keywordsMatch[1].split(', ') : [];
      
      // Score based on keyword matches
      let score = 0;
      keywords.forEach(keyword => {
        if (queryLower.includes(keyword.toLowerCase())) {
          score += keyword.length > 5 ? 3 : 2; // Longer keywords get higher weight
        }
      });
      
      // Boost score for title matches
      if (queryLower.includes(playbook.replace('-', ' '))) {
        score += 5;
      }
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = {
          title: playbook.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          content,
          keywords,
          filename: playbook
        };
      }
    } catch (error) {
      continue; // Skip if playbook can't be loaded
    }
  }
  
  return highestScore >= 2 ? bestMatch : null;
}

function extractSearchTerms(query: string): string[] {
  const queryLower = query.toLowerCase();
  const terms: string[] = [];
  
  // Product info categories
  const productMappings = {
    pricing: ['pricing', 'price', 'cost', 'plan', 'subscription', 'billing', 'payment', 'free', 'trial'],
    features: ['feature', 'what can', 'what does', 'how does', 'capability', 'function'],
    privacy: ['privacy', 'data', 'gdpr', 'ferpa', 'security', 'safe', 'store', 'collect'],
    limits: ['limit', 'usage', 'how many', 'how much', 'restriction', 'quota'],
    contact: ['help', 'support', 'contact', 'email', 'phone', 'chat', 'assistance']
  };
  
  // Check each category
  Object.entries(productMappings).forEach(([category, keywords]) => {
    if (keywords.some(keyword => queryLower.includes(keyword))) {
      terms.push(category);
    }
  });
  
  // Default to general if nothing matches
  if (terms.length === 0) {
    terms.push('general');
  }
  
  return terms;
}

async function fetchRelevantSnippets(category: string): Promise<SnippetMatch[]> {
  try {
    // Try markdown first, fallback to JSON
    let response = await fetch(`/zara/snippets/${category}.md`);
    
    if (response.ok) {
      const content = await response.text();
      return [{
        content: content.replace(/^# .+\n\n/, ''), // Remove title line
        score: 1.0,
        source: category
      }];
    }
    
    // Fallback to JSON format
    response = await fetch(`/zara/snippets/${category}.json`);
    if (!response.ok) return [];
    
    const snippets = await response.json();
    return snippets.map((snippet: any) => ({
      content: snippet.content,
      score: snippet.priority || 1.0,
      source: snippet.source || category
    }));
  } catch {
    return [];
  }
}

function deduplicateByContent(matches: SnippetMatch[]): SnippetMatch[] {
  const seen = new Set<string>();
  return matches.filter(match => {
    const key = match.content.substring(0, 100); // Use first 100 chars as dedup key
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function scoreAndSort(matches: SnippetMatch[], searchTerms: string[]): SnippetMatch[] {
  return matches
    .map(match => ({
      ...match,
      score: calculateRelevanceScore(match, searchTerms)
    }))
    .sort((a, b) => b.score - a.score);
}

function calculateRelevanceScore(match: SnippetMatch, searchTerms: string[]): number {
  let score = match.score; // Base priority score
  
  const contentLower = match.content.toLowerCase();
  
  // Boost score based on search term matches
  searchTerms.forEach(term => {
    if (contentLower.includes(term)) {
      score += 0.5;
    }
  });
  
  // Boost score for high-priority sources
  if (match.source === 'pricing') score += 0.3;
  if (match.source === 'features') score += 0.2;
  
  return score;
}
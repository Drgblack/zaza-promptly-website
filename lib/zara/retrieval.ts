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

export async function retrieveSnippets(query: string): Promise<RetrievalResult> {
  const searchTerms = extractSearchTerms(query);
  const snippetPromises = searchTerms.map(term => fetchRelevantSnippets(term));
  const results = await Promise.all(snippetPromises);
  
  const allMatches = results.flat();
  const deduplicated = deduplicateByContent(allMatches);
  const scored = scoreAndSort(deduplicated, searchTerms);
  
  return {
    matches: scored.slice(0, 5), // Top 5 most relevant
    hasResults: scored.length > 0,
    searchTerms
  };
}

function extractSearchTerms(query: string): string[] {
  const productTerms = ['pricing', 'price', 'cost', 'free', 'trial', 'plan', 'subscription', 'billing'];
  const featureTerms = ['feature', 'comment', 'feedback', 'translate', 'language', 'export', 'integration'];
  const supportTerms = ['help', 'support', 'privacy', 'data', 'security', 'gdpr', 'ferpa'];
  
  const queryLower = query.toLowerCase();
  const terms: string[] = [];
  
  // Check for specific product/feature mentions
  if (productTerms.some(term => queryLower.includes(term))) {
    terms.push('pricing');
  }
  
  if (featureTerms.some(term => queryLower.includes(term))) {
    terms.push('features');
  }
  
  if (supportTerms.some(term => queryLower.includes(term))) {
    terms.push('support');
  }
  
  // Always include a general term if no specific category matched
  if (terms.length === 0) {
    terms.push('general');
  }
  
  return terms;
}

async function fetchRelevantSnippets(category: string): Promise<SnippetMatch[]> {
  try {
    const response = await fetch(`/zara/snippets/${category}.json`);
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
/**
 * Utility function to determine if a URL is external
 * @param href - The URL to check
 * @returns true if the URL is external, false if internal
 */
export function isExternal(href: string): boolean {
  // Handle empty or invalid hrefs
  if (!href || href.trim() === '') return false;
  
  // Relative paths are internal
  if (href.startsWith('/')) return false;
  
  // Hash links are internal
  if (href.startsWith('#')) return false;
  
  // Mailto, tel, etc. are considered external
  if (href.includes(':') && !href.startsWith('http')) return true;
  
  // If it starts with http/https, check if it's our domain
  if (href.startsWith('http')) {
    try {
      const url = new URL(href);
      const internalDomains = [
        'zazapromptly.com',
        'www.zazapromptly.com',
        'promptly.zazatechnologies.com',
        'localhost',
        '127.0.0.1'
      ];
      
      return !internalDomains.some(domain => url.hostname === domain);
    } catch {
      // If URL parsing fails, treat as external for safety
      return true;
    }
  }
  
  // Default to internal for relative paths without protocol
  return false;
}

/**
 * Get the appropriate props for a link based on whether it's external
 * @param href - The URL to check
 * @returns Object with target and rel props for external links
 */
export function getLinkProps(href: string) {
  if (isExternal(href)) {
    return {
      target: '_blank',
      rel: 'noopener noreferrer'
    };
  }
  
  return {};
}
// Link mapping utilities for navigation
export interface LinkMap {
  [key: string]: string;
}

export const linkMap: LinkMap = {
  home: '/',
  about: '/about',
  'about-founder': '/about-founder',
  contact: '/contact',
  faqs: '/faqs',
  'free-resources': '/free-resources',
  products: '/products',
  pricing: '/pricing',
  'promptly-faq': '/promptly-faq',
  support: '/support',
  privacy: '/privacy',
  terms: '/terms',
  'vision-mission': '/vision-mission',
  blog: '/blog',
  spark: '/spark',
  looop: '/looop',
  knowledgecore: '/knowledgecore',
  promptly: '/promptly',
  teach: '/teach',
  autoplanner: '/autoplanner',
  notably: '/notably'
};

export const externalLinks = {
  promptly: '/promptly',
  teach: '/teach',
  visuals: '/notably', // Notably suite includes visuals
  spark: '/spark',
  inbox: '/notably', // Notably suite includes inbox functionality
  main: '/',
  blog: '/blog', // Use local blog since zazatechnologies.com is down
  faqs: '/faqs',
  aboutFounder: '/about-founder',
  privacy: '/privacy',
  tryPromptly: '/promptly' // Keep users on same domain
};

export const getLink = (key: string): string => {
  return linkMap[key] || '/';
};

export const isActiveLink = (currentPath: string, linkKey: string): boolean => {
  const linkPath = getLink(linkKey);
  return currentPath === linkPath;
};
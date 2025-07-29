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
  pricing: '/promptly-pricing',
  'promptly-faq': '/promptly-faq',
  support: '/support',
  privacy: '/privacy',
  terms: '/terms',
  'vision-mission': '/vision-mission',
  blog: '/blog'
};

export const externalLinks = {
  promptly: 'https://zazapromptly.com',
  teach: 'https://zazateach.com',
  visuals: 'https://zazavisuals.com',
  spark: 'https://zazaspark.com',
  inbox: 'https://zazainbox.com',
  main: 'https://zazatechnologies.com',
  blog: 'https://zazatechnologies.com/blog',
  faqs: '/faqs',
  aboutFounder: '/about-founder',
  privacy: '/privacy',
  tryPromptly: 'https://zazapromptly.com'
};

export const getLink = (key: string): string => {
  return linkMap[key] || '/';
};

export const isActiveLink = (currentPath: string, linkKey: string): boolean => {
  const linkPath = getLink(linkKey);
  return currentPath === linkPath;
};
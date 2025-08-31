// Components
export { AuthorAvatar } from './components/AuthorAvatar';

// Types and utilities
export type { Author, AuthorAvatarProps, AvatarSize, PersonJsonLdOptions } from './types/author';
export { isFounder, getFounderInfo } from './types/author';

// SEO helpers
export { 
  getAuthorPersonJsonLd, 
  getArticleWithAuthorJsonLd, 
  getBlogPostingWithAuthorJsonLd 
} from './seo/author';

// Design tokens
export * from './tokens';

// Asset paths - these should be copied to each site's public directory
export const FOUNDER_IMAGE_PATH = '/images/founder.jpg';
export const FOUNDER_ALT_TEXT = 'Dr Greg Blackburn, Founder of Zaza Technologies';
export const FOUNDER_ALT_TEXT_DE = 'Dr Greg Blackburn, Gründer von Zaza Technologies';
export interface Author {
  name: string;
  role?: string;
  bio?: string;
  avatarUrl?: string;
  sameAs?: string[];
  affiliation?: string;
}

export interface AuthorAvatarProps {
  name: string;
  role?: string;
  size?: number | 'sm' | 'md' | 'lg';
  className?: string;
  priority?: boolean;
  showName?: boolean;
  showRole?: boolean;
  locale?: string;
}

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface PersonJsonLdOptions {
  urlBase: string;
  name: string;
  sameAs?: string[];
  role?: string;
  affiliation?: string;
}

/**
 * Checks if the given name matches Dr. Greg Blackburn (founder)
 */
export function isFounder(name: string): boolean {
  return /\b(Greg|Gregory|Dr\.?\s*Greg)\b.*Blackburn/i.test(name);
}

/**
 * Gets the standard founder information
 */
export function getFounderInfo(): Author {
  return {
    name: 'Dr Greg Blackburn',
    role: 'Founder & CEO',
    bio: 'PhD-qualified educator, EdTech expert, and founder of Zaza Technologies. With over 20 years of experience in digital learning and instructional design, Greg has built AI tools trusted by 12,000+ teachers worldwide.',
    affiliation: 'Zaza Technologies',
    sameAs: [
      'https://linkedin.com/in/drgregblackburn',
      'https://twitter.com/drgregblackburn'
    ]
  };
}
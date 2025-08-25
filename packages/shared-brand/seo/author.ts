import { PersonJsonLdOptions, isFounder, getFounderInfo } from '../types/author';

/**
 * Generates Person JSON-LD schema for the author
 */
export function getAuthorPersonJsonLd({
  urlBase,
  name,
  sameAs = [],
  role,
  affiliation
}: PersonJsonLdOptions) {
  const cleanUrlBase = urlBase.replace(/\/$/, '');
  
  // Use founder info if this is Dr. Greg Blackburn
  if (isFounder(name)) {
    const founderInfo = getFounderInfo();
    
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${cleanUrlBase}#founder`,
      name: founderInfo.name,
      givenName: 'Greg',
      familyName: 'Blackburn',
      honorificPrefix: 'Dr.',
      jobTitle: role || founderInfo.role,
      description: founderInfo.bio,
      url: `${cleanUrlBase}/about-founder`,
      image: `${cleanUrlBase}/images/founder.jpg`,
      worksFor: {
        '@type': 'Organization',
        '@id': `${cleanUrlBase}#organization`,
        name: affiliation || founderInfo.affiliation,
        url: cleanUrlBase
      },
      knowsAbout: [
        'teacher education',
        'AI in education', 
        'assessment',
        'parent communication',
        'educational technology',
        'professional education',
        'instructional design',
        'digital learning'
      ],
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'PhD in Professional Education'
      },
      sameAs: sameAs.length > 0 ? sameAs : founderInfo.sameAs
    };
  }

  // For non-founder authors, return basic Person schema
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: role,
    worksFor: {
      '@type': 'Organization',
      '@id': `${cleanUrlBase}#organization`,
      name: affiliation || 'Zaza Technologies',
      url: cleanUrlBase
    },
    sameAs: sameAs.length > 0 ? sameAs : undefined
  };
}

/**
 * Generates Article JSON-LD schema with author information
 */
export function getArticleWithAuthorJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  featuredImage,
  keywords = [],
  category,
  wordCount,
  urlBase
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  featuredImage?: string;
  keywords?: string[];
  category?: string;
  wordCount?: number;
  urlBase: string;
}) {
  const cleanUrlBase = urlBase.replace(/\/$/, '');
  const authorSchema = getAuthorPersonJsonLd({ urlBase: cleanUrlBase, name: authorName });
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: authorSchema,
    publisher: {
      '@type': 'Organization',
      '@id': `${cleanUrlBase}#organization`,
      name: 'Zaza Technologies',
      logo: {
        '@type': 'ImageObject',
        url: `${cleanUrlBase}/images/logo/zaza-logo.svg`,
        width: 512,
        height: 512
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    image: featuredImage ? {
      '@type': 'ImageObject',
      url: featuredImage,
      width: 1200,
      height: 630
    } : undefined,
    keywords: keywords.join(', '),
    articleSection: category,
    wordCount,
    inLanguage: 'en-US'
  };
}

/**
 * Generates BlogPosting JSON-LD schema (similar to Article but for blog posts)
 */
export function getBlogPostingWithAuthorJsonLd(options: Parameters<typeof getArticleWithAuthorJsonLd>[0]) {
  const articleSchema = getArticleWithAuthorJsonLd(options);
  return {
    ...articleSchema,
    '@type': 'BlogPosting'
  };
}
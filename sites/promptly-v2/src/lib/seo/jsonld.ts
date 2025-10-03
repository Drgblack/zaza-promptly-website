// JSON-LD helpers that support multiple languages

interface BaseSchemaProps {
  url: string
  inLanguage?: string
}

export function generateOrganizationSchema({ url, inLanguage = 'en' }: BaseSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zazadraft.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Zaza Technologies',
    url: baseUrl,
    logo: `${baseUrl}/og-default.png`,
    description: 'Educational technology company providing AI tools for teachers, including Draft for parent communication and report writing.',
    foundingDate: '2023',
    founder: {
      '@type': 'Person',
      name: 'Dr. Greg Blackburn',
      jobTitle: 'PhD, Professional Education'
    },
    sameAs: [
      'https://twitter.com/zazateachapp',
      'https://www.linkedin.com/company/zaza-technologies'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'hello@zazatechnologies.com',
      availableLanguage: ['English', 'German', 'French', 'Spanish', 'Italian']
    },
    inLanguage
  }
}

export function generateWebsiteSchema({ url, inLanguage = 'en' }: BaseSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zazadraft.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'Zaza Draft - AI Tools for Teachers',
    url: baseUrl,
    publisher: {
      '@id': `${baseUrl}/#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    inLanguage
  }
}

interface ProductSchemaProps extends BaseSchemaProps {
  name: string
  description: string
  offers: Array<{
    name: string
    price: string
    currency: string
    description: string
  }>
}

export function generateProductSchema({ 
  url, 
  name, 
  description, 
  offers,
  inLanguage = 'en' 
}: ProductSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zazadraft.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: baseUrl,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    author: {
      '@type': 'Organization',
      name: 'Zaza Technologies',
      founder: {
        '@type': 'Person',
        name: 'Dr. Greg Blackburn',
        jobTitle: 'PhD, Professional Education'
      }
    },
    offers: offers.map(offer => ({
      '@type': 'Offer',
      name: offer.name,
      price: offer.price,
      priceCurrency: offer.currency,
      availability: 'https://schema.org/InStock',
      url: `${baseUrl}/pricing`,
      description: offer.description
    })),
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'teacher',
      geographicArea: ['United Kingdom', 'United States', 'Germany', 'France', 'Spain', 'Italy']
    },
    featureList: [
      'Hallucination-safe AI for accurate content',
      'Parent communication templates',
      'Student report generation',
      'GDPR-compliant data handling',
      'Multi-language support',
      'Education-specific AI training'
    ],
    inLanguage
  }
}

interface BlogPostSchemaProps extends BaseSchemaProps {
  headline: string
  description: string
  author: string
  datePublished: string
  dateModified?: string
  image: string
}

export function generateBlogPostSchema({
  url,
  headline,
  description,
  author,
  datePublished,
  dateModified,
  image,
  inLanguage = 'en'
}: BlogPostSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zazadraft.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    image: image || `${baseUrl}/og-default.png`,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zaza Draft',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/og-default.png`
      }
    },
    datePublished,
    ...(dateModified && { dateModified }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    url,
    inLanguage
  }
}

interface PersonSchemaProps extends BaseSchemaProps {
  name: string
  jobTitle: string
  description: string
  image: string
  sameAs?: string[]
}

export function generatePersonSchema({
  url,
  name,
  jobTitle,
  description,
  image,
  sameAs = [],
  inLanguage = 'en'
}: PersonSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zazadraft.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    image,
    url,
    worksFor: {
      '@type': 'Organization',
      name: 'Zaza Technologies',
      url: baseUrl
    },
    sameAs,
    inLanguage
  }
}
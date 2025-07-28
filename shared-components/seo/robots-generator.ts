import { MetadataRoute } from 'next'
import { ZAZA_URLS } from './metadata-config'

/**
 * Zaza Robots.txt Generator
 * 
 * This file provides comprehensive robots.txt generation for all Zaza websites,
 * optimized for AI search engines and traditional crawlers with proper directives.
 */

export interface RobotsConfig {
  baseUrl: string
  sitemapUrl: string
  allowAll?: boolean
  disallowPaths?: string[]
  allowPaths?: string[]
  crawlDelay?: number
  userAgents?: string[]
  customRules?: string[]
}

// Default robots configuration for Zaza products
export const ZAZA_ROBOTS_CONFIGS: Record<keyof typeof ZAZA_URLS, RobotsConfig> = {
  main: {
    baseUrl: ZAZA_URLS.main,
    sitemapUrl: `${ZAZA_URLS.main}/sitemap.xml`,
    allowAll: true,
    disallowPaths: [
      '/api/',
      '/admin/',
      '/private/',
      '/_next/',
      '/static/',
      '/temp/',
      '/test/',
      '/dev/',
      '/staging/',
      '/.well-known/',
      '/robots.txt',
      '/sitemap.xml',
    ],
    allowPaths: [
      '/',
      '/about',
      '/products',
      '/pricing',
      '/contact',
      '/blog',
      '/faq',
      '/privacy',
      '/terms',
    ],
    crawlDelay: 1,
    userAgents: ['*', 'Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider'],
    customRules: [
      '# Zaza Technologies - AI Tools for Educators',
      '# Allow all major search engines',
      '# Optimized for AI search engines',
      '',
      '# Sitemap location',
      `Sitemap: ${ZAZA_URLS.main}/sitemap.xml`,
      '',
      '# Host directive',
      `Host: ${ZAZA_URLS.main}`,
    ],
  },
  
  promptly: {
    baseUrl: ZAZA_URLS.promptly,
    sitemapUrl: `${ZAZA_URLS.promptly}/sitemap.xml`,
    allowAll: true,
    disallowPaths: [
      '/api/',
      '/admin/',
      '/private/',
      '/_next/',
      '/static/',
      '/temp/',
      '/test/',
      '/dev/',
      '/staging/',
      '/.well-known/',
      '/robots.txt',
      '/sitemap.xml',
      '/dashboard/',
      '/account/',
      '/billing/',
    ],
    allowPaths: [
      '/',
      '/features',
      '/pricing',
      '/demo',
      '/help',
      '/blog',
      '/about',
      '/contact',
    ],
    crawlDelay: 1,
    userAgents: ['*', 'Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider'],
    customRules: [
      '# Zaza Promptly - AI-Powered Feedback Generation',
      '# Allow all major search engines',
      '# Optimized for AI search engines',
      '',
      '# Sitemap location',
      `Sitemap: ${ZAZA_URLS.promptly}/sitemap.xml`,
      '',
      '# Host directive',
      `Host: ${ZAZA_URLS.promptly}`,
    ],
  },
  
  teach: {
    baseUrl: ZAZA_URLS.teach,
    sitemapUrl: `${ZAZA_URLS.teach}/sitemap.xml`,
    allowAll: true,
    disallowPaths: [
      '/api/',
      '/admin/',
      '/private/',
      '/_next/',
      '/static/',
      '/temp/',
      '/test/',
      '/dev/',
      '/staging/',
      '/.well-known/',
      '/robots.txt',
      '/sitemap.xml',
      '/dashboard/',
      '/account/',
      '/billing/',
    ],
    allowPaths: [
      '/',
      '/features',
      '/pricing',
      '/templates',
      '/help',
      '/about',
      '/contact',
    ],
    crawlDelay: 1,
    userAgents: ['*', 'Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider'],
    customRules: [
      '# Zaza Teach - AI-Powered Lesson Planning',
      '# Allow all major search engines',
      '# Optimized for AI search engines',
      '',
      '# Sitemap location',
      `Sitemap: ${ZAZA_URLS.teach}/sitemap.xml`,
      '',
      '# Host directive',
      `Host: ${ZAZA_URLS.teach}`,
    ],
  },
  
  visuals: {
    baseUrl: ZAZA_URLS.visuals,
    sitemapUrl: `${ZAZA_URLS.visuals}/sitemap.xml`,
    allowAll: true,
    disallowPaths: [
      '/api/',
      '/admin/',
      '/private/',
      '/_next/',
      '/static/',
      '/temp/',
      '/test/',
      '/dev/',
      '/staging/',
      '/.well-known/',
      '/robots.txt',
      '/sitemap.xml',
      '/dashboard/',
      '/account/',
      '/billing/',
    ],
    allowPaths: [
      '/',
      '/gallery',
      '/pricing',
      '/help',
      '/about',
      '/contact',
    ],
    crawlDelay: 1,
    userAgents: ['*', 'Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider'],
    customRules: [
      '# Zaza Visuals - AI Image Generator for Classrooms',
      '# Allow all major search engines',
      '# Optimized for AI search engines',
      '',
      '# Sitemap location',
      `Sitemap: ${ZAZA_URLS.visuals}/sitemap.xml`,
      '',
      '# Host directive',
      `Host: ${ZAZA_URLS.visuals}`,
    ],
  },
  
  inbox: {
    baseUrl: ZAZA_URLS.inbox,
    sitemapUrl: `${ZAZA_URLS.inbox}/sitemap.xml`,
    allowAll: true,
    disallowPaths: [
      '/api/',
      '/admin/',
      '/private/',
      '/_next/',
      '/static/',
      '/temp/',
      '/test/',
      '/dev/',
      '/staging/',
      '/.well-known/',
      '/robots.txt',
      '/sitemap.xml',
      '/dashboard/',
      '/account/',
      '/billing/',
    ],
    allowPaths: [
      '/',
      '/features',
      '/pricing',
      '/help',
      '/about',
      '/contact',
    ],
    crawlDelay: 1,
    userAgents: ['*', 'Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider'],
    customRules: [
      '# Zaza Inbox - AI Email Management for Educators',
      '# Allow all major search engines',
      '# Optimized for AI search engines',
      '',
      '# Sitemap location',
      `Sitemap: ${ZAZA_URLS.inbox}/sitemap.xml`,
      '',
      '# Host directive',
      `Host: ${ZAZA_URLS.inbox}`,
    ],
  },
  
  claritydeck: {
    baseUrl: ZAZA_URLS.claritydeck,
    sitemapUrl: `${ZAZA_URLS.claritydeck}/sitemap.xml`,
    allowAll: true,
    disallowPaths: [
      '/api/',
      '/admin/',
      '/private/',
      '/_next/',
      '/static/',
      '/temp/',
      '/test/',
      '/dev/',
      '/staging/',
      '/.well-known/',
      '/robots.txt',
      '/sitemap.xml',
      '/dashboard/',
      '/account/',
      '/billing/',
    ],
    allowPaths: [
      '/',
      '/features',
      '/pricing',
      '/help',
      '/about',
      '/contact',
    ],
    crawlDelay: 1,
    userAgents: ['*', 'Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider'],
    customRules: [
      '# Zaza ClarityDeck - AI Presentation Maker for Educators',
      '# Allow all major search engines',
      '# Optimized for AI search engines',
      '',
      '# Sitemap location',
      `Sitemap: ${ZAZA_URLS.claritydeck}/sitemap.xml`,
      '',
      '# Host directive',
      `Host: ${ZAZA_URLS.claritydeck}`,
    ],
  },
  
  schwoop: {
    baseUrl: ZAZA_URLS.schwoop,
    sitemapUrl: `${ZAZA_URLS.schwoop}/sitemap.xml`,
    allowAll: true,
    disallowPaths: [
      '/api/',
      '/admin/',
      '/private/',
      '/_next/',
      '/static/',
      '/temp/',
      '/test/',
      '/dev/',
      '/staging/',
      '/.well-known/',
      '/robots.txt',
      '/sitemap.xml',
      '/dashboard/',
      '/account/',
      '/billing/',
    ],
    allowPaths: [
      '/',
      '/features',
      '/pricing',
      '/help',
      '/about',
      '/contact',
    ],
    crawlDelay: 1,
    userAgents: ['*', 'Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider'],
    customRules: [
      '# Zaza Schwoop - AI Student Engagement Platform',
      '# Allow all major search engines',
      '# Optimized for AI search engines',
      '',
      '# Sitemap location',
      `Sitemap: ${ZAZA_URLS.schwoop}/sitemap.xml`,
      '',
      '# Host directive',
      `Host: ${ZAZA_URLS.schwoop}`,
    ],
  },
  
  'hr-spark': {
    baseUrl: ZAZA_URLS['hr-spark'],
    sitemapUrl: `${ZAZA_URLS['hr-spark']}/sitemap.xml`,
    allowAll: true,
    disallowPaths: [
      '/api/',
      '/admin/',
      '/private/',
      '/_next/',
      '/static/',
      '/temp/',
      '/test/',
      '/dev/',
      '/staging/',
      '/.well-known/',
      '/robots.txt',
      '/sitemap.xml',
      '/dashboard/',
      '/account/',
      '/billing/',
    ],
    allowPaths: [
      '/',
      '/features',
      '/pricing',
      '/help',
      '/about',
      '/contact',
    ],
    crawlDelay: 1,
    userAgents: ['*', 'Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider'],
    customRules: [
      '# Zaza HR Spark - AI HR Management for Schools',
      '# Allow all major search engines',
      '# Optimized for AI search engines',
      '',
      '# Sitemap location',
      `Sitemap: ${ZAZA_URLS['hr-spark']}/sitemap.xml`,
      '',
      '# Host directive',
      `Host: ${ZAZA_URLS['hr-spark']}`,
    ],
  },
  
  study: {
    baseUrl: ZAZA_URLS.study,
    sitemapUrl: `${ZAZA_URLS.study}/sitemap.xml`,
    allowAll: true,
    disallowPaths: [
      '/api/',
      '/admin/',
      '/private/',
      '/_next/',
      '/static/',
      '/temp/',
      '/test/',
      '/dev/',
      '/staging/',
      '/.well-known/',
      '/robots.txt',
      '/sitemap.xml',
      '/dashboard/',
      '/account/',
      '/billing/',
    ],
    allowPaths: [
      '/',
      '/features',
      '/pricing',
      '/help',
      '/about',
      '/contact',
    ],
    crawlDelay: 1,
    userAgents: ['*', 'Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider'],
    customRules: [
      '# Zaza Study - AI Study Planning and Optimization',
      '# Allow all major search engines',
      '# Optimized for AI search engines',
      '',
      '# Sitemap location',
      `Sitemap: ${ZAZA_URLS.study}/sitemap.xml`,
      '',
      '# Host directive',
      `Host: ${ZAZA_URLS.study}`,
    ],
  },
  
  coach: {
    baseUrl: ZAZA_URLS.coach,
    sitemapUrl: `${ZAZA_URLS.coach}/sitemap.xml`,
    allowAll: true,
    disallowPaths: [
      '/api/',
      '/admin/',
      '/private/',
      '/_next/',
      '/static/',
      '/temp/',
      '/test/',
      '/dev/',
      '/staging/',
      '/.well-known/',
      '/robots.txt',
      '/sitemap.xml',
      '/dashboard/',
      '/account/',
      '/billing/',
    ],
    allowPaths: [
      '/',
      '/features',
      '/pricing',
      '/help',
      '/about',
      '/contact',
    ],
    crawlDelay: 1,
    userAgents: ['*', 'Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider'],
    customRules: [
      '# Zaza Coach - AI Coaching and Mentoring Platform',
      '# Allow all major search engines',
      '# Optimized for AI search engines',
      '',
      '# Sitemap location',
      `Sitemap: ${ZAZA_URLS.coach}/sitemap.xml`,
      '',
      '# Host directive',
      `Host: ${ZAZA_URLS.coach}`,
    ],
  },
}

/**
 * Generate robots.txt content for a specific Zaza product
 */
export function generateProductRobots(product: keyof typeof ZAZA_URLS): string {
  const config = ZAZA_ROBOTS_CONFIGS[product]
  const lines: string[] = []
  
  // Add custom rules first
  if (config.customRules) {
    lines.push(...config.customRules)
    lines.push('') // Add empty line after custom rules
  }
  
  // Add user agent rules
  config.userAgents?.forEach(userAgent => {
    lines.push(`User-agent: ${userAgent}`)
    
    // Add crawl delay if specified
    if (config.crawlDelay) {
      lines.push(`Crawl-delay: ${config.crawlDelay}`)
    }
    
    // Add disallow rules
    config.disallowPaths?.forEach(path => {
      lines.push(`Disallow: ${path}`)
    })
    
    // Add allow rules
    config.allowPaths?.forEach(path => {
      lines.push(`Allow: ${path}`)
    })
    
    lines.push('') // Add empty line between user agents
  })
  
  // Add sitemap
  lines.push(`Sitemap: ${config.sitemapUrl}`)
  
  return lines.join('\n')
}

/**
 * Generate comprehensive robots.txt for all Zaza products
 */
export function generateComprehensiveRobots(): string {
  const lines: string[] = [
    '# Zaza Technologies - AI Tools for Educators',
    '# Comprehensive robots.txt for all Zaza products',
    '# Optimized for AI search engines and traditional crawlers',
    '',
    '# Allow all major search engines',
    'User-agent: *',
    'Allow: /',
    '',
    '# Disallow sensitive paths',
    'Disallow: /api/',
    'Disallow: /admin/',
    'Disallow: /private/',
    'Disallow: /_next/',
    'Disallow: /static/',
    'Disallow: /temp/',
    'Disallow: /test/',
    'Disallow: /dev/',
    'Disallow: /staging/',
    'Disallow: /.well-known/',
    'Disallow: /robots.txt',
    'Disallow: /sitemap.xml',
    'Disallow: /dashboard/',
    'Disallow: /account/',
    'Disallow: /billing/',
    '',
    '# Crawl delay for all bots',
    'Crawl-delay: 1',
    '',
    '# Sitemaps for all Zaza products',
    `Sitemap: ${ZAZA_URLS.main}/sitemap.xml`,
    `Sitemap: ${ZAZA_URLS.promptly}/sitemap.xml`,
    `Sitemap: ${ZAZA_URLS.teach}/sitemap.xml`,
    `Sitemap: ${ZAZA_URLS.visuals}/sitemap.xml`,
    `Sitemap: ${ZAZA_URLS.inbox}/sitemap.xml`,
    `Sitemap: ${ZAZA_URLS.claritydeck}/sitemap.xml`,
    `Sitemap: ${ZAZA_URLS.schwoop}/sitemap.xml`,
    `Sitemap: ${ZAZA_URLS['hr-spark']}/sitemap.xml`,
    `Sitemap: ${ZAZA_URLS.study}/sitemap.xml`,
    `Sitemap: ${ZAZA_URLS.coach}/sitemap.xml`,
    '',
    '# Host directive for main site',
    `Host: ${ZAZA_URLS.main}`,
  ]
  
  return lines.join('\n')
}

/**
 * Default robots function for Next.js
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/_next/',
          '/static/',
          '/temp/',
          '/test/',
          '/dev/',
          '/staging/',
          '/.well-known/',
          '/robots.txt',
          '/sitemap.xml',
          '/dashboard/',
          '/account/',
          '/billing/',
        ],
      },
    ],
    sitemap: [
      `${ZAZA_URLS.main}/sitemap.xml`,
      `${ZAZA_URLS.promptly}/sitemap.xml`,
      `${ZAZA_URLS.teach}/sitemap.xml`,
      `${ZAZA_URLS.visuals}/sitemap.xml`,
      `${ZAZA_URLS.inbox}/sitemap.xml`,
      `${ZAZA_URLS.claritydeck}/sitemap.xml`,
      `${ZAZA_URLS.schwoop}/sitemap.xml`,
      `${ZAZA_URLS['hr-spark']}/sitemap.xml`,
      `${ZAZA_URLS.study}/sitemap.xml`,
      `${ZAZA_URLS.coach}/sitemap.xml`,
    ],
    host: ZAZA_URLS.main,
  }
} 
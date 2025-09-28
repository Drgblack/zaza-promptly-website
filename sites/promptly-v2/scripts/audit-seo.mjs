#!/usr/bin/env node
/**
 * SEO Audit Script
 * Checks title/meta/H1/OG/Twitter/Schema per route
 */

import { readdir, readFile } from 'fs/promises'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Routes to check based on app directory structure
const ROUTES_TO_CHECK = [
  { path: '/src/app/[locale]/page.tsx', route: 'Homepage', required: ['title', 'description', 'og', 'twitter', 'schema'] },
  { path: '/src/app/[locale]/pricing/page.tsx', route: 'Pricing', required: ['title', 'description', 'og'] },
  { path: '/src/app/[locale]/about-founder/page.tsx', route: 'About Founder', required: ['title', 'description', 'og', 'schema'] },
  { path: '/src/app/[locale]/blog/page.tsx', route: 'Blog List', required: ['title', 'description', 'og'] },
  { path: '/src/app/[locale]/blog/[slug]/page.tsx', route: 'Blog Detail', required: ['title', 'description', 'og', 'twitter'] }
]

async function checkPageSEO(filePath, routeName) {
  const issues = []
  
  try {
    const content = await readFile(join(process.cwd(), filePath), 'utf-8')
    
    // Check for metadata export
    const hasMetadata = content.includes('export const metadata') || content.includes('export async function generateMetadata')
    if (!hasMetadata) {
      issues.push(`${routeName}: Missing metadata export`)
    }
    
    // Check for title
    const hasTitle = content.includes('title:') || content.includes('title =')
    if (!hasTitle) {
      issues.push(`${routeName}: Missing title meta`)
    }
    
    // Check for description
    const hasDescription = content.includes('description:') || content.includes('description =')
    if (!hasDescription) {
      issues.push(`${routeName}: Missing description meta`)
    }
    
    // Check for OpenGraph
    const hasOG = content.includes('openGraph') || content.includes('og:')
    if (!hasOG) {
      issues.push(`${routeName}: Missing OpenGraph meta`)
    }
    
    // Check for Twitter Card
    const hasTwitter = content.includes('twitter') || content.includes('twitter:')
    if (!hasTwitter) {
      issues.push(`${routeName}: Missing Twitter Card meta`)
    }
    
    // Check for structured data/schema
    const hasSchema = content.includes('application/ld+json') || content.includes('structuredData') || content.includes('schema.org')
    if (!hasSchema && routeName.includes('Homepage')) {
      issues.push(`${routeName}: Missing structured data (Schema.org)`)
    }
    
    // Check for H1 tag
    const hasH1 = content.includes('<h1') || content.includes('className="') && content.includes('text-') // Tailwind heading classes
    if (!hasH1) {
      issues.push(`${routeName}: No H1 heading found`)
    }
    
  } catch (error) {
    issues.push(`${routeName}: Could not read file - ${error.message}`)
  }
  
  return issues
}

async function checkLayoutSEO() {
  const issues = []
  const layoutPath = join(process.cwd(), 'src/app/[locale]/layout.tsx')
  
  try {
    const content = await readFile(layoutPath, 'utf-8')
    
    // Check for viewport meta
    const hasViewport = content.includes('viewport') || content.includes('width=device-width')
    if (!hasViewport) {
      issues.push('Layout: Missing viewport meta tag')
    }
    
    // Check for charset
    const hasCharset = content.includes('charset') || content.includes('utf-8')
    if (!hasCharset) {
      issues.push('Layout: Missing charset meta')
    }
    
    // Check for canonical URL setup
    const hasCanonical = content.includes('canonical') || content.includes('alternates')
    if (!hasCanonical) {
      issues.push('Layout: Missing canonical URL setup')
    }
    
  } catch (error) {
    issues.push(`Layout: Could not read layout.tsx - ${error.message}`)
  }
  
  return issues
}

async function checkSitemap() {
  const issues = []
  
  try {
    // Check for sitemap configuration
    const packageJsonPath = join(process.cwd(), 'package.json')
    const packageContent = await readFile(packageJsonPath, 'utf-8')
    const hasNextSitemap = packageContent.includes('next-sitemap')
    
    if (!hasNextSitemap) {
      issues.push('Sitemap: next-sitemap not configured')
    }
    
    // Check for sitemap config file
    try {
      await readFile(join(process.cwd(), 'next-sitemap.config.js'), 'utf-8')
    } catch {
      try {
        await readFile(join(process.cwd(), 'sitemap.config.js'), 'utf-8')
      } catch {
        issues.push('Sitemap: Missing sitemap configuration file')
      }
    }
    
  } catch (error) {
    issues.push(`Sitemap: Error checking sitemap setup - ${error.message}`)
  }
  
  return issues
}

async function checkRobotsTxt() {
  const issues = []
  
  try {
    const robotsPath = join(process.cwd(), 'public/robots.txt')
    await readFile(robotsPath, 'utf-8')
  } catch {
    issues.push('Missing robots.txt file')
  }
  
  return issues
}

async function checkAISEO() {
  const issues = []
  const suggestions = []
  
  try {
    // Check for AI-friendly content structure
    const homepagePath = join(process.cwd(), 'src/app/[locale]/page.tsx')
    const content = await readFile(homepagePath, 'utf-8')
    
    // Check for clear product description
    if (!content.includes('AI') && !content.includes('artificial intelligence')) {
      suggestions.push('AI SEO: Consider adding clear AI/ML related keywords if relevant to product')
    }
    
    // Check for FAQ section (good for AI SEO)
    const faqExists = content.includes('FAQ') || content.includes('questions')
    if (!faqExists) {
      suggestions.push('AI SEO: Consider adding FAQ section for better AI discoverability')
    }
    
  } catch (error) {
    issues.push(`AI SEO: Error checking AI optimization - ${error.message}`)
  }
  
  return { issues, suggestions }
}

async function main() {
  console.log('🔍 Auditing SEO...\n')
  
  let allIssues = []
  let allSuggestions = []
  
  // Check layout SEO
  const layoutIssues = await checkLayoutSEO()
  allIssues.push(...layoutIssues)
  
  // Check each route
  for (const route of ROUTES_TO_CHECK) {
    const issues = await checkPageSEO(route.path, route.route)
    allIssues.push(...issues)
  }
  
  // Check sitemap
  const sitemapIssues = await checkSitemap()
  allIssues.push(...sitemapIssues)
  
  // Check robots.txt
  const robotsIssues = await checkRobotsTxt()
  allIssues.push(...robotsIssues)
  
  // Check AI SEO
  const aiResults = await checkAISEO()
  allIssues.push(...aiResults.issues)
  allSuggestions.push(...aiResults.suggestions)
  
  // Report results
  if (allIssues.length === 0) {
    console.log('✅ No critical SEO issues found!')
  } else {
    console.log(`⚠️  Found ${allIssues.length} SEO issues:\n`)
    allIssues.forEach(issue => {
      console.log(`  - ${issue}`)
    })
  }
  
  if (allSuggestions.length > 0) {
    console.log('\n💡 SEO Suggestions:')
    allSuggestions.forEach(suggestion => {
      console.log(`  - ${suggestion}`)
    })
  }
  
  console.log('\n📋 SEO Checklist:')
  console.log('  ✓ Metadata exports in each page')
  console.log('  ✓ Title, description, OG tags')
  console.log('  ✓ H1 tags for page structure')
  console.log('  ✓ Schema.org structured data')
  console.log('  ✓ Sitemap generation')
  console.log('  ✓ Robots.txt file')
  console.log('  ✓ AI-friendly content structure')
}

main().catch(console.error)
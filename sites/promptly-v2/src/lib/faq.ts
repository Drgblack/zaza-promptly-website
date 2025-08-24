import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface FAQ {
  slug: string
  title: string
  category: string
  tags: string[]
  updated: string
  needsReview?: boolean
  content: string
}

export interface FAQCategory {
  name: string
  slug: string
  description: string
  faqs: FAQ[]
}

const FAQ_DIR = path.join(process.cwd(), 'content', 'faq')

// Category mapping with display names and descriptions
const CATEGORY_INFO: Record<string, { name: string; description: string }> = {
  'Getting started': {
    name: 'Getting Started',
    description: 'New to Promptly? Start here for basics and getting up and running.'
  },
  'AI quality & pedagogy': {
    name: 'AI Quality & Pedagogy', 
    description: 'Understanding how AI works for education and maintaining professional standards.'
  },
  'Data privacy & safety (GDPR)': {
    name: 'Data Privacy & Safety',
    description: 'GDPR compliance, data protection, and privacy for schools and teachers.'
  },
  'Pricing & Billing': {
    name: 'Pricing & Billing',
    description: 'Subscription costs, payment methods, and billing questions.'
  },
  'Schools & IT (deployments, SSO, DPA)': {
    name: 'Schools & IT',
    description: 'School licences, IT deployment, data processing agreements, and technical requirements.'
  },
  'Accessibility & languages': {
    name: 'Accessibility & Languages',
    description: 'Accessibility features, language support, and inclusive design.'
  },
  'Integrations (Stripe, Brevo)': {
    name: 'Integrations',
    description: 'Payment systems, email marketing, and third-party integrations.'
  },
  'Accounts & subscriptions': {
    name: 'Accounts & Subscriptions',
    description: 'Managing your account, subscription changes, and cancellations.'
  },
  'Troubleshooting': {
    name: 'Troubleshooting',
    description: 'Technical issues, support, and problem-solving guidance.'
  }
}

function slugifyCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .replace(/\s+/g, '-')     // Replace spaces with hyphens  
    .replace(/-+/g, '-')      // Replace multiple hyphens with single
    .trim()
}

function getAllFAQFiles(): string[] {
  const getAllFiles = (dirPath: string): string[] => {
    const files: string[] = []
    
    if (!fs.existsSync(dirPath)) {
      return files
    }
    
    const items = fs.readdirSync(dirPath)
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        files.push(...getAllFiles(fullPath))
      } else if (item.endsWith('.mdx')) {
        files.push(fullPath)
      }
    }
    
    return files
  }
  
  return getAllFiles(FAQ_DIR)
}

export async function getAllFAQs(): Promise<FAQ[]> {
  const faqFiles = getAllFAQFiles()
  const faqs: FAQ[] = []
  
  for (const filePath of faqFiles) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContent)
      
      // Extract slug from filename
      const fileName = path.basename(filePath, '.mdx')
      
      faqs.push({
        slug: data.slug || fileName,
        title: data.title || 'Untitled',
        category: data.category || 'General',
        tags: data.tags || [],
        updated: data.updated || new Date().toISOString().split('T')[0],
        needsReview: data.needsReview || false,
        content: content.trim()
      })
    } catch (error) {
      console.error(`Error loading FAQ file ${filePath}:`, error)
    }
  }
  
  // Sort by category, then by title
  return faqs.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category)
    }
    return a.title.localeCompare(b.title)
  })
}

export async function getFAQsByCategory(): Promise<FAQCategory[]> {
  const allFAQs = await getAllFAQs()
  const categoriesMap = new Map<string, FAQ[]>()
  
  // Group FAQs by category
  allFAQs.forEach(faq => {
    const categorySlug = faq.category
    if (!categoriesMap.has(categorySlug)) {
      categoriesMap.set(categorySlug, [])
    }
    categoriesMap.get(categorySlug)!.push(faq)
  })
  
  // Convert to FAQCategory objects
  const categories: FAQCategory[] = []
  categoriesMap.forEach((faqs, categoryName) => {
    const categoryInfo = CATEGORY_INFO[categoryName] || {
      name: categoryName,
      description: ''
    }
    
    categories.push({
      name: categoryInfo.name,
      slug: slugifyCategory(categoryName),
      description: categoryInfo.description,
      faqs: faqs.sort((a, b) => a.title.localeCompare(b.title))
    })
  })
  
  // Sort categories by predefined order
  const categoryOrder = [
    'Getting Started',
    'AI Quality & Pedagogy', 
    'Data Privacy & Safety',
    'Pricing & Billing',
    'Schools & IT',
    'Accessibility & Languages',
    'Integrations',
    'Accounts & Subscriptions',
    'Troubleshooting'
  ]
  
  return categories.sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a.name)
    const bIndex = categoryOrder.indexOf(b.name)
    
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex
    }
    if (aIndex !== -1) return -1
    if (bIndex !== -1) return 1
    return a.name.localeCompare(b.name)
  })
}

export async function getFAQBySlug(slug: string): Promise<FAQ | null> {
  const allFAQs = await getAllFAQs()
  return allFAQs.find(faq => faq.slug === slug) || null
}

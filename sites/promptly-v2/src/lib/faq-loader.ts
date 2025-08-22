import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

export interface CompiledFAQ {
  question: string
  answer: string
  compiledHTML: string
  slug: string
  category: string
  updated: string
  needsReview: boolean
  tags: string[]
}

const FAQ_DIR = path.join(process.cwd(), 'content', 'faq')

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
      } else if (item.endsWith('.mdx') && !item.startsWith('_')) {
        files.push(fullPath)
      }
    }
    
    return files
  }
  
  return getAllFiles(FAQ_DIR)
}

async function convertMarkdownToHTML(markdown: string): Promise<string> {
  try {
    const result = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(markdown)
    
    return String(result)
  } catch (error) {
    console.error('Error converting markdown to HTML:', error)
    return markdown
  }
}

function processInternalLinks(html: string): string {
  return html
    .replace(/\[Snippet Tool\]\(\/\#snippet\)/g, '<a href="/#snippet" class="text-brand-400 hover:text-brand-300 underline">Snippet Tool</a>')
    .replace(/\[Contact\]\(\/contact\)/g, '<a href="/contact" class="text-brand-400 hover:text-brand-300 underline">Contact</a>')
    .replace(/\[Pricing\]\(\/pricing\)/g, '<a href="/pricing" class="text-brand-400 hover:text-brand-300 underline">Pricing</a>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-brand-400 hover:text-brand-300 underline">$1</a>')
}

function stripMarkdownForPlainText(markdown: string): string {
  return markdown
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()
}

export async function loadAllFAQs(): Promise<CompiledFAQ[]> {
  const faqFiles = getAllFAQFiles()
  const faqs: CompiledFAQ[] = []
  
  for (const filePath of faqFiles) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContent)
      
      // Extract slug from filename or frontmatter
      const fileName = path.basename(filePath, '.mdx')
      const slug = data.slug || fileName
      
      // Convert markdown content to HTML
      const compiledHTML = await convertMarkdownToHTML(content)
      const processedHTML = processInternalLinks(compiledHTML)
      
      // Create plain text answer for JSON-LD (required by schema)
      const plainTextAnswer = stripMarkdownForPlainText(content)
      
      faqs.push({
        question: data.title || 'Untitled',
        answer: plainTextAnswer,
        compiledHTML: processedHTML,
        slug,
        category: data.category || 'General',
        updated: data.updated || new Date().toISOString().split('T')[0],
        needsReview: data.needsReview || false,
        tags: data.tags || []
      })
    } catch (error) {
      console.error(`Error loading FAQ file ${filePath}:`, error)
    }
  }
  
  // Sort by category, then by question
  return faqs.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category)
    }
    return a.question.localeCompare(b.question)
  })
}

export function generateFAQPageJsonLD(faqs: CompiledFAQ[]) {
  // Filter out items that need review from JSON-LD
  const publishedFAQs = faqs.filter(faq => !faq.needsReview)
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": publishedFAQs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

export function generateBreadcrumbJsonLD() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.zazapromptly.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "FAQ",
        "item": "https://www.zazapromptly.com/faq"
      }
    ]
  }
}

// Group FAQs by category for display
export function groupFAQsByCategory(faqs: CompiledFAQ[]) {
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
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const categoriesMap = new Map<string, CompiledFAQ[]>()
  
  faqs.forEach(faq => {
    const categoryName = faq.category
    if (!categoriesMap.has(categoryName)) {
      categoriesMap.set(categoryName, [])
    }
    categoriesMap.get(categoryName)!.push(faq)
  })
  
  const categories: Array<{
    name: string
    slug: string 
    description: string
    faqs: CompiledFAQ[]
  }> = []
  
  categoriesMap.forEach((faqs, categoryName) => {
    const categoryInfo = CATEGORY_INFO[categoryName] || {
      name: categoryName,
      description: ''
    }
    
    categories.push({
      name: categoryInfo.name,
      slug: slugifyCategory(categoryName),
      description: categoryInfo.description,
      faqs: faqs.sort((a, b) => a.question.localeCompare(b.question))
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
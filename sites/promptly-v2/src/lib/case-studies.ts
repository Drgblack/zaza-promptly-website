import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface CaseStudyMetadata {
  title: string
  description: string
  date: string
  author: string
  role: string
  school: string
  image: string
}

export interface CaseStudy {
  slug: string
  metadata: CaseStudyMetadata
  content: string
}

const caseStudiesDirectory = path.join(process.cwd(), 'content/case-studies')

export function getCaseStudySlugs(): string[] {
  try {
    const files = fs.readdirSync(caseStudiesDirectory)
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => file.replace(/\.mdx$/, ''))
  } catch (error) {
    console.warn('Case studies directory not found, returning empty array')
    return []
  }
}

export async function getCaseStudyMeta(slug: string): Promise<CaseStudy | null> {
  try {
    const fullPath = path.join(caseStudiesDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Only include published case studies
    if (data.isPublished === false || data.isDraft === true) {
      return null
    }
    
    // Extract metadata from the export statement
    const exportMatch = content.match(/export const metadata = ({[\s\S]*?})/m)
    let metadata: CaseStudyMetadata
    
    if (exportMatch) {
      // Parse the exported metadata
      const metadataString = exportMatch[1]
      const metadataObject = eval(`(${metadataString})`)
      metadata = metadataObject as CaseStudyMetadata
    } else {
      // Fallback to frontmatter
      metadata = {
        title: data.title || 'Untitled Case Study',
        description: data.description || data.excerpt || '',
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author?.name || data.author || 'Zaza Team',
        role: data.role || '',
        school: data.school || '',
        image: data.featuredImage || data.image || '/images/case-studies/default.jpg'
      }
    }
    
    return {
      slug,
      metadata,
      content
    }
  } catch (error) {
    console.error(`Failed to load case study ${slug}:`, error)
    return null
  }
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const slugs = getCaseStudySlugs()
  const caseStudies = await Promise.all(
    slugs.map(async (slug) => await getCaseStudyMeta(slug))
  )
  
  return caseStudies
    .filter((caseStudy): caseStudy is CaseStudy => caseStudy !== null)
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
}

export async function getRelatedCaseStudies(currentSlug: string, limit: number = 2): Promise<CaseStudy[]> {
  const allCaseStudies = await getAllCaseStudies()
  return allCaseStudies
    .filter(caseStudy => caseStudy.slug !== currentSlug)
    .slice(0, limit)
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
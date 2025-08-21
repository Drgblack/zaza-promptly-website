import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  author?: string
  tags?: string[]
  readTime?: string
  category?: string
  featured?: boolean
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }
  
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.mdx?$/, ''))
}

export async function getPostMeta(slug: string): Promise<PostMeta | null> {
  try {
    // Try .mdx first, then .md
    const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`)
    const mdPath = path.join(BLOG_DIR, `${slug}.md`)
    
    let filePath: string
    if (fs.existsSync(mdxPath)) {
      filePath = mdxPath
    } else if (fs.existsSync(mdPath)) {
      filePath = mdPath
    } else {
      return null
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    
    // Check if file has export const metadata pattern
    const hasExportMetadata = /export\s+const\s+metadata\s*=/.test(fileContent)
    
    if (hasExportMetadata) {
      // Try to dynamically import to get metadata export
      try {
        const module = await import(`../../content/blog/${slug}.mdx`)
        if (module.metadata) {
          return {
            slug,
            ...module.metadata
          }
        }
      } catch (error) {
        console.warn(`Failed to import metadata for ${slug}:`, error)
      }
    }
    
    // Fall back to frontmatter parsing with gray-matter
    const { data, content } = matter(fileContent)
    
    // Extract reading time if not provided
    const readTime = data.readTime || estimateReadingTime(content)
    
    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || data.excerpt || '',
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author?.name || data.author || 'Zaza Team',
      tags: data.tags || [],
      readTime,
      category: data.category,
      featured: data.featured || false
    }
  } catch (error) {
    console.error(`Failed to load post metadata for ${slug}:`, error)
    return null
  }
}

export async function getAllPostsMeta(): Promise<PostMeta[]> {
  const slugs = getPostSlugs()
  const posts: PostMeta[] = []
  
  for (const slug of slugs) {
    const meta = await getPostMeta(slug)
    if (meta) {
      posts.push(meta)
    }
  }
  
  // Sort by date descending (most recent first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getLatestPost(): Promise<PostMeta | undefined> {
  const posts = await getAllPostsMeta()
  return posts[0]
}

function estimateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}
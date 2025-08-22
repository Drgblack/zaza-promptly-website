import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Re-export types from the types file for server-side usage
export type {
  PostMeta,
  AuthorMeta,
  BlogPost,
  TagInfo,
  BlogStats
} from './blog-types'

// Re-export client-safe utilities
export { slugifyAuthor, formatDate, extractExcerpt } from './blog-types'

type AuthorMetaFile = {
  name: string
  bio: string
  image: string
  social: {
    linkedin?: string
    email?: string
    twitter?: string
  }
}

export type ContentMeta = {
  ordering: string[]
  lastmod: Record<string, string>
  authors: Record<string, AuthorMetaFile>
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
const CONTENT_DIR = path.join(process.cwd(), 'content')
const META_FILE = path.join(CONTENT_DIR, '_meta.json')

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }
  
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.mdx?$/, ''))
}

// Load content meta file
function getContentMeta(): ContentMeta | null {
  try {
    if (!fs.existsSync(META_FILE)) {
      return null
    }
    const metaContent = fs.readFileSync(META_FILE, 'utf8')
    return JSON.parse(metaContent)
  } catch (error) {
    console.error('Failed to load content meta:', error)
    return null
  }
}

// Get author information
export function getAuthorMeta(authorName: string): AuthorMetaFile | null {
  const meta = getContentMeta()
  if (!meta || !meta.authors) {
    return null
  }
  return meta.authors[authorName] || null
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
    const meta = getContentMeta()
    
    // Check if file has export const metadata pattern and extract it manually
    const hasExportMetadata = /export\s+const\s+metadata\s*=/.test(fileContent)
    
    if (hasExportMetadata) {
      // Extract metadata manually from the export const metadata pattern
      try {
        const metadataMatch = fileContent.match(/export\s+const\s+metadata\s*=\s*({[\s\S]*?})/m)
        if (metadataMatch) {
          // Use eval in a controlled way to parse the JavaScript object
          // This is safe because we control the file content
          const metadataCode = `(${metadataMatch[1]})`
          const metadata = eval(metadataCode)
          const { content } = matter(fileContent)
          
          return {
            slug,
            lastmod: meta?.lastmod?.[slug],
            ...metadata,
            content
          }
        }
      } catch (error) {
        console.warn(`Failed to parse metadata for ${slug}:`, error)
        // Fall through to gray-matter parsing
      }
    }
    
    // Fall back to frontmatter parsing with gray-matter
    const { data, content } = matter(fileContent)
    
    // Only include published posts
    if (data.isPublished === false || data.isDraft === true) {
      return null
    }
    
    // Extract reading time if not provided
    const readTime = data.readTime || data.readingTime || estimateReadingTime(content)
    
    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || data.excerpt || '',
      date: data.date || new Date().toISOString().split('T')[0],
      lastmod: meta?.lastmod?.[slug],
      author: data.author?.name || data.author || 'Zaza Team',
      tags: data.tags || [],
      readTime,
      category: data.category,
      featured: data.featured || false,
      content
    }
  } catch (error) {
    console.error(`Failed to load post metadata for ${slug}:`, error)
    return null
  }
}

export async function getAllPostsMeta(): Promise<PostMeta[]> {
  const meta = getContentMeta()
  const slugs = getPostSlugs()
  const posts: PostMeta[] = []
  
  for (const slug of slugs) {
    const postMeta = await getPostMeta(slug)
    if (postMeta) {
      posts.push(postMeta)
    }
  }
  
  // Sort by meta ordering if available, then by date descending
  if (meta?.ordering) {
    const orderedPosts = [...posts]
    orderedPosts.sort((a, b) => {
      const aIndex = meta.ordering.indexOf(a.slug)
      const bIndex = meta.ordering.indexOf(b.slug)
      
      // If both posts are in ordering, use that order
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex
      }
      
      // If only one is in ordering, prioritize it
      if (aIndex !== -1) return -1
      if (bIndex !== -1) return 1
      
      // Otherwise sort by date descending
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    return orderedPosts
  }
  
  // Fallback: Sort by date descending (most recent first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getLatestPost(): Promise<PostMeta | undefined> {
  const posts = await getAllPostsMeta()
  return posts[0]
}

// Get all unique tags from all posts
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPostsMeta()
  const tagSet = new Set<string>()
  
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tagSet.add(tag))
    }
  })
  
  return Array.from(tagSet).sort()
}

// Get all unique authors from all posts
export async function getAllAuthors(): Promise<string[]> {
  const posts = await getAllPostsMeta()
  const authorSet = new Set<string>()
  
  posts.forEach(post => {
    if (post.author) {
      authorSet.add(post.author)
    }
  })
  
  return Array.from(authorSet).sort()
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  const posts = await getAllPostsMeta()
  return posts.filter(post => post.tags?.includes(tag))
}

// Get posts by author
export async function getPostsByAuthor(author: string): Promise<PostMeta[]> {
  const posts = await getAllPostsMeta()
  return posts.filter(post => post.author === author)
}

// Get related posts by shared tags (excluding the current post)
export async function getRelatedPosts(currentSlug: string, limit: number = 3): Promise<PostMeta[]> {
  const currentPost = await getPostMeta(currentSlug)
  if (!currentPost || !currentPost.tags || currentPost.tags.length === 0) {
    // Fallback to latest posts if no tags
    const posts = await getAllPostsMeta()
    return posts.filter(post => post.slug !== currentSlug).slice(0, limit)
  }
  
  const allPosts = await getAllPostsMeta()
  const postsWithScores = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      const sharedTags = post.tags?.filter(tag => currentPost.tags!.includes(tag)) || []
      return {
        post,
        score: sharedTags.length
      }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
  
  const relatedPosts = postsWithScores.slice(0, limit).map(item => item.post)
  
  // If we don't have enough related posts, fill with latest posts
  if (relatedPosts.length < limit) {
    const latestPosts = allPosts
      .filter(post => post.slug !== currentSlug && !relatedPosts.includes(post))
      .slice(0, limit - relatedPosts.length)
    relatedPosts.push(...latestPosts)
  }
  
  return relatedPosts.slice(0, limit)
}

// Estimate reading time from post content
export async function estimateReadingMinutes(slug: string): Promise<string> {
  try {
    const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`)
    const mdPath = path.join(BLOG_DIR, `${slug}.md`)
    
    let filePath: string
    if (fs.existsSync(mdxPath)) {
      filePath = mdxPath
    } else if (fs.existsSync(mdPath)) {
      filePath = mdPath
    } else {
      return '5 min read'
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { content } = matter(fileContent)
    
    return estimateReadingTime(content)
  } catch (error) {
    console.error(`Failed to estimate reading time for ${slug}:`, error)
    return '5 min read'
  }
}

// slugifyAuthor is re-exported from blog-types.ts

// Get author from slug
export function getAuthorFromSlug(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Get paginated posts
export async function getPaginatedPosts(page: number = 1, postsPerPage: number = 10) {
  const allPosts = await getAllPostsMeta()
  const totalPosts = allPosts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  
  if (page < 1 || page > totalPages) {
    return {
      posts: [],
      currentPage: page,
      totalPages,
      totalPosts,
      hasNext: false,
      hasPrev: false
    }
  }
  
  const startIndex = (page - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const posts = allPosts.slice(startIndex, endIndex)
  
  return {
    posts,
    currentPage: page,
    totalPages,
    totalPosts,
    hasNext: page < totalPages,
    hasPrev: page > 1
  }
}

function estimateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

// Calculate reading time from content string (returns just the number of minutes)
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes
}
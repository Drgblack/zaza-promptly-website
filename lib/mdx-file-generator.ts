/**
 * MDX File Generator with Frontmatter and Validation
 * Creates properly formatted .mdx files for the blog system
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { GeneratedBlogPost } from './ai-content-generator'

interface MDXFrontmatter {
  title: string
  description: string
  excerpt: string
  date: string
  publishedAt?: string
  author: {
    name: string
    avatar?: string
    bio?: string
  }
  tags: string[]
  category: string
  featuredImage?: string
  seo: {
    title: string
    description: string
    keywords: string[]
    canonicalUrl: string
  }
  isPublished: boolean
  isDraft: boolean
  locale?: string
  readingTime?: number
  emotionalTone?: string
  targetAudience?: string
}

interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

interface MDXFileResult {
  filePath: string
  fileName: string
  slug: string
  frontmatter: MDXFrontmatter
  content: string
  validation: ValidationResult
}

export class MDXFileGenerator {
  private static readonly BLOG_CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')
  private static readonly REQUIRED_FRONTMATTER_FIELDS = [
    'title', 'description', 'excerpt', 'date', 'author', 'tags', 'category'
  ]

  /**
   * Generate MDX file from blog post
   */
  static async generateMDXFile(
    blogPost: GeneratedBlogPost, 
    options: {
      publishDate?: Date
      isDraft?: boolean
      customSlug?: string
      featuredImage?: string
    } = {}
  ): Promise<MDXFileResult> {
    try {
      // Generate slug
      const slug = options.customSlug || this.generateSlug(blogPost.title)
      
      // Create frontmatter
      const frontmatter = this.createFrontmatter(blogPost, options)
      
      // Process content to MDX format
      const mdxContent = this.processContentToMDX(blogPost.content)
      
      // Create full MDX file content
      const fullContent = matter.stringify(mdxContent, frontmatter)
      
      // Validate content
      const validation = this.validateMDXContent(fullContent, frontmatter)
      
      // Generate file path
      const fileName = `${slug}.mdx`
      const filePath = path.join(this.BLOG_CONTENT_DIR, fileName)
      
      // Ensure directory exists
      this.ensureDirectoryExists()
      
      // Write file
      await fs.promises.writeFile(filePath, fullContent, 'utf8')
      
      console.log(`[MDX GENERATOR] Created file: ${fileName}`)
      
      return {
        filePath,
        fileName,
        slug,
        frontmatter,
        content: mdxContent,
        validation
      }
    } catch (error) {
      console.error('[MDX GENERATOR ERROR]', error)
      throw new Error(`Failed to generate MDX file: ${error}`)
    }
  }

  /**
   * Generate URL-friendly slug from title
   */
  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim()
      .substring(0, 50) // Limit length
      .replace(/-$/, '') // Remove trailing hyphen
  }

  /**
   * Create proper frontmatter from blog post
   */
  private static createFrontmatter(
    blogPost: GeneratedBlogPost, 
    options: {
      publishDate?: Date
      isDraft?: boolean
      customSlug?: string
      featuredImage?: string
    }
  ): MDXFrontmatter {
    const publishDate = options.publishDate || new Date()
    const dateString = publishDate.toISOString().split('T')[0] // YYYY-MM-DD format
    
    return {
      title: blogPost.title,
      description: blogPost.excerpt,
      excerpt: blogPost.excerpt,
      date: dateString,
      publishedAt: publishDate.toISOString(),
      author: {
        name: blogPost.author,
        bio: 'Educational technology experts passionate about supporting teachers with innovative AI-powered solutions.'
      },
      tags: blogPost.tags,
      category: blogPost.category,
      featuredImage: options.featuredImage,
      seo: {
        title: blogPost.title.length > 60 ? blogPost.title.substring(0, 57) + '...' : blogPost.title,
        description: blogPost.excerpt.length > 160 ? blogPost.excerpt.substring(0, 157) + '...' : blogPost.excerpt,
        keywords: blogPost.seoKeywords,
        canonicalUrl: `https://zazatechnologies.com/blog/${options.customSlug || this.generateSlug(blogPost.title)}`
      },
      isPublished: !options.isDraft,
      isDraft: options.isDraft || false,
      locale: 'en',
      readingTime: blogPost.estimatedReadingTime,
      emotionalTone: blogPost.emotionalTone,
      targetAudience: blogPost.targetAudience
    }
  }

  /**
   * Process content to proper MDX format
   */
  private static processContentToMDX(content: string): string {
    let mdxContent = content

    // Ensure proper markdown formatting
    mdxContent = this.formatMarkdownHeaders(mdxContent)
    mdxContent = this.formatMarkdownLists(mdxContent)
    mdxContent = this.addMDXComponents(mdxContent)
    mdxContent = this.formatCodeBlocks(mdxContent)
    mdxContent = this.addCalloutBoxes(mdxContent)
    
    return mdxContent.trim()
  }

  /**
   * Format markdown headers properly
   */
  private static formatMarkdownHeaders(content: string): string {
    // Ensure headers have proper spacing
    return content
      .replace(/^(#{1,6})\s*(.+)$/gm, '$1 $2\n') // Add newline after headers
      .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double
  }

  /**
   * Format markdown lists properly
   */
  private static formatMarkdownLists(content: string): string {
    // Ensure proper list formatting
    return content
      .replace(/^\*\s+/gm, '- ') // Convert asterisk lists to hyphens
      .replace(/^(\d+)\.\s+/gm, '$1. ') // Ensure numbered lists have proper spacing
  }

  /**
   * Add MDX-specific components where appropriate
   */
  private static addMDXComponents(content: string): string {
    // Add callout components for important sections
    content = content.replace(
      /\*\*Important:\*\*\s*(.*?)(?=\n\n|\n$)/g,
      '<Callout type="warning">\n**Important:** $1\n</Callout>'
    )

    // Add tip components for helpful advice
    content = content.replace(
      /\*\*Tip:\*\*\s*(.*?)(?=\n\n|\n$)/g,
      '<Callout type="tip">\n**Tip:** $1\n</Callout>'
    )

    // Add success components for positive reinforcement
    content = content.replace(
      /\*\*Success:\*\*\s*(.*?)(?=\n\n|\n$)/g,
      '<Callout type="success">\n**Success:** $1\n</Callout>'
    )

    return content
  }

  /**
   * Format code blocks properly
   */
  private static formatCodeBlocks(content: string): string {
    // Ensure code blocks have proper language tags
    return content.replace(/```(\w+)?\n/g, (match, lang) => {
      return lang ? match : '```text\n'
    })
  }

  /**
   * Add callout boxes for key information
   */
  private static addCalloutBoxes(content: string): string {
    // Look for quoted sections and convert to callouts
    return content.replace(
      /^>\s*(.*?)$/gm,
      '<Callout type="info">\n$1\n</Callout>'
    )
  }

  /**
   * Validate MDX content
   */
  private static validateMDXContent(content: string, frontmatter: MDXFrontmatter): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // Validate required frontmatter fields
    this.REQUIRED_FRONTMATTER_FIELDS.forEach(field => {
      if (!frontmatter[field as keyof MDXFrontmatter]) {
        errors.push(`Missing required frontmatter field: ${field}`)
      }
    })

    // Validate title length
    if (frontmatter.title.length > 80) {
      warnings.push('Title is longer than 80 characters, may be truncated in search results')
    }

    // Validate excerpt length
    if (frontmatter.excerpt.length > 200) {
      warnings.push('Excerpt is longer than 200 characters, may be truncated')
    }

    // Validate tags
    if (frontmatter.tags.length === 0) {
      warnings.push('No tags specified, may affect SEO')
    } else if (frontmatter.tags.length > 10) {
      warnings.push('More than 10 tags specified, may dilute SEO effectiveness')
    }

    // Validate content length
    const wordCount = content.split(/\s+/).length
    if (wordCount < 300) {
      warnings.push('Content is shorter than 300 words, may not provide enough value')
    } else if (wordCount > 3000) {
      warnings.push('Content is longer than 3000 words, consider breaking into multiple posts')
    }

    // Validate markdown syntax
    const markdownErrors = this.validateMarkdownSyntax(content)
    errors.push(...markdownErrors)

    // Validate links
    const linkWarnings = this.validateLinks(content)
    warnings.push(...linkWarnings)

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  }

  /**
   * Validate markdown syntax
   */
  private static validateMarkdownSyntax(content: string): string[] {
    const errors: string[] = []

    // Check for unmatched markdown formatting
    const boldMatches = (content.match(/\*\*/g) || []).length
    if (boldMatches % 2 !== 0) {
      errors.push('Unmatched bold formatting (**)')
    }

    const italicMatches = (content.match(/(?<!\*)\*(?!\*)/g) || []).length
    if (italicMatches % 2 !== 0) {
      errors.push('Unmatched italic formatting (*)')
    }

    // Check for proper header hierarchy
    const headers: string[] = content.match(/^#{1,6}\s+.+$/gm) || []
    let previousLevel = 0
    headers.forEach((header: string, index: number) => {
      const level = header.match(/^#+/)?.[0].length || 0
      if (level > previousLevel + 1 && previousLevel > 0) {
        errors.push(`Header level jumps from H${previousLevel} to H${level} at line with "${header}"`)
      }
      previousLevel = level
    })

    return errors
  }

  /**
   * Validate links in content
   */
  private static validateLinks(content: string): string[] {
    const warnings: string[] = []
    
    // Find all markdown links
    const links = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || []
    
    links.forEach(link => {
      const urlMatch = link.match(/\[([^\]]+)\]\(([^)]+)\)/)
      if (urlMatch) {
        const url = urlMatch[2]
        
        // Check for external links without proper protocol
        if (url.includes('.') && !url.startsWith('http') && !url.startsWith('/')) {
          warnings.push(`External link may need protocol: ${url}`)
        }
        
        // Check for empty link text
        if (urlMatch[1].trim().length === 0) {
          warnings.push(`Empty link text for URL: ${url}`)
        }
      }
    })

    return warnings
  }

  /**
   * Ensure blog directory exists
   */
  private static ensureDirectoryExists(): void {
    if (!fs.existsSync(this.BLOG_CONTENT_DIR)) {
      fs.mkdirSync(this.BLOG_CONTENT_DIR, { recursive: true })
      console.log(`[MDX GENERATOR] Created directory: ${this.BLOG_CONTENT_DIR}`)
    }
  }

  /**
   * Generate multiple MDX files from blog posts
   */
  static async generateMultipleMDXFiles(
    blogPosts: GeneratedBlogPost[],
    options: {
      startDate?: Date
      daysBetween?: number
      allDrafts?: boolean
    } = {}
  ): Promise<MDXFileResult[]> {
    const results: MDXFileResult[] = []
    const startDate = options.startDate || new Date()
    const daysBetween = options.daysBetween || 2 // Default: publish every 2 days

    for (let i = 0; i < blogPosts.length; i++) {
      const publishDate = new Date(startDate)
      publishDate.setDate(startDate.getDate() + (i * daysBetween))

      try {
        const result = await this.generateMDXFile(blogPosts[i], {
          publishDate,
          isDraft: options.allDrafts || false
        })
        results.push(result)

        // Small delay to avoid file system conflicts
        await new Promise(resolve => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`Failed to generate MDX for post "${blogPosts[i].title}":`, error)
      }
    }

    return results
  }

  /**
   * Generate weekly content schedule (Mon/Wed/Fri)
   */
  static async generateWeeklySchedule(
    mondayPost: GeneratedBlogPost,
    wednesdayPost: GeneratedBlogPost,
    fridayPost: GeneratedBlogPost,
    weekStartDate: Date = new Date()
  ): Promise<{
    monday: MDXFileResult
    wednesday: MDXFileResult
    friday: MDXFileResult
  }> {
    // Calculate dates for Mon/Wed/Fri
    const monday = new Date(weekStartDate)
    monday.setDate(weekStartDate.getDate() - weekStartDate.getDay() + 1) // Next Monday

    const wednesday = new Date(monday)
    wednesday.setDate(monday.getDate() + 2)

    const friday = new Date(monday)
    friday.setDate(monday.getDate() + 4)

    const results = await Promise.all([
      this.generateMDXFile(mondayPost, { publishDate: monday }),
      this.generateMDXFile(wednesdayPost, { publishDate: wednesday }),
      this.generateMDXFile(fridayPost, { publishDate: friday })
    ])

    return {
      monday: results[0],
      wednesday: results[1],
      friday: results[2]
    }
  }

  /**
   * Check if slug already exists
   */
  static async slugExists(slug: string): Promise<boolean> {
    const filePath = path.join(this.BLOG_CONTENT_DIR, `${slug}.mdx`)
    try {
      await fs.promises.access(filePath)
      return true
    } catch {
      return false
    }
  }

  /**
   * Generate unique slug if original exists
   */
  static async generateUniqueSlug(baseSlug: string): Promise<string> {
    let slug = baseSlug
    let counter = 1

    while (await this.slugExists(slug)) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    return slug
  }

  /**
   * List all existing blog files
   */
  static async listExistingPosts(): Promise<string[]> {
    try {
      this.ensureDirectoryExists()
      const files = await fs.promises.readdir(this.BLOG_CONTENT_DIR)
      return files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    } catch (error) {
      console.error('[MDX GENERATOR] Error listing posts:', error)
      return []
    }
  }

  /**
   * Get file statistics
   */
  static async getFileStats(fileName: string): Promise<{
    size: number
    created: Date
    modified: Date
  } | null> {
    try {
      const filePath = path.join(this.BLOG_CONTENT_DIR, fileName)
      const stats = await fs.promises.stat(filePath)
      
      return {
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime
      }
    } catch (error) {
      console.error(`[MDX GENERATOR] Error getting stats for ${fileName}:`, error)
      return null
    }
  }
}

// Export types
export type { MDXFrontmatter, ValidationResult, MDXFileResult }
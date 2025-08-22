import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getPostSlugs } from '@/lib/blog'
import { isPostPublishable } from '@/lib/blog-types'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
// const META_FILE = path.join(process.cwd(), 'content', '_meta.json')

export async function POST(request: NextRequest) {
  try {
    // Verify this is an authorized request (check for secret token)
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.AUTO_PUBLISH_SECRET || 'your-secret-token'
    
    if (authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const publishedPosts = []
    const skippedPosts = []
    
    // Get all post slugs
    const slugs = getPostSlugs()
    
    for (const slug of slugs) {
      try {
        // Read post file
        const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`)
        const mdPath = path.join(BLOG_DIR, `${slug}.md`)
        
        let filePath: string
        if (fs.existsSync(mdxPath)) {
          filePath = mdxPath
        } else if (fs.existsSync(mdPath)) {
          filePath = mdPath
        } else {
          continue
        }

        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContent)
        
        // Create post meta object
        const postMeta = {
          slug,
          title: data.title || 'Untitled',
          description: data.description || data.excerpt || '',
          date: data.date || new Date().toISOString().split('T')[0],
          author: data.author?.name || data.author || 'Zaza Team',
          tags: data.tags || [],
          readTime: data.readTime || data.readingTime || '5 min',
          category: data.category,
          featured: data.featured || false,
          content,
          isDraft: data.isDraft,
          isPublished: data.isPublished,
          publishDate: data.publishDate,
          scheduledFor: data.scheduledFor
        }

        // Check if post should be published now
        if (!isPostPublishable(postMeta)) {
          skippedPosts.push({
            slug,
            reason: 'Not ready for publishing',
            isDraft: postMeta.isDraft,
            publishDate: postMeta.publishDate
          })
          continue
        }

        // If this post was previously a draft/scheduled and now should be published,
        // update the frontmatter to mark it as published
        if (data.isDraft === true || data.publishDate) {
          const updatedFrontmatter = {
            ...data,
            isDraft: false,
            isPublished: true,
            // Remove scheduling fields once published
            publishDate: undefined,
            scheduledFor: undefined
          }

          // Remove undefined fields
          Object.entries(updatedFrontmatter).forEach(([key, value]) => {
            if (value === undefined) {
              delete (updatedFrontmatter as Record<string, unknown>)[key]
            }
          })

          const updatedContent = matter.stringify(content, updatedFrontmatter)
          fs.writeFileSync(filePath, updatedContent, 'utf8')

          publishedPosts.push({
            slug,
            title: postMeta.title,
            publishedAt: new Date().toISOString()
          })
        }
        
      } catch (error) {
        console.error(`Error processing post ${slug}:`, error)
        skippedPosts.push({
          slug,
          reason: `Error: ${error instanceof Error ? error.message : String(error)}`,
          error: true
        })
      }
    }

    // If posts were published, trigger a revalidation
    if (publishedPosts.length > 0) {
      try {
        // Revalidate blog pages
        await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/revalidate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ path: '/blog' }),
        })
      } catch (revalidateError) {
        console.error('Failed to revalidate blog pages:', revalidateError)
      }
    }

    return NextResponse.json({
      success: true,
      publishedCount: publishedPosts.length,
      skippedCount: skippedPosts.length,
      published: publishedPosts,
      skipped: skippedPosts,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Auto-publish error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

// GET endpoint for checking scheduled posts
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.AUTO_PUBLISH_SECRET || 'your-secret-token'
    
    if (authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const scheduledPosts = []
    const draftPosts = []
    
    // Get all post slugs
    const slugs = getPostSlugs()
    
    for (const slug of slugs) {
      try {
        const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`)
        const mdPath = path.join(BLOG_DIR, `${slug}.md`)
        
        let filePath: string
        if (fs.existsSync(mdxPath)) {
          filePath = mdxPath
        } else if (fs.existsSync(mdPath)) {
          filePath = mdPath
        } else {
          continue
        }

        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContent)
        
        if (data.isDraft === true) {
          draftPosts.push({
            slug,
            title: data.title,
            publishDate: data.publishDate,
            scheduledFor: data.scheduledFor
          })
        } else if (data.publishDate) {
          const publishDate = new Date(data.publishDate)
          const now = new Date()
          
          if (publishDate > now) {
            scheduledPosts.push({
              slug,
              title: data.title,
              publishDate: data.publishDate,
              scheduledFor: data.scheduledFor
            })
          }
        }
        
      } catch (error) {
        console.error(`Error reading post ${slug}:`, error)
      }
    }

    return NextResponse.json({
      scheduledPosts,
      draftPosts,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Auto-publish status error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
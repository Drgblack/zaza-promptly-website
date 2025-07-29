import { NextRequest, NextResponse } from 'next/server'
import { createBlogPost, validateBlogMetadata, getBlogPost } from '@/lib/blog'
import { generateBlogPostWithAI } from '@/lib/ai-blog-generator'

export async function POST(request: NextRequest) {
  try {
    const { action, ...data } = await request.json()

    switch (action) {
      case 'create':
        return await handleCreatePost(data)
      case 'generate':
        return await handleGeneratePost(data)
      case 'webhook':
        return await handleWebhookSync(data)
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Blog sync error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

async function handleCreatePost(data: any) {
  const { slug, metadata, content } = data

  if (!slug || !metadata || !content) {
    return NextResponse.json(
      { error: 'Missing required fields: slug, metadata, content' },
      { status: 400 }
    )
  }

  // Validate metadata
  const validationErrors = validateBlogMetadata(metadata)
  if (validationErrors.length > 0) {
    return NextResponse.json(
      { error: 'Validation failed', details: validationErrors },
      { status: 400 }
    )
  }

  try {
    await createBlogPost(slug, metadata, content)
    return NextResponse.json({ 
      success: true, 
      slug,
      url: `/blog/${slug}`
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}

async function handleGeneratePost(data: any) {
  const { topic, keywords, tone, targetAudience, wordCount } = data

  if (!topic) {
    return NextResponse.json(
      { error: 'Topic is required for generation' },
      { status: 400 }
    )
  }

  try {
    const generatedPost = await generateBlogPostWithAI({
      topic,
      keywords: keywords || [],
      tone: tone || 'professional',
      targetAudience: targetAudience || 'teachers',
      wordCount: wordCount || 2000
    })

    return NextResponse.json({
      success: true,
      post: generatedPost
    })
  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate blog post' },
      { status: 500 }
    )
  }
}

async function handleWebhookSync(data: any) {
  const { source, posts } = data

  if (!source || !posts || !Array.isArray(posts)) {
    return NextResponse.json(
      { error: 'Invalid webhook data' },
      { status: 400 }
    )
  }

  const results = []
  
  for (const post of posts) {
    try {
      const { slug, metadata, content } = post
      
      // Check if post already exists
      let existingPost = null
      try {
        existingPost = await getBlogPost(slug)
      } catch (error) {
        // Post doesn't exist, which is fine
      }

      if (existingPost && !metadata.forceUpdate) {
        results.push({
          slug,
          status: 'skipped',
          reason: 'Post already exists'
        })
        continue
      }

      // Validate and create/update post
      const validationErrors = validateBlogMetadata(metadata)
      if (validationErrors.length > 0) {
        results.push({
          slug,
          status: 'error',
          errors: validationErrors
        })
        continue
      }

      await createBlogPost(slug, metadata, content)
      results.push({
        slug,
        status: existingPost ? 'updated' : 'created',
        url: `/blog/${slug}`
      })
    } catch (error) {
      results.push({
        slug: post.slug,
        status: 'error',
        error: 'Failed to process post'
      })
    }
  }

  return NextResponse.json({
    success: true,
    source,
    results,
    processed: results.length
  })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')

  if (action === 'health') {
    return NextResponse.json({
      status: 'healthy',
      endpoints: ['POST /api/blog-sync'],
      actions: ['create', 'generate', 'webhook'],
      timestamp: new Date().toISOString()
    })
  }

  return NextResponse.json({
    message: 'Blog Sync API',
    version: '1.0.0',
    documentation: 'https://zazapromptly.com/docs/blog-api'
  })
}
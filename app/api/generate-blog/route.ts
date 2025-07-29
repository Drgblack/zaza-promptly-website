import { NextRequest, NextResponse } from 'next/server'
import { createBlogPost, validateBlogMetadata, BlogMetadata } from '@/lib/blog'
import matter from 'gray-matter'

export async function POST(request: NextRequest) {
  try {
    const { topic, tone, referenceUrls, category, tags, author } = await request.json()

    // Validate required fields
    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
    }

    // Generate blog content using Claude
    const blogContent = await generateBlogWithClaude({
      topic,
      tone: tone || 'helpful',
      referenceUrls: referenceUrls || [],
      category: category || 'AI in Education',
      tags: tags || ['AI Tools', 'Teaching'],
      author: author || {
        name: 'AI Assistant',
        bio: 'AI-powered content creation for educators'
      }
    })

    if (!blogContent) {
      return NextResponse.json({ error: 'Failed to generate blog content' }, { status: 500 })
    }

    // Create the blog post file
    const slug = generateSlug(topic)
    await createBlogPost(slug, blogContent.metadata, blogContent.content)

    return NextResponse.json({
      success: true,
      slug,
      preview: {
        title: blogContent.metadata.title,
        description: blogContent.metadata.description,
        category: blogContent.metadata.category,
        tags: blogContent.metadata.tags,
        wordCount: blogContent.content.split(' ').length
      }
    })

  } catch (error: any) {
    console.error('Blog generation error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate blog post. Please try again.' 
    }, { status: 500 })
  }
}

async function generateBlogWithClaude({
  topic,
  tone,
  referenceUrls,
  category,
  tags,
  author
}: {
  topic: string
  tone: string
  referenceUrls: string[]
  category: string
  tags: string[]
  author: { name: string; bio?: string }
}): Promise<{ metadata: BlogMetadata; content: string } | null> {
  
  const prompt = `Create a comprehensive, engaging blog post for teachers about "${topic}". 

REQUIREMENTS:
- Tone: ${tone}
- Category: ${category}
- Target audience: K-12 teachers
- Length: 2500-3500 words
- Include practical examples and actionable advice
- Use MDX format with interactive components

STRUCTURE:
1. Compelling headline that includes the topic
2. Meta description (under 160 characters)
3. Engaging introduction with a hook
4. Clear sections with headers
5. Practical examples and strategies
6. Interactive elements (Callout boxes, PromptBox components)
7. Cross-app promotion (ZazaCTA components)
8. Actionable conclusion

INTERACTIVE COMPONENTS TO INCLUDE:
- <Callout type="tip|warning|success|info"> for important points
- <PromptBox> for AI prompts teachers can use
- <ZazaCTA> for promoting Zaza products
- <ResourceDownload> if applicable

REFERENCE URLS: ${referenceUrls.length > 0 ? referenceUrls.join(', ') : 'Use your knowledge base'}

Please format as a complete MDX file with frontmatter. Make it practical, engaging, and valuable for busy teachers.

FRONTMATTER TEMPLATE:
---
title: "Your Title Here"
description: "Description under 160 chars"
excerpt: "Brief excerpt for previews"
date: "${new Date().toISOString().split('T')[0]}"
author:
  name: "${author.name}"
  bio: "${author.bio || 'Education specialist'}"
tags: ${JSON.stringify(tags)}
category: "${category}"
seo:
  title: "SEO optimized title"
  description: "SEO description"
  keywords: ["keyword1", "keyword2", "keyword3"]
isPublished: true
isDraft: false
---

[Your content here using MDX components]`

  try {
    // Use Claude API to generate content
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    })

    if (!response.ok) {
      console.error('Claude API error:', response.status, response.statusText)
      return null
    }

    const data = await response.json()
    const generatedContent = data.content?.[0]?.text

    if (!generatedContent) {
      console.error('No content generated from Claude')
      return null
    }

    // Parse the MDX content
    const { data: metadata, content } = matter(generatedContent)

    // Validate metadata
    const validationErrors = validateBlogMetadata(metadata)
    if (validationErrors.length > 0) {
      console.error('Metadata validation errors:', validationErrors)
      // Add default values for missing required fields
      if (!metadata.title) metadata.title = `Guide to ${topic}`
      if (!metadata.description) metadata.description = `Learn about ${topic} with practical strategies for teachers.`
      if (!metadata.author?.name) metadata.author = { name: author.name }
      if (!metadata.category) metadata.category = category
      if (!metadata.tags) metadata.tags = tags
      if (!metadata.date) metadata.date = new Date().toISOString().split('T')[0]
    }

    return {
      metadata: metadata as BlogMetadata,
      content
    }

  } catch (error) {
    console.error('Error calling Claude API:', error)
    return null
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 50)
}

export async function GET() {
  return NextResponse.json({ 
    error: 'Method not allowed. Use POST to generate blog content.' 
  }, { status: 405 })
}
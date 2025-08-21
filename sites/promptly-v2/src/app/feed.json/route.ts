import { NextRequest, NextResponse } from 'next/server'
import { getAllPostsMeta } from '@/lib/blog'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'

export async function GET() {
  try {
    const posts = await getAllPostsMeta()
    
    const jsonFeed = {
      version: 'https://jsonfeed.org/version/1',
      title: 'Promptly Blog - AI Tools for Teachers',
      home_page_url: `${baseUrl}`,
      feed_url: `${baseUrl}/feed.json`,
      description: 'Practical insights, AI tools, and strategies to help teachers save time and improve student outcomes.',
      language: 'en',
      authors: [
        {
          name: 'Zaza Promptly Team',
          url: `${baseUrl}/about/founder`,
        },
      ],
      items: posts.map((post) => ({
        id: `${baseUrl}/blog/${post.slug}`,
        url: `${baseUrl}/blog/${post.slug}`,
        title: post.title,
        content_text: post.description,
        summary: post.description,
        date_published: new Date(post.date).toISOString(),
        authors: [
          {
            name: post.author || 'Zaza Promptly Team',
          },
        ],
        tags: post.tags || [],
        ...(post.category && { 
          _category: post.category,
        }),
        ...(post.readTime && {
          _read_time: post.readTime,
        }),
        external_url: `${baseUrl}/blog/${post.slug}`,
      })),
    }

    return NextResponse.json(jsonFeed, {
      status: 200,
      headers: {
        'Content-Type': 'application/feed+json; charset=utf-8',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200', // 24 hours cache, 12 hours stale-while-revalidate
      },
    })
  } catch (error) {
    console.error('Error generating JSON feed:', error)
    return NextResponse.json(
      { error: 'Error generating JSON feed' },
      { status: 500 }
    )
  }
}

export const revalidate = 86400 // 24 hours
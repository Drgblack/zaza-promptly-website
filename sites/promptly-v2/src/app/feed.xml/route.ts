import { NextRequest, NextResponse } from 'next/server'
import { getAllPostsMeta } from '@/lib/blog'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'

export async function GET() {
  try {
    const posts = await getAllPostsMeta()
    
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Promptly Blog - AI Tools for Teachers</title>
    <description>Practical insights, AI tools, and strategies to help teachers save time and improve student outcomes.</description>
    <link>${baseUrl}/blog</link>
    <language>en</language>
    <managingEditor>team@zazapromptly.com (Zaza Promptly Team)</managingEditor>
    <webMaster>team@zazapromptly.com (Zaza Promptly Team)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts.map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>team@zazapromptly.com (${post.author || 'Zaza Promptly Team'})</author>
      ${post.category ? `<category><![CDATA[${post.category}]]></category>` : ''}
    </item>`).join('')}
  </channel>
</rss>`.trim()

    return new NextResponse(rss, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200', // 24 hours cache, 12 hours stale-while-revalidate
      },
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new NextResponse('Error generating RSS feed', { status: 500 })
  }
}

export const revalidate = 86400 // 24 hours
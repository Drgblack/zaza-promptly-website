import { getAllPostsMeta, type PostMeta } from './blog'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.zazapromptly.com'

export interface RSSItem {
  title: string
  description: string
  link: string
  pubDate: string
  lastmod?: string
  author: string
  categories: string[]
  guid: string
}

export async function generateRSSFeed(): Promise<string> {
  const posts = await getAllPostsMeta()
  const items = posts.map(postToRSSItem)
  
  const rssItems = items.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <description><![CDATA[${item.description}]]></description>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.guid}</guid>
      <pubDate>${item.pubDate}</pubDate>
      ${item.lastmod ? `<lastBuildDate>${item.lastmod}</lastBuildDate>` : ''}
      <dc:creator><![CDATA[${item.author}]]></dc:creator>
      ${item.categories.map(cat => `<category><![CDATA[${cat}]]></category>`).join('')}
    </item>
  `).join('')

  const lastBuildDate = posts.length > 0 
    ? new Date(posts[0].lastmod || posts[0].date).toUTCString() 
    : new Date().toUTCString()

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[Promptly Blog]]></title>
    <description><![CDATA[AI-powered teaching tools and insights for educators. Save time while improving student outcomes with practical EdTech advice.]]></description>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-GB</language>
    <managingEditor>greg@zazatechnologies.com (Dr. Greg Blackburn)</managingEditor>
    <webMaster>greg@zazatechnologies.com (Dr. Greg Blackburn)</webMaster>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>Next.js RSS Generator</generator>
    <image>
      <url>${siteUrl}/og-default.png</url>
      <title>Promptly Blog</title>
      <link>${siteUrl}/blog</link>
      <width>1200</width>
      <height>630</height>
    </image>
    ${rssItems}
  </channel>
</rss>`.trim()
}

export async function generateJSONFeed(): Promise<string> {
  const posts = await getAllPostsMeta()
  const items = posts.map(postToJSONFeedItem)

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Promptly Blog',
    description: 'AI-powered teaching tools and insights for educators. Save time while improving student outcomes with practical EdTech advice.',
    home_page_url: `${siteUrl}/blog`,
    feed_url: `${siteUrl}/blog/feed.json`,
    language: 'en-GB',
    icon: `${siteUrl}/apple-touch-icon.svg`,
    favicon: `${siteUrl}/favicon.svg`,
    authors: [
      {
        name: 'Dr. Greg Blackburn',
        email: 'greg@zazatechnologies.com',
        url: `${siteUrl}/about/founder`
      }
    ],
    items
  }

  return JSON.stringify(feed, null, 2)
}

function postToRSSItem(post: PostMeta): RSSItem {
  const link = `${siteUrl}/blog/${post.slug}`
  
  return {
    title: post.title,
    description: post.description,
    link,
    pubDate: new Date(post.date).toUTCString(),
    lastmod: post.lastmod ? new Date(post.lastmod).toUTCString() : undefined,
    author: post.author || 'Promptly Team',
    categories: [post.category, ...(post.tags || [])].filter((item): item is string => Boolean(item)),
    guid: link
  }
}

function postToJSONFeedItem(post: PostMeta) {
  const link = `${siteUrl}/blog/${post.slug}`
  
  return {
    id: link,
    url: link,
    title: post.title,
    content_html: post.description, // Could be enhanced with full content
    summary: post.description,
    date_published: new Date(post.date).toISOString(),
    date_modified: post.lastmod ? new Date(post.lastmod).toISOString() : undefined,
    author: {
      name: post.author || 'Promptly Team'
    },
    tags: [post.category, ...(post.tags || [])].filter((item): item is string => Boolean(item))
  }
}
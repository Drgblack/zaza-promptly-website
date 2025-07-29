import { NextResponse } from 'next/server'

export async function GET() {
  const robots = `User-agent: *
Allow: /

# AI and Search Engine specific rules
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot  
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: perplexity
Allow: /

# Block unnecessary crawlers
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

# Important files
Sitemap: https://zazapromptly.com/sitemap.xml

# Crawl delay for heavy crawlers
User-agent: ia_archiver
Crawl-delay: 10

User-agent: Slurp
Crawl-delay: 5

# Allow all search engines to access our AI educational content
# This helps with discoverability for teacher-related searches
Host: zazapromptly.com`

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate'
    }
  })
}
import { generateRSSFeed } from '@/lib/rss'
import { NextResponse } from 'next/server'

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  try {
    const rssContent = await generateRSSFeed()
    
    return new NextResponse(rssContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=UTF-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

import { generateJSONFeed } from '@/lib/rss'
import { NextResponse } from 'next/server'

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  try {
    const jsonContent = await generateJSONFeed()
    
    return new NextResponse(jsonContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/feed+json; charset=UTF-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating JSON feed:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
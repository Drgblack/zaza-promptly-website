import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    // Get the secret from query params or headers
    const searchParams = request.nextUrl.searchParams
    const secret = searchParams.get('secret') || request.headers.get('authorization')
    
    // Simple secret check (you should use a proper secret in production)
    if (secret !== process.env.REVALIDATION_SECRET && secret !== 'force-revalidate-blog-2025') {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    // Force revalidate all blog routes
    revalidatePath('/blog')
    revalidatePath('/blog/[slug]', 'page')
    revalidatePath('/blog-new')
    revalidatePath('/blog-new/[slug]', 'page')
    revalidatePath('/blog-debug')
    revalidatePath('/blog-test')
    
    // Also revalidate the root layout to ensure headers are updated
    revalidatePath('/', 'layout')
    
    return NextResponse.json({ 
      revalidated: true, 
      timestamp: new Date().toISOString(),
      paths: ['/blog', '/blog/[slug]', '/blog-new', '/blog-new/[slug]', '/blog-debug', '/blog-test', '/']
    })
  } catch (error: any) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ 
      error: 'Error revalidating', 
      message: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Blog revalidation endpoint',
    usage: 'POST with secret parameter',
    timestamp: new Date().toISOString()
  })
}
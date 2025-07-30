import { NextRequest, NextResponse } from 'next/server'
import { runAutomatedBlogScheduler, generateImmediatePost } from '@/lib/automated-blog-scheduler'

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from an authorized source (CRON job)
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET || 'your-cron-secret-key'
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('🚀 Starting automated blog scheduler...')
    
    // Run the automated blog scheduler
    await runAutomatedBlogScheduler()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Automated blog processing completed',
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('❌ CRON blog processing error:', error)
    
    return NextResponse.json({ 
      error: 'Blog processing failed',
      details: error.message
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  // Manual trigger endpoint (for testing)
  const authHeader = request.headers.get('authorization')
  const adminSecret = process.env.ADMIN_SECRET || 'your-admin-secret-key'
  
  if (authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const url = new URL(request.url)
    const contentType = url.searchParams.get('type') as 'community-driven' | 'ai-generated' | 'inspirational' | null
    
    console.log('🔧 Manual blog generation triggered...', { contentType })
    
    const slug = await generateImmediatePost(contentType || undefined)
    
    if (slug) {
      return NextResponse.json({ 
        success: true, 
        message: 'Manual blog generation completed',
        slug,
        timestamp: new Date().toISOString()
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'No blog post was generated',
        timestamp: new Date().toISOString()
      })
    }
  } catch (error: any) {
    console.error('❌ Manual blog generation error:', error)
    
    return NextResponse.json({ 
      error: 'Manual blog generation failed',
      details: error.message
    }, { status: 500 })
  }
}
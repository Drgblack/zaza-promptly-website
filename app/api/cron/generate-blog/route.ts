import { NextRequest, NextResponse } from 'next/server'
import { AutomatedBlogGeneration } from '@/lib/automated-blog-generation'

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from an authorized source (CRON job)
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET || 'your-cron-secret-key'
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('🚀 Starting automated blog generation...')
    
    // Run the automated blog generation
    await AutomatedBlogGeneration.processQueue()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Blog generation completed',
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('❌ CRON blog generation error:', error)
    
    return NextResponse.json({ 
      error: 'Blog generation failed',
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
    console.log('🔧 Manual blog generation triggered...')
    await AutomatedBlogGeneration.processQueue()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Manual blog generation completed',
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('❌ Manual blog generation error:', error)
    
    return NextResponse.json({ 
      error: 'Manual blog generation failed',
      details: error.message
    }, { status: 500 })
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path } = body

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 })
    }

    // Revalidate the requested path
    revalidatePath(path)
    
    // Also revalidate related blog paths
    if (path.includes('/blog')) {
      revalidatePath('/blog')
      revalidatePath('/blog/[page]')
    }

    return NextResponse.json({ 
      success: true, 
      revalidated: path,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

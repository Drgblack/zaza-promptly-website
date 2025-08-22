import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import resourcesData from '../../../../content/resources.json'

interface Resource {
  slug: string
  title: string
  description: string
  filename: string
  category: string
  updated: string
  sizeKB: number
  license: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const resourceSlug = searchParams.get('resource')
    
    if (!resourceSlug) {
      return NextResponse.json(
        { error: 'Resource parameter is required' },
        { status: 400 }
      )
    }

    // Find the resource by slug
    const resources = resourcesData as Resource[]
    const resource = resources.find(r => r.slug === resourceSlug)
    
    if (!resource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      )
    }

    // Construct the file path
    const filePath = join(process.cwd(), 'public', 'resources', resource.filename)
    
    // Check if file exists
    if (!existsSync(filePath)) {
      console.error(`File not found: ${filePath}`)
      return NextResponse.json(
        { error: 'File not found on server' },
        { status: 404 }
      )
    }

    try {
      // Read the file
      const fileBuffer = readFileSync(filePath)
      
      // Create response with proper headers for PDF download
      const response = new NextResponse(fileBuffer)
      
      // Set proper Content-Type for PDF
      response.headers.set('Content-Type', 'application/pdf')
      
      // Set Content-Disposition to suggest download with filename
      response.headers.set(
        'Content-Disposition', 
        `attachment; filename="${resource.filename}"`
      )
      
      // Set Content-Length
      response.headers.set('Content-Length', fileBuffer.length.toString())
      
      // Set caching headers for better performance
      response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      
      // Optional: Add custom headers for tracking
      response.headers.set('X-Resource-Title', resource.title)
      response.headers.set('X-Resource-Category', resource.category)
      
      return response
      
    } catch (fileError) {
      console.error('Error reading file:', fileError)
      return NextResponse.json(
        { error: 'Error reading file' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Download API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
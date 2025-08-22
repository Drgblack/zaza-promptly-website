import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { stat } from 'fs/promises'
import path from 'path'
import resources from '../../../../content/resources.json'

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

// Create allow-list from resources.json
const allowedFiles = new Set(resources.map((resource: Resource) => resource.filename))

// MIME type mapping
const mimeTypes: Record<string, string> = {
  pdf: 'application/pdf',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  zip: 'application/zip'
}

// Get file extension and MIME type
function getFileInfo(filename: string) {
  const ext = path.extname(filename).toLowerCase().slice(1)
  return {
    extension: ext,
    mimeType: mimeTypes[ext] || 'application/octet-stream'
  }
}

// Check for path traversal attempts
function isSafeFilename(filename: string): boolean {
  // Check for path traversal patterns
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return false
  }
  
  // Check if filename contains only safe characters
  const safePattern = /^[a-zA-Z0-9._-]+$/
  return safePattern.test(filename)
}

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const { filename } = params

  try {
    // Security check: validate filename
    if (!filename || !isSafeFilename(filename)) {
      return NextResponse.json(
        { error: 'Invalid filename format' },
        { status: 400 }
      )
    }

    // Check if file is in allow-list
    if (!allowedFiles.has(filename)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }

    // Construct file path
    const filePath = path.join(process.cwd(), 'resources', filename)
    
    // Verify file exists and get stats
    let fileStats
    try {
      fileStats = await stat(filePath)
    } catch (error) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }

    // Read file
    const fileBuffer = await readFile(filePath)
    
    // Get file info
    const { extension, mimeType } = getFileInfo(filename)
    
    // Set Content-Disposition based on file type
    const isInline = extension === 'pdf'
    const disposition = isInline 
      ? 'inline' 
      : `attachment; filename="${filename}"`

    // Create response with proper headers
    const response = new NextResponse(fileBuffer as unknown as ReadableStream)
    
    response.headers.set('Content-Type', mimeType)
    response.headers.set('Content-Disposition', disposition)
    response.headers.set('Content-Length', fileStats.size.toString())
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    
    // Add custom resource headers for tracking
    const resource = resources.find((r: Resource) => r.filename === filename)
    if (resource) {
      response.headers.set('X-Resource-Title', resource.title)
      response.headers.set('X-Resource-Category', resource.category)
    }

    return response

  } catch (error) {
    console.error('Error serving resource:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
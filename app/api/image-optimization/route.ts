import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const imageUrl = searchParams.get('url')
    const width = searchParams.get('w') ? parseInt(searchParams.get('w')!) : undefined
    const height = searchParams.get('h') ? parseInt(searchParams.get('h')!) : undefined
    const format = searchParams.get('f') || 'webp'
    const quality = searchParams.get('q') ? parseInt(searchParams.get('q')!) : 80

    if (!imageUrl) {
      return new NextResponse('Missing image URL', { status: 400 })
    }

    // Fetch the original image
    const imageResponse = await fetch(imageUrl)
    if (!imageResponse.ok) {
      return new NextResponse('Failed to fetch image', { status: 404 })
    }

    const imageBuffer = await imageResponse.arrayBuffer()
    let sharpInstance = sharp(Buffer.from(imageBuffer))

    // Resize if dimensions are provided
    if (width || height) {
      sharpInstance = sharpInstance.resize(width, height, {
        fit: 'cover',
        position: 'center',
      })
    }

    // Convert to specified format
    let optimizedBuffer: Buffer
    switch (format.toLowerCase()) {
      case 'webp':
        optimizedBuffer = await sharpInstance.webp({ quality }).toBuffer()
        break
      case 'avif':
        optimizedBuffer = await sharpInstance.avif({ quality }).toBuffer()
        break
      case 'jpeg':
      case 'jpg':
        optimizedBuffer = await sharpInstance.jpeg({ quality }).toBuffer()
        break
      case 'png':
        optimizedBuffer = await sharpInstance.png({ quality }).toBuffer()
        break
      default:
        optimizedBuffer = await sharpInstance.webp({ quality }).toBuffer()
    }

    // Set appropriate headers
    const headers = new Headers()
    headers.set('Content-Type', `image/${format.toLowerCase()}`)
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    headers.set('Content-Length', optimizedBuffer.length.toString())

    return new NextResponse(optimizedBuffer, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error('Image optimization error:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
} 
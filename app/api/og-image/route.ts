import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const title = searchParams.get('title') || 'Zaza Promptly - AI Tools for Teachers'
    const type = searchParams.get('type') || 'blog'
    const category = searchParams.get('category') || ''
    const author = searchParams.get('author') || 'Zaza Team'
    const downloadCount = searchParams.get('downloadCount') || '0'
    const readTime = searchParams.get('readTime') || ''
    const width = parseInt(searchParams.get('width') || '1200')
    const height = parseInt(searchParams.get('height') || '630')

    // Validate parameters
    if (!['blog', 'resource', 'guide', 'template'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 })
    }

    // Generate HTML for the OpenGraph image
    const html = generateOGImageHTML({
      title: decodeURIComponent(title),
      type: type as 'blog' | 'resource' | 'guide' | 'template',
      category: decodeURIComponent(category),
      author: decodeURIComponent(author),
      downloadCount: parseInt(downloadCount),
      readTime: decodeURIComponent(readTime),
      width,
      height
    })

    // In production, you would convert HTML to image using:
    // 1. Puppeteer: html-to-image conversion
    // 2. @vercel/og: Vercel's image generation
    // 3. Canvas API: programmatic image generation
    // 4. External service: Bannerbear, Placid, etc.
    
    // For now, return the HTML as a visual preview
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    })

  } catch (error: any) {
    console.error('OG Image generation error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate OpenGraph image' 
    }, { status: 500 })
  }
}

interface OGImageData {
  title: string
  type: 'blog' | 'resource' | 'guide' | 'template'
  category: string
  author: string
  downloadCount: number
  readTime: string
  width: number
  height: number
}

function generateOGImageHTML(data: OGImageData): string {
  const {
    title,
    type,
    category,
    author,
    downloadCount,
    readTime,
    width,
    height
  } = data

  const backgroundGradient = getBackgroundGradient(type)
  const typeBadge = getTypeBadge(type)
  const badgeColor = getBadgeColor(type)
  const typeIcon = getTypeIcon(type)
  const statsText = getStatsText(data)

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OpenGraph Image - ${title}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          width: ${width}px;
          height: ${height}px;
          background: ${backgroundGradient};
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          display: flex;
          flex-direction: column;
          padding: 80px;
          position: relative;
          overflow: hidden;
        }
        
        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%);
          z-index: 1;
        }
        
        .content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .badge {
          background: ${badgeColor};
          color: white;
          padding: 16px 32px;
          border-radius: 30px;
          font-size: 20px;
          font-weight: 700;
          display: inline-block;
          margin-bottom: 40px;
          width: fit-content;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .title {
          font-size: ${title.length > 50 ? '56px' : '68px'};
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 40px;
          color: #1f2937;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          max-width: 900px;
          word-wrap: break-word;
        }
        
        .stats {
          font-size: 32px;
          color: #6b7280;
          margin-bottom: auto;
          font-weight: 500;
        }
        
        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }
        
        .logo {
          font-size: 28px;
          font-weight: 800;
          color: #8b5cf6;
          letter-spacing: 1px;
        }
        
        .author {
          font-size: 24px;
          color: #9ca3af;
          font-weight: 500;
        }
        
        .icon {
          position: absolute;
          top: 100px;
          right: 80px;
          font-size: 280px;
          opacity: 0.05;
          z-index: 1;
          line-height: 1;
        }
        
        .decorative-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
        }
        
        .decorative-circle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(219, 39, 119, 0.1));
        }
        
        .decorative-circle.large {
          width: 400px;
          height: 400px;
          top: -200px;
          right: -200px;
        }
        
        .decorative-circle.small {
          width: 200px;
          height: 200px;
          bottom: -100px;
          left: -100px;
        }
      </style>
    </head>
    <body>
      <div class="gradient-overlay"></div>
      
      <div class="decorative-elements">
        <div class="decorative-circle large"></div>
        <div class="decorative-circle small"></div>
      </div>
      
      <div class="icon">${typeIcon}</div>
      
      <div class="content">
        <div class="badge">${typeBadge}</div>
        <h1 class="title">${escapeHtml(title)}</h1>
        ${statsText ? `<div class="stats">${statsText}</div>` : ''}
        
        <div class="footer">
          <div class="logo">ZAZA PROMPTLY</div>
          ${author && author !== 'Zaza Team' ? `<div class="author">by ${escapeHtml(author)}</div>` : ''}
        </div>
      </div>
    </body>
    </html>
  `
}

function getBackgroundGradient(type: string): string {
  const gradients = {
    blog: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    resource: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    guide: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    template: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  }
  return gradients[type as keyof typeof gradients] || gradients.blog
}

function getTypeBadge(type: string): string {
  const badges = {
    blog: 'Blog Post',
    resource: 'Free Resource',
    guide: 'Complete Guide',
    template: 'AI Template'
  }
  return badges[type as keyof typeof badges] || 'Content'
}

function getBadgeColor(type: string): string {
  const colors = {
    blog: '#8b5cf6',
    resource: '#ef4444',
    guide: '#3b82f6',
    template: '#10b981'
  }
  return colors[type as keyof typeof colors] || '#8b5cf6'
}

function getTypeIcon(type: string): string {
  const icons = {
    blog: '📝',
    resource: '📋',
    guide: '📖',
    template: '🎯'
  }
  return icons[type as keyof typeof icons] || '📄'
}

function getStatsText(data: OGImageData): string {
  const stats = []
  
  if (data.readTime) {
    stats.push(`📖 ${data.readTime}`)
  }
  
  if (data.downloadCount && data.downloadCount > 0) {
    stats.push(`⬇️ ${data.downloadCount.toLocaleString()} downloads`)
  }
  
  if (data.category) {
    stats.push(`📂 ${data.category}`)
  }
  
  return stats.join('  •  ')
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
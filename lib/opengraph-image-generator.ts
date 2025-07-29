// Dynamic OpenGraph image generation for blog posts and resources

interface OpenGraphImageData {
  title: string
  type: 'blog' | 'resource' | 'guide' | 'template'
  category?: string
  author?: string
  downloadCount?: number
  readTime?: string
}

export class OpenGraphImageGenerator {
  private static readonly BASE_URL = 'https://zazapromptly.com'
  private static readonly IMAGE_WIDTH = 1200
  private static readonly IMAGE_HEIGHT = 630

  // Generate dynamic OG image URL using external service
  static generateImageUrl(data: OpenGraphImageData): string {
    const params = new URLSearchParams({
      title: data.title,
      type: data.type,
      category: data.category || '',
      author: data.author || 'Zaza Team',
      downloadCount: data.downloadCount?.toString() || '0',
      readTime: data.readTime || '',
      width: this.IMAGE_WIDTH.toString(),
      height: this.IMAGE_HEIGHT.toString()
    })

    // In production, this would use a service like Bannerbear, Placid, or custom API
    return `${this.BASE_URL}/api/og-image?${params.toString()}`
  }

  // Generate canvas-based image (for custom implementation)
  static async generateCanvasImage(data: OpenGraphImageData): Promise<string> {
    // This would implement HTML5 Canvas or server-side image generation
    // For now, return a placeholder that represents the dynamic image
    
    const canvas = {
      width: this.IMAGE_WIDTH,
      height: this.IMAGE_HEIGHT,
      background: this.getBackgroundGradient(data.type),
      elements: [
        {
          type: 'title',
          text: data.title,
          x: 100,
          y: 200,
          fontSize: 60,
          fontWeight: 'bold',
          color: '#1f2937',
          maxWidth: 1000
        },
        {
          type: 'badge',
          text: this.getTypeBadge(data.type),
          x: 100,
          y: 120,
          backgroundColor: this.getBadgeColor(data.type),
          textColor: 'white',
          padding: { x: 20, y: 10 },
          borderRadius: 20
        },
        {
          type: 'stats',
          text: this.getStatsText(data),
          x: 100,
          y: 480,
          fontSize: 28,
          color: '#6b7280'
        },
        {
          type: 'logo',
          text: 'ZAZA PROMPTLY',
          x: 100,
          y: 550,
          fontSize: 24,
          fontWeight: 'bold',
          color: '#8b5cf6'
        },
        {
          type: 'icon',
          icon: this.getTypeIcon(data.type),
          x: 950,
          y: 150,
          size: 200,
          opacity: 0.1
        }
      ]
    }

    // In a real implementation, this would render the canvas and return base64 or upload to CDN
    return `data:image/canvas,${JSON.stringify(canvas)}`
  }

  // Generate meta tags for OpenGraph
  static generateMetaTags(data: OpenGraphImageData, url: string): string {
    const imageUrl = this.generateImageUrl(data)
    
    return `
      <meta property="og:image" content="${imageUrl}" />
      <meta property="og:image:width" content="${this.IMAGE_WIDTH}" />
      <meta property="og:image:height" content="${this.IMAGE_HEIGHT}" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content="${data.title}" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content="${imageUrl}" />
      <meta property="twitter:image:alt" content="${data.title}" />
    `.trim()
  }

  private static getBackgroundGradient(type: string): string {
    const gradients = {
      blog: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      resource: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      guide: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      template: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
    return gradients[type as keyof typeof gradients] || gradients.blog
  }

  private static getTypeBadge(type: string): string {
    const badges = {
      blog: 'BLOG POST',
      resource: 'FREE RESOURCE',
      guide: 'COMPLETE GUIDE',
      template: 'AI TEMPLATE'
    }
    return badges[type as keyof typeof badges] || 'CONTENT'
  }

  private static getBadgeColor(type: string): string {
    const colors = {
      blog: '#8b5cf6',
      resource: '#ef4444',
      guide: '#3b82f6',
      template: '#10b981'
    }
    return colors[type as keyof typeof colors] || '#8b5cf6'
  }

  private static getStatsText(data: OpenGraphImageData): string {
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

  private static getTypeIcon(type: string): string {
    const icons = {
      blog: '📝',
      resource: '📋',
      guide: '📖',
      template: '🎯'
    }
    return icons[type as keyof typeof icons] || '📄'
  }
}

// Blog post specific image generator
export class BlogImageGenerator extends OpenGraphImageGenerator {
  static generateBlogImage(title: string, category: string, readTime: string, author?: string): string {
    return this.generateImageUrl({
      title: this.truncateTitle(title, 60),
      type: 'blog',
      category,
      author: author || 'Zaza Team',
      readTime
    })
  }

  private static truncateTitle(title: string, maxLength: number): string {
    if (title.length <= maxLength) return title
    return title.substring(0, maxLength - 3) + '...'
  }
}

// Resource specific image generator
export class ResourceImageGenerator extends OpenGraphImageGenerator {
  static generateResourceImage(title: string, category: string, downloadCount: number): string {
    return this.generateImageUrl({
      title: this.truncateTitle(title, 50),
      type: 'resource',
      category,
      downloadCount
    })
  }

  private static truncateTitle(title: string, maxLength: number): string {
    if (title.length <= maxLength) return title
    return title.substring(0, maxLength - 3) + '...'
  }
}

// Template for generating images server-side
export class ServerImageGenerator {
  static async generateServerSideImage(data: OpenGraphImageData): Promise<Buffer | string> {
    // This would use libraries like:
    // - @vercel/og (for Vercel Edge Functions)
    // - canvas (for Node.js)  
    // - sharp (for image processing)
    // - html-to-image (for HTML-based generation)
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: ${OpenGraphImageGenerator['IMAGE_WIDTH']}px;
            height: ${OpenGraphImageGenerator['IMAGE_HEIGHT']}px;
            background: ${OpenGraphImageGenerator['getBackgroundGradient'](data.type)};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            flex-direction: column;
            padding: 80px;
            color: white;
            position: relative;
            overflow: hidden;
          }
          .badge {
            background: ${OpenGraphImageGenerator['getBadgeColor'](data.type)};
            color: white;
            padding: 12px 24px;
            border-radius: 24px;
            font-size: 18px;
            font-weight: bold;
            display: inline-block;
            margin-bottom: 40px;
          }
          .title {
            font-size: 64px;
            font-weight: bold;
            line-height: 1.2;
            margin-bottom: 40px;
            color: #1f2937;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .stats {
            font-size: 28px;
            color: #374151;
            margin-bottom: 40px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #8b5cf6;
            position: absolute;
            bottom: 80px;
            left: 80px;
          }
          .icon {
            position: absolute;
            top: 120px;
            right: 80px;
            font-size: 200px;
            opacity: 0.1;
          }
          .gradient-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%);
            z-index: -1;
          }
        </style>
      </head>
      <body>
        <div class="gradient-overlay"></div>
        <span class="badge">${OpenGraphImageGenerator['getTypeBadge'](data.type)}</span>
        <h1 class="title">${data.title}</h1>
        <div class="stats">${OpenGraphImageGenerator['getStatsText'](data)}</div>
        <div class="logo">ZAZA PROMPTLY</div>
        <div class="icon">${OpenGraphImageGenerator['getTypeIcon'](data.type)}</div>
      </body>
      </html>
    `
    
    // In production, this HTML would be converted to an image using:
    // - Puppeteer for HTML to image conversion
    // - Canvas API for programmatic generation
    // - External service like Bannerbear or Placid
    
    return html // Return HTML template for now
  }
}

// Usage examples and utilities
export const OG_IMAGE_EXAMPLES = {
  blogPost: {
    title: "The Complete Guide to AI Tools for Teachers in 2025",
    type: 'blog' as const,
    category: "AI Tools",
    author: "Sarah Johnson",
    readTime: "12 min read"
  },
  
  resource: {
    title: "50+ AI Prompt Templates for Parent Communication",
    type: 'resource' as const,
    category: "Communication",
    downloadCount: 1247
  },
  
  guide: {
    title: "Complete Lesson Planning with AI: Step-by-Step Guide",
    type: 'guide' as const,
    category: "Lesson Planning",
    readTime: "20 min read",
    downloadCount: 892
  },
  
  template: {
    title: "AI Feedback Generator for Student Assignments",
    type: 'template' as const,
    category: "Assessment",
    downloadCount: 634
  }
}

// Utility function for Next.js metadata
export function generateOGImageMetadata(data: OpenGraphImageData, pageUrl: string) {
  const imageUrl = OpenGraphImageGenerator.generateImageUrl(data)
  
  return {
    openGraph: {
      images: [
        {
          url: imageUrl,
          width: OpenGraphImageGenerator['IMAGE_WIDTH'],
          height: OpenGraphImageGenerator['IMAGE_HEIGHT'],
          alt: data.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: [imageUrl],
    }
  }
}
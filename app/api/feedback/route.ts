import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { 
      type, 
      message, 
      pageType, 
      pageTitle, 
      pageUrl, 
      rating, 
      sectionId,
      timestamp 
    } = await request.json()

    // Validate required fields
    if (!type || !pageUrl || !timestamp) {
      return NextResponse.json({ 
        error: 'Missing required fields: type, pageUrl, timestamp' 
      }, { status: 400 })
    }

    // Validate feedback type
    if (!['positive', 'negative'].includes(type)) {
      return NextResponse.json({ 
        error: 'Invalid feedback type. Must be "positive" or "negative"' 
      }, { status: 400 })
    }

    // Create feedback entry
    const feedbackData = {
      id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      message: message || '',
      rating: rating || (type === 'positive' ? 5 : 1),
      pageType: pageType || 'general',
      pageTitle: pageTitle || 'Unknown Page',
      pageUrl,
      sectionId: sectionId || null,
      timestamp,
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      processed: false,
      createdAt: new Date().toISOString()
    }

    // Log feedback (in production, save to database)
    console.log('Feedback received:', {
      id: feedbackData.id,
      type: feedbackData.type,
      pageType: feedbackData.pageType,
      hasMessage: !!feedbackData.message,
      rating: feedbackData.rating,
      url: feedbackData.pageUrl.replace(/https?:\/\/[^\/]+/, ''), // Remove domain for logging
      timestamp: feedbackData.timestamp
    })

    // In production, you would:
    // 1. Save to database
    // 2. Route to appropriate team/system
    // 3. Trigger alerts for negative feedback
    // 4. Aggregate for analytics

    // Example routing logic:
    if (type === 'negative' && (message?.length > 20 || rating <= 2)) {
      // High priority negative feedback - alert team
      console.log('PRIORITY: Detailed negative feedback received', {
        page: pageUrl,
        message: message?.substring(0, 100)
      })
    }

    // Categorize feedback for routing
    const category = categoryzeFeedback(pageType, type, message)
    
    // Mock integration with external systems
    await routeFeedback(feedbackData, category)

    return NextResponse.json({ 
      success: true, 
      message: 'Feedback submitted successfully',
      feedbackId: feedbackData.id,
      category
    })

  } catch (error: any) {
    console.error('Feedback submission error:', error)
    return NextResponse.json({ 
      error: 'Internal server error processing feedback' 
    }, { status: 500 })
  }
}

// Categorize feedback for routing
function categoryzeFeedback(pageType: string, type: string, message?: string): string {
  const messageText = (message || '').toLowerCase()
  
  // Technical issues
  if (messageText.includes('bug') || messageText.includes('error') || messageText.includes('broken')) {
    return 'technical'
  }
  
  // Content feedback
  if (pageType === 'blog' || pageType === 'resource') {
    return 'content'
  }
  
  // Product feedback
  if (pageType === 'pricing' || messageText.includes('price') || messageText.includes('cost')) {
    return 'product'
  }
  
  // UX feedback
  if (messageText.includes('confusing') || messageText.includes('unclear') || messageText.includes('hard to')) {
    return 'ux'
  }
  
  // Feature requests
  if (messageText.includes('wish') || messageText.includes('would like') || messageText.includes('suggest')) {
    return 'feature_request'
  }
  
  return type === 'positive' ? 'positive_general' : 'negative_general'
}

// Route feedback to appropriate systems
async function routeFeedback(feedbackData: any, category: string): Promise<void> {
  try {
    // In production, this would route to:
    // - Airtable for content team
    // - Slack for urgent issues
    // - Email for specific team members
    // - Analytics dashboard for tracking
    
    console.log(`Routing feedback [${category}]:`, {
      id: feedbackData.id,
      type: feedbackData.type,
      category,
      priority: getPriority(category, feedbackData.type)
    })

    // Mock Airtable integration
    if (category === 'content' || category === 'feature_request') {
      // await sendToAirtable(feedbackData)
    }
    
    // Mock Slack integration for urgent issues
    if (category === 'technical' && feedbackData.type === 'negative') {
      // await sendToSlack(feedbackData)
    }
    
  } catch (error) {
    console.error('Error routing feedback:', error)
  }
}

// Determine priority based on category and type
function getPriority(category: string, type: string): string {
  if (category === 'technical' && type === 'negative') return 'high'
  if (category === 'ux' && type === 'negative') return 'medium'
  if (category === 'feature_request') return 'low'
  if (type === 'positive') return 'low'
  return 'medium'
}

export async function GET() {
  return NextResponse.json({ 
    error: 'Method not allowed. Use POST to submit feedback.' 
  }, { status: 405 })
}
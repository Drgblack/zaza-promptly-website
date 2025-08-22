import { NextRequest, NextResponse } from 'next/server'

interface WaitlistData {
  email: string
  role: string
  source?: string
  honeypot?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: WaitlistData = await request.json()
    
    // Honeypot check for bot detection
    if (data.honeypot) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
    }

    // Validate required fields
    if (!data.email || !data.role) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          details: {
            email: !data.email ? 'Email is required' : null,
            role: !data.role ? 'Role is required' : null
          }
        }, 
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { 
          error: 'Invalid email format',
          details: { email: 'Please enter a valid email address' }
        }, 
        { status: 400 }
      )
    }

    // Validate role is one of the expected values
    const validRoles = ['teacher', 'head-of-year', 'slt', 'senco', 'tutor', 'admin', 'other']
    if (!validRoles.includes(data.role)) {
      return NextResponse.json(
        { 
          error: 'Invalid role',
          details: { role: 'Please select a valid role' }
        }, 
        { status: 400 }
      )
    }

    // Here you would typically save to a database or send to an email service
    // For now, we'll log the submission and simulate success
    console.log('Waitlist submission:', {
      email: data.email,
      role: data.role,
      source: data.source || 'direct',
      timestamp: new Date().toISOString(),
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    })

    // TODO: Integrate with your email service (e.g., Mailchimp, ConvertKit, etc.)
    // TODO: Save to database if needed
    
    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist'
    })

  } catch (error) {
    console.error('Waitlist submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
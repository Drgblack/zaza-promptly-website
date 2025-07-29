import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { referrerEmail, newUserEmail, utmData, conversionDate, firstVisitDate } = await request.json()

    // Validate required fields
    if (!referrerEmail || !newUserEmail || !conversionDate) {
      return NextResponse.json({ 
        error: 'Missing required fields: referrerEmail, newUserEmail, conversionDate' 
      }, { status: 400 })
    }

    // Validate email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(referrerEmail) || !emailRegex.test(newUserEmail)) {
      return NextResponse.json({ 
        error: 'Invalid email format' 
      }, { status: 400 })
    }

    // Prevent self-referrals
    if (referrerEmail.toLowerCase() === newUserEmail.toLowerCase()) {
      return NextResponse.json({ 
        error: 'Self-referrals are not allowed' 
      }, { status: 400 })
    }

    // Log the referral conversion (in production, this would go to a database)
    const conversionData = {
      referrerEmail: referrerEmail.toLowerCase(),
      newUserEmail: newUserEmail.toLowerCase(),
      utmData: utmData || {},
      conversionDate,
      firstVisitDate,
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      timestamp: new Date().toISOString()
    }

    // Log to console (in production, save to database)
    console.log('Referral conversion tracked:', {
      ...conversionData,
      // Anonymize emails for logging
      referrerEmail: conversionData.referrerEmail.replace(/(.{2}).*(@.*)/, '$1***$2'),
      newUserEmail: conversionData.newUserEmail.replace(/(.{2}).*(@.*)/, '$1***$2')
    })

    // Here you would typically:
    // 1. Save to database
    // 2. Update referrer's stats
    // 3. Send notification email
    // 4. Award points/rewards
    // 5. Trigger follow-up automations

    // Example database save (pseudo-code):
    // await db.referralConversions.create(conversionData)
    // await db.users.updateReferralStats(referrerEmail)

    return NextResponse.json({ 
      success: true, 
      message: 'Referral conversion tracked successfully',
      conversionId: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    })

  } catch (error: any) {
    console.error('Referral conversion tracking error:', error)
    return NextResponse.json({ 
      error: 'Internal server error tracking referral conversion' 
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    error: 'Method not allowed. Use POST to track referral conversions.' 
  }, { status: 405 })
}
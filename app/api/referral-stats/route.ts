import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ 
        error: 'Email parameter is required' 
      }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: 'Invalid email format' 
      }, { status: 400 })
    }

    // In production, this would query your database
    // For now, return mock data based on email patterns
    const normalizedEmail = email.toLowerCase()
    
    // Mock referral stats (in production, query from database)
    const mockStats = {
      totalReferrals: Math.floor(Math.random() * 10) + 1,
      successfulReferrals: Math.floor(Math.random() * 5),
      pendingReferrals: Math.floor(Math.random() * 3),
      rewardPoints: Math.floor(Math.random() * 100) + 10,
      lastReferralDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
    }

    // Log the stats request (anonymized)
    console.log('Referral stats requested:', {
      email: normalizedEmail.replace(/(.{2}).*(@.*)/, '$1***$2'),
      timestamp: new Date().toISOString()
    })

    // In production, you would:
    // const stats = await db.referralStats.findByEmail(normalizedEmail)
    // const referralHistory = await db.referralConversions.findByReferrer(normalizedEmail)

    return NextResponse.json({
      success: true,
      email: normalizedEmail,
      stats: mockStats,
      message: 'Referral stats retrieved successfully'
    })

  } catch (error: any) {
    console.error('Referral stats error:', error)
    return NextResponse.json({ 
      error: 'Internal server error retrieving referral stats' 
    }, { status: 500 })
  }
}

export async function POST() {
  return NextResponse.json({ 
    error: 'Method not allowed. Use GET to retrieve referral stats.' 
  }, { status: 405 })
}
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Log performance metric
    console.log('Performance Metric:', {
      metric: data.metric,
      value: data.value,
      url: data.url,
      timestamp: new Date(data.timestamp).toISOString(),
      ...data
    })

    // Here you would typically store this data in your database
    // For now, we'll just log it and return success
    
    // Example: Store in database
    // await db.performanceMetrics.create({
    //   metric: data.metric,
    //   value: data.value,
    //   url: data.url,
    //   timestamp: new Date(data.timestamp),
    //   additionalData: data.additionalData || {}
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error storing performance metric:', error)
    return NextResponse.json(
      { error: 'Failed to store performance metric' },
      { status: 500 }
    )
  }
} 
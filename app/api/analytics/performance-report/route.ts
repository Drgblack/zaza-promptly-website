import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Log comprehensive performance report
    console.log('Performance Report:', {
      lcp: data.lcp,
      fid: data.fid,
      cls: data.cls,
      ttfb: data.ttfb,
      fcp: data.fcp,
      pageLoadTime: data.pageLoadTime,
      domContentLoaded: data.domContentLoaded,
      url: data.url,
      timestamp: new Date(data.timestamp).toISOString(),
      userAgent: data.userAgent,
      connectionType: data.connectionType
    })

    // Analyze performance and log warnings for poor metrics
    const warnings = []
    
    if (data.lcp > 2500) {
      warnings.push(`LCP is poor: ${data.lcp}ms (should be < 2500ms)`)
    }
    
    if (data.fid > 100) {
      warnings.push(`FID is poor: ${data.fid}ms (should be < 100ms)`)
    }
    
    if (data.cls > 0.1) {
      warnings.push(`CLS is poor: ${data.cls} (should be < 0.1)`)
    }
    
    if (data.ttfb > 600) {
      warnings.push(`TTFB is poor: ${data.ttfb}ms (should be < 600ms)`)
    }
    
    if (data.pageLoadTime > 3000) {
      warnings.push(`Page load time is poor: ${data.pageLoadTime}ms (should be < 3000ms)`)
    }

    if (warnings.length > 0) {
      console.warn('Performance Issues Detected:', warnings)
    }

    // Here you would typically store this data in your database
    // For now, we'll just log it and return success
    
    // Example: Store in database
    // await db.performanceReports.create({
    //   lcp: data.lcp,
    //   fid: data.fid,
    //   cls: data.cls,
    //   ttfb: data.ttfb,
    //   fcp: data.fcp,
    //   pageLoadTime: data.pageLoadTime,
    //   domContentLoaded: data.domContentLoaded,
    //   url: data.url,
    //   timestamp: new Date(data.timestamp),
    //   userAgent: data.userAgent,
    //   connectionType: data.connectionType,
    //   warnings: warnings
    // })

    return NextResponse.json({ 
      success: true, 
      warnings: warnings.length > 0 ? warnings : undefined 
    })
  } catch (error) {
    console.error('Error storing performance report:', error)
    return NextResponse.json(
      { error: 'Failed to store performance report' },
      { status: 500 }
    )
  }
} 
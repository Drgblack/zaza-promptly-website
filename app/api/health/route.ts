import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Basic health checks
    const startTime = Date.now()
    
    // Check environment variables
    const envChecks = {
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
      hasBrevoKey: !!process.env.BREVO_API_KEY,
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      hasGAKey: !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      nodeEnv: process.env.NODE_ENV || 'unknown'
    }

    // Database/service connectivity checks (if applicable)
    const serviceChecks = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.version
    }

    // Test critical API endpoints
    const apiChecks = {
      internalApiWorking: true, // We're responding, so internal API is working
    }

    const responseTime = Date.now() - startTime

    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      environment: envChecks,
      system: serviceChecks,
      api: apiChecks,
      checks: {
        database: 'not_applicable', // No database in this setup
        external_apis: 'not_tested', // Would need actual API calls
        memory: serviceChecks.memory.heapUsed < 512 * 1024 * 1024 ? 'ok' : 'warning', // 512MB threshold
        uptime: serviceChecks.uptime > 0 ? 'ok' : 'error'
      }
    }

    return NextResponse.json(healthData, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
      checks: {
        api: 'error',
        system: 'error'
      }
    }, { status: 500 })
  }
}

// Simple health check for uptime monitoring services
export async function HEAD() {
  return new Response(null, { status: 200 })
}
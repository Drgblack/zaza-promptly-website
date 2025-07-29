import { NextResponse } from 'next/server'

// Simple status endpoint for external monitoring services
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'zaza-promptly'
  })
}

// Even simpler endpoint for basic uptime checks
export async function HEAD() {
  return new Response(null, { status: 200 })
}
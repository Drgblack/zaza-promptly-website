import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    
    // TODO: integrate email/CRM later (Brevo/Zapier)
    console.log('Contact submission', {
      timestamp: new Date().toISOString(),
      name: body.name,
      email: body.email,
      role: body.role,
      message: body.message,
    })

    // Simulate a brief delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
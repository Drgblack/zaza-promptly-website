import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // For now just log - wire to Sentry later
    console.warn('CSP report', JSON.stringify(body));
  } catch {
    // ignore
  }
  return NextResponse.json({ ok: true });
}
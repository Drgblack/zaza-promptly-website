import { NextResponse } from 'next/server';

export async function GET() {
  // Intentional error for validation
  // eslint-disable-next-line no-throw-literal
  throw new Error('Sentry probe');
  // return NextResponse.json({ ok: true });
}
import { NextRequest, NextResponse } from 'next/server';

const RATE_WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 1;
const memory = new Map<string, number>();

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0';
  const now = Date.now();
  const last = memory.get(ip) ?? 0;
  if (now - last < RATE_WINDOW_MS) return NextResponse.json({ ok: false }, { status: 429 });
  memory.set(ip, now);

  const { email, locale, source_path, consent, list = 'newsletter' } = await req.json().catch(() => ({}));
  // Honeypot
  const honey = req.headers.get('x-hp') || '';
  if (honey) return NextResponse.json({ ok: true });

  if (!email || consent !== true) return NextResponse.json({ ok: false }, { status: 400 });

  const apiKey = process.env.BREVO_API_KEY;
  const listId = list === 'waitlist' ? process.env.BREVO_LIST_ID_WAITLIST : process.env.BREVO_LIST_ID_NEWSLETTER;
  const templateId = Number(process.env.BREVO_DOUBLE_OPTIN_TEMPLATE_ID ?? 0);
  if (!apiKey || !listId || !templateId) {
    // Graceful fallback: accept but do not call API
    return NextResponse.json({ ok: true, queued: true });
  }

  const payload = {
    email,
    includeListIds: [Number(listId)],
    redirectionUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale || 'en'}/thanks`,
    templateId,
    attributes: { LOCALE: locale, SOURCE_PATH: source_path }
  };

  const res = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
    method: 'POST',
    headers: { 'api-key': apiKey, 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) return NextResponse.json({ ok: false }, { status: 502 });
  return NextResponse.json({ ok: true });
}
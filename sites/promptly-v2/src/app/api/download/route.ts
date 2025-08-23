import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // tell Next this cannot be prerendered
export const runtime = 'edge';          // optional; remove if you prefer Node runtime

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const file = url.searchParams.get('file');
  if (!file) return new NextResponse('Missing ?file', { status: 400 });

  // allow only filenames inside /public/resources
  const safe = file.replace(/[^a-zA-Z0-9._-]/g, '');
  return NextResponse.redirect(new URL(`/resources/${safe}`, url));
}

export function GET() {
  if (process.env.NEXT_PUBLIC_ENV !== 'development') {
    return new Response('disabled', { status: 404 });
  }
  throw new Error('Manual test error from /api/_debug/boom');
}

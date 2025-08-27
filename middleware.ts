import { NextResponse, NextRequest } from 'next/server'

const LOCALES = ['en','de','fr','es','it'] as const
const DEFAULT = 'en'

function detectLocale(req: NextRequest): string {
  const cookie = req.cookies.get('locale')?.value
  if (cookie && LOCALES.includes(cookie as any)) return cookie
  const header = req.headers.get('accept-language') || ''
  const match = LOCALES.find(l => header.toLowerCase().startsWith(l))
  return match || DEFAULT
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  // Ignore next internals and APIs
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // static
  ) return

  // Has locale already?
  const has = LOCALES.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (!has) {
    const locale = detectLocale(req)
    const url = req.nextUrl.clone()
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
    const res = NextResponse.redirect(url)
    res.cookies.set('locale', locale, { path: '/' })
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // everything except api, _next, and files with extensions
    '/((?!api|_next|.*\\..*).*)',
  ],
}
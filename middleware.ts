import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALES = ['en','de','fr','es','it'] as const
const DEFAULT = 'en'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Skip API, _next, static assets
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|pdf|txt|xml)$/)
  ) return NextResponse.next()

  // If no leading locale, redirect with cookie/default
  const hasLocale = LOCALES.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (!hasLocale) {
    const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value
    const locale = LOCALES.includes(cookieLocale as any) ? cookieLocale! : DEFAULT
    const url = req.nextUrl.clone()
    url.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(url)
  }

  // Persist locale cookie on every localized request
  const currentLocale = pathname.split('/')[1]
  const res = NextResponse.next()
  res.cookies.set('NEXT_LOCALE', currentLocale, { path: '/', maxAge: 60 * 60 * 24 * 365 })
  return res
}

export const config = {
  matcher: [
    // everything except api, _next, and files with extensions
    '/((?!api|_next|.*\\..*).*)',
  ],
}
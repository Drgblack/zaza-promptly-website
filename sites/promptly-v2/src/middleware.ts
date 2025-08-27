import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'de', 'fr', 'es', 'it']
const defaultLocale = 'en'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  if (pathname === '/') {
    const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value
    const best = locales.includes(cookieLocale || '') ? cookieLocale! : defaultLocale
    return NextResponse.redirect(new URL(`/${best}`, req.url))
  }
  
  const seg = pathname.split('/')[1]
  if (!locales.includes(seg)) {
    // Don't redirect API routes, static files, or Next.js internal paths
    if (
      pathname.startsWith('/api') ||
      pathname.startsWith('/_next') ||
      pathname.startsWith('/images') ||
      pathname.startsWith('/fonts') ||
      pathname.startsWith('/icons') ||
      pathname.includes('.') ||
      pathname.startsWith('/favicon') ||
      pathname.startsWith('/robots') ||
      pathname.startsWith('/sitemap')
    ) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, req.url))
  }

  return NextResponse.next()
}

export const config = { matcher: ['/((?!_next|.*\\..*).*)'] }
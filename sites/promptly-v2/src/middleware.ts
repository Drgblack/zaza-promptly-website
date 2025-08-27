import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/i18n";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip static assets and API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/images") ||
    pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/i)
  ) {
    return NextResponse.next();
  }

  // Already localized?
  if (new RegExp(`^/(${locales.join("|")})(/|$)`).test(pathname)) {
    return NextResponse.next();
  }

  // Root or non-localized → redirect to cookie or default
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;
  const nextLocale = locales.includes((cookieLocale as any) ?? "") ? (cookieLocale as any) : defaultLocale;

  const url = req.nextUrl.clone();
  url.pathname = `/${nextLocale}${pathname}`.replace(/\/+$/, "");
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // everything except _next and files
};
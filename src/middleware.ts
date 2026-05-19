import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE ?? 'uk'
const SUPPORTED_LOCALES = (process.env.SUPPORTED_LOCALES ?? 'uk').split(',')

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only the default locale uses canonical URLs without a prefix — redirect /uk/* → /*
  if (pathname.startsWith(`/${DEFAULT_LOCALE}`)) {
    const newPath = pathname.replace(`/${DEFAULT_LOCALE}`, '') || '/'
    return NextResponse.redirect(new URL(newPath, request.url))
  }

  // Non-default locale prefixes (e.g. /us) are valid URLs — pass through
  const isNonDefaultLocale = SUPPORTED_LOCALES.some(
    (locale) => locale !== DEFAULT_LOCALE && pathname.startsWith(`/${locale}`)
  )
  if (isNonDefaultLocale) return NextResponse.next()

  return NextResponse.rewrite(new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url))
}

// Intercepts all paths except Next.js internals, API routes, and static files
export const config = {
  matcher: ['/((?!_next|api|favicon\\.ico|.*\\..*).*)',],
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const cmsToken = request.cookies.get('cms_token')?.value
    const legacyToken = request.cookies.get('admin_token')?.value
    const secret = process.env.ADMIN_SECRET

    // Allow access if either JWT or legacy token is valid
    // JWT verification happens at edge — we only check existence here
    // Full verification happens in API routes via lib/middleware.ts
    const hasJWT = !!cmsToken
    const hasLegacy = legacyToken && legacyToken === secret

    if (!hasJWT && !hasLegacy) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

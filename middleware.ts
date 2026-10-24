import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  const isLoginRoute = req.nextUrl.pathname === '/login'
  const isAuthenticated = !!req.auth

  if (isAdminRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isLoginRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*', '/login'],
}

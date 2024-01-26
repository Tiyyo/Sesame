import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

const authRoutes = ['/login', '/register']

export async function middleware(request: NextRequest) {
  const cookieStore = cookies()
  const token = cookieStore.get('_token')

  if (!token && !authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (token) {
    try {
      const res = await fetch(`${process.env.API_BASE_URL}/api/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`,
        },
        credentials: 'include'
      })
      const data = await res.json()

      if (typeof data.userId === 'number') {
        if (authRoutes.some((route) => route === request.nextUrl.pathname)) {
          return NextResponse.redirect(new URL('/', request.url))
        }
        return NextResponse.next()
      }
      return NextResponse.redirect(new URL('/login', request.url))

    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}


export const config = {
  matcher: ['/', '/login', '/register'],
  missing: [
    { type: 'header', key: 'next-router-prefetch' },
    { type: 'header', key: 'purpose', value: 'prefetch' },
  ],
}
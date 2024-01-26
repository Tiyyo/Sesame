import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  if (request.method !== 'POST') {
    return NextResponse.next()
  }
  const cookieStore = cookies()
  const token = cookieStore.get('_token')

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/auth/logout`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      },
    })
    cookieStore.delete('_token')
    return Response.json({ message: 'success' })
  } catch (error) {

    return NextResponse.redirect(new URL('/', request.url))
  }
}
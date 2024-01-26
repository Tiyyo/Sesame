import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  if (request.method !== 'POST') return Response.redirect('/register')
  const requestBody = await request.json()
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    const data = await res.json()
    if (data.message === 'success') {
      return new NextResponse(JSON.stringify({ message: 'success' }), { status: 200 })
    } else {
      return new NextResponse(JSON.stringify({ error: 'Wrong informations provided' }), { status: 400 })
    }
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }

}
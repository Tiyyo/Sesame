import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const requestBody = await request.json()
  const body = JSON.stringify(requestBody)

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })

    const data = await res.json()
    if (data.error) {
      return new Response(JSON.stringify({ error: data.error }), { status: 200 })
    }

    const expires = new Date('2034-01-01').toUTCString();
    const cookieValue = `_token=${data._token}; HttpOnly; Path=/; SameSite=Lax; Expires=${expires}`;

    const nextResponse = new NextResponse(JSON.stringify({ message: 'Login Success' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    nextResponse.headers.append('Set-Cookie', cookieValue);

    return nextResponse
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 })
  }

}
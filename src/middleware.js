import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request) {

  const userToken = request.cookies.get('userToken')

  if (userToken === undefined)
    return NextResponse.redirect(new URL('/login', request.url))

  try {
    await jwtVerify(userToken.value, new TextEncoder().encode(process.env.JWT_SECRET))
  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  NextResponse.next()
}

export const config = {
  matcher: ['/', '/purposes']
}
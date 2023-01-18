import { serialize } from 'cookie'
import { verify } from 'jsonwebtoken'

export default function logout(req, res) {

  const { userToken } = req.cookies

  if (!userToken) return res.status(401).json({ error: 'No token' })

  try {
    verify(userToken, process.env.JWT_SECRET)
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  const cookie = serialize('userToken', null, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/'
  })

  res.setHeader('Set-Cookie', cookie)
  return res.json('Logout success')
}
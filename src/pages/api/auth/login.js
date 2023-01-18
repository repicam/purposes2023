import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'
import { createUser, getUser } from '../user'
import { comparePassword, hashPassword } from 'utils/bcrypt'

export default async function login(req, res) {

  const { email, password } = req.body

  let user = await getUser(email)

  if (!user) {
    const hashedPassword = await hashPassword(password)
    user = await createUser({
      email,
      username: email.split('@')[0],
      password: hashedPassword
    })
  } else {
    if(!comparePassword(password, user.password))
      return res.status(401).json({ error: 'Bad credentials' })
  }

  const token = sign({
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    email,
    username: user.username,
    id: user.id
  }, process.env.JWT_SECRET)

  const cookie = serialize('userToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/'
  })

  res.setHeader('Set-Cookie', cookie)
  return res.json('Login success')
}
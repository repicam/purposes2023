import { verify } from 'jsonwebtoken'
import Purpose from 'models/Purpose'
import { dbConnect } from 'utils/mongoose'

dbConnect()

export default async function info(req, res) {

  const { cookies: { userToken } } = req

  if (!userToken) return res.status(401).json({ error: 'No token' })

  let user = null
  const data = {}

  try {
    user = verify(userToken, process.env.JWT_SECRET)
    data.user = user
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  const purposes = await Purpose.find({ userId: user.id })
  data.purposes = purposes
  return res.json({ success: true, data })
}
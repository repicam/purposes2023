import { dbConnect } from 'utils/mongoose'
import { verify } from 'jsonwebtoken'
import Purpose from 'models/Purpose'

dbConnect()

export default async function handler(req, res) {

  const { method, body, cookies: { userToken } } = req

  if (!userToken) return res.status(401).json({ error: 'No token' })

  let user = null

  try {
    user = verify(userToken, process.env.JWT_SECRET)
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  switch (method) {
    case 'GET':
      const purposes = await Purpose.find({userId: user.id})
      return res.json({success: true, data: {purposes}})

    case 'POST':
      body.userId = user.id
      const purpose = await Purpose.create(body)
      return res.status(201).json({success: true, data: {purpose}})
  
    default:
      return res.status(405).json()
  }
}
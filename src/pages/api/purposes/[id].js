import { dbConnect } from 'utils/mongoose'
import { verify } from 'jsonwebtoken'
import Purpose from 'models/Purpose'

dbConnect()

export default async function handler(req, res) {

  const { method, body, cookies: { userToken }, query: { id } } = req

  if (!userToken) return res.status(401).json({ error: 'No token' })

  let user = null

  try {
    user = verify(userToken, process.env.JWT_SECRET)
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  const searchPurpose = await Purpose.find({_id: id, userId: user.id })
  if (!searchPurpose) return res.status(401).json({ error: 'Invalid id' })

  switch (method) {
    case 'GET':
      const purpose = await Purpose.findById(id)
      return res.json({ success: true, data: { purpose } })

    case 'PATCH':
      const updatedPurpose = await Purpose.findByIdAndUpdate(id, body, { new: true })
      return res.json({ success: true, data: { updatedPurpose } })

    case 'DELETE':
      await Purpose.findByIdAndDelete(id)
      return res.status(204).json({ success: true })

    default:
      return res.status(405)
  }
}
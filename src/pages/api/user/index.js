import { dbConnect } from 'utils/mongoose'
import User from 'models/User'

dbConnect()

export async function getUser(email) {
  return await User.findOne({email})
}

export async function createUser(user) {
  return await User.create(user)
}
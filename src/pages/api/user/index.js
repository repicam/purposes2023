import { dbConnect } from 'utils/mongoose'
import User from 'models/User'

dbConnect()

export async function getUserByEmail(email) {
  return await User.findOne({email})
}

export async function createUser(user) {
  return await User.create(user)
}
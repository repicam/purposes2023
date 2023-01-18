import { hash, compare } from 'bcrypt'

const SALT_ROUNDS = 10

export async function hashPassword (plainTextPassword) {
  return await hash(plainTextPassword, SALT_ROUNDS)
}

export async function comparePassword (plainTextPassword, hashPassword) {
  return await compare(plainTextPassword, hashPassword)
}
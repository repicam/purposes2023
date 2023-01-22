import { model, models, Schema } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true
  },
  username: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
}, {
  versionKey: false,
  timestamps: true
})

export default models.User || model('User', userSchema)
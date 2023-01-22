import { model, models, Schema } from 'mongoose'

const purposeSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [40, 'Title must be less than 40 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Description must be less than 200 characters']
  },
  completed: {
    type: Boolean
  },
  finishDate: {
    type: Date
  },
  userId: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true,
  strictQuery:  true
})

export default models.Purpose || model('Purpose', purposeSchema)
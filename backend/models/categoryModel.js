import mongoose from 'mongoose'
// import { uuidv1 } from 'uuid/v1'

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
      unique: true,
    },
  },
  { timestamps: true }
)

const Category = mongoose.model('Category', categorySchema)

export default Category

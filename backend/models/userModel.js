import mongoose from 'mongoose'
import crypto from 'crypto'
import { v1 as uuidv1 } from 'uuid'
// import { uuidv1 } from 'uuid/v1'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 32 },
    email: { type: String, required: true, trim: true, unique: true },
    hashed_password: { type: String, required: true },
    about: { type: String, required: true, default: 'I love Books.' },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

// virtual field
userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })

userSchema.methods = {
  matchPassword: function (password) {
    return this.encryptPassword(password) === this.hashed_password
  },

  encryptPassword: function (password) {
    if (!password) return ''
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    } catch (error) {
      return ''
    }
  },
}

const User = mongoose.model('User', userSchema)

export default User

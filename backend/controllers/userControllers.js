import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken' //to generate signed token
import expressJwt from 'express-jwt' //for authorization check
import User from '../models/userModel.js'

//@desc     Register a new user
//@route    POST /api/users
//@access   Public
export const registerUser = asyncHandler(async (req, res) => {
  // console.log(req.body)
  const { name, email, password, about, role } = req.body

  // let userRole
  // userRole = role ? role : 0
  // console.log(userRole)
  // if (userRole) console.log('admin')

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({ name, email, password, about })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      history: user.history,
      about: user.about,
      role: user.role,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//@desc     Auth a user and get a token
//@route    POST /api/users/login
//@access   Public
export const userLogin = asyncHandler(async (req, res) => {
  //find a user based on email
  const { email, password } = req.body

  const user = await User.findOne({ email })

  //authenticate the user
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    //set the cookie expiration for 1 day
    res.cookie('t', token, { expire: new Date() + 86400 })

    //return response token with user to frontend client
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      history: user.history,
      about: user.about,
      token: token,
    })
  } else {
    res.status(404)
    throw new Error('Invalid email or password')
  }
})

//@desc     Log out a user
//@route    GET /api/users/logout
//@access   Public
export const userLogout = asyncHandler(async (req, res) => {
  res.clearCookie('t')
  res.json({ message: 'Logout success' })
})

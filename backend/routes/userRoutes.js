import express from 'express'
import {
  registerUser,
  userLogin,
  userLogout,
} from '../controllers/userControllers.js'
import { userSignupValidator } from '../middlewares/userValidatorMiddleware.js'

const router = express.Router()

router.route('/').post(userSignupValidator, registerUser)
router.route('/login').post(userLogin)
router.route('/logout').get(userLogout)

export default router

import express from 'express'
import {
  getAllUsers,
  getUserById,
  userLogin,
  userRegister,
} from '../controllers/userControllers.js'
import { userSignupValidator } from '../middlewares/userValidatorMiddleware.js'
import { isAuth, isAdmin } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router
  .route('/')
  .post(userSignupValidator, userRegister)
  .get(isAuth, isAdmin, getAllUsers)
router.route('/login').post(userLogin)
router.route('/:id').get(isAuth, isAdmin, getUserById)

export default router

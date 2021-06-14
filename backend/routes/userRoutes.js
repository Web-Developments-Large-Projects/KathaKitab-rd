import express from 'express'
import { hello } from '../controllers/userControllers.js'

const router = express.Router()

router.get('/', hello)

export default router

import express from 'express'
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
} from '../controllers/categoryControllers.js'
const router = express.Router()

router.route('/').post(createCategory).get(getAllCategories)
router
  .route('/:id')
  .get(getCategoryById)
  .put(updateCategoryById)
  .delete(deleteCategoryById)

export default router

import express from 'express'
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductImageById,
  updateProductById,
  deleteProductById,
} from '../controllers/productControllers.js'
const router = express.Router()

router.route('/').post(createProduct).get(getAllProducts)
router
  .route('/:id')
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProductById)
router.route('/:id/image').get(getProductImageById)

export default router

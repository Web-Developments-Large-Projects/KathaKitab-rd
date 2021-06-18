import express from 'express'
import {
  createProduct,
  getAllProducts,
  getProductsBySell,
  getRelatedProductsById,
  getProductsCategories,
  getProductsbySearch,
  getProductById,
  getProductImageById,
  updateProductById,
  deleteProductById,
} from '../controllers/productControllers.js'
const router = express.Router()

router.route('/').post(createProduct).get(getAllProducts)
router.route('/by-sell').get(getProductsBySell)
router.route('/categories').get(getProductsCategories)
router.route('/search').post(getProductsbySearch)

router
  .route('/:id')
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProductById)
router.route('/:id/image').get(getProductImageById)
router.route('/:id/related').get(getRelatedProductsById)

export default router

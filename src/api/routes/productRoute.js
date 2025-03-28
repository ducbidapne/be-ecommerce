import express from 'express'
const productRoutes = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

productRoutes.route('/').get(getProducts).post(protect, admin, upload.array("image", 5),createProduct)
productRoutes.route('/:id/reviews').post(protect, createProductReview)
productRoutes.get('/top', getTopProducts)
productRoutes
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, upload.array("image", 5),updateProduct)

export default productRoutes

import express from "express";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
import {
  getAllProducts,
  getProductById,
  getProductBySlug,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
} from "../controllers/product.controller.js";
import {
  authenticateUser,
  authorizeAdmin,
} from "../controllers/user.controller.js";
const productRoutes = express.Router();

productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProductById);
productRoutes.get("/slug/:slug", getProductBySlug);
productRoutes.get("/categories", getCategories);
productRoutes.post(
  "/",
  authenticateUser,
  authorizeAdmin,
  upload.array("images", 5),
  createProduct
);

productRoutes.put(
  "/:id",
  authenticateUser,
  authorizeAdmin,
  upload.array("images", 5),
  updateProduct
);
productRoutes.delete("/:id", authenticateUser, authorizeAdmin, deleteProduct);
productRoutes.post("/:id/reviews", authenticateUser, createReview);

export default productRoutes;

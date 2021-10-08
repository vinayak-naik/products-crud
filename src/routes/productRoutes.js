import express from "express";
const router = express.Router();
import {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/productController";
import { protect, admin } from "../middleware/authMiddleware";

router.route("/").get(getProducts).post(createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(deleteProduct)
  .put(updateProduct);

export default router;

import express from "express";
const router = express.Router();
import {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/productController";
import { protect} from "../middleware/authMiddleware";

router.route("/").get(protect,getProducts).post(protect,createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect,deleteProduct)
  .put(protect,updateProduct);

export default router;

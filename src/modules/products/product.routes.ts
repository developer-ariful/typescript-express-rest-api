import { Router, type Request, type Response } from "express";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import {
  createProductSchema,
  productIdSchema,
  productQuerySchema,
  updateProductSchema,
} from "./product.schema.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "./product.controller.js";

const router = Router();

// POST /api/v1/products
router.post("/", validateRequest(createProductSchema), createProduct);

// GET /api/v1/products  [get all products]
router.get("/", validateRequest(productQuerySchema, "query"), getAllProducts);
// GET /api/v1/products/:id
router.get("/:id", validateRequest(productIdSchema, "params"), getProductById);

// PATCH /api/v1/products/:id
router.patch(
  "/:id",
  validateRequest(productIdSchema, "params"),
  validateRequest(updateProductSchema, "body"),
  updateProduct,
);

// DELETE /api/v1/products/:id
router.delete(
  "/:id",
  validateRequest(productIdSchema, "params"),
  deleteProduct,
);

export default router;

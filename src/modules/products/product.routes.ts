import { Router, type Request, type Response } from "express";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import {
  createProductSchema,
  productIdSchema,
  productQuerySchema,
  updateProductSchema,
} from "./product.schema.js";
import { createProduct } from "./product.controller.js";

const router = Router();

// POST /api/v1/products
router.post("/", validateRequest(createProductSchema), createProduct);

// GET /api/v1/products  [get all products]
router.get(
  "/",
  validateRequest(productQuerySchema, "query"),
  (req: Request, res: Response) => {
    const query = res.locals.validated.query;

    return res.json({
      success: true,
      message: "Product query is valid",
      data: query,
    });
  },
);
// GET /api/v1/products/:id
router.get(
  "/:id",
  validateRequest(productIdSchema, "params"),
  (req: Request, res: Response) => {
    return res.json({
      success: true,
      message: "Product ID is valid",
      data: res.locals.validated.params,
    });
  },
);

// PATCH /api/v1/products/:id
router.patch(
  "/:id",
  validateRequest(productIdSchema, "params"),
  validateRequest(updateProductSchema),
  (req: Request, res: Response) => {
    const { id } = res.locals.validated.params;
    const updateData = res.locals.validated.body;

    return res.json({
      success: true,
      message: "Product update request is valid",
      data: {
        id,
        updateData,
      },
    });
  },
);


export default router;

import type { Request, RequestHandler, Response } from "express";
import type { CreateProductInput } from "./product.schema.js";
import { sendSuccess } from "../../shared/utils/api-response.js";
import { productService } from "./product.service.js";

export const createProduct: RequestHandler = (_req: Request, res: Response) => {
  const productData = res.locals.validated.body as CreateProductInput;

  // Business logic handle by Service
  const product = productService.create(productData);

  // send API Response
  return sendSuccess(res, "product created successfully", product, 201);
};

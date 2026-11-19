import type { Request, RequestHandler, Response } from "express";
import type { CreateProductInput } from "./product.schema.js";
import { sendSuccess } from "../../shared/utils/api-response.js";
import { productService } from "./product.service.js";
import type { ProductUpdateData } from "./product.types.js";

export const createProduct: RequestHandler = (_req: Request, res: Response) => {
  const productData = res.locals.validated.body as CreateProductInput;

  // Business logic handle by Service
  const product = productService.create(productData);

  // send API Response
  return sendSuccess(res, "Product Created Successfully", product, 201);
};

export const getAllProduct: RequestHandler = (req: Request, res: Response) => {
  // Get All Product From Service
  const products = productService.findAll();

  return sendSuccess(res, "Product retrieved Successfully", products);
};

export const getProductById: RequestHandler = (_req, res) => {
  const { id } = res.locals.validated.params as { id: string };

  const product = productService.findById(id);

  return sendSuccess(res, "Product retrieved successfully", product);
};

export const updateProduct: RequestHandler = (_req, res) => {
  // Get Validate Data
  const { id } = res.locals.validated.params as { id: string };

  const productData = res.locals.validated.body as ProductUpdateData;

  // Update Product through Service
  const product = productService.update(id, productData);

  // Send response
  return sendSuccess(res, "Product updated successfully", product);
};

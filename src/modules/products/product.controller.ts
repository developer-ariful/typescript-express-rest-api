import type { Request, RequestHandler, Response } from "express";
import type { CreateProductInput } from "./product.schema.js";
import { sendSuccess } from "../../shared/utils/api-response.js";
import { productService } from "./product.service.js";
import type { ProductQuery, ProductUpdateData } from "./product.types.js";

export const createProduct: RequestHandler = (_req: Request, res: Response) => {
  const productData = res.locals.validated.body as CreateProductInput;

  // Business logic handle by Service
  const product = productService.create(productData);

  // send API Response
  return sendSuccess(res, "Product Created Successfully", product, 201);
};

export const getAllProducts: RequestHandler = (req: Request, res: Response) => {
  const query = res.locals.validated.query as ProductQuery;
  // Get All Product From Service
  const { products, total } = productService.findAllPaginated(query);
  // const products = productService.findAll();
  const totalPages = Math.ceil(total / query.limit);

  return sendSuccess(res, "Product retrieved Successfully", products, 200, {
    page: query.page,
    limit: query.limit,
    total,
    totalPages,
  });
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

export const deleteProduct: RequestHandler = (_req, res) => {
  const { id } = res.locals.validated.params as { id: string };

  // Delete Product through Service
  productService.delete(id);

  // Send Success response
  return sendSuccess(res, "Product deleted successfully", null);
};

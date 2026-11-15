import type { Request, RequestHandler, Response } from "express";
import type { CreateProductInput } from "./product.schema.js";
import { sendSuccess } from "../../shared/utils/api-response.js";
import {randomUUID} from "node:crypto"
import { buildProduct } from "./product.model.js";

export const createProduct: RequestHandler = (_req: Request, res: Response) => {
  const productData = res.locals.validated.body as CreateProductInput;

  // Temporary in-memory product
  const product = buildProduct(productData);

  return sendSuccess(res, "product created successfully", product, 201);
};

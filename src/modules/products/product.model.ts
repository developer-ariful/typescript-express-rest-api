import { randomUUID } from "node:crypto";
import type { CreateProductInput } from "./product.schema.js";
import type { Product } from "./product.types.js";

// Create a new Product
export function buildProduct(input: CreateProductInput): Product {
  const now = new Date().toISOString();

  const product: Product = {
    id: randomUUID(),
    ...input,
    createdAt: now,
    updatedAt: now,
  };

  return product;
}

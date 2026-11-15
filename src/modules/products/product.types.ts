import type {
  CreateProductInput,
  UpdateProductInput,
} from "./product.schema.js";

// Complete Product Type
export type Product = CreateProductInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

// Product Create Data
export type ProductCreateData = CreateProductInput;

// Product Update Data
export type ProductUpdateData = UpdateProductInput;

// Product Query Parameters
export interface ProductQuery {
  page: number;
  limit: number;
}

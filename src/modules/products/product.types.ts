import type {
  CreateProductInput,
  UpdateProductInput,
} from "./product.schema.js";

export type ProductSortBy = "price" | "name" | "createdAt";
export type ProductSortOrder = "asc" | "desc";

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
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: ProductSortBy;
  sortOrder?: ProductSortOrder;
}

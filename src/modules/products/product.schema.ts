import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name cannot exceed 100 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters"),
  price: z.number().positive("Price must be greater than 0"),

  stock: z
    .number()
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative"),
  category: z.string().trim().min(2, "Category must be at least 2 characters"),
});

// Product Update Schema
export const updateProductSchema = createProductSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message:"At least one field is required to update a product",
  });

// Product ID Schema
export const productIdSchema = z.object({
  id: z.string().uuid("Invalid product ID format"),
});

// Query Parameters Validation
export const productQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

// TypeScript Types
export type CreateProductInput = z.infer<typeof createProductSchema>;

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

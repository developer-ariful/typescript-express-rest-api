// - create() — নতুন Product সংরক্ষণ
// - findAll() — সব Product খুঁজে বের করা
// - findById() — ID দিয়ে Product খোঁজা
// - update() — Product পরিবর্তন করা
// - delete() — Product মুছে ফেলা

import type { Product, ProductUpdateData } from "./product.types.js";

// Repository Factory
export function createProductRepository() {
  const products = new Map<string, Product>();

  return {
    // Create Product
    create(product: Product): Product {
      products.set(product.id, product);

      return product;
    },

    // Get All Products
    findAll(): Product[] {
      return Array.from(products.values());
    },

    // Get Product By ID
    findById(id: string): Product | null {
      return products.get(id) ?? null;
    },

    // Update Product
    update(id: string, data: ProductUpdateData): Product | null {
      const existingProduct = products.get(id);

      if (!existingProduct) {
        return null;
      }

      const updatedProduct: Product = {
        ...existingProduct,
        ...(data.name !== undefined && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.stock !== undefined && { stock: data.stock }),
        ...(data.category !== undefined && { category: data.category }),
        updatedAt: new Date().toISOString(),
      };

      products.set(id, updatedProduct);

      return updatedProduct;
    },

    // Delete Products
    delete(id: string): boolean {
      return products.delete(id);
    },
  };
}

// Application Repository Instance
export const productRepository = createProductRepository();

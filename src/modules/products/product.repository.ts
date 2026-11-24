// - create() — নতুন Product সংরক্ষণ
// - findAll() — সব Product খুঁজে বের করা
// - findById() — ID দিয়ে Product খোঁজা
// - update() — Product পরিবর্তন করা
// - delete() — Product মুছে ফেলা

import type {
  Product,
  ProductQuery,
  ProductUpdateData,
} from "./product.types.js";

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
        ...(data.description !== undefined && {
          description: data.description,
        }),
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

    // Paginate
    findAllPaginated(query: ProductQuery) {
      const {
        page,
        limit,
        search,
        category,
        maxPrice,
        minPrice,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = query;

      // const skip = (page - 1) * limit;

      let filteredProducts = Array.from(products.values());
      // Search by product name
      if (search) {
        const searchTerm = search.toLocaleLowerCase();

        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchTerm),
        );
      }

      // Filter by category
      if (category) {
        const categoryTerm = category.toLowerCase();

        filteredProducts = filteredProducts.filter(
          (product) =>
            product.category.toLowerCase().toLowerCase() === categoryTerm,
        );
      }
      // filter  by minimum  price
      if (minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= minPrice,
        );
      }

      // filter by maximum price
      if (maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price <= maxPrice,
        );
      }

      // Sort Products
      filteredProducts.sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
          case "price":
            comparison = a.price - b.price;
            break;

          case "name":
            comparison = a.name.localeCompare(b.name);
            break;

          case "createdAt":
            comparison =
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            break;
        }
        return sortOrder === "asc" ? comparison : -comparison;
      });

      // Calculate total before pagination
      const total = filteredProducts.length;

      // apply pagination
      const skip = (page - 1) * limit;

      const paginatedProducts = filteredProducts.slice(skip, skip + limit);

      return {
        products: paginatedProducts,
        total,
      };
    },
  };
}

// Application Repository Instance
export const productRepository = createProductRepository();

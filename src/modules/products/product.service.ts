import { AppError } from "../../shared/errors/app-error.js";
import { buildProduct } from "./product.model.js";
import {
  productRepository,
  createProductRepository,
} from "./product.repository.js";
import type { ProductCreateData, ProductQuery, ProductUpdateData } from "./product.types.js";

// Repository type - allows us to inject a separate repository in tests
type ProductRepository = ReturnType<typeof createProductRepository>;

export function createProductService(
  repository: ProductRepository = productRepository,
) {
  return {
    // Create Product
    create(data: ProductCreateData) {
      const product = buildProduct(data);
      return repository.create(product);
    },

    // GET All Products
    findAll() {
      return repository.findAll();
    },

    // GET Single Product
    findById(id: string) {
      const product = repository.findById(id);

      if (!product) {
        throw new AppError("Product not found", 404, "PRODUCT_NOT_FOUND");
      }
      return product;
    },

    // Update Product
    update(id: string, data: ProductUpdateData) {
      const product = repository.update(id, data);

      if (!product) {
        throw new AppError("Product not found", 404, "PRODUCT_NOT_FOUND");
      }

      return product;
    },

    // Delete Product
    delete(id: string) {
      const isDeleted = repository.delete(id);

      if (!isDeleted) {
        throw new AppError("Product not found", 404, "PRODUCT_NOT_FOUND");
      }

      return true;
    },


    //  Paginate product list
    findAllPaginated(query: ProductQuery){
      return repository.findAllPaginated(query);
    }
  };
}

export const productService = createProductService();

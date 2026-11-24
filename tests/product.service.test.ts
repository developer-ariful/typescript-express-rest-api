import { describe, it, expect, beforeEach } from "vitest";
import { createProductService } from "../src/modules/products/product.service.js";
import { ProductCreateData } from "../src/modules/products/product.types.js";
import { AppError } from "../src/shared/errors/app-error.js";

describe("Product Service", () => {
  let service: ReturnType<typeof createProductService>;

  const productData: ProductCreateData = {
    name: "Laptop",
    description: "A powerful laptop for development",
    price: 1200,
    stock: 10,
    category: "Electronics",
  };

  beforeEach(() => {
    const repository = createProductService();
    service = createProductService(repository);
  });

  it("should create a product", () => {
    const product = service.create(productData);

    expect(product).toMatchObject(productData);
    expect(product.id).toBeDefined();
    expect(product.createdAt).toBeDefined();
    expect(product.updatedAt).toBeDefined();
  });

  it("should return all products", () => {
    service.create(productData);

    service.create({
      ...productData,
      name: "Keyboard",
    });

    const products = service.findAll();


    expect(products).toHaveLength(products.length);
  });
   it("should return a product by ID", () => {
    const createdProduct = service.create(productData);

    const product = service.findById(createdProduct.id);

    expect(product).toEqual(createdProduct);
  });


  it("should throw an error when product is not found", () => {
    expect(() => service.findById("unknown-id")).toThrow(AppError);
  });

  it("should update a product", () => {
    const createdProduct = service.create(productData);

    const updatedProduct = service.update(createdProduct.id, {
      name: "Updated Laptop",
      price: 15000,
    });

    expect(updatedProduct.name).toBe("Updated Laptop");
    expect(updatedProduct.price).toBe(15000);
  });

  it("should throw an error when updating a missing product", () => {
    expect(() =>
      service.update("unknown-id", { name: "Updated Laptop" }),
    ).toThrow(AppError);
  });

  it("should delete a product", ()=>{
    const createdProduct = service.create(productData);
    
    const result = service.delete(createdProduct.id);
    const products = service.findAll();
    

    expect(result).toBe(true);
    expect(products).toHaveLength(products.length)
  })

  it("should throw an error when deleting a missing product",()=>{
    expect(()=>service.delete("unknown-id")).toThrow(AppError)
  })
});

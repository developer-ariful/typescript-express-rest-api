import { describe, it, expect, beforeEach } from "vitest";

import { createProductRepository } from "../src/modules/products/product.repository.js";
import { Product } from "../src/modules/products/product.types";
import { buildProduct } from "../src/modules/products/product.model.js";

describe("Product Repository", () => {
  let repository: ReturnType<typeof createProductRepository>;
  let product: Product;

  beforeEach(() => {
    repository = createProductRepository();

    product = buildProduct({
      name: "Laptop",
      description: "A powerful development laptop",
      price: 75000,
      stock: 10,
      category: "Electronics",
    });
  });

  it("should create a product", () => {
    const result = repository.create(product);

    expect(result).toEqual(product);
    expect(repository.findById(product.id)).toEqual(product);
  });

  it("should return all products", () => {
    const secondProduct = buildProduct({
      name: "Keyboard",
      description: "A mechanical computer keyboard",
      price: 2500,
      stock: 20,
      category: "Accessories",
    });

    repository.create(product);
    repository.create(secondProduct);
    expect(repository.findAll()).toHaveLength(2);
  });

  it("should find a product by ID", () => {
    repository.create(product);
    expect(repository.findById(product.id)).toEqual(product);
  });

  it("should return null for  an unknown product ID", () => {
    expect(repository.findById("unknown-id")).toBeNull();
  });

  it("should update an existing product", () => {
    repository.create(product);
    
    const updateProduct = repository.update(product.id, {
      price: 800000,
      stock: 5,
    });

    expect(updateProduct?.price).toBe(800000);
    expect(updateProduct?.stock).toBe(5);
    expect(updateProduct?.name).toBe("Laptop");
  });

  it("should return null when updating an unknown product", () => {
    const result = repository.update("unknown-id", {
      price: 80000,
    });

    expect(result).toBeNull();
  });

  it("should delete an existing product", () => {
    repository.create(product);

    const result = repository.delete(product.id);

    expect(result).toBe(true);
    expect(repository.findById(product.id)).toBeNull();
  });

  it("should return false when deleting an unknown product", ()=>{
    expect(repository.delete("unknown-id")).toBe(false)
  })
});



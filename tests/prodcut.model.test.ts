import { describe, expect, it } from "vitest";
import { buildProduct } from "../src/modules/products/product.model.js";

describe("Product Model", () => {
  it("should create a product with generate fields", () => {
    const input = {
      name: "Laptop",
      description: "A powerful development laptop",
      price: 75000,
      stock: 10,
      category: "Electronics",
    };

    const product = buildProduct(input);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Laptop");
    expect(product.price).toBe(75000);
    expect(product.stock).toBe(10);

    expect(product.createdAt).toBeDefined();
    expect(product.updatedAt).toBeDefined();

    expect(product.createdAt).toBe(product.updatedAt);
  });

  it("should generate unique IDs for different product", () => {
    const input = {
      name: "Laptop",
      description: "A powerful development laptop",
      price: 75000,
      stock: 10,
      category: "Electronics",
    };

    const productOne = buildProduct(input);
    const productTwo = buildProduct(input);

    expect(productOne.id).not.toBe(productTwo.id);
  });
});

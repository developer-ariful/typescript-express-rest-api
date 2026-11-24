import { describe, it, expect } from "vitest";

import request from "supertest";

import app from "../src/app.js";
import { Product } from "../src/modules/products/product.types";

describe("GET /api/v1/products?sortBy=price&sortOrder=asc", async () => {
  const products = [
    {
      name: "Samsung Galaxy Phone",
      description: "Samsung smartphone product",
      price: 1500,
      stock: 10,
      category: "Electronics",
    },
    {
      name: "Wireless Mouse",
      description: "Wireless computer mouse",
      price: 800,
      stock: 20,
      category: "Electronics",
    },
    {
      name: "Cotton Shirt",
      description: "Comfortable cotton shirt",
      price: 500,
      stock: 30,
      category: "Fashion",
    },
    {
      name: "iPhone Pro",
      description: "Apple premium smartphone",
      price: 3000,
      stock: 5,
      category: "Electronics",
    },
  ];

  for (const product of products) {
    await request(app).post("/api/v1/products").send(product).expect(201);
  }

  it("should return product with price ascending order", async () => {
    // Get Product- Test -1
    const response = await request(app).get(
      "/api/v1/products?sortBy=price&sortOrder=asc",
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    const productsName = response.body.data.map(
      (product: Product) => product.name,
    );

    expect(productsName).toEqual([
      "Cotton Shirt",
      "Wireless Mouse",
      "Samsung Galaxy Phone",
      "iPhone Pro",
    ]);
  });

  // Get Product -Test -2

  it("should return product with price descending order", async () => {
    const response = await request(app).get(
      "/api/v1/products?sortBy=price&sortOrder=desc",
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    const productsName = response.body.data.map(
      (product: Product) => product.name,
    );

    expect(productsName).toEqual([
      "iPhone Pro",
      "Samsung Galaxy Phone",
      "Wireless Mouse",
      "Cotton Shirt",
    ]);
  });

  // Get Product - Test-3

  it("should return product with name ascending order", async () => {
    const response = await request(app).get(
      "/api/v1/products?sortBy=name&sortOrder=asc",
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    const productsName = response.body.data.map(
      (product: Product) => product.name,
    );

    expect(productsName).toEqual([
      "Cotton Shirt",
      "iPhone Pro",
      "Samsung Galaxy Phone",
      "Wireless Mouse",
    ]);
  });

  // Get product - Test-4

  it("should return product with name descending order", async () => {
    const response = await request(app).get(
      "/api/v1/products?sortBy=name&sortOrder=desc",
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    const productsName = response.body.data.map(
      (product: Product) => product.name,
    );

    expect(productsName).toEqual([
      "Wireless Mouse",
      "Samsung Galaxy Phone",
      "iPhone Pro",
      "Cotton Shirt",
    ]);
  });

  // Get Product - Test -5

  it("should return product combine search + Filter +Sort + Pagination", async () => {
    const response = await request(app).get(
      "/api/v1/products?category=electronics&minPrice=700&sortBy=price&sortOrder=asc&page=1&limit=2",
    );

    const productsName = response.body.data.map(
      (product: Product) => product.name,
    );

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(2);

    expect(productsName).toEqual(["Wireless Mouse", "Samsung Galaxy Phone"]);

    expect(response.body.meta.total).toBe(3);
    expect(response.body.meta.totalPages).toBe(2);
  });

  // Get Product - Test-6
  it("should reject for invalid sorBy", async () => {
    const response = await request(app).get("/api/v1/products?sortBy=rating");

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  // Get Product - Test-7
  it("should reject for invalid sortOrder", async () => {
    const response = await request(app).get(
      "/api/v1/products?sortOrder=random",
    );

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });
});

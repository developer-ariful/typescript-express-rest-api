import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Product Pagination API", () => {
  it("should return paginated products with default query", async () => {
    const products = [
      {
        name: "Product One",
        description: "This is product one description",
        price: 100,
        stock: 10,
        category: "Electronics",
      },
      {
        name: "Product Two",
        description: "This is product two description",
        price: 200,
        stock: 20,
        category: "Electronics",
      },
      {
        name: "Product Three",
        description: "This is product three description",
        price: 300,
        stock: 30,
        category: "Electronics",
      },
    ];

    for (const product of products) {
      await request(app).post("/api/v1/products").send(product).expect(201);
    }

    const response = await request(app).get("/api/v1/products").expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(3);

    expect(response.body.meta).toEqual({
      page: 1,
      limit: 10,
      total: 3,
      totalPages: 1,
    });
  });

  it("should return products according to page and limit", async () => {
    const response = await request(app)
      .get("/api/v1/products?page=2&limit=2")
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);

    expect(response.body.meta).toEqual({
      page: 2,
      limit: 2,
      total: 3,
      totalPages: 2,
    });
  });

  it("should reject invalid page and limit", async () => {
    const response = request(app)
      .get("/api/v1/products?page=-1&limit=200")
      .expect(400);

    expect((await response).body.success).toBe(false);
    expect((await response).body.error.code).toBe("VALIDATION_ERROR");
  });
});

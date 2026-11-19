import { describe, it, expect } from "vitest";

import request from "supertest";

import app from "../src/app";

describe("GET /api/v1/products/:id", () => {
  it("should return a product by ID", async () => {
    // Create product
    const createResponse = await request(app).post("/api/v1/products").send({
      name: "Mechanical Keyboard",
      description: "RGB Mechanical Keyboard for developers",
      price: 85,
      stock: 25,
      category: "Electronics",
    });

    const productId = createResponse.body.data.id;

    // Get Product by ID
    const response = await request(app).get("/api/v1/products/" + productId);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("Product retrieved successfully");

    expect(response.body.data.id).toBe(productId);
    expect(response.body.data.name).toBe("Mechanical Keyboard");
  });

  it("should be return 404 when product does not exist", async () => {
    // Valid UUID, but not matching product exists
    const response = await request(app).get(
      "/api/v1/products/550e8400-e29b-41d4-a716-446655440000",
    );

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);

    expect(response.body.error.code).toBe("PRODUCT_NOT_FOUND");
    expect(response.body.message).toBe("Product not found");
  });

  it("should be return 400 for invalid product ID", async()=>{
    const response = await request(app).get("/api/v1/products/invalid-id")

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  })
});

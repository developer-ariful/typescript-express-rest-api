import { describe, it, expect } from "vitest";
import supertest from "supertest";

import app from "../src/app";

describe("PATCH /api/v1/products/:id", () => {
  it("should update a product successfully", async () => {
    // Create Product
    const createResponse = await supertest(app).post(`/api/v1/products`).send({
      name: "Mechanical Keyboard",
      description: "RGB Mechanical Keyboard for developers",
      price: 85,
      stock: 25,
      category: "Electronics",
    });

    const productId = createResponse.body.data.id;
    const originalCreatedAt = createResponse.body.data.createdAt;

    // update product
    const response = await supertest(app)
      .patch(`/api/v1/products/${productId}`)
      .send({
        price: 95,
        stock: 20,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("Product updated successfully");
  });

  it("should return 404 when product does not exist", async () => {
    const response = await supertest(app)
      .patch(`/api/v1/products/550e8400-e29b-41d4-a716-446655440000`)
      .send({
        price: 95,
      });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("PRODUCT_NOT_FOUND");
    expect(response.body.message).toBe("Product not found");
  });

  it("should return 400 when update body is empty", async () => {
    const createdResponse = await supertest(app)
      .post(`/api/v1/products/`)
      .send({
        name: "Mechanical Keyboard",
        description: "RGB Mechanical Keyboard for developers",
        price: 85,
        stock: 25,
        category: "Electronics",
      });

    const productId = createdResponse.body.data.id;

    const response = await supertest(app)
      .patch(`/api/v1/products/${productId}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("should return 400 when update data is invalid", async () => {
    const createResponse = await supertest(app).post(`/api/v1/products/`).send({
      name: "Mechanical Keyboard",
      description: "RGB Mechanical Keyboard for developers",
      price: 85,
      stock: 25,
      category: "Electronics",
    });

    const productId = createResponse.body.data.id;

    const response = await supertest(app)
    .patch(`/api/v1/products/${productId}`)
    .send({
        price: -10
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");

  });

  it("should return return 400 when product ID is invalid", async()=>{
    const response = await supertest(app)
    .patch(`/api/v1/products/invalid-id`)
    .send({
        price: 95
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("VALIDATION_ERROR")
  })
});

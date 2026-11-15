import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../src/app";

describe("Product Request Validation", () => {
  it("should create a product with valid data", async () => {
    const response = await request(app).post("/api/v1/products").send({
      name: "Laptop",
      description: "A powerful development laptop",
      price: 75000,
      stock: 10,
      category: "Electronics",
    });
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe("Laptop");
  });

  it("should reject invalid product data", async () => {
    const response = await request(app).post("/api/v1/products").send({
      name: "A",
      description: "short",
      price: -500,
      stock: -5,
      category: "X",
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("should reject an invalid product ID", async () => {
    const response = await request(app).get("/api/v1/products/invalid-id");

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("should validate and coerce pagination query", async () => {
    const response = await request(app).get("/api/v1/products?page=2&limit=20");

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual({ page: 2, limit: 20 });
  });

  it("should reject an invalid pagination query", async () => {
    const response = await request(app).get(
      "/api/v1/products?page=-1&limit=200",
    );

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });
});

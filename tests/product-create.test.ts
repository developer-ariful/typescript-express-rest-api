import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../src/app.js";

describe("POST /api/v1/products", () => {
  it("should create a product successfully", async () => {
    const response = await request(app).post("/api/v1/products").send({
      name: "Mechanical Keyboard",
      description: "RGB Mechanical Keyboard for developers",
      price: 85,
      stock: 25,
      category: "Electronics",
    });

    expect(response.status).toBe(201);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Product Created Successfully");

    expect(response.body.data).toMatchObject({
      name: "Mechanical Keyboard",
      description: "RGB Mechanical Keyboard for developers",
      price: 85,
      stock: 25,
      category: "Electronics",
    });

    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.createdAt).toBeDefined();
    expect(response.body.data.updatedAt).toBeDefined();
  });
});

import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../src/app";

describe("DELETE /api/v1/products/:id", () => {
  it("should delete a product successfully", async () => {
    // create a product
    const createdProduct = await request(app)
      .post("/api/v1/products")
      .send({
        name: "Mechanical Keyboard",
        description: "RGB Mechanical Keyboard for developers",
        price: 85,
        stock: 25,
        category: "Electronics",
      });

      const productId = createdProduct.body.data.id;

      // delete product
      const response = await request(app)
      .delete(`/api/v1/products/${productId}`)

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      expect(response.body.message).toBe("Product deleted successfully");

      expect(response.body.data).toBeNull();

      // Verify product is deleted
      const getResponse = await request(app)
      .get(`/api/v1/products/${productId}`);

      expect(getResponse.status).toBe(404);
      expect(getResponse.body.error.code).toBe("PRODUCT_NOT_FOUND");
  });

  it("should return 404 when product does not exist", async()=>{
    const response = await request(app)
    .delete("/api/v1/products/550e8400-e29b-41d4-a716-446655440000");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    
    expect(response.body.error.code).toBe("PRODUCT_NOT_FOUND");
    expect(response.body.message).toBe("Product not found");
  })

  it("should return 400 when product ID is invalid", async()=>{
    const response = await request(app)
    .delete("/api/v1/products/invalid-id");

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);

    expect(response.body.error.code).toBe("VALIDATION_ERROR")
  })
});

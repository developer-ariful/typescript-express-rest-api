import { describe, expect, it } from "vitest";
import app from "../src/app";
import request from "supertest";

describe("GET /api/v1/products", () => {
  it("should return all products", async () => {
    // Create First prodcut
    await request(app).post("/api/v1/products").send({
      name: "Mechanical Keyboard",
      description: "RGB Mechanical Keyboard for developers",
      price: 85,
      stock: 25,
      category: "Electronics",
    });

    // Create Second Product
    await request(app).post("/api/v1/products").send({
      name: "Gaming Mouse",
      description: "High precision gaming mouse",
      price: 50,
      stock: 15,
      category: "Electronics",
    });

    // Get all prodcuts
    const response = await request(app).get("/api/v1/products");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Product retrieved Successfully");

    expect(response.body.data).toHaveLength(2);

    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Mechanical Keyboard",
        }),
        expect.objectContaining({
          name: "Gaming Mouse",
        }),
      ]),
    );
  });
});

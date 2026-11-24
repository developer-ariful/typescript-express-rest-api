import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../src/app.js";

describe("Product Search & Filter API", () => {
  it("should search, filter, and paginate products", async () => {
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

    // Search by product name
    const searchResponse = await request(app)
      .get("/api/v1/products?search=phone")
      .expect(200);

    expect(searchResponse.body.data).toHaveLength(2);

    // Filter by category
    const categoryResponse = await request(app)
      .get("/api/v1/products?category=electronics")
      .expect(200);

    expect(categoryResponse.body.data).toHaveLength(3);

    // Filter by price rand
    const priceResponse = await request(app)
      .get("/api/v1/products?minPrice=700&maxPrice=2000")
      .expect(200);

    // Search + Category + Price + Pagination
    const combinedResponse = await request(app)
      .get(
        "/api/v1/products?search=phone&category=electronics&minPrice=1000&maxPrice=4000&page=2&limit=1",
      )
      .expect(200);

    expect(combinedResponse.body.success).toBe(true);
    expect(combinedResponse.body.data).toHaveLength(1);

    expect(combinedResponse.body.data[0].name).toBe("iPhone Pro");

    expect(combinedResponse.body.meta).toEqual({
      page: 2,
      limit: 1,
      total: 2,
      totalPages: 2,
    });
  });

  it("should reject invalid price range", async () => {
    const response = await request(app)
      .get("/api/v1/products?minPrice=2000&maxPrice=500")
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("should reject negative price values", async () => {
    const response = await request(app)
      .get("/api/v1/products?minPrice=-100")
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });
});

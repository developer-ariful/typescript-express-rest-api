import request from "supertest";
import app from "../src/app.js";
import { expect, it } from "vitest";

async function createProduct(name: string, price: number, category: string) {
  const response = await request(app)
    .post("/api/v1/products")
    .send({
      name,
      description: `Description for ${name}`,
      price,
      stock: 10,
      category,
    });

  expect(response.status).toBe(201);

  return response.body.data;
}
// 3 . Empty Search Result Test
it("should return an empty array when no products match the search", async () => {
  const response = await request(app).get(
    "/api/v1/products?search=nonexistent-product-xyz",
  );

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.data);

  expect(response.body.meta).toMatchObject({
    total: 0,
    totalPages: 0,
  });
});
// 4. Empty Pagination Page Test
it("should return an empty array when requested page has no products", async () => {
  const category = "EdgePagination";

  await createProduct("Pagination One", 100, category);
  await createProduct("Pagination Two", 200, category);

  const response = await request(app).get(
    `/api/v1/products?category=${category}&page=2&limit=2`,
  );

  expect(response.status).toBe(200);
  expect(response.body.data).toEqual([]);

  expect(response.body.meta).toMatchObject({
    page: 2,
    limit: 2,
    total: 2,
    totalPages: 1,
  });
});
// 5. Price Boundary Test
it("should include products at minimum and maximum price boundaries", async () => {
  const category = "EdgeBoundary";

  await createProduct("Boundary Low", 100, category);
  await createProduct("Boundary Middle", 200, category);
  await createProduct("Boundary High", 201, category);

  const response = await request(app).get(
    `/api/v1/products?category=${category}&minPrice=100&maxPrice=200`,
  );

  expect(response.status).toBe(200);

  expect(
    response.body.data.map((product: { name: string }) => product.name),
  ).toEqual(["Boundary Low", "Boundary Middle"]);

  expect(response.body.meta.total).toBe(2);
});

// 6. Identical Price Sorting Test


it("should preserve insertion order when products have identical prices", async () => {
  const category = "EdgeSamePrice";

  await createProduct("Price Alpha", 500, category);
  await createProduct("Price Beta", 500, category);

  const response = await request(app).get(
    `/api/v1/products?category=${category}&sortBy=price&sortOrder=asc`,
  );

  expect(response.status).toBe(200);

  expect(response.body.data.map((product: { name: string }) => product.name))
    .toEqual(["Price Alpha", "Price Beta"]);
});

// 7 Identical Name Sorting Test

it("should preserve insertion order when products have identical names", async () => {
  const category = "EdgeSameName";

  await createProduct("Duplicate Name Item", 300, category);
  await createProduct("Duplicate Name Item", 100, category);

  const response = await request(app).get(
    `/api/v1/products?category=${category}&sortBy=name&sortOrder=asc`,
  );

  expect(response.status).toBe(200);
  expect(
    response.body.data.map((product: { price: number }) => product.price),
  ).toEqual([300, 100]);
});

// 8. Default sorting test
it("should sort products by newest first by default", async () => {
  const category = "EdgeDefaultSort";

  await createProduct("Older Product", 100, category);

  // Ensure the next product gets a later createdAt timestamp
  await new Promise((resolve) => setTimeout(resolve, 15));

  await createProduct("Newer Product", 200, category);

  const response = await request(app).get(
    `/api/v1/products?category=${category}`,
  );

  expect(response.status).toBe(200);

  expect(
    response.body.data.map((product: { name: string }) => product.name)
  ).toEqual(["Older Product", "Newer Product"]);
});


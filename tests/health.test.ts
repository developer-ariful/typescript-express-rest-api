import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Health API", () => {
  it("should return a standard success response", async () => {
    const response = await request(app).get("/api/v1/health");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      success: true,
      message: "API is running",
      data: {
        status: "healthy",
      },
    });
  });

  it("should return a standard error response for an unknown route", async () => {
    const response = await request(app).get("/api/v1/unknown");

    expect(response.status).toBe(404);

    expect(response.body.success).toBe(false);

    expect(response.body.error.code).toBe("NOT_FOUND");
  });
});

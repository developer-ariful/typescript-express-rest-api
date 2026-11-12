import { Router } from "express";
import type { NextFunction, Request, Response } from "express";
import { AppError } from "../../shared/errors/app-error.js";

const router = Router();

// GET /api/v1/health
router.get("/", (_req: Request, res: Response, _next: NextFunction) => {
  return res.status(200).json({
    success: true,
    message: "API is running",
    data: {
      status: "healthy",
    },
  });
});

// Temporary Error Testing route
router.get("/error", (_req: Request, _res: Response) => {
  throw new AppError("Product not found", 404, "NOT_FOUND");
});

router.get("/async-error", async (_req: Request, res: Response) => {
  await Promise.resolve();

  throw new AppError(
    "Something went wrong in async operation",
    400,
    "ASYNC_OPERATION_FAILED",
  );
});

export default router;

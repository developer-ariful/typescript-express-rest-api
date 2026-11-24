import { Router } from "express";
import type { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../../shared/utils/api-response.js";

const router = Router();

// GET /api/v1/health
router.get("/", (_req: Request, res: Response, _next: NextFunction) => {
  return sendSuccess(res, "API is running", { status: "healthy" });
});


export default router;

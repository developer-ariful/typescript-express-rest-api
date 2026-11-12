import type { NextFunction, Request, RequestHandler, Response } from "express";
import { AppError } from "../shared/errors/app-error.js";

export const notFoundMiddleware: RequestHandler = (_req: Request, _res: Response, next: NextFunction) => {
    next(
        new AppError(
            "API endpoint not found",
            404,
            "NOT_FOUND"
        )
    )
}
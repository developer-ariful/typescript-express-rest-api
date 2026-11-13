import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { AppError } from "../shared/errors/app-error.js";
import { sendError } from "../shared/utils/api-response.js";

export const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Response header  already sent by the server
 // Delegate the error to the next error handler

  if (res.headersSent) {
    return next(err);
  }

  // Known application error

  if (err instanceof AppError) {
    return sendError(res, err.message, err.code, err.statusCode);
  }

  // Unknown /unexpected error
  console.error("Unexpected error:", err);

  return sendError(res, "Internal Server Error", "INTERNAL_SERVER_ERROR", 500);
};

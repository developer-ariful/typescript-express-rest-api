import type { Response } from "express";
import type {
  ErrorResponse,
  PaginationMeta,
  SuccessResponse,
} from "../types/api-response.type.js";

// Success Response
export function sendSuccess<T>(
  res: Response,
  message: string,
  data: T,
  statusCode = 200,
  meta?: PaginationMeta,
) {
  const response: SuccessResponse<T> = {
    success: true,
    message,
    data,
    ...(meta && { meta }),
  };

  return res.status(statusCode).json(response);
}

// Error Response
export function sendError(
  res: Response,
  message: string,
  code: string,
  statusCode = 400,
) {
  const response: ErrorResponse = {
    success: false,
    message,
    error: {
      code,
    },
  };

  return res.status(statusCode).json(response);
}

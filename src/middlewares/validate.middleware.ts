import type { NextFunction, Request, RequestHandler, Response } from "express";
import  { z } from "zod";
import { sendError } from "../shared/utils/api-response.js";

type RequestSource = "body" | "params" | "query";

export const validateRequest = (
  schema: z.ZodType,
  source: RequestSource = "body",
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const errorMessage = result.error.issues
        .map((issue) => {
          const field = issue.path.join(".");
          return `${field}: ${issue.message}`;
        })
        .join("; ");

      return sendError(res, errorMessage, "VALIDATION_ERROR", 400);
    }

    // Store validated and parsed data
    res.locals.validated = {
      ...(res.locals.validated ?? {}),
      [source]: result.data,
    };
    next();
  };
};

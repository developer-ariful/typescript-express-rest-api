import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AppError } from "../shared/errors/app-error.js";


export const errorMiddleware: ErrorRequestHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {

    // Response header  already sent by the server
    // Express default error handler will not be called

    if(res.headersSent){
        return next(err);
    }

    // Known application error

    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error:{
                code: err.code,
            }
        })
    }

    // Unknown /unexpected error
    console.error("Unexpected error:", err);

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error:{
            code: "INTERNAL_SERVER_ERROR",
        }
    })
}
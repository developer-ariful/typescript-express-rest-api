import express, { type Express } from "express";
import healthRouter from "./modules/health/health.routes.js";
import { env } from "./config/env.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app: Express = express();

// Global Middleware
app.use(express.json());

// API Routes
app.use(`${env.API_PREFIX}/health`, healthRouter);

// Not Found Middleware
app.use(notFoundMiddleware)

//Centralized Error Middleware
app.use(errorMiddleware)

export default app;

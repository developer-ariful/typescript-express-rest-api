import express, { type Express } from "express";
import healthRouter from "./modules/health/health.routes.js";
import { env } from "./config/env.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import productsRouter from "./modules/products/product.routes.js";

const app: Express = express();

// Disable Express information header
app.disable("x-powered-by");

// Security Middleware
app.use(helmet());

// CORS Configuration
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);
// HTTP Request Logging
app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));

// Body Parsing Middleware
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use(`${env.API_PREFIX}/health`, healthRouter); // Health Check Route
app.use(`${env.API_PREFIX}/products`, productsRouter); // Product Route

// Not Found Middleware
app.use(notFoundMiddleware);

//Centralized Error Middleware
app.use(errorMiddleware);

export default app;

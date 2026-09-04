import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: Env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(
  express.json({
    limit: "1mb",
  }),
);

// Import Routes

import authRouter from "./modules/auth/auth.routes.js";

app.use("/api/auth", authRouter);

// Import Error Handler Middleware

import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { Env } from "./config/env.js";

app.use(errorHandler);

export default app;

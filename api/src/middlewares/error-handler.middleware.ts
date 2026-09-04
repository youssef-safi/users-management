import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../shared/errors/errors.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    const details = err.issues.map((iss) => ({
      field: iss.path.join("."),
      message: iss.message,
    }));

    return res.status(400).json({
      code: "VALIDATION_ERROR",
      message: "Validation failed",
      details,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      code: err.errorCode,
      message: err.message,
      details: err.details,
    });
  }

  console.error(err);

  return res.status(500).json({
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal server error.",
  });
};

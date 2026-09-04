import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

export type RequestSchemas = {
  bodySchema?: ZodType;
  querySchema?: ZodType;
  paramsSchema?: ZodType;
};

export const validate =
  (schemas: RequestSchemas) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.validated = {};

      if (schemas.bodySchema) {
        req.validated.body = schemas.bodySchema.parse(req.body);
      }

      if (schemas.querySchema) {
        req.validated.query = schemas.querySchema.parse(req.query);
      }

      if (schemas.paramsSchema) {
        req.validated.params = schemas.paramsSchema.parse(req.params);
      }

      return next();
    } catch (err) {
      return next(err);
    }
  };

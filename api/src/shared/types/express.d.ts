import "express-serve-static-core";
import { AuthenticatedUser } from "@/modules/auth/auth.types";

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthenticatedUser;

    validated?: {
      body?: unknown;
      query?: unknown;
      params?: unknown;
    };
  }
}

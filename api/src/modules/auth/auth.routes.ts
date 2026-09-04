import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { RegisterUserInputSchema } from "./auth.schemas.js";
import { authController } from "../../container.js";

const router = Router();

router.post(
  "/register",
  validate({
    bodySchema: RegisterUserInputSchema,
  }),
  authController.register,
);

export default router;

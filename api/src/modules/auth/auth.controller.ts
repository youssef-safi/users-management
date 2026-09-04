import type { Request, Response } from "express";
import type { AuthService } from "./auth.service.js";
import type { RegisterUserInput } from "./auth.schemas.js";
import { HttpResponse } from "../../shared/http/http-responses.js";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const input = req.validated!.body as RegisterUserInput;

    const user = await this.authService.registerUser(input);

    return HttpResponse.created(res, user);
  };
}

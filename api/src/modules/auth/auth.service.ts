import type { PrismaClient } from "../../database/generated/prisma/client.js";
import type { PasswordHasher } from "../../infrastructure/security/password-hasher.js";
import { ConflictError } from "../../shared/errors/errors.js";
import type { RegisterUserInput, User } from "./auth.schemas.js";

export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async registerUser(input: RegisterUserInput): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (existingUser !== null) {
      throw new ConflictError("EMAIL_ALREADY_EXISTS", "Email already exists");
    }

    const passwordHash = await this.passwordHasher.hash(input.password);

    const newUser = await this.prisma.user.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        passwordHash,
      },
    });

    return {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    };
  }
}

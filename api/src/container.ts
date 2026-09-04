// Import infrastructure

import { prisma } from "./database/prisma.js";
import { PasswordHasher } from "./infrastructure/security/password-hasher.js";

const passwordHasher = new PasswordHasher();

// Import application services

import { AuthService } from "./modules/auth/auth.service.js";

const authService = new AuthService(prisma, passwordHasher);

export { authService };

// Import controllers

import { AuthController } from "./modules/auth/auth.controller.js";

const authController = new AuthController(authService);

export { authController };

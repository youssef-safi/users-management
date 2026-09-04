import bcrypt from "bcrypt";
import { Env } from "../../config/env.js";

export class PasswordHasher {
  async hash(data: string) {
    return bcrypt.hash(data, Env.SALT_ROUNDS);
  }

  async compare(data: string, encryptedValue: string) {
    return bcrypt.compare(data, encryptedValue);
  }
}

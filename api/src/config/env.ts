export const Env = {
  PORT: Number(process.env.PORT) ?? 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) ?? 12,
  FRONTEND_URL: process.env.FRONTEND_URL,
};

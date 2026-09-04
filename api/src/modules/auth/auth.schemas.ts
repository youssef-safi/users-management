import z from "zod";

export const RegisterUserInputSchema = z.object({
  firstName: z
    .string({ error: "First name is required" })
    .trim()
    .min(1, { error: "First name cannot be empty" })
    .max(100, { error: "First name must be 100 characters or fewer" }),
  lastName: z
    .string({ error: "Last name is required" })
    .trim()
    .min(1, { error: "Last name cannot be empty" })
    .max(100, { error: "Last name must be 100 characters or fewer" }),
  email: z.email({ error: "Enter a valid email address" }),
  password: z
    .string({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters" })
    .max(72, { error: "Password must be 72 characters or fewer" }),
});

export type RegisterUserInput = z.infer<typeof RegisterUserInputSchema>;

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

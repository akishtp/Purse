import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const SignupSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be atleast 2 charecters long" })
      .max(50, { message: "Username must be less than 50 charecters long" }),
    password: z
      .string()
      .min(2, { message: "Password must be at least 2 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

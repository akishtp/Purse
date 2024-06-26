import { z } from "zod";

// <------------------------- Auth ------------------------->

export const LoginSchema = z.object({
  name: z.string(),
  password: z.string(),
});

export const SignupSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be atleast 3 charecters long" })
      .max(18, { message: "Name must be less than 18 charecters long" }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 charecters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// <------------------------- Account ------------------------->

export const AddAccountSchema = z.object({
  name: z
    .string()
    .max(6, { message: "Account name can't be longer than 6 charecters" }),
  balance: z.string(),
  color: z.string(),
});

export const AccountSchema = z.object({
  id: z.number(),
  userId: z.string(),

  name: z.string(),
  balance: z.string(),
  color: z.string(),
});

export const AccountsSchema = z.array(AccountSchema);

// <------------------------- Transaction ------------------------->

export const AddTransactionSchema = z.object({
  type: z
    .string()
    .min(3, { message: "Type must be atleast 3 charecters long" }),
  amount: z.string().min(1, { message: "Amount must be greater than 0" }),
  category: z.string(),
  accountId: z.string(),
  dateTime: z.string(),
  note: z
    .string()
    .max(16, { message: "Note can't be longer than 16 charecters" }),
});

export const TransactionSchema = z.object({
  id: z.number(),
  userId: z.string(),

  type: z.string(),
  amount: z.string(),
  category: z.string(),
  account: z.string(),
  accountId: z.number(),
  dateTime: z.string(),
  note: z.string(),
});

export const TransactionsSchema = z.array(TransactionSchema);

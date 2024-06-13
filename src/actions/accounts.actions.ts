"use server";

import db from "@/server/db";
import { accountTable } from "@/server/db/schema";
import { validateRequest } from "@/server/lucia";
import { AddAccountSchema } from "@/types";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const addAccount = async (values: z.infer<typeof AddAccountSchema>) => {
  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "You must be logged in to add an account",
    };
  }
  try {
    const newAccount = await db
      .insert(accountTable)
      .values({
        userId: user.id,
        name: values.name,
        balance: values.balance,
        color: values.color,
      })
      .returning({
        userId: accountTable.userId,
        name: accountTable.name,
        balance: accountTable.balance,
        color: accountTable.color,
        id: accountTable.id,
      });
    return {
      success: "Account created successfully",
      data: newAccount,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const getAccounts = async () => {
  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "You must be logged in to view your accounts",
    };
  }

  try {
    const accounts = await db.query.accountTable.findMany({
      where: (table) => eq(table.userId, user.id),
    });

    return {
      success: true,
      data: accounts,
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

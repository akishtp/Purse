"use server";

import db from "@/server/db";
import { accountTable, transactionTable } from "@/server/db/schema";
import { validateRequest } from "@/server/lucia";
import { AccountSchema, AddAccountSchema } from "@/types";
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
        createdAt: new Date(),
      })
      .returning({
        id: accountTable.id,
        userId: accountTable.userId,

        name: accountTable.name,
        balance: accountTable.balance,
        color: accountTable.color,
      });

    return {
      success: "Account created successfully",
      account: newAccount[0],
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
      orderBy: (table) => table.createdAt,
    });

    return {
      success: "Successfully fetched accounts",
      accounts: accounts,
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const editAccount = async ({
  values,
  ogBalance,
  ogName,
}: {
  values: z.infer<typeof AccountSchema>;
  ogBalance: number;
  ogName: string;
}) => {
  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "You must be logged in to edit an account",
    };
  }

  try {
    await db
      .update(accountTable)
      .set({
        name: values.name,
        balance: values.balance,
        color: values.color,
      })
      .where(eq(accountTable.id, values.id));

    await db
      .update(transactionTable)
      .set({ account: values.name })
      .where(eq(transactionTable.account, ogName));

    if (Number(values.balance) !== ogBalance) {
      if (Number(values.balance) > ogBalance) {
        await db.insert(transactionTable).values({
          userId: user.id,

          type: "Income",
          amount: (Number(values.balance) - ogBalance).toString(),
          category: "Adjust Balance",
          account: values.name,
          accountId: values.id,
          dateTime: new Date().toISOString(),
          note: "",
        });
      } else {
        await db.insert(transactionTable).values({
          userId: user.id,

          type: "Expense",
          amount: (ogBalance - Number(values.balance)).toString(),
          category: "Adjust Balance",
          account: values.name,
          accountId: values.id,
          dateTime: new Date().toISOString(),
          note: "",
        });
      }
    }

    return {
      success: "Account updated successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const deleteAccount = async (id: number) => {
  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "You must be logged in to delete an account",
    };
  }

  try {
    await db.delete(accountTable).where(eq(accountTable.id, id));

    return {
      success: "Account deleted successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

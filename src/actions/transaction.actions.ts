"use server";

import db from "@/server/db";
import { accountTable, transactionTable } from "@/server/db/schema";
import { validateRequest } from "@/server/lucia";
import { AddTransactionSchema } from "@/types";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

export const addTransaction = async (
  values: z.infer<typeof AddTransactionSchema>
) => {
  const { user } = await validateRequest();
  if (!user) {
    return {
      error: "You must be logged in to add an account",
    };
  }

  var accountIdNum: number = +values.accountId;

  const account = await db.query.accountTable.findFirst({
    where: (table) => eq(table.id, accountIdNum),
  });

  if (!account) {
    return {
      error: "Account not found",
    };
  }

  try {
    const newTransaction = await db
      .insert(transactionTable)
      .values({
        userId: user.id,

        type: values.type,
        amount: values.amount,
        category: values.category,
        account: account?.name,
        accountId: accountIdNum,
        dateTime: values.dateTime,
        note: values.note,
      })
      .returning({
        id: transactionTable.id,
        userId: transactionTable.userId,

        type: transactionTable.type,
        amount: transactionTable.amount,
        category: transactionTable.category,
        account: transactionTable.account,
        accountId: transactionTable.accountId,
        dateTime: transactionTable.dateTime,
        note: transactionTable.note,
      });

    await db
      .update(accountTable)
      .set({
        balance:
          values.type === "Expense"
            ? account.balance - values.amount
            : account.balance + values.amount,
      })
      .where(eq(accountTable.id, accountIdNum));

    return {
      success: "Transaction created successfully",
      data: newTransaction,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const getTransactions = async () => {
  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "You must be logged in to view your accounts",
    };
  }

  try {
    const transactions = await db.query.transactionTable.findMany({
      where: (table) => eq(table.userId, user.id),
      orderBy: (table) => [desc(table.dateTime)],
    });

    return {
      success: "Successfully fetched transactions",
      data: transactions,
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const deleteTransaction = async (id: number) => {
  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "You must be logged in to delete an account",
    };
  }

  try {
    await db.delete(transactionTable).where(eq(transactionTable.id, id));

    return {
      success: "Transaction deleted successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

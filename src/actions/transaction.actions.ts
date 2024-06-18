"use server";

import db from "@/server/db";
import { accountTable, transactionTable } from "@/server/db/schema";
import { validateRequest } from "@/server/lucia";
import { AddTransactionSchema, TransactionSchema } from "@/types";
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

export const editTransaction = async ({
  values,
  ogAmount,
  ogType,
}: {
  values: z.infer<typeof TransactionSchema>;
  ogAmount: number;
  ogType: string;
}) => {
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
    const updatedTransaction = await db
      .update(transactionTable)
      .set({
        type: values.type,
        amount: values.amount,
        category: values.category,
        account: account?.name,
        accountId: accountIdNum,
        dateTime: values.dateTime,
        note: values.note,
      })
      .where(eq(transactionTable.id, values.id))
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

    let newBalance = account.balance;
    if (ogType !== values.type && ogAmount !== values.amount) {
      if (values.type == "Expense") {
        newBalance = newBalance - (ogAmount + values.amount);
      } else if (values.type == "Income") {
        newBalance = newBalance + (ogAmount + values.amount);
      }
    } else if (ogType !== values.type && ogAmount === values.amount) {
      if (values.type == "Expense") {
        newBalance -= 2 * values.amount;
      } else if (values.type == "Income") {
        newBalance += 2 * values.amount;
      }
    } else if (ogType === values.type && ogAmount !== values.amount) {
      if (values.amount > ogAmount) {
        if (values.type == "Expense")
          newBalance = account.balance - (values.amount - ogAmount);
        else if (values.type == "Income")
          newBalance = account.balance + (values.amount - ogAmount);
      } else {
        if (values.type == "Expense")
          newBalance = account.balance + (ogAmount - values.amount);
        else if (values.type == "Income")
          newBalance = account.balance - (ogAmount - values.amount);
      }
    }
    await db
      .update(accountTable)
      .set({ balance: newBalance })
      .where(eq(accountTable.id, accountIdNum));

    return {
      data: updatedTransaction,
      success: "Transaction updated successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const deleteTransaction = async (
  id: number,
  accountId: number,
  type: string,
  amount: number
) => {
  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "You must be logged in to delete an account",
    };
  }

  const account = await db.query.accountTable.findFirst({
    where: (table) => eq(table.id, accountId),
  });

  if (!account) {
    return {
      error: "Account not found",
    };
  }

  try {
    let balance = account.balance;
    if (type === "Expense") {
      balance += amount;
    } else if (type === "Income") {
      balance -= amount;
    }

    await db.delete(transactionTable).where(eq(transactionTable.id, id));
    await db
      .update(accountTable)
      .set({
        balance,
      })
      .where(eq(accountTable.id, accountId));

    return {
      success: "Transaction deleted successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

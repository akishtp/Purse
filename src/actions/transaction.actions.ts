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

    const updatedAccount = await db
      .update(accountTable)
      .set({
        balance:
          values.type === "Expense"
            ? (Number(account.balance) - Number(values.amount)).toString()
            : (Number(account.balance) + Number(values.amount)).toString(),
      })
      .where(eq(accountTable.id, accountIdNum))
      .returning({
        id: accountTable.id,
        name: accountTable.name,
        balance: accountTable.balance,
        color: accountTable.color,
        userId: accountTable.userId,
      });

    return {
      success: "Transaction created successfully",
      transaction: newTransaction[0],
      account: updatedAccount[0],
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
      transactions: transactions,
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
    await db
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

    let newBalance = Number(account.balance);
    if (ogType !== values.type && ogAmount !== Number(values.amount)) {
      if (values.type == "Expense") {
        newBalance = newBalance - (ogAmount + Number(values.amount));
      } else if (values.type == "Income") {
        newBalance = newBalance + (ogAmount + Number(values.amount));
      }
    } else if (ogType !== values.type && ogAmount === Number(values.amount)) {
      if (values.type == "Expense") {
        newBalance -= 2 * Number(values.amount);
      } else if (values.type == "Income") {
        newBalance += 2 * Number(values.amount);
      }
    } else if (ogType === values.type && ogAmount !== Number(values.amount)) {
      if (Number(values.amount) > ogAmount) {
        if (values.type == "Expense")
          newBalance =
            Number(account.balance) - (Number(values.amount) - ogAmount);
        else if (values.type == "Income")
          newBalance =
            Number(account.balance) + (Number(values.amount) - ogAmount);
      } else {
        if (values.type == "Expense")
          newBalance =
            Number(account.balance) + (ogAmount - Number(values.amount));
        else if (values.type == "Income")
          newBalance =
            Number(account.balance) - (ogAmount - Number(values.amount));
      }
    }
    const updatedAccount = await db
      .update(accountTable)
      .set({ balance: newBalance.toString() })
      .where(eq(accountTable.id, accountIdNum))
      .returning({
        id: accountTable.id,
        name: accountTable.name,
        balance: accountTable.balance,
        color: accountTable.color,
        userId: accountTable.userId,
      });

    return {
      success: "Transaction updated successfully",
      account: updatedAccount[0],
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
    let balance = Number(account.balance);
    if (type === "Expense") {
      balance += amount;
    } else if (type === "Income") {
      balance -= amount;
    }

    await db.delete(transactionTable).where(eq(transactionTable.id, id));
    const updatedAccount = await db
      .update(accountTable)
      .set({
        balance: balance.toString(),
      })
      .where(eq(accountTable.id, accountId))
      .returning({
        id: accountTable.id,
        name: accountTable.name,
        balance: accountTable.balance,
        color: accountTable.color,
        userId: accountTable.userId,
      });

    return {
      success: "Transaction deleted successfully",
      account: updatedAccount[0],
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

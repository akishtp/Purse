"use client";

import { useAccountStore } from "@/providers/account-store-provider";
import { useTransactionStore } from "@/providers/transaction-store-provider";
import { TransactionsSchema } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useEffect, useState } from "react";
import { z } from "zod";

interface Expense {
  date: string;
  amount: number;
}

// Helper function to format date as YYYY-MM-DD
// const formatDate = (date: Date): string => {
//   return date.toISOString().split("T")[0];
// };

export default function DashboardPage() {
  const [balance, setBalance] = useState<number>(0);
  const [cashflow, setCashflow] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const { transactions } = useTransactionStore((state) => state);
  const { accounts } = useAccountStore((state) => state);

  useEffect(() => {
    const totalBalance = accounts.reduce(
      (acc, account) => acc + account.balance,
      0
    );
    setBalance(totalBalance);
  }, [accounts]);

  useEffect(() => {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const cashflowLast30Days = transactions
      .filter((transaction) => new Date(transaction.dateTime) > thirtyDaysAgo)
      .reduce((acc, transaction) => {
        if (transaction.type === "Expense") {
          return acc - transaction.amount;
        } else if (transaction.type === "Income") {
          return acc + transaction.amount;
        }
        return acc;
      }, 0);
    setCashflow(cashflowLast30Days);
  }, [transactions]);

  useEffect(() => {
    var array: Expense[] = [];
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    for (var i = 0; i <= 30; i++) {
      date.setDate(date.getDate() - 1);
      array.push({
        date: date.toLocaleDateString(),
        amount: 0,
      });
    }

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.dateTime);
      if (transactionDate > date) {
        array[0].amount += transaction.amount;
      }
    });

    setExpenses(array);
  }, [transactions]);

  // useEffect(() => {
  //   const getLast30Days = (): string[] => {
  //     const dates: string[] = [];
  //     const today = new Date();

  //     for (let i = 29; i >= 0; i--) {
  //       const date = new Date(today);
  //       date.setDate(today.getDate() - i);
  //       dates.push(formatDate(date));
  //     }

  //     return dates;
  //   };

  //   const aggregateTransactions = (
  //     transactions: z.infer<typeof TransactionsSchema>
  //   ): AggregatedData[] => {
  //     const dates = getLast30Days();
  //     const aggregation: { [key: string]: number } = {};
  //     let cumulativeAmount = 0;

  //     dates.forEach((date) => {
  //       aggregation[date] = 0;
  //     });

  //     transactions.forEach((transaction) => {
  //       const transactionDate = formatDate(new Date(transaction.dateTime));
  //       if (aggregation.hasOwnProperty(transactionDate)) {
  //         cumulativeAmount += transaction.amount;
  //         aggregation[transactionDate] = cumulativeAmount;
  //       }
  //     });

  //     return dates.map((date) => ({
  //       date,
  //       amount: aggregation[date],
  //     }));
  //   };

  //   const result = aggregateTransactions(transactions);
  //   setExpenses(result);
  // }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 gap-2">
        <div className="border-2 h-24 rounded-2xl flex py-3 px-2 flex-col justify-between bg-neutral-100 dark:bg-neutral-900">
          <div>Total balance:</div>
          {balance < 0 ? (
            <div className="text-2xl text-end text-red-500">{balance}</div>
          ) : (
            <div className="text-2xl text-end text-green-500">+{balance}</div>
          )}
        </div>
        <div className="border-2 h-24 rounded-2xl flex py-3 px-2 flex-col justify-between bg-neutral-100 dark:bg-neutral-900">
          <div>Last 30 days:</div>
          {cashflow < 0 ? (
            <div className="text-2xl text-end text-red-500">{cashflow}</div>
          ) : (
            <div className="text-2xl text-end text-green-500">+{cashflow}</div>
          )}
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-2">
          <AspectRatio
            ratio={5 / 4}
            className="border-2 rounded-lg bg-neutral-100 dark:bg-neutral-900"
          >
            Balance line graph
          </AspectRatio>
          <AspectRatio
            ratio={5 / 4}
            className="border-2 rounded-lg bg-neutral-100 dark:bg-neutral-900"
          >
            <div>Balance line graph</div>
          </AspectRatio>
        </div>
      </div>
      {expenses.map((expense, index) => {
        return (
          <div key={index} className="flex gap-10">
            <div>{expense.date}</div>
            <div>{expense.amount}</div>
          </div>
        );
      })}
    </>
  );
}

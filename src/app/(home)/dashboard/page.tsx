"use client";

import { useAccountStore } from "@/providers/account-store-provider";
import { useTransactionStore } from "@/providers/transaction-store-provider";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
} from "recharts";

type DailyBalances = {
  date: string;
  balance: number;
};

export default function DashboardPage() {
  const [dailyBalances, setDailyBalances] = useState<DailyBalances[]>([]);

  const { transactions } = useTransactionStore((state) => state);
  const { accounts } = useAccountStore((state) => state);

  useEffect(() => {
    const now = new Date();
    const balances = [];

    let currentBalance = accounts.reduce(
      (acc, account) => acc + account.balance,
      0
    );
    let transactionIndex = 0;

    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const dateString = date.toISOString().split("T")[0];

      while (
        transactionIndex < transactions.length &&
        new Date(transactions[transactionIndex].dateTime).toDateString() ===
          date.toDateString()
      ) {
        const transaction = transactions[transactionIndex];
        if (transaction.type === "Expense") {
          currentBalance += transaction.amount;
        } else if (transaction.type === "Income") {
          currentBalance -= transaction.amount;
        }
        transactionIndex++;
      }
      balances.push({ date: dateString, balance: currentBalance });
    }

    setDailyBalances(balances.reverse());
  }, [transactions, accounts]);

  return (
    <>
      <QuickView />
      <div>
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-2">
          <AspectRatio
            ratio={5 / 4}
            className="border-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-start justify-center flex-col"
          >
            <div>Balance:</div>
            <ResponsiveContainer width="94%" height="94%">
              <LineChart
                width={730}
                height={250}
                data={dailyBalances}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="date" tickFormatter={formatXAxis} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="balance" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </AspectRatio>
        </div>
      </div>
    </>
  );
}

import { TooltipProps } from "recharts";
import QuickView from "./_components/quickView";

interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div>
        <p className="label">{`Date: ${label}`}</p>
        <p className="intro">{`Balance: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const formatXAxis = (tickItem: string) => {
  const date = new Date(tickItem);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
  return `${day}/${month}`;
};

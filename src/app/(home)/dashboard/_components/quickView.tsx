import { useAccountStore } from "@/providers/account-store-provider";
import { useTransactionStore } from "@/providers/transaction-store-provider";
import { useEffect, useState } from "react";

export default function QuickView() {
  const [balance, setBalance] = useState<number>(0);
  const [cashflow, setCashflow] = useState<number>(0);

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
  return (
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
  );
}

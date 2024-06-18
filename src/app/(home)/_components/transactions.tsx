"use client";

import { useTransactionStore } from "@/providers/transaction-store-provider";

export default function Transactions() {
  const { transactions } = useTransactionStore((state) => state);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Function to format the time string
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    let minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="w-full bg-neutral-50 divide-y-2 divide-neutral-100 overflow-scroll h-fit border-x-2 border-b-2 rounded-b-xl dark:divide-neutral-900 dark:bg-neutral-950">
      {transactions.length > 0 ? (
        <>
          {transactions.map((transaction) => {
            return (
              <div key={transaction.id} className="h-14 flex px-2 items-center">
                <div className="w-1/4 flex items-center gap-2">
                  <div>{transaction.category}</div>
                  <div className="text-sm">{transaction.account}</div>
                </div>
                <div className="text-start flex-1 flex justify-between items-center">
                  <div className="text-sm">{transaction.note}</div>
                  <div className="text-xs text-end">
                    <div>{formatDate(transaction.dateTime)}</div>
                    <div>{formatTime(transaction.dateTime)}</div>
                  </div>
                </div>
                <div className="w-1/6 text-end">
                  {transaction.type === "Income" ? (
                    <div className="text-green-500 text-sm">
                      +{transaction.amount}
                    </div>
                  ) : (
                    <div className="text-red-500 text-sm">
                      -{transaction.amount}
                    </div>
                  )}
                  <div className="text-xs">{"balance"}</div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="h-14 flex items-center justify-center">
          Try adding a transaction
        </div>
      )}
    </div>
  );
}

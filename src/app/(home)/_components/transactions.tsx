"use client";

import { useTransactionStore } from "@/providers/transaction-store-provider";
import { useEffect } from "react";
import { format } from "date-fns";

export default function Transactions() {
  const { transactions } = useTransactionStore((state) => state);

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
                    {/* <div>{format(transaction.dateTime, "dd/MM/yyyy")}</div> */}
                    <div>{transaction.dateTime}</div>
                    {/* <div>{format(transaction.dateTime, "HH:mm")}</div> */}
                  </div>
                </div>
                <div className="w-1/6 text-end">
                  {transaction.type === "Income" ? (
                    <div className="text-green-500 text-sm">
                      -{transaction.amount}
                    </div>
                  ) : (
                    <div className="text-red-500 text-sm">
                      +{transaction.amount}
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

"use client";

import { useAccountStore } from "@/providers/account-store-provider";
import AddAccount from "./addAccount";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Accounts() {
  const { accounts } = useAccountStore((state) => state);

  return (
    <div className="grid grid-cols-2 gap-1 md:gap-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      {accounts.map((account) => (
        <div
          key={account.id}
          className={cn(
            "h-10 flex items-center justify-between text-white rounded-lg px-2",
            account.color
          )}
        >
          <div>{account.name}</div>
          <div>{account.balance}</div>
        </div>
      ))}
      <AddAccount />
    </div>
  );
}

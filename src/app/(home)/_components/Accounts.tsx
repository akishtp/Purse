"use client";

import { useAccountStore } from "@/providers/account-store-provider";
import AddAccount from "./addAccount";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { z } from "zod";
import { AccountSchema } from "@/types";
import EditAccount from "./editAccount";

export default function Accounts() {
  const [editAccountModal, setEditAccountModal] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] =
    useState<z.infer<typeof AccountSchema>>();
  const { accounts } = useAccountStore((state) => state);

  return (
    <div className="grid grid-cols-2 gap-1 md:gap-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      {accounts.map((account) => (
        <div
          key={account.id}
          onClick={() => {
            setEditAccountModal(true);
            setSelectedAccount(account);
          }}
          className={cn(
            "h-10 flex items-center justify-between text-white rounded-lg px-2 cursor-pointer",
            account.color
          )}
        >
          <div>{account.name}</div>
          <div>{account.balance}</div>
        </div>
      ))}
      <AddAccount />

      {editAccountModal && selectedAccount && (
        <EditAccount
          editAccountModal={editAccountModal}
          selectedAccount={selectedAccount}
          setEditAccountModal={setEditAccountModal}
        />
      )}
    </div>
  );
}

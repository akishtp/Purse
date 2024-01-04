import React from "react";
import { useAppSelector } from "../app/hooks";

const Accounts: React.FC = () => {
  const { accounts } = useAppSelector((state) => state.accounts);

  return (
    <div className="grid gap-4 grid-cols-3 pb-5">
      {accounts?.map((account) => {
        return (
          <div
            className="flex justify-between bg-blue-500 h-10 rounded-lg items-center px-2"
            key={account.id}
          >
            <div>{account.account_name}</div>
            <div>{account.balance}</div>
          </div>
        );
      })}
      <div className="flex justify-between bg-transparent border-2 h-10 rounded-lg items-center px-2">
        <div>Add Account</div>
        <div>+</div>
      </div>
    </div>
  );
};

export default Accounts;

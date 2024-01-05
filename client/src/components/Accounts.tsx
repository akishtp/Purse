import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import AddAccount from "./AddAccount";

const Accounts: React.FC = () => {
  const { accounts } = useAppSelector((state) => state.accounts);
  const [addAccountModal, setAddAccountModal] = useState<boolean>(false);

  useEffect(() => {
    console.log("use effect", accounts);
  }, [accounts]);

  return (
    <div className="grid gap-4 grid-cols-3 pb-5">
      {accounts?.map((account) => {
        return (
          <div
            className={`flex justify-between h-10 rounded-lg items-center px-2 ${account.color}`}
            key={account.ID}
          >
            <div>{account.account_name}</div>
            <div>{account.balance}</div>
          </div>
        );
      })}
      <div
        className="flex justify-between bg-transparent border-2 h-10 rounded-lg items-center px-2 cursor-pointer select-none"
        onClick={() => {
          setAddAccountModal(!addAccountModal);
        }}
      >
        <div>Add Account</div>
        <div>+</div>
      </div>
      {addAccountModal && (
        <AddAccount setAddAccountModal={setAddAccountModal} />
      )}
    </div>
  );
};

export default Accounts;

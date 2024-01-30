import { FC, useState } from "react";
import { useAppSelector } from "../app/hooks";
import AddAccount from "./AddAccount";
import { Drawer } from "vaul";

const Accounts: FC = () => {
  const { accounts } = useAppSelector((state) => state.accounts);
  const [addAccountModal, setAddAccountModal] = useState<boolean>(false);

  return (
    <div className="grid gap-4 grid-cols-2 pb-5 md:grid-cols-4">
      {accounts?.map((account) => {
        return (
          <div
            className="flex justify-between h-10 rounded-lg items-center px-2"
            style={{ backgroundColor: account.color }}
            key={account.ID}
          >
            <div>{account.account_name}</div>
            <div>{account.balance}</div>
          </div>
        );
      })}
      <Drawer.Trigger
        className="flex justify-between bg-transparent border-2 h-10 rounded-lg items-center px-2 select-none"
        onClick={() => setAddAccountModal(true)}
      >
        <div>Add Account</div>
        <div>+</div>
      </Drawer.Trigger>

      {addAccountModal && (
        <AddAccount setAddAccountModal={setAddAccountModal} />
      )}
    </div>
  );
};

export default Accounts;

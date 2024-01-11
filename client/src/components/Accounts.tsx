import { FC, useState } from "react";
import { useAppSelector } from "../app/hooks";
import AddAccount from "./AddAccount";
import { Drawer } from "vaul";
import AccountForm from "./AccountForm";

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
      {addAccountModal && (
        <Drawer.Portal>
          <Drawer.Content className="fixed bottom-0 z-50 flex justify-center w-screen border-t border-neutral-800 flex-col items-center bg-neutral-900 rounded-t-2xl">
            <div className="h-2 w-32 bg-neutral-700 rounded my-4 hover:bg-neutral-500"></div>
            <Drawer.Title className="w-full px-4 text-2xl font-bold">
              Add Account
            </Drawer.Title>
            <AccountForm setAddAccountModal={setAddAccountModal} />
          </Drawer.Content>
          <Drawer.Overlay className="fixed inset-0 z-40 bg-black/80" />
        </Drawer.Portal>
      )}
    </div>
  );
};

export default Accounts;

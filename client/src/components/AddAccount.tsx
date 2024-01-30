import { Dispatch, SetStateAction, FC } from "react";
import { IoClose } from "react-icons/io5";
import AccountForm from "./AccountForm";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Drawer } from "vaul";

export interface AddAccountProps {
  setAddAccountModal: Dispatch<SetStateAction<boolean>>;
}

const AddAccount: FC<AddAccountProps> = ({ setAddAccountModal }) => {
  const isDesktop = useMediaQuery("only screen and (min-width: 768px)");

  if (isDesktop) {
    return (
      <div
        className="fixed bg-black-opaque h-screen w-screen top-0 left-0 flex items-center justify-center"
        onClick={() => setAddAccountModal(false)}
      >
        <div
          className="bg-neutral-900 border-2 border-neutral-950 rounded-2xl flex flex-col w-[36%]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-neutral-800 h-12 flex items-center px-4 justify-between rounded-t-2xl">
            <div className="font-bold text-lg">Add Account</div>
            <IoClose
              className="text-xl cursor-pointer"
              onClick={() => setAddAccountModal(false)}
            />
          </div>
          <AccountForm setAddAccountModal={setAddAccountModal} />
        </div>
      </div>
    );
  }
  return (
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
  );
};

export default AddAccount;

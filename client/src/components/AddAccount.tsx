import { Dispatch, SetStateAction, FC } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import AccountForm from "./AccountForm";

export interface AddAccountProps {
  setAddAccountModal: Dispatch<SetStateAction<boolean>>;
}

const AddAccount: FC<AddAccountProps> = ({ setAddAccountModal }) => {
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
          <IoCloseCircleOutline
            className="text-2xl cursor-pointer"
            onClick={() => setAddAccountModal(false)}
          />
        </div>
        <AccountForm setAddAccountModal={setAddAccountModal} />
      </div>
    </div>
  );
};

export default AddAccount;

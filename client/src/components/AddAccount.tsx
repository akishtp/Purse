import { Dispatch, SetStateAction, FC } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import Select from "react-select";
import { colors } from "../data/colors";

interface AddAccountProps {
  setAddAccountModal: Dispatch<SetStateAction<boolean>>;
}

const AddAccount: FC<AddAccountProps> = ({ setAddAccountModal }) => {
  const selectableColors: Array<{
    value: string;
    label: string;
    bgcolor: string;
    color: string;
  }> = colors;
  const styles = {
    option: (
      provided: any,
      state: { data: { value: string; color: string } }
    ) => ({
      ...provided,
      backgroundColor: state.data.value,
      color: state.data.color,
    }),
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "#171717",
      height: "48px",
      border: "2px solid #262626",
      borderRadius: "8px",
    }),
  };
  return (
    <div
      className="fixed bg-black-opaque h-screen w-screen top-0 left-0 flex items-center justify-center"
      onClick={() => setAddAccountModal(false)}
    >
      <div
        className="bg-neutral-900 border-2 border-neutral-950 rounded-2xl flex flex-col w-2/5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-neutral-800 h-12 flex items-center px-4 justify-between rounded-t-2xl">
          <div className="font-bold">Add Account</div>
          <IoCloseCircleOutline
            className="text-xl cursor-pointer"
            onClick={() => setAddAccountModal(false)}
          />
        </div>
        <form className="px-4 py-1">
          <label className="flex items-center justify-between py-2">
            Balance:
            <input className="h-12 px-4 w-2/3 rounded-lg bg-neutral-900 focus:outline-none border-2 border-neutral-800 text-right hover:border-neutral-700 focus:border-neutral-700" />
          </label>
          <label className="flex items-center justify-between py-2">
            Account Name:
            <input className="h-12 px-4 w-2/3 rounded-lg bg-neutral-900 focus:outline-none border-2 border-neutral-800 text-right hover:border-neutral-700 focus:border-neutral-700" />
          </label>
          <label className="flex items-center justify-between py-2">
            Color:
            <Select
              className="w-2/3"
              options={selectableColors}
              styles={styles}
            />
          </label>
          <button className="bg-neutral-100 text-neutral-900 w-full h-12 rounded-lg hover:bg-neutral-300 my-2">
            Add Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAccount;

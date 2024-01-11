import { useState, FC } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { addAccount } from "../features/accounts/accountsAction";
import { colors } from "../data/colors";
import { PulseLoader } from "react-spinners";
import { AddAccountProps } from "./AddAccount";

type AccountInputs = {
  account_name: string;
  balance: number;
  color: string;
};

const AccountForm: FC<AddAccountProps> = ({ setAddAccountModal }) => {
  const [selectedColor, setSelectedColor] = useState<string>("#2481de");

  const dispatch = useAppDispatch();
  const { userDetails } = useAppSelector((state) => state.user);
  const { loading } = useAppSelector((state) => state.accounts);

  const {
    register,
    getValues,
    handleSubmit,
    // formState: { errors: formErrors },
  } = useForm<AccountInputs>();
  const onSubmit: SubmitHandler<AccountInputs> = async (data) => {
    await dispatch(
      addAccount({
        account_name: data.account_name,
        balance: data.balance,
        color: data.color,
        token: userDetails!.jwt,
      })
    );
    setAddAccountModal(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-1 w-full">
      <label className="flex items-center justify-between py-2">
        Balance:
        <input
          autoFocus
          {...register("balance", { required: true })}
          className="h-12 px-4 w-2/3 rounded-lg bg-neutral-900 focus:outline-none border-2 border-neutral-800 text-right hover:border-neutral-700 focus:border-neutral-700"
        />
      </label>
      <label className="flex items-center justify-between py-2">
        Account Name:
        <input
          {...register("account_name", { required: true })}
          className="h-12 px-4 w-2/3 rounded-lg bg-neutral-900 focus:outline-none border-2 border-neutral-800 text-right hover:border-neutral-700 focus:border-neutral-700"
        />
      </label>
      <label className="flex items-center justify-between py-2">
        <div>Color:</div>
        <div className="flex items-center justify-between w-2/3">
          <select
            {...register("color")}
            className="h-12 px-4 rounded-lg bg-neutral-900 focus:outline-none border-2 border-neutral-800 text-right hover:border-neutral-700 focus:border-neutral-700 w-select-color"
            onClick={() => {
              setSelectedColor(getValues("color"));
            }}
          >
            {colors.map((color) => {
              return (
                <option key={color.value} value={color.value}>
                  {color.label}
                </option>
              );
            })}
          </select>
          {/* <ColorBox color={selectedColor} /> */}
          <div
            className="h-12 w-12 rounded-2xl border-neutral-800 border-2"
            style={{ backgroundColor: selectedColor }}
          ></div>
        </div>
      </label>
      <button className="bg-neutral-100 text-neutral-900 w-full h-12 rounded-lg hover:bg-neutral-300 my-2">
        {loading ? <PulseLoader color="#fff" size={5} /> : "Add Account"}
      </button>
    </form>
  );
};

export default AccountForm;

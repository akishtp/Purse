import { useState } from "react";
import { categories } from "../data/categories";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addRecord } from "../features/records/recordsAction";

type RecordInputs = {
  category: string;
  amount: number;
  account_index: number;
  date: string;
  time: string;
  note: string;
};

const AddRecord = () => {
  var currentDate = new Date();

  const [type, setType] = useState("Expense");
  const { userDetails } = useAppSelector((state) => state.user);
  const { accounts } = useAppSelector((state) => state.accounts);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    // formState: { errors: formErrors },
  } = useForm<RecordInputs>({
    defaultValues: {
      date:
        currentDate.getFullYear() +
        "-" +
        (currentDate.getMonth() < 10 ? "0" : "") +
        (currentDate.getMonth() + 1) +
        "-" +
        (currentDate.getDate() < 10 ? "0" : "") +
        currentDate.getDate(),
      time:
        (currentDate.getHours() < 10 ? "0" : "") +
        currentDate.getHours() +
        ":" +
        (currentDate.getMinutes() < 10 ? "0" : "") +
        currentDate.getMinutes(),
    },
  });

  const onSubmit: SubmitHandler<RecordInputs> = async (data) => {
    dispatch(
      addRecord({
        type,
        accountID: accounts[data.account_index].ID,
        account_name: accounts[data.account_index].account_name,
        amount: data.amount,
        category: data.category,
        date_time: data.date + "T" + data.time + ":00Z",
        note: data.note,
        token: userDetails!.jwt,
      })
    );
  };
  return (
    <div className="p-2 w-4/12">
      <div className="bg-neutral-900 flex items-center justify-between p-2 rounded-2xl">
        <button
          onClick={() => setType("Expense")}
          className={`${
            type === "Expense" ? "bg-neutral-800" : ""
          } w-1/2 rounded-xl h-12 flex items-center justify-center`}
        >
          Expense
        </button>
        <button
          onClick={() => setType("Income")}
          className={`
          ${type === "Income" ? "bg-neutral-800" : ""}
          w-1/2 h-12 rounded-xl flex items-center justify-center`}
        >
          Income
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-neutral-900 flex flex-col rounded-xl my-2 px-3">
          <label className="w-full flex justify-between items-center py-2">
            <span className="w-1/3">Category:</span>

            <select
              {...register("category", { required: true })}
              className="h-11 bg-neutral-900 w-2/3 text-right px-4 border-2 border-neutral-800 rounded-lg"
            >
              {categories.map((category) => {
                return (
                  <option value={category.name} key={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="w-full flex justify-between items-center py-2">
            <span className="w-1/3">Amount:</span>
            <input
              {...register("amount", { required: true })}
              type="number"
              className="h-11 bg-neutral-900 w-2/3 text-right px-4 border-2 border-neutral-800 rounded-lg"
            />
          </label>
          <label className="w-full flex justify-between items-center py-2">
            <span className="w-1/3">Account:</span>
            <select
              {...register("account_index", { required: true })}
              className="h-11 bg-neutral-900 w-2/3 text-right px-4 border-2 border-neutral-800 rounded-lg"
            >
              {accounts?.map((account, index) => {
                return (
                  <option key={account.ID} value={index}>
                    {account.account_name}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="w-full flex justify-between items-center py-2">
            <span className="w-1/3">Date / Time:</span>
            <div className="flex w-2/3">
              <input
                {...register("date", { required: true })}
                type="date"
                className="h-11 bg-neutral-900 w-3/5 text-right border-2 border-neutral-800 rounded-lg mr-1 px-2"
              />
              <input
                {...register("time", { required: true })}
                type="time"
                className="h-11 bg-neutral-900 w-2/5 text-right border-2 border-neutral-800 rounded-lg ml-1 px-2"
              />
            </div>
          </label>
          <label className="w-full flex justify-between items-center py-2">
            <span className="w-1/3">Note:</span>
            <input
              {...register("note")}
              type="text"
              className="h-11 bg-neutral-900 w-2/3 px-4 text-right border-2 border-neutral-800 rounded-lg"
            />
          </label>
        </div>
        <button className="bg-purple-700 w-full h-12 rounded-xl hover:bg-purple-800">
          Add Record
        </button>
      </form>
    </div>
  );
};
export default AddRecord;

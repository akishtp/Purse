import { useState } from "react";
import { categories } from "../data/categories";

const AddRecord = () => {
  const [type, setType] = useState("Expense");
  return (
    <div className="p-2 w-4/12">
      <div className="bg-neutral-900 flex items-center justify-between p-2 rounded-2xl">
        <div
          onClick={() => setType("Expense")}
          className={`${
            type === "Expense" ? "bg-neutral-800" : ""
          } w-1/2 rounded-xl h-12 flex items-center justify-center cursor-pointer`}
        >
          Expense
        </div>
        <div
          onClick={() => setType("Income")}
          className={`
          ${type === "Income" ? "bg-neutral-800" : ""}
          w-1/2 h-12 rounded-xl flex items-center justify-center cursor-pointer`}
        >
          Income
        </div>
      </div>
      <form>
        <div className="bg-neutral-900 flex flex-col rounded-xl my-2 px-3">
          <label className="w-full flex justify-between items-center py-2">
            <span className="w-1/3">Category:</span>
            <select className="h-11 bg-neutral-900 w-2/3 text-right px-4 border-2 border-neutral-800 rounded-lg">
              {categories.map((category) => {
                return <option value={category.name}>{category.name}</option>;
              })}
            </select>
          </label>
          <label className="w-full flex justify-between items-center py-2">
            <span className="w-1/3">Amount:</span>
            <input
              type="number"
              className="h-11 bg-neutral-900 w-2/3 text-right px-4 border-2 border-neutral-800 rounded-lg"
            />
          </label>
          <label className="w-full flex justify-between items-center py-2">
            <span className="w-1/3">Account:</span>
            <select className="h-11 bg-neutral-900 w-2/3 text-right px-4 border-2 border-neutral-800 rounded-lg">
              <option>CASH</option>
              <option>SBI</option>
            </select>
          </label>
          <label className="w-full flex justify-between items-center py-2">
            <span className="w-1/3">Date:</span>
            <input
              type="datetime-local"
              className="h-11 bg-neutral-900 w-2/3 text-right px-4 border-2 border-neutral-800 rounded-lg"
            />
          </label>
          <label className="w-full flex justify-between items-center py-2">
            <span className="w-1/3">Note:</span>
            <input
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

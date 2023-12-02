export default function AddRecords() {
  return (
    <form className="flex flex-col">
      <div className="h-14 flex rounded-xl bg-neutral-900 p-1.5">
        <div className="w-1/2 flex items-center justify-center bg-neutral-800 rounded-2xl cursor-pointer">
          Expense
        </div>
        <div className="w-1/2 flex items-center justify-center cursor-pointer">
          Income
        </div>
      </div>
      <div className="bg-neutral-900 rounded-xl my-2.5 flex flex-col px-4 py-3">
        <label className="h-11 flex justify-between items-center">
          Account:
          <select className="h-9 px-1 bg-neutral-800 w-70 text-right">
            <option>Cash</option>
            <option>SBI</option>
          </select>
        </label>
        <label className="h-11 flex justify-between items-center">
          Amount:
          <input
            type="number"
            className="h-9 px-2 bg-neutral-800 w-70 text-right"
          />
        </label>
        <label className="h-11 flex justify-between items-center">
          Date:
          <input
            type="datetime-local"
            className="h-9 px-2 bg-neutral-800 w-70 text-right"
          />
        </label>
        <label className="h-11 flex justify-between items-center">
          Category:
          <select className="h-9 px-1 bg-neutral-800 w-70 text-right">
            <option>Groceries</option>
            <option>Tranport</option>
            <option>Fuel</option>
          </select>
        </label>
        <label className="h-11 flex justify-between items-center">
          Note:
          <input
            type="text"
            className="h-9 px-2 bg-neutral-800 w-70 text-right"
          />
        </label>
      </div>
      <button className="bg-violet-700 rounded-xl h-12 hover:bg-violet-800">
        Add Record
      </button>
    </form>
  );
}

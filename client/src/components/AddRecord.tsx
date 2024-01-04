const AddRecord = () => {
  return (
    <div className="p-2 w-4/12">
      <div className="bg-neutral-900 flex items-center justify-between p-2 rounded-2xl">
        <div className="bg-neutral-800 w-1/2 rounded-xl h-12 flex items-center justify-center">
          Expense
        </div>
        <div className="w-1/2 flex items-center justify-center">Income</div>
      </div>
      <form>
        <div className="bg-neutral-900 flex flex-col rounded-xl my-2 px-3">
          <label className="w-full flex justify-between items-center py-2">
            <span className="w-1/3">Category:</span>
            <select className="h-11 bg-neutral-800 w-2/3 text-right px-4">
              <option>Fuel</option>
              <option>Groceries</option>
            </select>
          </label>
          <label className="w-full flex justify-between items-center py-2">
            <span className="w-1/3">Amount:</span>
            <input
              type="number"
              className="h-11 bg-neutral-800 w-2/3 text-right px-4"
            />
          </label>
          <label className="w-full flex justify-between items-center py-2">
            <span className="w-1/3">Account:</span>
            <select className="h-11 bg-neutral-800 w-2/3 text-right px-4">
              <option>CASH</option>
              <option>SBI</option>
            </select>
          </label>
          <label className="w-full flex justify-between items-center py-2">
            <span className="w-1/3">Date:</span>
            <input
              type="datetime-local"
              className="h-11 bg-neutral-800 w-2/3 text-right px-4"
            />
          </label>
          <label className="w-full flex justify-between items-center py-2">
            <span className="w-1/3">Note:</span>
            <input
              type="text"
              className="h-11 bg-neutral-800 w-2/3 px-4 text-right"
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

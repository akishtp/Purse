import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecord } from "../../features/records/recordsActions";
import { closeAddRecord } from "../../features/records/recordsSlice";

const AddRecord = () => {
  var currentDate = new Date();

  const { addError, records, loading } = useSelector((state) => state.records);
  const { userDetails } = useSelector((state) => state.user);
  const { accounts } = useSelector((state) => state.accounts);

  const [type, setType] = useState("expense");
  const [account, setAccount] = useState(accounts[0]._id);
  const [amount, setAmount] = useState("0");
  const [time, setTime] = useState(
    (currentDate.getHours() < 10 ? "0" : "") +
      currentDate.getHours() +
      ":" +
      (currentDate.getMinutes() < 10 ? "0" : "") +
      currentDate.getMinutes()
  );
  const [constDate, setConstDate] = useState(
    currentDate.toISOString().slice(0, 10)
  );
  const [category, setCategory] = useState("Others");
  const [payee, setPayee] = useState("");
  const [note, setNote] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = `${constDate}T${time}:00.000+00:00`;

    const token = userDetails.token;
    try {
      dispatch(
        addRecord({
          type,
          account,
          amount,
          category,
          date,
          payee,
          note,
          token,
        })
      );
    } catch (error) {
      // do nothing
    }
  };

  useEffect(() => {
    try {
      setCategory(records[0].category);
      setAccount(records[0].account);
    } catch {
      // do nothing
    }
  }, [records]);
  return (
    <div className="add-record">
      <div className="add-record-top">
        <div className="add-record-read">Add Record</div>
        <div
          className="add-record-close"
          onClick={() => dispatch(closeAddRecord())}
        >
          x
        </div>
      </div>
      <nav className="type-selector">
        <div
          className={type === "expense" ? "expense active" : "income"}
          onClick={() => setType("expense")}
        >
          Expense
        </div>
        <div
          className={type === "income" ? "income active" : "expense"}
          onClick={() => setType("income")}
        >
          Income
        </div>
      </nav>
      <form onSubmit={(e) => handleSubmit(e)} className="add-record-details">
        <div className="part1">
          {addError && <div className="error">{addError}</div>}

          <div className="amount-account-wrapper">
            <label className="amount-label">
              Amount :
              <input
                type="number"
                className="amount-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onClick={() => {
                  setAmount("");
                }}
                min="0"
                max="999999999999"
              />
            </label>
            <label className="account-label">
              Account :
              <select
                className="account-input"
                onChange={(e) => setAccount(e.target.value)}
                value={account}
              >
                {accounts.map((account, i) => (
                  <option key={i} value={account._id}>
                    {account.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="date-time-wrapper">
            <label className="date-label">
              Date :
              <input
                type="date"
                className="date-input"
                value={constDate}
                onChange={(e) => setConstDate(e.target.value)}
              />
            </label>
            <label className="time-label">
              Time :
              <input
                type="time"
                className="time-input"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="part2">
          <label className="category-label">
            Category :
            <select
              className="category-input"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="Food & Drinks">Food & Drinks</option>
              <option value="Shopping">Shopping</option>
              <option value="Housing">Housing</option>
              <option value="Transportation">Transportation</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Life & Entertainmnet">Life & Entertainment</option>
              <option value="Investment">Investment</option>
              <option value="Income">Income</option>
              <option value="Others">Others</option>
            </select>
          </label>
          <label className="payee-label">
            Payee :
            <input
              type="text"
              className="payee-input"
              value={payee}
              onChange={(e) => setPayee(e.target.value)}
            />
          </label>
          <label
            className="note-label"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          >
            Note :
            <textarea />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          Add Record
        </button>
      </form>
    </div>
  );
};

export default AddRecord;

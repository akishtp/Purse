import { useState } from "react";
import { useSelector } from "react-redux";

const EditRecord = ({ record, setEditRecord }) => {
  const [type, setType] = useState(record.type);
  const [amount, setAmount] = useState(record.amount);
  const [account, setAccount] = useState(record.account);
  const [constDate, setConstDate] = useState(12 / 11 / 2022);
  const [time, setTime] = useState("11 : 30");
  const [category, setCategory] = useState(record.category);
  const [payee, setPayee] = useState(record.payee);
  const [note, setNote] = useState(record.note);
  let addError = "lol";

  const { accounts } = useSelector((state) => state.user);

  const handleSubmit = () => {
    // submit i guess
  };
  return (
    <div className="add-record">
      <div className="add-record-top">
        <div className="add-record-read">Edit Record</div>
        <div className="add-record-close" onClick={() => setEditRecord(false)}>
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
                  <option key={i} value={account.name}>
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
        <button type="submit">Add Record</button>
      </form>
    </div>
  );
};

export default EditRecord;

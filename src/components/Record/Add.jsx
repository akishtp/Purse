import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addRecord } from "../../features/records/recordsActions";
import { closeAddRecord } from "../../features/records/recordsSlice";

const Add = () => {
  const [type, setType] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState(0);
  const [time, setTime] = useState("");
  const [calDate, setCalDate] = useState("");
  const [category, setCategory] = useState("");
  const [payee, setPayee] = useState("");
  const [note, setNote] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = `${calDate}T${time}:00.000+00:00`;
    dispatch(addRecord({ type, account, amount, category, date, payee, note }));
  };
  return (
    <div className="add-record">
      <nav className="add-record-nav">
        <div className="add-record-nav-left">Add Record</div>
        <div
          className="add-record-nav-right"
          onClick={() => dispatch(closeAddRecord())}
        >
          #
        </div>
      </nav>
      <form className="add-record-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="add-record-form-top">
          <div className="add-record-form-top-left">
            <div className="add-record-type">
              <div className="expense" onClick={() => setType("Expense")}>
                Expense
              </div>
              <div className="income" onClick={() => setType("Income")}>
                Income
              </div>
            </div>
            <div className="add-record-amount-account">
              <label className="add-record-amount-label">
                Amount :
                <input
                  type="number"
                  className="add-record-amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </label>
              <label className="add-record-account-label">
                Account :
                <select
                  className="add-record-account"
                  onChange={(e) => setAccount(e.target.value)}
                >
                  <option value="option1">Option1</option>
                  <option value="option2">Option2</option>
                </select>
              </label>
            </div>
            <div className="date-time-wrapper">
              <label className="add-record-date-label">
                Date :
                <input
                  type="date"
                  className="add-record-date"
                  value={calDate}
                  onChange={(e) => setCalDate(e.target.value)}
                />
              </label>
              <label className="add-record-time-label">
                Time :
                <input
                  type="time"
                  className="add-record-time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="add-record-form-top-right">
            <label className="add-record-category-label">
              Category :
              <select
                className="add-record-category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="option1">Option1</option>
                <option value="option2">Option2</option>
              </select>
            </label>
            <label className="add-record-payee-label">
              Payee :
              <input
                type="text"
                className="add-record-payee"
                value={payee}
                onChange={(e) => setPayee(e.target.value)}
              />
            </label>
            <label className="add-record-note-label">
              Note :
              <input
                type="text"
                className="add-record-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="add-record-button-wrapper">
          <button className="add-record-button">Add Record</button>
        </div>
      </form>
    </div>
  );
};

export default Add;

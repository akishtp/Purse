import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecord } from "../../features/records/recordsActions";
import { closeAddRecord } from "../../features/records/recordsSlice";
import { SlClose } from "react-icons/sl";

const AddRecord = () => {
  var date = new Date();

  const [type, setType] = useState("Expense");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState(date.getHours() + ":" + date.getMinutes());
  const [calDate, setCalDate] = useState(date.toISOString().slice(0, 10));
  const [category, setCategory] = useState("");
  const [payee, setPayee] = useState("");
  const [note, setNote] = useState("");

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.records);
  const { userDetails } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = `${calDate}T${time}:00.000+00:00`;
    if (userDetails) {
      const token = userDetails.token;
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
    }
  };
  return (
    <div className="add-record">
      <nav className="nav">
        <div className="left-side">Add Record</div>
        <div className="right-side" onClick={() => dispatch(closeAddRecord())}>
          <SlClose size={20} />
        </div>
      </nav>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="top">
          <div className="left">
            <nav className="type">
              <div
                className={type === "Expense" ? "item active" : "item"}
                onClick={() => setType("Expense")}
              >
                Expense
              </div>
              <div
                className={type === "Income" ? "item active" : "item"}
                onClick={() => setType("Income")}
              >
                Income
              </div>
            </nav>
            <div className="top-left-bottom">
              <div className="account-amount-wrapper">
                <label className="amount-label">
                  Amount :
                  <input
                    type="number"
                    className="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </label>
                <label className="account-label">
                  Account :
                  <select
                    className="account"
                    onChange={(e) => setAccount(e.target.value)}
                  >
                    <option value="option1">CASH</option>
                    <option value="option2">SBI</option>
                  </select>
                </label>
              </div>
              <div className="date-time-wrapper">
                <label className="date-label">
                  Date :
                  <input
                    type="date"
                    className="date"
                    value={calDate}
                    onChange={(e) => setCalDate(e.target.value)}
                  />
                </label>
                <label className="time-label">
                  Time :
                  <input
                    type="time"
                    className="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="right">
            <label className="category-label">
              Category :
              <select
                className="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="option1">Groceries</option>
                <option value="option2">Restaurant</option>
              </select>
            </label>
            <label className="payee-label">
              Payee :
              <input
                type="text"
                className="payee"
                value={payee}
                onChange={(e) => setPayee(e.target.value)}
              />
            </label>
            <label className="note-label">
              Note :
              <input
                type="text"
                className="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="bottom">
          <button className="button">Add Record</button>
        </div>
      </form>
    </div>
  );
};

export default AddRecord;

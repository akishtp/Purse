import { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecord } from "../../features/records/recordsActions";
import { closeAddRecord } from "../../features/records/recordsSlice";

const AddRecord = () => {
  const [type, setType] = useState("Expense");
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
      <nav className="nav">
        <div className="left-side">Add Record</div>
        <div className="right-side" onClick={() => dispatch(closeAddRecord())}>
          #
        </div>
      </nav>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="top">
          <div className="left">
            <div className="type">
              <div className="expense">Expense</div>
              <div className="income">Income</div>
            </div>
            <div className="account-amount-wrapper">
              <label className="amount-label">
                Amount :
                <input type="number" className="amount" />
              </label>
              <label className="account-label">
                Account :
                <select className="account">
                  <option value="option1">Option1</option>
                  <option value="option2">Option2</option>
                </select>
              </label>
            </div>
            <div className="date-time-wrapper">
              <label className="date-label">
                Date :
                <input type="date" className="date" />
              </label>
              <label className="time-label">
                Time :
                <input type="time" className="time" />
              </label>
            </div>
          </div>
          <div className="right">
            <label className="category-label">
              Category :
              <select className="category">
                <option value="option1">Option1</option>
                <option value="option2">Option2</option>
              </select>
            </label>
            <label className="payee-label">
              Payee : <input type="text" className="payee" />
            </label>
            <label className="note-label">
              Note :
              <input type="text" className="note" />
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

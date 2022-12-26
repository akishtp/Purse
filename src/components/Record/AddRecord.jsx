import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecord } from "../../features/records/recordsActions";
import { closeAddRecord } from "../../features/records/recordsSlice";

const AddRecord = () => {
  var localDate = new Date();

  const { records } = useSelector((state) => state.records);

  const [type, setType] = useState("expense");
  const [account, setAccount] = useState("CASH");
  const [amount, setAmount] = useState(0);
  const [time, setTime] = useState(
    localDate.getHours() + ":" + localDate.getMinutes()
  );
  const [date, setDate] = useState(localDate.toString().slice(0, 10));
  const [category, setCategory] = useState("Others");
  const [payee, setPayee] = useState("");
  const [note, setNote] = useState("");

  const dispatch = useDispatch();
  const { addError } = useSelector((state) => state.records);
  const { userDetails } = useSelector((state) => state.user);

  const closeModal = (e) => {
    e.stopPropagation();
    closeAddRecord();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateTime = `${date}T${time}:00.000+00:00`;
    if (userDetails) {
      const token = userDetails.token;
      dispatch(
        addRecord({
          type,
          account,
          amount,
          category,
          dateTime,
          payee,
          note,
          token,
        })
      ).then(dispatch(closeAddRecord()));
    }
  };
  useEffect(() => {
    try {
      setCategory(records[0].category);
    } catch {
      // null
    }
  }, [records]);
  return (
    <div className="backdrop" onClick={(e) => closeModal(e)}>
      <div className="add-record">
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
          {addError && <div className="error">{addError}</div>}
          <div className="part1">
            <div className="amount-account-wrapper">
              <label htmlFor="" className="amount-label">
                Amount :
                <input
                  type="number"
                  className="amount-input"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </label>
              <label htmlFor="" className="account-label">
                Account :
                <select
                  className="account-input"
                  onChange={(e) => setAccount(e.target.value)}
                  value={account}
                >
                  <option value="CASH">CASH</option>
                  <option value="SBI">SBI</option>
                </select>
              </label>
            </div>
            <div className="date-time-wrapper">
              <label htmlFor="" className="date-label">
                Date :
                <input
                  type="date"
                  className="date-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label htmlFor="" className="time-label">
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
            <label htmlFor="" className="category-label">
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
                <option value="Life & Entertainmnet">
                  Life & Entertainment
                </option>
                <option value="Investment">Investment</option>
                <option value="Income">Income</option>
                <option value="Others">Others</option>
              </select>
            </label>
            <label htmlFor="" className="payee-label">
              Payee :
              <input
                type="text"
                className="payee-input"
                value={payee}
                onChange={(e) => setPayee(e.target.value)}
              />
            </label>
            <label
              htmlFor=""
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
    </div>
  );
};

export default AddRecord;

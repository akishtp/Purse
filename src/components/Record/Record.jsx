import { useState } from "react";
import "./Record.css";

const Record = ({ record }) => {
  const [recordSmall, setRecordSmall] = useState(false);
  return (
    <div className="record-inner-wrapper">
      <div
        className={recordSmall ? "record" : "record big"}
        onClick={() => setRecordSmall(!recordSmall)}
      >
        <div className="left-side">
          <img
            src={require(`../../Assets/${record.category}.png`)}
            alt="record-category"
          />
          <div className="record-details">
            <p className="category">{record.category}</p>
            <p className="account">{record.account}</p>
            <div className="extras">
              {record.note && <p className="payee">{record.note}</p>}
              {record.note && record.payee && <>&nbsp;-&nbsp;</>}
              {record.payee && <p className="note">{record.payee}</p>}
            </div>
          </div>
        </div>
        <div className={`right-side ${record.type}`}>
          {record.type === "Expense" ? "-" : "+"}
          {record.amount}
        </div>
      </div>
      <div className={recordSmall ? "record-actions" : "record-actions small"}>
        <div className="edit">✍️</div>
        <div className="delete">🗑️</div>
      </div>
    </div>
  );
};

export default Record;

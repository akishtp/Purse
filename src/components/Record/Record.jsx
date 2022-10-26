import RecordDD from "./RecordDD";
import "./Record.css";
import { useState } from "react";

const Record = ({ record }) => {
  const [recordDD, setRecordDD] = useState(false);
  return (
    <div className="record">
      <div className="record-left-side">
        <span className="record-category">{record.category}</span>
        <span className="record-account">{record.account}</span>
        {record.note && <span className="record-note">{record.note}</span>}
        {record.payee && <span className="record-payee">-{record.payee}</span>}
      </div>
      <div className="record-right-side">
        <span className={`record.type ${record.type}`}>{record.amount}</span>
        <button className="three-dot" onClick={() => setRecordDD(!recordDD)}>
          ...
        </button>
        {recordDD && <RecordDD />}
      </div>
    </div>
  );
};

export default Record;

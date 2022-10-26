import * as MdIcons from "react-icons/md";
import "./Record.css";
import { useState } from "react";
import { deleteRecord } from "../../features/records/recordsActions";
import { useDispatch } from "react-redux";

const Record = ({ record }) => {
  const [recordDD, setRecordDD] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="record-wrapper-two">
      <div className="record">
        <div className="record-left-side">
          <span className="record-category">{record.category}</span>
          <span className="record-account">{record.account}</span>
          {record.note && <span className="record-note">{record.note}</span>}
          {record.payee && (
            <span className="record-payee">-{record.payee}</span>
          )}
        </div>
        <div className="record-right-side">
          <span className={`record.type ${record.type}`}>{record.amount}</span>
          <button className="three-dot" onClick={() => setRecordDD(!recordDD)}>
            ...
          </button>
        </div>
      </div>
      {recordDD && (
        <>
          <button className="edit-button">
            <MdIcons.MdEdit size={20} />
          </button>
          <button
            className="delete-button"
            onClick={() => dispatch(deleteRecord(record._id))}
          >
            <MdIcons.MdDelete size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default Record;

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  deleteRecord,
  getRecords,
} from "../../features/records/recordsActions";
import "./Record.css";

const Record = ({ record }) => {
  const [recordSmall, setRecordSmall] = useState(false);
  const { userDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDelete = () => {
    const token = userDetails.token;
    const _id = record._id;
    dispatch(deleteRecord({ _id, token }));
  };

  return (
    <div className="record-wrapper">
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
          {record.type === "expense" ? "-" : "+"}
          {record.amount}
        </div>
      </div>
      <div className={recordSmall ? "record-actions" : "record-actions small"}>
        <div
          className="edit"
          onClick={() => {
            dispatch(getRecords(userDetails.token));
          }}
        >
          ✍️
        </div>
        <div
          className="delete"
          onClick={() => {
            handleDelete();
          }}
        >
          🗑️
        </div>
      </div>
    </div>
  );
};

export default Record;

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteRecord } from "../../features/records/recordsActions";
import "./Record.css";
import UpdateRecord from "./UpdateRecord";

const Record = ({ record }) => {
  const { userDetails } = useSelector((state) => state.user);

  const [editRecord, setEditRecord] = useState(false);
  const [recordSmall, setRecordSmall] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    const token = userDetails.token;
    const _id = record._id;
    dispatch(deleteRecord({ _id, token }));
  };

  return (
    <>
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
              <p className="account">{record.account_name}</p>
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
        <div
          className={recordSmall ? "record-actions" : "record-actions small"}
        >
          <div
            className="edit"
            onClick={() => {
              setEditRecord(true);
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
      {editRecord && (
        <UpdateRecord record={record} setEditRecord={setEditRecord} />
      )}
    </>
  );
};

export default Record;

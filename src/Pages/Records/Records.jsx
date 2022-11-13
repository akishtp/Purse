import { useSelector } from "react-redux";
import Record from "../../components/Record/Record";
import "./Records.css";

const Records = () => {
  const { records, getError } = useSelector((state) => state.records);
  return (
    <div className="records">
      {records.length > 0 ? (
        <div className="record-wrapper">
          {records.map((record) => (
            <Record key={record._id} record={record} />
          ))}
        </div>
      ) : (
        <div>no records to show {getError}</div>
      )}
    </div>
  );
};

export default Records;
